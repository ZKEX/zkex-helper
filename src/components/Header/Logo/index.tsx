import useResize from 'hooks/useResize'
import { memo } from 'react'
import { useCurrentThemeType } from 'store/settings/hooks'
import { MuiThemeType, breakpoints } from 'styles/Themes'
import { ReactComponent as SvgLittleLogo } from './little-logo.svg'
import { ReactComponent as SvgLogo } from './logo.svg'

export const Logo = memo(() => {
  const theme = useCurrentThemeType()
  const { innerWidth } = useResize()
  const fillColor = theme === MuiThemeType.dark ? 'white' : 'black'

  if (innerWidth <= breakpoints.values!.lg) {
    return <SvgLittleLogo fill={fillColor} />
  }
  return <SvgLogo fill={fillColor} width="116" height="35" />
})
