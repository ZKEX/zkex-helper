import { repeater } from 'api/routes/repeater'
import { sha256 } from 'ethers/lib/utils'
import toast from 'react-hot-toast'
import { Signature, Wallet, serializeTx } from 'zklink-js-sdk'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface SendTransactionBody {
  id: number
  jsonrpc: '2.0'
  method: 'sendTransaction'
  params: [any, any, Signature]
}
export interface TransactionRecord {
  hash: string
  createdAt: number
}
export const useTransactionSenderStore = create(
  persist<{
    pending: boolean
    transactions: TransactionRecord[]
    sendTransaction: (body: string, wallet: Wallet) => void
    clearTransactions: () => void
  }>(
    (set, get) => ({
      pending: false,
      transactions: [],
      sendTransaction: async (body, wallet) => {
        try {
          const { pending } = get()
          if (pending) return
          set(() => ({ pending: true }))
          const jsonBody: SendTransactionBody = JSON.parse(body)
          const bytes = serializeTx(jsonBody.params[0])
          const txHash = sha256(bytes)
          const zksign = await wallet?.signer?.signTransactionBytes(txHash)
          if (!zksign) {
            toast.error('Sign transaction fail')
            return
          }
          jsonBody.params[2] = zksign

          const r = await repeater(jsonBody).catch((e) => {
            throw new Error(e?.message)
          })
          if (r.result) {
            toast.success('Sent Successful')
            set((state) => ({
              transactions: [
                ...state.transactions,
                {
                  hash: r.result,
                  createdAt: new Date().getTime(),
                },
              ],
            }))
          }
        } catch (e: any) {
          toast.error(e?.message)
        } finally {
          set(() => ({ pending: false }))
        }
      },
      clearTransactions: () => {
        set(() => ({ transactions: [] }))
      },
    }),
    {
      name: 'zkex_helper_transaction',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ ...state, transactions: state.transactions }),
    }
  )
)
