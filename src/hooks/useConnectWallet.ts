import { ConnectorNames, connectorsByName } from 'connectors'
import useConnectLinkWallet from 'hooks/useConnectLinkWallet'
import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { useAppDispatch } from 'store'
import { updateModal } from 'store/app/actions'
import { updateLinkStatus } from 'store/link/actions'
import { LinkStatus } from 'store/link/types'
import { updateConnectorName } from 'store/settings/actions'
import { useCurrentConnectorName } from 'store/settings/hooks'

const useConnectWallet = () => {
  const dispatch = useAppDispatch()
  const currentConnectorName = useCurrentConnectorName()
  const connectToLink = useConnectLinkWallet()
  return useCallback(
    async (connectorName: ConnectorNames) => {
      dispatch(updateLinkStatus(LinkStatus.linkL1Pending))
      try {
        await connectorsByName[connectorName || currentConnectorName].activate()
        dispatch(updateConnectorName({ connectorName }))

        dispatch(updateLinkStatus(LinkStatus.linkL1Success))
        dispatch(updateModal({ modal: 'wallets', open: false }))
        await connectToLink(currentConnectorName)

        return Promise.resolve()
      } catch (e) {
        dispatch(updateLinkStatus(LinkStatus.linkL1Failed))
        dispatch(updateConnectorName({ connectorName: undefined }))
        try {
          toast.error((e as any).message)
        } finally {
          // eslint-disable-next-line no-unsafe-finally
          return Promise.reject()
        }
      }
    },
    [currentConnectorName]
  )
}

export default useConnectWallet
