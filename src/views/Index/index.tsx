import { styled } from '@mui/material'
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
const KeyWrap = styled(FlexBetween)`
  margin: 8px 0 0;
  width: 100%;
  .value {
    margin: 0 8px;
    flex: 1;
  }
  .label {
    margin: 0 4px;
    font-size: 12px;
    background: ${(props) => props.theme.color.DarkBg03LightBg01};
    border-radius: 4px;
    padding: 2px 8px;
  }
  .copy-icon {
    cursor: pointer;
  }
`

const CryptoInfo = () => {
  const privateKey = usePrivateKey()
  const copyAddress = useCallback(
    (bytes?: Uint8Array) => {
      if (!bytes) {
        toastify.error('bytes is undefined')
      }
      copy(hexlify(bytes!))
      toastify.success('Copied')
    },
    [privateKey]
  )

  const ethSignature = useEthSignature()

  return (
    <>
      <KeyWrap onClick={() => copyAddress(privateKey)}>
        <span className="name">PrivateKey:</span>
        <span className="value">
          {privateKey ? hexlify(privateKey) : '-'}
        </span>{' '}
        <Iconfont className="copy-icon" name="icon-copy1" size={16} />
      </KeyWrap>
      <KeyWrap onClick={() => copyAddress(ethSignature)}>
        <span className="name">EthSignature:</span>
        <span className="value">
          {ethSignature ? hexlify(ethSignature) : '-'}
        </span>{' '}
        <Iconfont className="copy-icon" name="icon-copy1" size={16} />
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
