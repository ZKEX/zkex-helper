import { createAction } from '@reduxjs/toolkit'
import { ConnectorNames } from 'connectors'
import { MuiThemeType } from 'styles/Themes'

export const updateTheme = createAction<MuiThemeType>('settings/updateTheme')
export const updateConnectorName = createAction<{ connectorName: ConnectorNames | undefined }>(
  'settings/updateConnectorName'
)
