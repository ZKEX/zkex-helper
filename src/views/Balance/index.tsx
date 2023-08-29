import { L1ID, TokenID } from '@/types';
import { Web3Provider } from '@ethersproject/providers';
import { styled } from '@mui/material';
import { SupportChain, getTokenRemain } from 'api/routes/broker-balance';
import { Nav } from 'components/Header';
import { BrokerAddress, BrokerContractAddress } from 'config/index';
import { ethers } from 'ethers';
import { Interface, isAddress } from 'ethers/lib/utils';
import { useEffect, useMemo, useState } from 'react';
import { getChainInfo, getContractAddress, useSupportNetwork, useTokens } from 'store/app/hooks';
import SysTable from 'styles/Table';
import { isGasAddress, isZeroAddress } from 'utils/address';
import { getWeb3ProviderByLinkId } from 'utils/getWeb3Provider';
import { toSafeFixed } from 'utils/math';
import { sendMulticall } from 'utils/multicall';
const { Table, TableBody, TableCell, TableHead, TableRow, TableContainer } = SysTable

const BalanceBody = styled('div')`
  width: 100%;
  height: 100%;
  padding: 85px 18px 18px;
`

interface ITokenBalance {
  [id: TokenID]: {
    id: TokenID
    symbol: string
    balance: number[]
  }
}

const balanceOfAbi = [
  'function balanceOf(address) view returns (uint256)',
]


const BalanceView = () => {
  const tokenList = useTokens()
  const netList = useSupportNetwork()

  const supportToken = useMemo(() => {
    return Object.values(tokenList).filter(token => Object.keys(token.chains).length !== 0)
  }, [tokenList])


  const [l1Balances, setL1Balances] = useState<ITokenBalance>({})
  const [l2Balances, setL2Balances] = useState<ITokenBalance>({})

  useEffect(() => {
    getL2Balance()
  }, [supportToken, tokenList])

  useEffect(() => {
    netList.forEach(currentNet => {
      getChainL1Balance(currentNet)
      getGasBalance(currentNet)
    })
  }, [supportToken, tokenList, netList])

  const [gasBalance, setGasBalance] = useState<Record<L1ID, string>>({})
  const getGasBalance = async (currentNet: SupportChain) => {
    const { layerOneChainId } = currentNet
    const provider = await getWeb3ProviderByLinkId(layerOneChainId) as Web3Provider
    const _res = (await provider.getBalance(BrokerAddress)).toString()
    setGasBalance(pre => {
      return {
        ...pre,
        [layerOneChainId]: _res
      }
    })
  }

  const getL2Balance = () => {
    try {
      supportToken.forEach((item) => {
        getTokenRemain(item.id, true).then((res) => {
          if (res?.result) {
            setL2Balances((pre) => {
              return {
                ...pre,
                [item.id]: {
                  id: item.id,
                  symbol: item.symbol,
                  balance: res.result
                },
              }
            })
          }
        })
      })
    } catch (err) {
      // console.log(err)
    }
  }

  const getChainL1Balance = async (currentNet: SupportChain) => {
    const { chainId, layerOneChainId } = currentNet

    const contractAddress = getContractAddress(layerOneChainId)
    if (!contractAddress || !BrokerContractAddress[layerOneChainId]) return

    const gasToken = supportToken.find((token) => {
      const address = token.chains[chainId]?.address || ''
      return address && isGasAddress(address)
    })


    const queueTokens = supportToken.filter((token) => {
      const address = token.chains[chainId]?.address || ''
      return (
        !!address &&
        !isGasAddress(address) &&
        !isZeroAddress(address) &&
        isAddress(address)
      )
    }) ?? []


    let balances: any[] = []
    if (queueTokens.length) {
      try {
        const tokenAddresses: string[] = []
        const tokenId: number[] = []
        queueTokens.forEach(item => {
          const _address = item.chains[chainId]?.address
          if (!!_address && isAddress(_address)) {
            tokenAddresses.push(_address)
            tokenId.push(item.id)
          }
        })



        const iface = new Interface(balanceOfAbi)
        const fragment = iface.getFunction('balanceOf')
        const calldata = iface.encodeFunctionData(fragment, [BrokerContractAddress[layerOneChainId]])
        const calls = tokenAddresses.map(() => calldata)
        const provider = await getWeb3ProviderByLinkId(layerOneChainId) as Web3Provider

        const resultData = await sendMulticall(
          provider,
          contractAddress,
          balanceOfAbi,
          'balanceOf',
          tokenAddresses,
          calls
        )
        balances = resultData.map((r: any) => r.toString())


        if (gasToken) {
          balances.push((await provider.getBalance(BrokerContractAddress[layerOneChainId])).toString())
          tokenId.push(gasToken.id)
        }


        tokenId.forEach((item, index) => {
          setL1Balances((pre: any) => {
            if (pre[item]) {
              return {
                ...pre,
                [item]: {
                  id: item,
                  symbol: tokenList[item].symbol,
                  balance: {
                    ...pre[item]['balance'],
                    [layerOneChainId]: balances[index]
                  }
                }
              }
            }
            return {
              ...pre,
              [item]: {
                id: item,
                symbol: tokenList[item].symbol,
                balance: {
                  [layerOneChainId]: balances[index]
                }
              },
            }
          })

        })

      } catch (e) {
        // 
      }
    }
  }

  const tableBody = useMemo(() => {
    const tableRow: (string[])[] = []

    const _gasRow = ['Gas Token']
    netList.forEach(network => {
      const _balance = gasBalance[network.layerOneChainId]
      _gasRow.push(_balance ? toSafeFixed(ethers.utils.formatUnits(_balance, 18), 4) : '0')
      // _gasRow.push(_balance)
    })
    tableRow.push(_gasRow)

    supportToken.forEach(token => {
      const _row = [token.symbol]

      netList.forEach(network => {

        const _decimals = token.chains[network.chainId]?.decimals || 18

        const _l1Balance = l1Balances[token.id] ? l1Balances[token.id]['balance'][network.layerOneChainId] : 0
        const _l2Balance = l2Balances[token.id] ? l2Balances[token.id]['balance'][network.chainId] : 0

        _row.push(`${_l1Balance ? toSafeFixed(ethers.utils.formatUnits(_l1Balance, _decimals), 4) : '0'}/${_l2Balance ? toSafeFixed(ethers.utils.formatUnits(_l2Balance, 18), 4) : '0'}`)
      })

      tableRow.push(_row)

    })
    return tableRow
  }, [supportToken, netList, l1Balances, l2Balances, gasBalance])

  return <>
    <Nav />
    <BalanceBody>
      <TableContainer sx={{ maxHeight: '100%' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Token(L1/L2)</TableCell>
              {
                netList.map(item => <TableCell key={item.chainId}>{getChainInfo(item.layerOneChainId).name}</TableCell>)
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              tableBody.map((row, index) => <TableRow key={'row-' + index}>
                {
                  row.map((col, colIndex) => <TableCell key={'col-' + colIndex}>{col}</TableCell>)
                }
              </TableRow>)
            }
          </TableBody>
        </Table>
      </TableContainer>
    </BalanceBody>
  </>
}

export default BalanceView