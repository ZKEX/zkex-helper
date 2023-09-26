import { Button, styled } from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import Iconfont from 'components/Iconfont'
import { memo } from 'react'
import { useAddress, useWalletStore, useWeb3Connected } from 'store/app/wallet'
import { useLinkWalletStore } from 'store/link/wallet'
import { encryptionAddress } from 'utils/address'

export const ConnectButtonWrap = styled(Button)`
  height: 36px;
  font-weight: 400;
  gap: 4px;
  background: ${(props) => props.theme.color.DarkLightText80LightBgGrey};
  border: 1px solid rgba(0, 0, 0, 0);
  color: ${(props) => props.theme.color.TextColor90};
  line-height: 24px;
  white-space: nowrap;

  &:hover {
    border: 1px solid rgba(142, 205, 30, 1);
    color: ${(props) => props.theme.color.PrimaryColor30};
    background: ${(props) => props.theme.color.BgColor02};
  }
`

export const ConnectButton = memo(() => {
  const { connected } = useLinkWalletStore()
  const address = useAddress()
  const web3Connected = useWeb3Connected()
  const { ENSName } = useWeb3React()
  const { updateWalletModal } = useWalletStore()

  const onClickConnectButton = () => {
    if (!web3Connected) {
      updateWalletModal(true)
    }
  }

  const renderConnectButton = () => {
    if (!web3Connected) {
      return 'Connect Wallet'
    }
    if (!connected) {
      return (
        <>
          <Iconfont name="icon-Warning1" size={20}></Iconfont>
          {ENSName ?? encryptionAddress(address)}
        </>
      )
    }
    return ENSName ?? encryptionAddress(address)
  }

  return (
    <ConnectButtonWrap onClick={onClickConnectButton}>
      {renderConnectButton()}
    </ConnectButtonWrap>
  )
})
