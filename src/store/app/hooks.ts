import { L1ID, TokenID } from '@/types'
import { useWeb3React } from '@web3-react/core'
import { ChainInfo, ContractMap, SupportChain, Token } from 'api/routes/broker-balance'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { store } from 'store/index'
import { ModalState } from './types'

export function useModal(modal: keyof ModalState) {
  const modalState = useSelector<RootState, ModalState>((state) => state.app.modal)
  return modalState[modal]
}

export function useAddress() {
  const { account = '' } = useWeb3React()
  return account
}

export function useWeb3Connected() {
  const { isActive = false } = useWeb3React()
  return isActive
}

export function useTokens() {
  return useSelector<RootState, Record<TokenID, Token>>((state) => state.app.supportToken)
}

export function useSupportNetwork() {
  return useSelector<RootState, SupportChain[]>((state) => state.app.supportNetwork)
}

export function useContractAddress(type: 'faucet' | 'multicall', chainId: L1ID) {
  const contract = useSelector<RootState, ContractMap>((state) => state.app.contract)
  return contract[type][chainId] || ''
}

export function getChainInfo(chainId: L1ID) {
  const networkInfo = store.getState().app.networkInfo
  return networkInfo.find(item => item.chainId === chainId) || {} as ChainInfo
}

export function getContractAddress(chainId: L1ID, type: 'faucet' | 'multicall' = 'multicall') {
  const contract = store.getState().app.contract
  return contract[type][chainId] || ''
}