import { Stack, styled } from '@mui/material'
import { ConnectWalletButton } from 'components/Buttons/ConnectWalletButton'
import { Nav } from 'components/Header'
import Iconfont from 'components/Iconfont'
import copy from 'copy-to-clipboard'
import { arrayify, hexlify } from 'ethers/lib/utils'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLinkConnected, useLinkWallet } from 'store/link/hooks'
import { FlexCenter } from 'styles'

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
  const wallet = useLinkWallet()
  const [pubKey, setPubKey] = useState<Uint8Array>()
  const [pubKeyHash, setPubKeyHash] = useState<Uint8Array>()
  const [privateKey, setPrivateKey] = useState<Uint8Array>()
  const [ethSignature, setEthSignature] = useState<Uint8Array>()

  useEffect(() => {
    if (!wallet) {
      return
    }
    wallet?.signer?.pubKey().then((r) => {
      setPubKey(arrayify(r))
    })
    wallet?.signer?.pubKeyHash().then((r) => {
      setPubKeyHash(arrayify(r))
    })
    setPrivateKey(wallet?.signer?.getPrivateKey())

    setEthSignature(wallet?.signer?.seed)
  }, [wallet])

  const copyAddress = useCallback((bytes?: Uint8Array) => {
    if (!bytes) {
      toast.error('bytes is undefined')
    }
    copy(hexlify(bytes!))
    toast.success('Copied')
  }, [])

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

export const Layer2HashView = () => {
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
