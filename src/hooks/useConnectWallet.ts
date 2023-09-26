import { ConnectorNames, connectorsByName } from 'connectors'
import useConnectLinkWallet from 'hooks/useConnectLinkWallet'
import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { useSelectedWalletStore } from 'store/app/wallet'
import { LinkStatus, useLinkWalletStore } from 'store/link/wallet'

const useConnectWallet = () => {
  const connectToLink = useConnectLinkWallet()
  const { selectedWallet, updateSelectedWallet } = useSelectedWalletStore()
  const { updateLinkStatus } = useLinkWalletStore()
  return useCallback(
    async (connectorName: ConnectorNames) => {
      updateLinkStatus(LinkStatus.linkL1Pending)
      try {
        await connectorsByName[connectorName || selectedWallet].activate()
        updateSelectedWallet(connectorName)

        updateLinkStatus(LinkStatus.linkL1Success)
        await connectToLink(connectorName)

        return Promise.resolve()
      } catch (e) {
        updateLinkStatus(LinkStatus.linkL1Failed)
        updateSelectedWallet(null)
        try {
          toast.error((e as any).message)
        } finally {
          // eslint-disable-next-line no-unsafe-finally
          return Promise.reject()
        }
      }
    },
    [selectedWallet]
  )
}

export default useConnectWallet
