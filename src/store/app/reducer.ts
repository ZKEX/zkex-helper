import { createReducer } from '@reduxjs/toolkit'
import {
  getAppTokensAction,
  getContractsAddressAction,
  getFullNetworkAction,
  getSupportNetworkAction,
  updateModal
} from './actions'
import { AppState } from './types'

const initialState: AppState = {
  modal: {
    wallets: false,
    account: false
  },
  supportNetwork: [],
  networkInfo: [],
  supportToken: {},
  contract: {
    faucet: {},
    multicall: {}
  }
}

export default createReducer<AppState>(initialState, (builder) => {
  builder
    .addCase(updateModal, (state, { payload }) => {
      state.modal[payload.modal] = payload.open
    })
    .addCase(getSupportNetworkAction.fulfilled, (state, { payload }) => {
      state.supportNetwork = payload
    })
    .addCase(getFullNetworkAction.fulfilled, (state, { payload }) => {
      state.networkInfo = payload
    })
    .addCase(getContractsAddressAction.fulfilled, (state, { payload }) => {
      state.contract = payload
    })
    .addCase(getAppTokensAction.fulfilled, (state, { payload }) => {
      state.supportToken = payload
    })
})
