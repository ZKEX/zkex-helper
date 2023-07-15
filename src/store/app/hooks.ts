import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
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