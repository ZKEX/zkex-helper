import { ConnectorNames } from 'connectors'
import { MuiThemeType } from 'styles/Themes'

export interface SettingState {
  theme: MuiThemeType
  connectorName: ConnectorNames | undefined
}