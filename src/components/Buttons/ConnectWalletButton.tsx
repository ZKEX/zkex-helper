import { styled } from '@mui/material/styles'
import { FC, ReactNode, memo } from 'react'
import { updateModal } from 'store/app/actions'
import { useWeb3Connected } from 'store/app/hooks'
import { useAppDispatch } from 'store/index'
import { useLinkStatus } from 'store/link/hooks'
import { LinkStatus } from 'store/link/types'
import { ActionButton } from './ActionButton'

export const ConnectButtonWrap = styled(ActionButton)`
  font-size: 16px;
`
ConnectButtonWrap.defaultProps = {
  variant: 'contained',
  fullWidth: true,
}
export const ConnectWalletButton: FC<{ children?: ReactNode }> = memo(
  () => {
    const linkStatus = useLinkStatus()
    const dispatch = useAppDispatch()
    const web3Connected = useWeb3Connected()

    const connecting =
      linkStatus === LinkStatus.linkL1Pending ||
      linkStatus === LinkStatus.linkL2Pending ||
      linkStatus === LinkStatus.apiLoginPending
    return (
      <ConnectButtonWrap
        loading={connecting}
        disabled={connecting}
        onClick={() => {
          dispatch(updateModal({ modal: 'wallets', open: true }))
        }}
      >
        {web3Connected
          ? 'Connect ZKEX'
          : 'Connect Wallet'
        }
      </ConnectButtonWrap>
    )
  }
)
