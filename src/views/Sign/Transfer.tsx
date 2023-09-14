import { Button, Stack, TextField } from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import axios from 'axios'
import { ZKEX_API_URL, ZKLINK_API_URL } from 'config/index'
import { BigNumber, providers } from 'ethers'
import { isAddress, parseEther } from 'ethers/lib/utils'
import { memo, useEffect, useState } from 'react'
import { useLinkWallet } from 'store/link/hooks'
import { closestPackableTransactionFee } from 'zklink-js-sdk'

export async function estimateTxFee(params: {
  txType: 3 | 4 | 6 // 4: transfer  3: withdraw  6: changepubkey`
  tokenId: number
  chainId?: number
}): Promise<{
  txFee: string
  tokenId: number
  chainId?: number
}> {
  return axios
    .get(`/layer2/estimateTxFee`, {
      params,
      headers: {
        'Access-Token': window.sessionStorage.getItem('zkex_access_token'),
      },
      baseURL: ZKEX_API_URL,
    })
    .then((r) => r.data)
}
export const LOGIN_MESSAGE =
  'Sign this message to connect with ZKEX services.\nNOTE: Please check this website ends with "app.zkex.com".'

async function login(provider: providers.JsonRpcProvider) {
  const signer = provider.getSigner()
  const address = await signer.getAddress()

  const signature = await signer.signMessage(LOGIN_MESSAGE)
  const params = {
    verifyType: 0,
    address,
    message: LOGIN_MESSAGE,
    signature,
  }

  const r = await axios
    .post('/users', params, {
      baseURL: ZKEX_API_URL,
    })
    .then((r) => r.headers['access-token'])

  window.sessionStorage.setItem('zkex_access_token', r)
  return r
}

export const TransferView = memo(() => {
  const wallet = useLinkWallet()
  const { provider } = useWeb3React()
  const fromAddress = wallet?.address()

  const [accountId, setAccountId] = useState<string>('0')
  const [fromSubAccountId, setFromSubAccountId] = useState<string>('0')
  const [toSubAccountId, setToSubAccountId] = useState<string>('0')
  const [toAddress, setToAddress] = useState<string>('')
  const [tokenId, setTokenId] = useState<string>('')
  const [tokenSymbol, setTokenSymbol] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [fee, setFee] = useState<BigNumber>()
  const [subNonce, setSubNonce] = useState<string>('')
  const [accessToken, setAccessToken] = useState()

  const [curl, setCurl] = useState<any>()

  useEffect(() => {
    if (!tokenId) {
      return
    }
    if (!accessToken) {
    }
    estimateTxFee({
      txType: 4,
      tokenId: Number(tokenId),
    }).then((r) => {
      setFee(closestPackableTransactionFee(parseEther(r.txFee)))
    })
  }, [tokenId, accessToken])

  useEffect(() => {
    if (!fromAddress) {
      return
    }
    axios
      .post(ZKLINK_API_URL, {
        jsonrpc: '2.0',
        method: 'getAccount',
        params: [fromAddress],
        id: 1,
      })
      .then((r) => r.data)
      .then((r) => {
        if (r.result?.subAccountNonces) {
          setSubNonce(String(r.result?.subAccountNonces[fromSubAccountId]))
        } else {
          setSubNonce('0')
        }
      })
  }, [fromSubAccountId, fromAddress])

  if (!accessToken) {
    return (
      <Stack alignItems="center" sx={{ padding: '200px 0' }}>
        <Button
          variant="contained"
          onClick={async () => {
            if (!provider) {
              alert('connect wallet first')
              return
            }
            login(provider).then((v) => {
              setAccessToken(v)
            })
          }}>
          Authorize ZKEX
        </Button>
      </Stack>
    )
  }

  return (
    <Stack spacing={2}>
      <Stack>
        <TextField
          id="accountId"
          label="Account ID"
          variant="outlined"
          value={accountId}
          onChange={(e) => {
            setAccountId(e.target.value)
          }}
        />
      </Stack>
      <Stack>
        <TextField
          id="fromSubAccountId"
          label="From Sub Account ID"
          variant="outlined"
          value={fromSubAccountId}
          onChange={(e) => {
            setFromSubAccountId(e.target.value)
          }}
        />
      </Stack>
      <Stack>
        <TextField
          id="toSubAccountId"
          label="To Sub Account ID"
          variant="outlined"
          value={toSubAccountId}
          onChange={(e) => {
            setToSubAccountId(e.target.value)
          }}
        />
      </Stack>
      <Stack>
        <TextField
          id="toAddress"
          label="To Address"
          variant="outlined"
          value={toAddress}
          onChange={(e) => {
            setToAddress(e.target.value)
          }}
        />
      </Stack>
      <Stack>
        <TextField
          id="tokenId"
          label="Token ID"
          variant="outlined"
          onChange={(e) => {
            setTokenId(e.target.value)
          }}
        />
      </Stack>
      <Stack>
        <TextField
          id="tokenSymbol"
          label="Token Symbol"
          variant="outlined"
          value={tokenSymbol}
          onChange={(e) => {
            setTokenSymbol(e.target.value)
          }}
        />
      </Stack>
      <Stack>
        <TextField
          id="amount"
          label="Amount"
          variant="outlined"
          onChange={(e) => {
            setAmount(e.target.value)
          }}
        />
      </Stack>
      <Stack>
        <TextField
          id="fee"
          value={fee ? fee.toString() : '0'}
          label="Transaction Fee"
          variant="outlined"
          onChange={(e) => {
            setAmount(e.target.value)
          }}
        />
      </Stack>
      <Stack>
        <TextField
          id="subNonce"
          value={subNonce}
          label="Sub Nonce"
          variant="outlined"
          onChange={(e) => {
            setSubNonce(e.target.value)
          }}
        />
      </Stack>

      <Button
        variant="contained"
        onClick={async () => {
          if (!amount) {
            alert('please enter amount')
            return
          }
          if (!fee) {
            alert('cannot estimate tx fee')
            return
          }
          if (!isAddress(toAddress)) {
            alert('invalid to address')
            return
          }
          const data = await wallet?.signTransfer({
            accountId: Number(accountId),
            fromSubAccountId: Number(fromSubAccountId),
            toSubAccountId: Number(toSubAccountId),
            to: toAddress,
            tokenId: Number(tokenId),
            tokenSymbol: tokenSymbol,
            amount: closestPackableTransactionFee(
              BigNumber.from(amount).sub(fee!)
            ),
            fee: BigNumber.from(fee),
            nonce: Number(subNonce),
          })!

          setCurl(`
            curl --location 'http://127.0.0.1:3030'
            --data '{
              "id": 1,
              "jsonrpc": "2.0",
              "method": "sendTransaction",
              "params": [
                ${JSON.stringify(data.tx)},
                ${JSON.stringify(data.ethereumSignature)},
                null
              ]
            }'
          `)
        }}>
        Sign Transaction
      </Button>

      <code>{curl}</code>
    </Stack>
  )
})
