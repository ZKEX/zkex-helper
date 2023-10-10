import {
  Button,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTransactionSenderStore } from 'store/link/transaction'
import { useLinkWalletStore } from 'store/link/wallet'
import { Wrapper } from 'views/styles'

interface Form {
  body: string
}

export function TransactionSenderView() {
  const { wallet } = useLinkWalletStore()
  const { register, handleSubmit } = useForm<Form>()

  const { pending, transactions, sendTransaction, clearTransactions } =
    useTransactionSenderStore()
  const onSubmit = async (data: Form) => {
    sendTransaction(data.body, wallet!)
  }

  const rows = useMemo(() => {
    const sorted = Array.from(transactions).reverse()
    return sorted
  }, [transactions])

  return (
    <Wrapper maxWidth="md" sx={{ pt: 2 }}>
      <Stack spacing={2}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="request-body">
            Paste Request Body Here
          </InputLabel>
          <OutlinedInput
            id="request-body"
            multiline
            minRows={10}
            label="Paste Request Body Here"
            autoFocus
            {...register('body', { required: true })}
          />
        </FormControl>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          {pending ? 'Sending' : 'Send Transaction'}
        </Button>

        <Stack sx={{ pt: 3 }} direction="row" justifyContent="space-between">
          <Typography variant="h5">Records</Typography>
          <Button
            onClick={() => {
              clearTransactions()
              toast.success('All record has been removed.')
            }}>
            Clear
          </Button>
        </Stack>
        <List>
          {rows.map((v) => (
            <ListItem key={v.hash}>
              <ListItemText
                primary={v.hash}
                secondary={dayjs(v.createdAt).format('YYYY-MM-DD HH:mm:ss')}
              />
            </ListItem>
          ))}
        </List>
      </Stack>
    </Wrapper>
  )
}
