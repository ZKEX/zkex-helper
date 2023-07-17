import { createReducer } from '@reduxjs/toolkit'
import {
  disconnectLink,
  updateConnected,
  updateLinkStatus,
  updateLinkWallet,
  updateUserPrivateKey
} from 'store/link/actions'
import { LinkState, LinkStatus } from 'store/link/types'


const initialState: LinkState = {
  connected: false,
  wallet: undefined,
  viewInExplorerLink: '',
  linkStatus: LinkStatus.init,
  privateKey: undefined
}

export default createReducer<LinkState>(initialState, (builder) => {
  builder
    .addCase(updateConnected, (state, { payload }) => {
      state.connected = payload.connected
    })
    .addCase(updateLinkWallet, (state, { payload }) => {
      state.wallet = payload.wallet
      state.connected = true
    })
    .addCase(disconnectLink, (state) => {
      state.wallet = undefined
      state.connected = false
    })
    .addCase(updateLinkStatus, (state, { payload }) => {
      state.linkStatus = payload
    })
    .addCase(updateUserPrivateKey, (state, { payload }) => {
      state.privateKey = payload
    })
})
