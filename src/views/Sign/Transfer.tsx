import { Button, Container, Grid, Stack } from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import { getAccount } from 'api/zklink/getAccount'
import axios from 'axios'
import { CodeBoard } from 'components/CodeBoard'
import { FillButton } from 'components/Form/FillButton'
import { FormOutlinedInput } from 'components/Form/FormOutlinedInput'
import { ZKEX_API_URL } from 'config/index'
import { BigNumber, providers } from 'ethers'
import { isAddress, parseEther } from 'ethers/lib/utils'
import { memo, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useLinkWalletStore } from 'store/link/wallet'
import { getCurlTemplate, getRequestBody } from 'utils/requestTemplate'
import { SignedTransaction, closestPackableTransactionFee } from 'zklink-js-sdk'
import Breadcrumbs from 'components/Breadcrumbs'

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

interface Form {
  accountId: string
  fromSubAccountId: string
  toSubAccountId: string
  toAddress: string
  tokenId: string
  tokenSymbol: string
  amount: string
  fee: string
  subNonce: string
}

export const TransferView = memo(() => {
  const { address, wallet } = useLinkWalletStore()
  const { provider } = useWeb3React()
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    // formState: { errors },
  } = useForm<Form>()
  const [accessToken, setAccessToken] = useState()

  const [signedData, setSignedData] = useState<SignedTransaction>()

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
          Authorize ZKEX's Services
        </Button>
      </Stack>
    )
  }

  const onSubmit = async ({
    accountId,
    fromSubAccountId,
    toSubAccountId,
    toAddress,
    tokenId,
    tokenSymbol,
    amount,
    fee,
    subNonce,
  }: Form) => {
    if (!fee) {
      alert('cannot estimate tx fee')
      return
    }
    if (!isAddress(toAddress)) {
      toast.error('invalid to address')
      return
    }
    const signedTransaction = await wallet?.signTransfer({
      accountId: Number(accountId),
      fromSubAccountId: Number(fromSubAccountId),
      toSubAccountId: Number(toSubAccountId),
      to: toAddress,
      tokenId: Number(tokenId),
      tokenSymbol: tokenSymbol,
      amount: closestPackableTransactionFee(BigNumber.from(amount).sub(fee!)),
      fee: BigNumber.from(fee),
      nonce: Number(subNonce),
    })

    setSignedData(signedTransaction)
  }
  return (
    <Container maxWidth="md" sx={{ pt: 4 }}>
      <Breadcrumbs style={{margin:'54px 0 20px'}}/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <FormOutlinedInput
              label={'Account ID'}
              defaultValue={0}
              endAdornment={
                <FillButton
                  onClick={() => {
                    toast.promise(
                      getAccount(address).then((r) => {
                        setValue('accountId', r.result.id)
                      }),
                      {
                        loading: 'Filling',
                        success: 'Fill Successful',
                        error: 'Fill Failed',
                      }
                    )
                  }}
                />
              }
              register={register('accountId', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormOutlinedInput
              label="From Sub Account ID"
              register={register('fromSubAccountId', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormOutlinedInput
              label="To Sub Account ID"
              register={register('toSubAccountId', { required: true })}
            />
          </Grid>
          <Grid item xs={12}>
            <FormOutlinedInput
              label="To Address"
              register={register('toAddress', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormOutlinedInput
              label="Token ID"
              register={register('tokenId', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormOutlinedInput
              label="Token Symbol"
              register={register('tokenSymbol', { required: true })}
            />
          </Grid>
          <Grid item xs={12}>
            <FormOutlinedInput
              label="Amount"
              register={register('amount', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormOutlinedInput
              label="Transaction Fee"
              defaultValue={'0'}
              endAdornment={
                <FillButton
                  onClick={() => {
                    const values = getValues()
                    const { tokenId } = values
                    estimateTxFee({
                      txType: 4,
                      tokenId: Number(tokenId),
                    }).then((r) => {
                      setValue(
                        'fee',
                        closestPackableTransactionFee(
                          parseEther(r.txFee)
                        ).toString()
                      )
                    })
                  }}
                />
              }
              register={register('fee', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormOutlinedInput
              label="Sub Nonce"
              defaultValue={'0'}
              endAdornment={
                <FillButton
                  onClick={() => {
                    const values = getValues()
                    const { fromSubAccountId } = values
                    toast.promise(
                      getAccount(address).then((r) => {
                        setValue(
                          'subNonce',
                          r.result.subAccountNonces[fromSubAccountId]
                        )
                      }),
                      {
                        loading: 'Filling',
                        success: 'Fill Successful',
                        error: 'Fill Failed',
                      }
                    )
                  }}
                />
              }
              register={register('subNonce', { required: true })}
            />
          </Grid>

          <Grid item xs={12}>
            <Button fullWidth variant="contained" type="submit">
              Sign Transaction
            </Button>
          </Grid>

          <Grid item xs={12}>
            <CodeBoard title="Request Body" code={getRequestBody(signedData)} />
          </Grid>
          <Grid item xs={12}>
            <CodeBoard
              title="Curl Template"
              code={getCurlTemplate(signedData)}
            />
          </Grid>
        </Grid>
      </form>
    </Container>
  )
})
