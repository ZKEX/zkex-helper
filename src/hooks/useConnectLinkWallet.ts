import { ConnectorNames } from '@/connectors'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import { useSelectedWalletStore } from 'store/app/wallet'
import {
  LinkStatus,
  connectLinkWallet,
  useLinkWalletStore,
} from 'store/link/wallet'

const useConnectLinkWallet = () => {
  const { selectedWallet } = useSelectedWalletStore()
  const { connectStatus } = useLinkWalletStore()
  const context = useWeb3React<Web3Provider>()
  const { provider } = context
  return useCallback(
    async (connectorName?: ConnectorNames) => {
      try {
        if (connectStatus === LinkStatus.linkL2Pending) {
          return
        }
        if (!provider) {
          return
        }
        if (connectorName || selectedWallet) {
          await connectLinkWallet(provider)
        }
      } catch (e) {
        console.log(e)
      }
    },
    [LinkStatus, selectedWallet, provider]
  )
}

export default useConnectLinkWallet
