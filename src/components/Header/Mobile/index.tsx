import { styled } from '@mui/material'
import { ReactComponent as SvgMenu } from 'assets/home/menu.svg'
import { memo, useState } from 'react'
import { Flex, FlexBetween, FlexCenter, FlexItem } from 'styles/index'
import { ConnectButton } from '../ConnectButton'
import { Logo } from '../Logo'

const MobileNav = styled(FlexBetween)`
  width: 100%;
  height: 68px;
  padding: 0 8px;
  background: ${(props) => props.theme.color.BgColor01};
  border-bottom: 1px solid ${(props) => props.theme.color.TextColor20};
`
const MobileNavRight = styled(Flex)`
  gap: 8px;
  justify-content: flex-end;
`
const MobileNavItem = styled(FlexCenter)`
  position: relative;
  min-width: 36px;
  max-width: 130px;
  height: 36px;
  background: ${(props) => props.theme.color.BgColor02};
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid ${(props) => props.theme.color.TextColor10};
  color: ${(props) => props.theme.color.BgColor03};
  border-radius: 6px;
  justify-content: center;
`

const MobileNavWrap = memo(() => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <MobileNav>
      <Logo />
      <FlexItem />
      <MobileNavRight>
        <ConnectButton />
        <MobileNavItem onClick={() => setShowMenu(true)}>
          <SvgMenu />
        </MobileNavItem>
      </MobileNavRight>

    </MobileNav>
  )
})

export default MobileNavWrap
