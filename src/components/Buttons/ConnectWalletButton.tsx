import { styled } from '@mui/material'
import { FC, ReactNode, memo } from 'react'
import { useWalletStore, useWeb3Connected } from 'store/app/wallet'
import { LinkStatus, useLinkWalletStore } from 'store/link/wallet'
import { ActionButton } from './ActionButton'

export const ConnectButtonWrap = styled(ActionButton)`
  font-size: 16px;
`
ConnectButtonWrap.defaultProps = {
  variant: 'contained',
  fullWidth: true,
}
export const ConnectWalletButton: FC<{ children?: ReactNode }> = memo(() => {
  const { connectStatus } = useLinkWalletStore()
  const web3Connected = useWeb3Connected()
  const { updateWalletModal } = useWalletStore()

  const connecting =
    connectStatus === LinkStatus.linkL1Pending ||
    connectStatus === LinkStatus.linkL2Pending ||
    connectStatus === LinkStatus.apiLoginPending
  return (
    <ConnectButtonWrap
      loading={connecting}
      disabled={connecting}
      onClick={() => {
        updateWalletModal(true)
      }}>
      {web3Connected ? `Connect zkLink's Layer2` : 'Connect Wallet'}
    </ConnectButtonWrap>
  )
})
