import type { Provider } from '@web3-react/types'

export declare type MetaMaskProvider = Provider & {
  isMetaMask?: boolean
  isConnected?: () => boolean
  providers?: MetaMaskProvider[]
}