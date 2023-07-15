import { styled } from '@mui/material'
import useResize from 'hooks/useResize'
import { memo } from 'react'
import { breakpoints } from 'styles/Themes'
import { FlexItem } from 'styles/index'
import { ConnectButton } from './ConnectButton'
import { Logo } from './Logo'
import MobileNavWrap from './Mobile'
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

export const PCNavWrap = memo(() => {
  return (
    <NavWrap>
      <Logo />
      <FlexItem />
      <ConnectButton />
      <ThemeSwitch />
    </NavWrap>
  )
})

export const Nav = memo(() => {
  const { innerWidth } = useResize()

  return <>{innerWidth <= breakpoints.values!.md ? <MobileNavWrap /> : <PCNavWrap />}</>
})
