import { styled } from '@mui/material'
import Iconfont from 'components/Iconfont'
import { memo, useCallback } from 'react'
import { useThemeStore } from 'store/settings/theme'
import { MuiThemeType } from 'styles/Themes'

const ThemeWrap = styled('div')`
  flex: 0 0 60px;
  height: 36px;
  background: #f2f3f5;
  background: ${(props) => props.theme.color.DarkLightText80LightBgGrey};
  border-radius: 20px;
  // padding: 0 4px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s;

  .iconfont {
    position: absolute;
    top: 3px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${(props) => props.theme.color.BgColor02};
    color: ${(props) => props.theme.color.PrimaryColor30};
    left: ${(props) =>
      props.theme.palette.mode === MuiThemeType.dark ? '4px' : 'unset'};
    right: ${(props) =>
      props.theme.palette.mode === MuiThemeType.light ? '4px' : 'unset'};
  }
`
const ThemeSwitch = memo(() => {
  const { currentTheme: theme, updateTheme } = useThemeStore()

  const selectTheme = useCallback(() => {
    let newTheme: MuiThemeType
    if (theme === MuiThemeType.dark) {
      newTheme = MuiThemeType.light
    } else {
      newTheme = MuiThemeType.dark
    }
    updateTheme(newTheme)
  }, [theme])
  return (
    <ThemeWrap onClick={selectTheme}>
      {theme === MuiThemeType.dark ? (
        <Iconfont name="icon-night" size={20} />
      ) : (
        <Iconfont name="icon-light" size={20} />
      )}
    </ThemeWrap>
  )
})

export default ThemeSwitch
