import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core'
import { Connector } from '@web3-react/types'
import { connectorNames, getConnection } from 'connectors'
import { ReactNode } from 'react'

export default function Web3Provider({ children }: { children: ReactNode }) {

  const connectors: [Connector, Web3ReactHooks][] = connectorNames.map(getConnection).map(item => [item.connector, item.hooks])


  return (
    <Web3ReactProvider connectors={connectors} >
      {children}
    </Web3ReactProvider>
  )
}
