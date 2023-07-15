import { styled } from '@mui/material'
import { ConnectWalletButton } from 'components/Buttons/ConnectWalletButton'
import { Nav } from 'components/Header'
import Iconfont from 'components/Iconfont'
import toastify from 'components/Toastify'
import copy from 'copy-to-clipboard'
import { useCallback } from 'react'
import { usePrivateKey } from 'store/link/hooks'
import { FlexCenter } from 'styles'

const IndexBody = styled(FlexCenter)`
  width: 100%;
  height: 100%;
`
const ContentWrap = styled(FlexCenter)`
  min-width: 200px;
  flex-direction: column;
`
const KeyWrap = styled(FlexCenter)`
  margin: 8px 0 0;
  span{
    margin: 0 8px;
  }
  .copy-icon{
    cursor: pointer;
  }
`

const IndexView = () => {

  const privateKey = usePrivateKey()
  const copyAddress = useCallback(() => {
    if (privateKey) {
      copy(privateKey)
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
              <KeyWrap onClick={copyAddress}>
                PrivateKey: <span>{privateKey}</span> <Iconfont className='copy-icon' name="icon-copy1" size={16} />
              </KeyWrap>
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