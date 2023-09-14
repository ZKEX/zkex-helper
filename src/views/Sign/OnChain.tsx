import { Typography, Button, Stack } from '@mui/material'
import { hexlify } from 'ethers/lib/utils'
import { memo, useState } from 'react'
import { useLinkWallet, usePubKeyHash } from 'store/link/hooks'

export const OnChainView = memo(() => {
  const pubKeyHash = usePubKeyHash()
  const wallet = useLinkWallet()

  const [signedData, setSignedData] = useState<any>()

  return (
    <Stack spacing={2}>
      <Typography>Account ID: 0</Typography>
      <Typography>Sub Account ID: 0</Typography>
      <Typography>
        pubKeyHash: {pubKeyHash ? hexlify(pubKeyHash) : '-'}
      </Typography>
      <Button
        variant="contained"
        onClick={async () => {
          const data = await wallet?.signChangePubKey({
            chainId: 4,
            accountId: 0,
            subAccountId: 0,
            feeTokenId: 18,
            ethAuthType: 'Onchain',
            fee: '0',
            nonce: 0,
            mainContract: '',
            layerOneChainId: 1,
            newPkHash: hexlify(pubKeyHash!),
          })!

          setSignedData(JSON.stringify(data.tx))
        }}>
        Sign Transaction
      </Button>

      <code>{signedData}</code>
    </Stack>
  )
})
