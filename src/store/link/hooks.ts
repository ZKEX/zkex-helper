import { Web3Provider } from '@ethersproject/providers'
import { useSelector } from 'react-redux'
import { RootState, store } from 'store'
import {
  updateLinkStatus,
  updateLinkWallet,
  updateUserPrivateKey,
  updateUserPubKey,
  updateUserPubKeyHash,
} from 'store/link/actions'
import { Wallet } from 'zklink-js-sdk'
import { LinkStatus } from './types'
import { arrayify } from 'ethers/lib/utils'

export function useLinkWallet() {
  return useSelector<RootState, Wallet | undefined>(
    (state) => state.link.wallet
  )
}

export function useLinkConnected() {
  return useSelector<RootState, boolean>((state) => state.link.connected)
}

export function useViewInExplorerLink() {
  return useSelector<RootState, string>(
    (state) => state.link.viewInExplorerLink
  )
}

export function useLinkStatus() {
  return useSelector<RootState, LinkStatus>((state) => state.link.linkStatus)
}

export function usePrivateKey() {
  return useSelector<RootState, Uint8Array | undefined>(
    (state) => state.link.privateKey
  )
}
export function usePubKey() {
  return useSelector<RootState, Uint8Array | undefined>(
    (state) => state.link.pubKey
  )
}
export function usePubKeyHash() {
  return useSelector<RootState, Uint8Array | undefined>(
    (state) => state.link.pubKeyHash
  )
}

export function useEthSignature() {
  return useSelector<RootState, Uint8Array | undefined>(
    (state) => state.link.ethSignature
  )
}

export async function connectLinkWallet(provider: Web3Provider) {
  const { dispatch, getState } = store
  const state = getState()
  const { link } = state
  const { wallet } = link
  try {
    dispatch(updateLinkStatus(LinkStatus.linkL2Pending))
    if (!provider) {
      throw new Error('Web3Provider not found')
    }
    const web3Signer = provider.getSigner()
    const address: string = await web3Signer.getAddress()
    if (!address) {
      throw new Error('wallet address not found')
    }
    let newWallet: Wallet
    if (wallet?.address() === (await web3Signer.getAddress())) {
      newWallet = await Wallet.fromEthSigner(
        web3Signer,
        wallet.signer,
        undefined,
        wallet.ethSignerType
      )
    } else {
      newWallet = await Wallet.fromEthSigner(web3Signer)
    }
    try {
      if (newWallet?.signer?.getPrivateKey) {
        // ethers.utils.base64.encode()
        dispatch(updateUserPrivateKey(newWallet.signer.getPrivateKey()))
        dispatch(updateUserPubKey(arrayify(await newWallet.signer.pubKey())))
        dispatch(
          updateUserPubKeyHash(arrayify(await newWallet.signer.pubKeyHash()))
        )
      }
    } catch (e) {
      console.log(e)
    }
    dispatch(updateLinkWallet({ wallet: newWallet }))
    dispatch(updateLinkStatus(LinkStatus.linkL2Success))
  } catch (e) {
    dispatch(updateLinkStatus(LinkStatus.linkL2Failed))
  }
}
