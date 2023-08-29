import { L1ID } from '@/types'
import { providers } from 'ethers'
import { getChainInfo } from 'store/app/hooks'

const web3Providers: {
  [x: number]: providers.Web3Provider | providers.JsonRpcProvider
} = {}
export function getWeb3ProviderByLinkId(
  chainId: L1ID
): providers.Web3Provider | providers.JsonRpcProvider | undefined {
  if (web3Providers[chainId]) {
    return web3Providers[chainId]
  } else {
    const network = getChainInfo(chainId)
    if (network) {
      const provider = new providers.JsonRpcProvider(network.rpcUrl)
      web3Providers[chainId] = provider
      return provider
    }
    return undefined
  }
}
