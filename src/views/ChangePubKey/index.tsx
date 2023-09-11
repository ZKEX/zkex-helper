import { Box, Container, Stack, styled } from '@mui/material'
import { ConnectWalletButton } from 'components/Buttons/ConnectWalletButton'
import { Nav } from 'components/Header'
import { memo } from 'react'
import { useLinkConnected } from 'store/link/hooks'
import { OnChainView } from './OnChain'

const Wrapper = styled(Container)`
  padding: 200px 0;
`

export const ChangePubKeyView = memo(() => {
  const linkConnected = useLinkConnected()

  if (!linkConnected) {
    return (
      <Wrapper>
        <Nav />
        <Stack alignItems="center">
          <Box>
            <ConnectWalletButton />
          </Box>
        </Stack>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <Nav />
      <OnChainView />
    </Wrapper>
  )
})
