import { useWeb3React } from '@web3-react/core'
import { useEffect } from 'react'
import { useLinkWalletStore } from './wallet'

const Updater = () => {
  const { account, isActive } = useWeb3React()
  const { address, disconnect } = useLinkWalletStore()

  useEffect(() => {
    if (address && account) {
      if (address.toLowerCase() !== account.toLowerCase()) {
        disconnect()
      }
    }
  }, [account, address, isActive, disconnect])

  useEffect(() => {
    if (!isActive) {
      disconnect()
    }
  }, [isActive, disconnect])

  return null
}

export default Updater
