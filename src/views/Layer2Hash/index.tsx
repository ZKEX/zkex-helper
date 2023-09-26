import { Stack, styled } from '@mui/material'
import Iconfont from 'components/Iconfont'
import copy from 'copy-to-clipboard'
import { arrayify, hexlify } from 'ethers/lib/utils'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLinkWalletStore } from 'store/link/wallet'
import { Wrapper } from 'views/styles'

const KeyWrap = styled(Stack)`
  flex-direction: row;
  margin: 16px 0 0;
  gap: 8px;
  width: 100%;

  .copy-icon {
    cursor: pointer;
  }
`
const Label = styled('div')`
  width: 100px;
  flex-shrink: 0;
  font-size: 14px;
  span {
    display: inline-block;
    background: ${(props) => props.theme.color.DarkBg03LightBg01};
    padding: 4px 8px;
    border-radius: 4px;
  }
`
const Value = styled('div')`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px;
  word-break: break-all;

  &:hover {
    background-color: rgba(160, 238, 9, 0.2);
  }
`

export const Layer2HashView = () => {
  const { wallet } = useLinkWalletStore()
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
    <Wrapper sx={{ p: '240px 0' }} maxWidth="md">
      <KeyWrap onClick={() => copyAddress(pubKeyHash)}>
        <Label>
          <span>PubKeyHash</span>
        </Label>
        <Value>
          {pubKeyHash ? hexlify(pubKeyHash) : '-'}
          <Iconfont className="copy-icon" name="icon-copy1" size={16} />
        </Value>
      </KeyWrap>
      <KeyWrap onClick={() => copyAddress(pubKey)}>
        <Label>
          <span>PubKey</span>
        </Label>
        <Value>
          {pubKey ? hexlify(pubKey) : '-'}
          <Iconfont className="copy-icon" name="icon-copy1" size={16} />
        </Value>
      </KeyWrap>
      <KeyWrap onClick={() => copyAddress(privateKey)}>
        <Label>
          <span>PrivateKey</span>
        </Label>
        <Value>
          {privateKey ? hexlify(privateKey) : '-'}
          <Iconfont className="copy-icon" name="icon-copy1" size={16} />
        </Value>
      </KeyWrap>
      <KeyWrap onClick={() => copyAddress(ethSignature)}>
        <Label>
          <span>EthSignature</span>
        </Label>
        <Value>
          {ethSignature ? hexlify(ethSignature) : '-'}
          <Iconfont className="copy-icon" name="icon-copy1" size={16} />
        </Value>
      </KeyWrap>
    </Wrapper>
  )
}
