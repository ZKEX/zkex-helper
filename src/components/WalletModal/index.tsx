import { MetaMaskProvider } from '@/types'
import { Stack, styled } from '@mui/material'
import { ReactComponent as SvgCoinbaseWallet } from 'assets/home/coinbaseWallet.svg'
import metamaskUrl from 'assets/home/metamask.png'
import { ReactComponent as SvgWalletConnect } from 'assets/home/walletConnect.svg'
import Iconfont from 'components/Iconfont'
import Loading from 'components/Loading'
import ModalLink from 'components/ModalLink'
import { ConnectorNames } from 'connectors'
import useConnectWallet from 'hooks/useConnectWallet'
import { FC, memo, useCallback, useEffect, useState } from 'react'
import { useSelectedWalletStore, useWalletStore } from 'store/app/wallet'
import { LinkStatus, useLinkWalletStore } from 'store/link/wallet'
import { ContentWrap, Flex, FlexCenter, FlexItem } from 'styles/index'

const WalletItem = styled(Flex)`
  width: 360px;
  height: 60px;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  align-items: center;
  padding: 0 20px;
  background: ${(props) => props.theme.color.BgColor03};
  color: ${(props) => props.theme.color.TextColor80};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  border: 1px solid transparent;
  transition: border 0.1s ease;
  cursor: pointer;

  &:hover {
    border-color: ${(props) => props.theme.color.PrimaryColor30};
  }
  ${(props) => props.theme.breakpoints.down('md')} {
    width: 100%;
  }
`
const Icon = styled(FlexCenter)`
  width: 32px;
  height: 32px;
  background: ${(props) => props.theme.color.TextColor00};
  border-radius: 50%;
  margin-left: 8px;
`
const Dot = styled('span')`
  display: inline-block;
  width: 6px;
  height: 6px;
  background: ${(props) => props.theme.color.NotificationsGreen02};
  border-radius: 50%;
`
const ErrorMessage = styled('div')`
  font-size: 12px;
  line-height: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.color.TextColor60};
  padding: 16px 0 40px;
`

export const ChooseWallet: FC<{
  onSelect(connectorName: ConnectorNames): void
}> = memo(({ onSelect }) => {
  const connectWeb3 = useConnectWallet()
  const { selectedWallet } = useSelectedWalletStore()
  const { connected } = useLinkWalletStore()
  const hasEtherenum = !!window.ethereum
  const { updateWalletModal } = useWalletStore()
  // If ethereum is exist but not metamask
  const showDetected =
    window.ethereum &&
    (window.ethereum as MetaMaskProvider)?.isMetaMask === false

  let timer: any
  useEffect(() => {
    if (selectedWallet && connectWeb3) {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        connectWeb3(selectedWallet)
        timer = undefined
      }, 250)
      updateWalletModal(false)
    }
  }, [selectedWallet, connectWeb3])
  return (
    <Stack spacing={2}>
      {hasEtherenum ? (
        <WalletItem
          onClick={() => {
            connectWeb3(ConnectorNames.MetaMask)
            onSelect(ConnectorNames.MetaMask)
          }}>
          <FlexItem>
            {showDetected ? 'Detected Wallet' : ConnectorNames.MetaMask}
          </FlexItem>
          {connected && selectedWallet === ConnectorNames.MetaMask ? (
            <Dot />
          ) : null}
          <Icon>
            {showDetected ? (
              <span
                className="iconfont icon-wallet"
                style={{ fontSize: '24px' }}></span>
            ) : (
              <img width="20" src={metamaskUrl} />
            )}
          </Icon>
        </WalletItem>
      ) : null}
      <WalletItem
        onClick={() => {
          connectWeb3(ConnectorNames.Coinbase)
          onSelect(ConnectorNames.Coinbase)
        }}>
        <FlexItem>Coinbase Wallet</FlexItem>
        {connected && selectedWallet === ConnectorNames.Coinbase ? (
          <Dot />
        ) : null}
        <Icon>
          <SvgCoinbaseWallet />
        </Icon>
      </WalletItem>
      <WalletItem
        onClick={() => {
          connectWeb3(ConnectorNames.WalletConnect)
          onSelect(ConnectorNames.WalletConnect)
        }}>
        <FlexItem>{ConnectorNames.WalletConnect}</FlexItem>
        {connected && selectedWallet === ConnectorNames.WalletConnect ? (
          <Dot />
        ) : null}
        <Icon>
          <SvgWalletConnect />
        </Icon>
      </WalletItem>
    </Stack>
  )
})

const ButtonBack = styled(FlexCenter)`
  display: inline-flex;
  width: 185px;
  height: 34px;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  background: ${(props) => props.theme.color.DarkBg03LightBg02};
  color: ${(props) => props.theme.color.TextColor80};
  border: 1px solid ${(props) => props.theme.color.TextColor10};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  cursor: pointer;
`
const ButtonTryAgain = styled(FlexCenter)`
  display: inline-flex;
  width: 107px;
  height: 34px;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: ${(props) => props.theme.color.DarkText00LightText90};
  background: ${(props) => props.theme.color.PrimaryColor20};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  cursor: pointer;
`

export const Failed: FC<{
  selected: ConnectorNames | undefined
}> = memo(({ selected }) => {
  const connectWeb3 = useConnectWallet()
  const { updateLinkStatus } = useLinkWalletStore()
  const cleanErrorMessage = useCallback(() => {
    updateLinkStatus(LinkStatus.init)
  }, [])

  return (
    <>
      <ErrorMessage>
        The connection attempt failed. Please click try again and follow the
        steps to connect in your wallet.
      </ErrorMessage>
      <Stack direction={'row'} spacing={1} justifyContent="flex-end">
        <ButtonBack
          onClick={() => {
            cleanErrorMessage()
          }}>
          Back to wallet selection
        </ButtonBack>
        <ButtonTryAgain
          onClick={() => {
            connectWeb3(selected as ConnectorNames)
          }}>
          <Iconfont name="icon-refresh" size={20} />
          Try again
        </ButtonTryAgain>
      </Stack>
    </>
  )
})

export const Connecting = memo(() => {
  return (
    <FlexCenter style={{ minHeight: '136px' }}>
      <Loading />
    </FlexCenter>
  )
})

export const WalletModal = memo(() => {
  const { modal, updateWalletModal } = useWalletStore()
  const [selected, setSelected] = useState<ConnectorNames | undefined>()
  const { connectStatus } = useLinkWalletStore()
  const connecting = connectStatus === LinkStatus.linkL1Pending
  const connectFail = connectStatus === LinkStatus.linkL1Failed
  const header = connecting
    ? `Connecting`
    : connectFail
    ? `Error Connecting`
    : `Connect a wallet`
  return (
    <ModalLink
      width="400px"
      isIn={modal}
      header={header}
      onClose={() => {
        updateWalletModal(false)
      }}>
      <ContentWrap>
        {connecting ? (
          <Connecting />
        ) : connectFail ? (
          <Failed selected={selected} />
        ) : (
          <ChooseWallet onSelect={setSelected} />
        )}
      </ContentWrap>
    </ModalLink>
  )
})
