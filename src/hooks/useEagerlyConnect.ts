import { Connector } from '@web3-react/types'
import { connectorsByName } from 'connectors'
import { useEffect } from 'react'
import { useSelectedWalletStore } from 'store/app/wallet'

async function connect(connector: Connector) {
  try {
    if (connector.connectEagerly) {
      await connector.connectEagerly()
    } else {
      await connector.activate()
    }
  } catch (error) {
    console.debug(`web3-react eager connection error: ${error}`)
  }
}

export default function useEagerlyConnect() {
  const { selectedWallet } = useSelectedWalletStore()
  // Try to reconnect the previous connection
  useEffect(() => {
    // connect(gnosisSafeConnection.connector)
    if (selectedWallet) {
      const connector = connectorsByName[selectedWallet]
      if (!connector) return
      connect(connector)
    }
  }, [])
}
