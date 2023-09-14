import { Typography, Button, Stack } from '@mui/material'
import { arrayify, hexlify } from 'ethers/lib/utils'
import { memo, useEffect, useState } from 'react'
import { useLinkWallet } from 'store/link/hooks'

export const OnChainView = memo(() => {
  const wallet = useLinkWallet()
  const [pubKeyHash, setPubKeyHash] = useState<Uint8Array>()
  const [signedData, setSignedData] = useState<any>()

  useEffect(() => {
    if (!wallet) {
      return
    }
    wallet?.signer?.pubKeyHash().then((r) => {
      setPubKeyHash(arrayify(r))
    })
  }, [wallet])

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

          setSignedData(`
            curl --location 'http://127.0.0.1:3030'
            --data '{
              "id": 1,
              "jsonrpc": "2.0",
              "method": "sendTransaction",
              "params": [
                ${JSON.stringify(data.tx)},
                null,
                null
              ]
            }'
          `)
        }}>
        Sign Transaction
      </Button>

      <code>{signedData}</code>
    </Stack>
  )
})
