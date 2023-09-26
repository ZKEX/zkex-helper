import { useWalletStore } from 'store/app/wallet'
import { Wallet } from 'zklink-js-sdk'
import { create } from 'zustand'

export enum LinkStatus {
  init,
  linkL1Pending,
  linkL1Success,
  linkL1Failed,
  linkL2Pending,
  linkL2Success,
  linkL2Failed,
  apiLoginPending,
  apiLoginSuccess,
  apiLoginFailed,
}

export const useLinkWalletStore = create<{
  connected: boolean
  connectStatus: LinkStatus
  address: string
  wallet?: Wallet
  updateWallet: (wallet?: Wallet) => void
  updateLinkStatus: (status: LinkStatus) => void
  disconnect: () => void
}>((set) => ({
  connected: false,
  connectStatus: LinkStatus.init,
  address: '',
  wallet: undefined,
  updateWallet: (wallet) => {
    set(() => ({ wallet, connected: true, address: wallet?.address() }))
  },
  updateLinkStatus: (status) => {
    set(() => ({ connectStatus: status }))
  },
  disconnect: () => {
    set(() => ({ wallet: undefined, connected: false }))
  },
}))

export async function connectLinkWallet(provider: any) {
  const { updateWalletModal } = useWalletStore.getState()
  const { wallet, updateWallet, updateLinkStatus } =
    useLinkWalletStore.getState()
  try {
    updateLinkStatus(LinkStatus.linkL2Pending)
    if (!provider) {
      throw new Error('Web3Provider not found')
    }
    const web3Signer = provider?.getSigner ? provider.getSigner() : provider
    const address: string = await web3Signer.getAddress()
    if (!address) {
      throw new Error('wallet address not found')
    }
    let newWallet: Wallet
    // change network
    if (wallet && wallet?.address() === (await web3Signer.getAddress())) {
      newWallet = await Wallet.fromEthSigner(
        web3Signer,
        wallet.signer,
        undefined,
        wallet.ethSignerType
      )
    } else {
      newWallet = await Wallet.fromEthSigner(web3Signer)
    }
    updateWallet(newWallet)
    updateLinkStatus(LinkStatus.linkL2Success)
    updateWalletModal(false)
  } catch (e) {
    console.error(e)
    updateLinkStatus(LinkStatus.linkL2Failed)
  }
}
