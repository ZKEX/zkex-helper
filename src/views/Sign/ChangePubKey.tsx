import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import { getChains } from 'api/routes/broker-balance'
import { getAccount } from 'api/zklink/getAccount'
import { CodeBoard } from 'components/CodeBoard'
import { FillButton } from 'components/Form/FillButton'
import { FormOutlinedInput } from 'components/Form/FormOutlinedInput'
import { memo, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useLinkWalletStore } from 'store/link/wallet'
import { getCurlTemplate, getRequestBody } from 'utils/requestTemplate'
import { SignedTransaction } from 'zklink-js-sdk'
import Breadcrumbs from 'components/Breadcrumbs'

interface Form {
  accountId: string
  subAccountId: string
  layerOneChainId: string
  layerTwoChainId: string
  feeTokenId: string
  mainContract: string
  nonce: string
  newPkHash: string
  ethAuthType: 'EthECDSA' | 'Onchain'
}
export const ChangePubKeyView = memo(() => {
  const { address, wallet } = useLinkWalletStore()
  const { chainId } = useWeb3React()
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    // formState: { errors },
  } = useForm<Form>()

  const [signedData, setSignedData] = useState<SignedTransaction>()

  useEffect(() => {
    if (!wallet) return
    wallet?.signer?.pubKeyHash().then((r) => {
      setValue('newPkHash', r)
    })
  }, [wallet, setValue])

  const onSubmit = async (data: Form) => {
    try {
      const signedTransaction = await wallet?.signChangePubKey({
        chainId: Number(data.layerTwoChainId),
        accountId: Number(data.accountId),
        subAccountId: Number(data.subAccountId),
        feeTokenId: Number(data.feeTokenId),
        ethAuthType: data.ethAuthType,
        fee: '0',
        nonce: Number(data.nonce),
        mainContract: data.mainContract,
        layerOneChainId: Number(data.layerOneChainId),
        newPkHash: data.newPkHash,
      })

      setSignedData(signedTransaction)
    } catch (e: any) {
      toast.error(e?.message)
    }
  }

  return (
    <Container maxWidth="md" sx={{ pt: 4 }}>
      <Breadcrumbs style={{margin:'54px 0 20px'}}/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl>
              <FormLabel id="ethAuthType">Auth Type</FormLabel>
              <RadioGroup
                row
                aria-labelledby="ethAuthType"
                defaultValue="EthECDSA"
                {...register('ethAuthType')}>
                <FormControlLabel
                  value="EthECDSA"
                  control={<Radio />}
                  label="EthECDSA"
                />
                <FormControlLabel
                  value="OnChain"
                  control={<Radio />}
                  label="OnChain"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
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
          <Grid item xs={6}>
            <FormOutlinedInput
              label="Sub Account ID"
              defaultValue={0}
              register={register('subAccountId', { required: true })}
            />
          </Grid>
          <Grid item xs={6}>
            <FormOutlinedInput
              name="layerOneChainId"
              label="Layer1 Chain ID"
              defaultValue={chainId}
              register={register('layerOneChainId', { required: true })}
            />
          </Grid>
          <Grid item xs={6}>
            <FormOutlinedInput
              label="Layer2 Chain ID"
              defaultValue={1}
              register={register('layerTwoChainId', { required: true })}
            />
          </Grid>
          <Grid item xs={12}>
            <FormOutlinedInput
              label="Main Contract"
              endAdornment={
                <FillButton
                  onClick={() => {
                    const values = getValues()
                    const { layerOneChainId } = values
                    toast.promise(
                      getChains().then((r) => {
                        const chain = r.result.find(
                          (v) =>
                            Number(v.layerOneChainId) ===
                            Number(layerOneChainId)
                        )
                        if (!chain) {
                          toast.error(
                            `Fetching chain(${layerOneChainId}) info failed`
                          )
                          return
                        }
                        const { mainContract = '' } = chain
                        setValue('mainContract', mainContract)
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
              register={register('mainContract', { required: true })}
            />
          </Grid>
          <Grid item xs={6}>
            <FormOutlinedInput
              label="Nonce"
              defaultValue={'0'}
              endAdornment={
                <FillButton
                  onClick={() => {
                    toast.promise(
                      getAccount(address).then((r) => {
                        setValue('nonce', r.result.nonce)
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
              register={register('nonce', { required: true })}
            />
          </Grid>
          <Grid item xs={6}>
            <FormOutlinedInput
              label="Fee Token ID"
              defaultValue={18}
              register={register('feeTokenId', { required: true })}
            />
          </Grid>
          <Grid item xs={12}>
            <FormOutlinedInput
              label="New Pubkey Hash"
              disabled
              register={register('newPkHash', { required: true })}
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
