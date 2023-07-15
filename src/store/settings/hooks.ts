import { Theme } from '@mui/material'
import { ConnectorNames } from 'connectors'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { MuiThemeType, muiThemes } from 'styles/Themes'

export function useCurrentTheme(): Theme {
  const themeType = useCurrentThemeType()
  return useMemo(() => {
    return muiThemes[themeType]
  }, [themeType])
}

export function useCurrentThemeType(): MuiThemeType {
  return useSelector<RootState, MuiThemeType>((state) => state.settings.theme)
}

export function useCurrentConnectorName() {
  return useSelector<RootState, ConnectorNames | undefined>((state) => state.settings.connectorName)
}