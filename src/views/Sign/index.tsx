import { Container, Stack, styled } from '@mui/material'
import { ConnectWalletButton } from 'components/Buttons/ConnectWalletButton'
import { Nav } from 'components/Header'
import { memo } from 'react'
import { useLinkConnected } from 'store/link/hooks'
import { Outlet } from 'react-router-dom'

const Wrapper = styled(Container)`
  padding: 128px 0;
`

export const SignView = memo(() => {
  const linkConnected = useLinkConnected()

  if (!linkConnected) {
    return (
      <Wrapper>
        <Nav />
        <Stack alignItems="center" sx={{ padding: '200px 0' }}>
          <ConnectWalletButton />
        </Stack>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <Nav />
      <Outlet></Outlet>
    </Wrapper>
  )
})
