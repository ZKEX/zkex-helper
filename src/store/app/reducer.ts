import { createReducer } from '@reduxjs/toolkit'
import {
  updateModal
} from './actions'
import { AppState } from './types'

const initialState: AppState = {
  modal: {
    wallets: false,
    account: false
  },
}

export default createReducer<AppState>(initialState, (builder) => {
  builder
    .addCase(updateModal, (state, { payload }) => {
      state.modal[payload.modal] = payload.open
    })
})
