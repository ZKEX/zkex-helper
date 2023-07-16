import { styled } from '@mui/material'
import { memo } from 'react'
import { FlexItem } from 'styles/index'
import { ConnectButton } from './ConnectButton'
import { Logo } from './Logo'
import ThemeSwitch from './ThemeSwitch'

const NavWrap = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 64px;
  gap: 12px;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid ${(props) => props.theme.color.TextColor10};
  background: ${(props) => props.theme.color.BgColor02};
  z-index: 100;
`

export const Nav = memo(() => {
  return (
    <NavWrap>
      <Logo />
      <FlexItem />
      <ConnectButton />
      <ThemeSwitch />
    </NavWrap>
  )
})
