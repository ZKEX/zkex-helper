import { css, styled } from '@mui/material'

export const Flex = styled('div')`
  display: flex;
`

export const FlexCenter = styled(Flex)`
  align-items: center;
  justify-content: center;
`

export const FlexItem = styled('div')`
  flex: 1;
`

export const FlexBetween = styled(Flex)`
  align-items: center;
  justify-content: space-between;
`

export const ModalBody = styled('div')`
  border-radius: 8px;
`

export const ModalHead = styled('div')`
  padding: 24px 24px 0;
  font-size: 18px;
  line-height: 24px;
  position: relative;
  color: ${(props) => props.theme.color.TextColor100};
`

export const ModalMask = styled('div')`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  ${(props) => props.theme.breakpoints.down('md')} {
    background: ${(props) => props.theme.color.MobileBgColor};
  }
`

export const ModalPanel = styled('div') <{
  width: string
  isTheme: boolean
}>`
  max-width: ${(props) => props.width};
  flex: 1;
  margin: 0 16px;
  background: ${(props) => (props.isTheme ? props.theme.color.BgColor02 : '#171A1E')};
  border-radius: 8px;
  box-shadow: 0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04);
  position: relative;
  ${(props) => props.theme.breakpoints.down('md')} {
    max-width: 100vw;
    width: 100vw !important;
    margin: 0;
    border-radius: 8px 8px 0 0;
  }
`

export const ModalWrap = styled('div') <{
  isStartTop?: boolean
}>`
  display: flex;
  align-items: ${(props) => (props.isStartTop ? 'flex-start' : 'center')};
  justify-content: center;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(5, 7, 20, 0.6);
  backdrop-filter: blur(4px);
  z-index: 300;
  ${(props) => props.theme.breakpoints.down('md')} {
    // justify-content: flex-end;
    align-items: flex-end;
    background: unset;
  }
`

export const ContentWrap = styled('div')`
  padding: 16px 16px 24px;
`

export const ActiveCss = css`
  cursor: pointer;
  &:active {
    opacity: 0.85;
    transform: translateY(1px);
    box-shadow: none;
  }
`