import { ConnectorNames } from '@/connectors'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import { connectLinkWallet, useLinkStatus } from 'store/link/hooks'
import { LinkStatus } from 'store/link/types'
import { useCurrentConnectorName } from 'store/settings/hooks'

const useConnectLinkWallet = () => {
  const currentConnectorName = useCurrentConnectorName()
  const linkStatus = useLinkStatus()
  const context = useWeb3React<Web3Provider>()
  const { provider } = context
  return useCallback(
    async (connectorName?: ConnectorNames) => {
      try {
        if (linkStatus === LinkStatus.linkL2Pending) {
          return
        }
        if (!provider) {
          return
        }
        if (connectorName || currentConnectorName) {
          await connectLinkWallet(provider)
        }
      } catch (e) {
        console.log(e)
      }
    },
    [LinkStatus, currentConnectorName, provider]
  )
}

export default useConnectLinkWallet
