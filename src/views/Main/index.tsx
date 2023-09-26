import { Box, Stack } from '@mui/material'
import { ConnectWalletButton } from 'components/Buttons/ConnectWalletButton'
import { Nav } from 'components/Header'
import { Outlet } from 'react-router-dom'
import { useLinkWalletStore } from 'store/link/wallet'
import { Wrapper } from 'views/styles'

export function MainView() {
  const { connected } = useLinkWalletStore()
  return (
    <>
      <Nav />
      {connected ? (
        <Outlet />
      ) : (
        <Wrapper sx={{ padding: '320px 32px' }}>
          <Stack alignItems="center">
            <Box sx={{ width: 320 }}>
              <ConnectWalletButton />
            </Box>
          </Stack>
        </Wrapper>
      )}
    </>
  )
}
