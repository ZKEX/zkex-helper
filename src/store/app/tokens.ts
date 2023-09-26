import { TokenID } from '@/types'
import { Token, getAppTokens } from 'api/routes/broker-balance'
import { create } from 'zustand'

export const useSupportTokensStore = create<{
  supportTokens: Record<TokenID, Token>
  fetch: () => void
}>((set) => ({
  supportTokens: [],
  fetch: async () => {
    const r = await getAppTokens()
    const { result = {} } = r

    set(() => ({ supportTokens: result }))
  },
}))
