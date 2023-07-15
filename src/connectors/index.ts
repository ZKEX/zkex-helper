import { CoinbaseWallet } from '@web3-react/coinbase-wallet'
import { Web3ReactHooks, initializeConnector } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { Actions, Connector } from '@web3-react/types'
import { WalletConnect } from '@web3-react/walletconnect'
import { chainlist } from 'config/chains'

export enum ConnectorNames {
  MetaMask = 'MetaMask',
  Coinbase = 'Coinbase',
  WalletConnect = 'WalletConnect',
}

export const connectorNames: ConnectorNames[] = [
  ConnectorNames.MetaMask,
  ConnectorNames.Coinbase,
  ConnectorNames.WalletConnect,
]

export interface Connection {
  connector: Connector
  hooks: Web3ReactHooks
  name: ConnectorNames
}

function onError(error: Error) {
  console.debug(`web3-react error:`, error)
}

const [web3MetaMask, web3MetaMaskHooks] = initializeConnector<MetaMask>(
  (actions: Actions): MetaMask => new MetaMask({ actions, onError })
)
export const metamaskConnection: Connection = {
  connector: web3MetaMask,
  hooks: web3MetaMaskHooks,
  name: ConnectorNames.MetaMask,
}

const [web3Coinbase, web3CoinbaseHooks] = initializeConnector<CoinbaseWallet>(
  (actions: Actions) =>
    new CoinbaseWallet({
      actions,
      options: {
        url:
          // Use coinbase cache first
          localStorage.getItem('-walletlink:https://www.walletlink.org:DefaultJsonRpcUrl') as string ??
          (chainlist as any)[Object.keys(chainlist)[0]] ??
          '',
        appName: 'ZKEX',
        reloadOnDisconnect: false,
      },
      onError,
    })
)
export const coinbaseConnection: Connection = {
  connector: web3Coinbase,
  hooks: web3CoinbaseHooks,
  name: ConnectorNames.Coinbase,
}

const [web3WalletConnect, web3WalletConnectHooks] = initializeConnector<WalletConnect>(
  (actions) =>
    new WalletConnect({
      actions,
      options: {
        rpc: chainlist,
        qrcode: true,
      },
      onError,
    })
)
export const walletConnectConnection: Connection = {
  connector: web3WalletConnect,
  hooks: web3WalletConnectHooks,
  name: ConnectorNames.WalletConnect,
}

export function getConnection(connectorName: ConnectorNames) {
  switch (connectorName) {
    case ConnectorNames.MetaMask:
      return metamaskConnection
    case ConnectorNames.Coinbase:
      return coinbaseConnection
    case ConnectorNames.WalletConnect:
      return walletConnectConnection
  }
}

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.MetaMask]: web3MetaMask,
  [ConnectorNames.Coinbase]: web3Coinbase,
  [ConnectorNames.WalletConnect]: web3WalletConnect,
}
