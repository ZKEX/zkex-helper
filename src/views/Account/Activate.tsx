import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { useWeb3React } from '@web3-react/core'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Environment } from 'store/app/types'
import { ChangePubKeyEntries, Wallet as LinkWallet } from 'zklink-js-sdk'

interface Form {
  environment: Environment
}

export function ActivateView() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>()
  const { provider } = useWeb3React()

  const tx: ChangePubKeyEntries = {
    accountId: 4,
    subAccountId: 0,
    chainId: 2,
    ethAuthType: 'EthECDSA',
    feeTokenId: 1,
    fee: '0',
    nonce: 0,
    layerOneChainId: 43113,
    mainContract: '0x26fe94acb8689e8d881f820b83400b398a40e586',
  }

  const onSubmit = async (data: any) => {
    const wallet = await LinkWallet.fromEthSigner(provider?.getSigner()!)
    const signedData = await wallet.signChangePubKey(tx)
    const r = await axios.post('https://dev-gw-v1.zk.link', {
      jsonrpc: '2.0',
      method: 'sendTransaction',
      params: [signedData.tx, signedData.ethereumSignature ?? null],
      id: 1,
    })
    console.log(r)
  }
  return (
    <Container maxWidth="md" sx={{ pt: 4 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={2}>
          <Grid2 xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Environment</InputLabel>
              <Select
                labelId="environment"
                id="environment"
                label="environment"
                {...register('environment')}>
                <MenuItem value={Environment.Mainnet}>Mainnet</MenuItem>
                <MenuItem value={Environment.Testnet}>Testnet</MenuItem>
                <MenuItem value={Environment.Devnet}>Devnet</MenuItem>
              </Select>
            </FormControl>
          </Grid2>
          <Grid2>
            {/* <TextField
              helperText="Enter your name and press [Enter]"
              {...register('name')}
            /> */}
          </Grid2>

          <Grid2>
            <Button type="submit">Submit</Button>
          </Grid2>
        </Grid2>

        {/* <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        {...register('environment')}
      />
      <input {...register('lastName', { required: true })} />
      {errors.lastName && <p>Last name is required.</p>}
      <input {...register('age', { pattern: /\d+/ })} />
      {errors.age && <p>Please enter number for age.</p>}
      <input type="submit" /> */}
      </form>
    </Container>
  )
}
