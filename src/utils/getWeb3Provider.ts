import { L1ID } from '@/types'
import { providers } from 'ethers'

const web3Providers: {
  [x: number]: providers.JsonRpcProvider
} = {}
export function createWeb3Provider(
  chainId: L1ID,
  rpc: string
): providers.JsonRpcProvider {
  if (web3Providers[chainId]) {
    return web3Providers[chainId]
  } else {
    const provider = new providers.JsonRpcProvider(rpc)
    web3Providers[chainId] = provider
    return provider
  }
}
