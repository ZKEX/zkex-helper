import { getContractsAddress } from 'api/routes/broker-balance'
import { create } from 'zustand'

export const useContractsStore = create<{
  contracts: {
    multicall: Record<string, string>
  }
  fetch: () => void
}>((set) => ({
  contracts: {
    multicall: {},
  },
  fetch: async () => {
    const r = await getContractsAddress()
    set(() => ({ contracts: r }))
  },
}))

export function useMulticallContracts() {
  const { contracts } = useContractsStore()

  return contracts.multicall
}
