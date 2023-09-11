import { Stack, styled } from '@mui/material'
import { ConnectWalletButton } from 'components/Buttons/ConnectWalletButton'
import { Nav } from 'components/Header'
import Iconfont from 'components/Iconfont'
import toastify from 'components/Toastify'
import copy from 'copy-to-clipboard'
import { hexlify } from 'ethers/lib/utils'
import { useCallback } from 'react'
import {
  useEthSignature,
  useLinkConnected,
  usePrivateKey,
  usePubKey,
  usePubKeyHash,
} from 'store/link/hooks'
import { FlexBetween, FlexCenter } from 'styles'

const IndexBody = styled(FlexCenter)`
  width: 100%;
  height: 100%;
`
const ContentWrap = styled(FlexCenter)`
  min-width: 200px;
  flex-direction: column;
`
const KeyWrap = styled(Stack)`
  flex-direction: row;
  align-items: center;
  margin: 8px 0 0;
  gap: 8px;
  width: 100%;
  .value {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    cursor: pointer;
    font-size: 14px;
    border-radius: 4px;
    &:hover {
      background-color: rgba(160, 238, 9, 0.2);
    }
  }
  .name {
    font-size: 14px;
    background: ${(props) => props.theme.color.DarkBg03LightBg01};
    border-radius: 4px;
    padding: 4px 8px;
  }
  .copy-icon {
    cursor: pointer;
  }
`

const CryptoInfo = () => {
  const privateKey = usePrivateKey()
  const pubKey = usePubKey()
  const pubKeyHash = usePubKeyHash()
  const copyAddress = useCallback((bytes?: Uint8Array) => {
    if (!bytes) {
      toastify.error('bytes is undefined')
    }
    copy(hexlify(bytes!))
    toastify.success('Copied')
  }, [])

  const ethSignature = useEthSignature()

  return (
    <>
      <KeyWrap onClick={() => copyAddress(pubKeyHash)}>
        <span className="name">PubKeyHash:</span>
        <div className="value">
          {pubKeyHash ? hexlify(pubKeyHash) : '-'}
          <Iconfont className="copy-icon" name="icon-copy1" size={16} />
        </div>
      </KeyWrap>
      <KeyWrap onClick={() => copyAddress(pubKey)}>
        <span className="name">PubKey:</span>
        <div className="value">
          {pubKey ? hexlify(pubKey) : '-'}
          <Iconfont className="copy-icon" name="icon-copy1" size={16} />
        </div>
      </KeyWrap>
      <KeyWrap onClick={() => copyAddress(privateKey)}>
        <span className="name">PrivateKey:</span>
        <div className="value">
          {privateKey ? hexlify(privateKey) : '-'}
          <Iconfont className="copy-icon" name="icon-copy1" size={16} />
        </div>
      </KeyWrap>
      <KeyWrap onClick={() => copyAddress(ethSignature)}>
        <span className="name">EthSignature:</span>
        <div className="value">
          {ethSignature ? hexlify(ethSignature) : '-'}
          <Iconfont className="copy-icon" name="icon-copy1" size={16} />
        </div>
      </KeyWrap>
    </>
  )
}

const IndexView = () => {
  const linkConnected = useLinkConnected()
  return (
    <>
      <Nav />
      <IndexBody>
        <ContentWrap>
          {linkConnected ? <CryptoInfo /> : <ConnectWalletButton />}
        </ContentWrap>
      </IndexBody>
    </>
  )
}

export default IndexView
