import { L1ID, TokenID } from '@/types'
import { styled } from '@mui/material'
import { getTokenRemain } from 'api/routes/broker-balance'
import { Nav } from 'components/Header'
import { BrokerAddress, BrokerContractAddress } from 'config/index'
import { ethers } from 'ethers'
import { Interface, isAddress } from 'ethers/lib/utils'
import { useEffect, useMemo, useState } from 'react'
import { ChainInfo, useSupportChainsStore } from 'store/app/chains'
import { useMulticallContracts } from 'store/app/contracts'
import { useSupportTokensStore } from 'store/app/tokens'
import SysTable from 'styles/Table'
import { isGasAddress, isZeroAddress } from 'utils/address'
import { createWeb3Provider } from 'utils/getWeb3Provider'
import { toSafeFixed } from 'utils/math'
import { sendMulticall } from 'utils/multicall'

const { Table, TableBody, TableCell, TableHead, TableRow, TableContainer } =
  SysTable

const BalanceBody = styled('div')`
  width: 100%;
  height: 100%;
  padding: 85px 18px 18px;
`
const Span = styled('span')`
  &.s1 {
    color: #c6ddc4;
  }

  &.s2 {
    color: #708b6e;
  }
`
const Fast = styled('span')`
  padding: 0px 4px;
  background-color: seagreen;
  border-radius: 6px;
  margin-left: 4px;
`

interface ITokenBalance {
  [id: TokenID]: {
    id: TokenID
    symbol: string
    balance: number[]
  }
}

const balanceOfAbi = ['function balanceOf(address) view returns (uint256)']

const BalanceView = () => {
  const { supportTokens } = useSupportTokensStore()
  const { supportChains } = useSupportChainsStore()
  const supportToken = useMemo(() => {
    return Object.values(supportTokens).filter(
      (token) => Object.keys(token.chains).length !== 0
    )
  }, [supportTokens])
  const multicallContracts = useMulticallContracts()

  const [l1Balances, setL1Balances] = useState<ITokenBalance>({})
  const [l2Balances, setL2Balances] = useState<ITokenBalance>({})

  useEffect(() => {
    getL2Balance()
  }, [supportToken, supportTokens])

  useEffect(() => {
    supportChains.forEach((currentNet) => {
      getChainL1Balance(currentNet)
      getGasBalance(currentNet)
    })
  }, [supportToken, supportTokens, supportChains])

  const [gasBalance, setGasBalance] = useState<Record<L1ID, string>>({})
  const getGasBalance = async (currentNet: ChainInfo) => {
    const { layerOneChainId, rpcUrl } = currentNet

    const provider = createWeb3Provider(layerOneChainId, rpcUrl)
    const _res = (await provider.getBalance(BrokerAddress)).toString()
    setGasBalance((pre) => {
      return {
        ...pre,
        [layerOneChainId]: _res,
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
                  balance: res.result,
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

  const getChainL1Balance = async (currentNet: ChainInfo) => {
    const { chainId, layerOneChainId, rpcUrl } = currentNet
    const contractAddress = multicallContracts[layerOneChainId]
    if (!contractAddress || !BrokerContractAddress[layerOneChainId]) return

    const gasToken = supportToken.find((token) => {
      const address = token.chains[chainId]?.address || ''
      return address && isGasAddress(address)
    })

    const queueTokens =
      supportToken.filter((token) => {
        const address = token.chains[chainId]?.address || ''
        return (
          !!address &&
          !isGasAddress(address) &&
          !isZeroAddress(address) &&
          isAddress(address)
        )
      }) ?? []

    let balances: any[] = []
    //  if (queueTokens.length) {
    try {
      const tokenAddresses: string[] = []
      const tokenId: number[] = []
      queueTokens.forEach((item) => {
        const _address = item.chains[chainId]?.address
        if (!!_address && isAddress(_address)) {
          tokenAddresses.push(_address)
          tokenId.push(item.id)
        }
      })
      const iface = new Interface(balanceOfAbi)
      const fragment = iface.getFunction('balanceOf')
      const calldata = iface.encodeFunctionData(fragment, [
        BrokerContractAddress[layerOneChainId],
      ])
      const calls = tokenAddresses.map(() => calldata)
      const provider = createWeb3Provider(layerOneChainId, rpcUrl)

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
        balances.push(
          (
            await provider.getBalance(BrokerContractAddress[layerOneChainId])
          ).toString()
        )
        tokenId.push(gasToken.id)
      }

      tokenId.forEach((item, index) => {
        setL1Balances((pre: any) => {
          if (pre[item]) {
            return {
              ...pre,
              [item]: {
                id: item,
                symbol: supportTokens[item].symbol,
                balance: {
                  ...pre[item]['balance'],
                  [layerOneChainId]: balances[index],
                },
              },
            }
          }
          return {
            ...pre,
            [item]: {
              id: item,
              symbol: supportTokens[item].symbol,
              balance: {
                [layerOneChainId]: balances[index],
              },
            },
          }
        })
      })
    } catch (e) {
      //
    }
    // }
  }

  const tableBody = useMemo(() => {
    const tableRow: string[][] = []

    const _gasRow = ['Gas Token']
    supportChains.forEach((network) => {
      const _balance = gasBalance[network.layerOneChainId]
      _gasRow.push(
        _balance ? toSafeFixed(ethers.utils.formatUnits(_balance, 18), 4) : '0'
      )
      // _gasRow.push(_balance)
    })
    tableRow.push(_gasRow)

    supportToken.forEach((token) => {
      const _row = [token.symbol]
      const exclude = ['USDC', 'MATIC', 'DAI', 'USDT']
      supportChains.forEach((network) => {
        const _decimals = token.chains[network.chainId]?.decimals || 18
        const isFast = token.chains[network.chainId]?.fastWithdraw

        const _l1Balance = l1Balances[token.id]
          ? l1Balances[token.id]['balance'][network.layerOneChainId]
          : 0
        const _l2Balance = l2Balances[token.id]
          ? l2Balances[token.id]['balance'][network.chainId]
          : 0

        const formatL1Balance = _l1Balance
          ? toSafeFixed(
              ethers.utils.formatUnits(_l1Balance, _decimals),
              exclude.includes(_row[0]) ? 1 : 4
            )
          : '0'
        const formatL2Balance = _l2Balance
          ? toSafeFixed(
              ethers.utils.formatUnits(_l2Balance, 18),
              exclude.includes(_row[0]) ? 1 : 4
            )
          : '0'
        const value =
          formatL1Balance === '0' && formatL2Balance === '0'
            ? '--'
            : `${formatL1Balance}/${formatL2Balance}/${isFast}`
        _row.push(value)
      })

      tableRow.push(_row)
    })
    return tableRow
  }, [supportToken, supportChains, l1Balances, l2Balances, gasBalance])

  return (
    <>
      <Nav />
      <BalanceBody>
        <TableContainer sx={{ maxHeight: '100%' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Token(L1/L2)</TableCell>
                {supportChains.map((item) => (
                  <TableCell key={item.chainId}>{item.name}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableBody.map((row, index) => (
                <TableRow key={'row-' + index}>
                  {row.map((col, colIndex) => (
                    <TableCell key={'col-' + colIndex}>
                      {col === '--' || !col.includes('/') ? (
                        col
                      ) : (
                        <>
                          <Span className={'s1'}>{col.split('/')[0]}</Span>/
                          <Span className={'s2'}>{col.split('/')[1]}</Span>
                          {col.split('/')[2] === 'true' ? (
                            <Fast>fast</Fast>
                          ) : null}
                        </>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </BalanceBody>
    </>
  )
}

export default BalanceView
