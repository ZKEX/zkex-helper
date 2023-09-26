import { useWeb3React } from '@web3-react/core'
import { ConnectorNames } from 'connectors/index'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export function useAddress() {
  const { account = '' } = useWeb3React()
  return account
}

export function useWeb3Connected() {
  const { isActive = false } = useWeb3React()
  return isActive
}

export const useWalletStore = create<{
  modal: boolean
  updateWalletModal: (visible: boolean) => void
}>((set) => ({
  modal: false,
  updateWalletModal: (visible) => {
    set(() => ({ modal: visible }))
  },
}))

export const useSelectedWalletStore = create(
  persist<{
    selectedWallet: ConnectorNames | null
    updateSelectedWallet: (walletName: ConnectorNames | null) => void
  }>(
    (set) => ({
      selectedWallet: null,
      updateSelectedWallet: (walletName) => {
        set(() => ({ selectedWallet: walletName }))
      },
    }),
    {
      name: 'zkex_selected_wallet',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
