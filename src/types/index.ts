import type { Provider } from '@web3-react/types'

export declare type MetaMaskProvider = Provider & {
  isMetaMask?: boolean
  isConnected?: () => boolean
  providers?: MetaMaskProvider[]
}

export type L1ID = number
export type L2ID = number
export type TokenID = number
export type Address = string