import { createReducer } from '@reduxjs/toolkit'
import { MuiThemeType } from 'styles/Themes'
import {
  updateConnectorName,
  updateTheme,
} from './actions'
import { SettingState } from './types'

const initialState: SettingState = {
  theme: MuiThemeType.dark,
  connectorName: undefined,
}

export default createReducer<SettingState>(initialState, (builder) => {
  builder
    .addCase(updateTheme, (state, { payload }) => {
      state.theme = payload
    })
    .addCase(updateConnectorName, (state, { payload }) => {
      state.connectorName = payload.connectorName
    })
})
