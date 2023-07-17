import { styled } from '@mui/material'
import { ConnectWalletButton } from 'components/Buttons/ConnectWalletButton'
import { Nav } from 'components/Header'
import Iconfont from 'components/Iconfont'
import toastify from 'components/Toastify'
import copy from 'copy-to-clipboard'
import { ethers } from 'ethers'
import { useCallback } from 'react'
import { usePrivateKey } from 'store/link/hooks'
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
  .value{
    margin: 0 8px;
    flex: 1;
  }
  .label{
    margin: 0 4px;
    font-size: 12px;
    background: ${props => props.theme.color.DarkBg03LightBg01};
    border-radius: 4px;
    padding: 2px 8px;
  }
  .copy-icon{
    cursor: pointer;
  }
`

const IndexView = () => {

  const privateKey = usePrivateKey()
  const copyAddress = useCallback((type: string) => {
    if (privateKey) {
      let str: string
      if (type === '16') {
        str = ethers.utils.hexlify(privateKey)
      } else {
        str = ethers.utils.base64.encode(privateKey)
      }
      copy(str)
      toastify.success('Copied')
    }
  }, [privateKey])
  return (
    <>
      <Nav />
      <IndexBody>
        <ContentWrap>
          {
            privateKey ? (
              <>
                <KeyWrap onClick={() => copyAddress('16')}>
                  <span className='name'>PrivateKey<i className="label">Hex</i>:</span><span className='value'>{ethers.utils.hexlify(privateKey)}</span> <Iconfont className='copy-icon' name="icon-copy1" size={16} />
                </KeyWrap>
                <KeyWrap onClick={() => copyAddress('64')}>
                  <span className='name'>PrivateKey<i className="label">Base64</i>:</span><span className='value'>{ethers.utils.base64.encode(privateKey)}</span> <Iconfont className='copy-icon' name="icon-copy1" size={16} />
                </KeyWrap>
              </>
            ) : (
              <ConnectWalletButton />
            )
          }
        </ContentWrap>
      </IndexBody>
    </>
  )
}

export default IndexView