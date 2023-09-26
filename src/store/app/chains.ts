import {
  NetworkItem,
  SupportChain,
  getChains,
  getNetwork,
} from 'api/routes/broker-balance'
import { create } from 'zustand'

export const StarkNetChainId = '0x534e5f474f45524c49'

export type ChainInfo = SupportChain & NetworkItem
export const useSupportChainsStore = create<{
  supportChains: ChainInfo[]
  fetch: () => void
}>((set) => ({
  supportChains: [],
  fetch: async () => {
    const r = await getChains()
    const { result = [] } = r

    // Remove StarkNet
    let chains: ChainInfo[] = result.filter(
      (v) => String(v.layerOneChainId) !== StarkNetChainId
    ) as ChainInfo[]

    // Convert chainId from hex to number
    chains = chains.map((v) => ({
      ...v,
      layerOneChainId: Number(v.layerOneChainId),
    }))

    for (let i in chains) {
      chains[i].layerTwoChainId = chains[i].chainId
    }
    try {
      const networks = await getNetwork().catch((e) => {
        throw new Error('getStaticNetworksProfile fail: ' + e?.message)
      })

      if (networks?.length) {
        chains = chains.map((d) => {
          const net = networks.find(
            (n) => Number(n.chainId) === d.layerOneChainId
          )
          const additional = {
            name: net?.name,
            symbol: net?.symbol,
            explorerUrl: net?.explorerUrl,
            iconUrl: import.meta.env.VITE_STATIC_HOST + net?.iconUrl,
            rpcUrl: net?.rpcUrl,
            decimals: net?.decimals,
          }

          return {
            ...d,
            ...additional,
          } as ChainInfo
        })
      } else {
        throw new Error('getStaticNetworksProfile fail: networks undefined')
      }
    } catch (e) {}
    set(() => ({ supportChains: chains }))
  },
}))
