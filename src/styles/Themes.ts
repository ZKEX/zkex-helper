import { BreakpointsOptions } from '@mui/material'
import { Theme, createTheme } from '@mui/material/styles'
import { DarkColor } from './constants/dark'
import { LightColor } from './constants/light'
import { ColorType } from './constants/type'

interface CustomTheme {
  app: {
    input: {
      color: string
      background: string
      border: string
    }
    section: {
      background: string
    }
    border: {
      radius: string
    }
  }
}

declare module '@mui/material/styles' {
  interface Theme extends CustomTheme {
    color: ColorType
  }
  interface ThemeOptions extends CustomTheme {
    color: ColorType
  }
}

export const breakpoints: BreakpointsOptions = {
  values: {
    xs: 0,
    sm: 600,
    md: 992,
    lg: 1280,
    xl: 1440,
  },
}

export enum MuiThemeType {
  'light' = 'light',
  'dark' = 'dark',
}


export const muiThemes: Record<MuiThemeType, Theme> = {
  [MuiThemeType.light]: createTheme({
    breakpoints,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            minWidth: 32,
            fontFamily: 'inherit',
            fontWeight: 600,
            borderRadius: 6,
          },
          sizeMedium: {
            fontSize: '16px',
            lineHeight: '26px',
          },
          sizeSmall: {
            fontSize: '14px',
          },
          outlined: {
            color: LightColor.TextColor100,
            border: `1px solid ${LightColor.BlanceGroupBorderColor}`,
            ':hover': {
              backgroundColor: LightColor.BlanceGroupHoverBgColor,
            },
            ':disabled': {
              backgroundColor: LightColor.BlanceGroupHoverBgColor,
            },
          },
          contained: {
            color: LightColor.TextColor100,
            backgroundColor: LightColor.PrimaryColor20,
            border: `1px solid ${LightColor.PrimaryColor30}`,
            ':hover': {
              color: LightColor.TextColor00,
              backgroundColor: LightColor.PrimaryColor30,
            },
            ':disabled': {
              color: 'rgba(160,198,142,1)',
              backgroundColor: LightColor.PrimaryColor50,
              borderColor: 'rgba(160, 198, 142, 1)',
            },
          },
        },
      },
    },
    typography: {
      fontFamily: 'inherit',
      button: {
        textTransform: 'none',
      },
    },
    palette: {
      mode: 'light',
      primary: {
        main: 'rgba(142, 205, 30, 1)',
        contrastText: '#fff',
      },
      error: {
        main: 'rgba(255, 74, 40, 1)',
      },
      text: {
        primary: '#333333',
        secondary: '#5F798C',
      },
    },
    app: {
      input: {
        color: '#333333',
        background: '#FFFFFF',
        border: '1px solid #FFFFFF',
      },
      section: {
        background: '#f2f2f2',
      },
      border: {
        radius: '10px',
      },
    },
    color: LightColor,
  }),
  [MuiThemeType.dark]: createTheme({
    breakpoints,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            minWidth: 32,
            fontFamily: 'inherit',
            fontWeight: 600,
            borderRadius: 6,
          },
          sizeMedium: {
            fontSize: '16px',
            lineHeight: '26px',
          },
          sizeSmall: {
            fontSize: '14px',
          },
          outlined: {
            color: DarkColor.TextColor100,
            ':hover': {
              color: DarkColor.TextColor00,
              backgroundColor: DarkColor.PrimaryColor30,
            },
          },
          contained: {
            color: DarkColor.TextColor00,
            backgroundColor: DarkColor.PrimaryColor20,
            border: `1px solid ${DarkColor.PrimaryColor30}`,
            ':hover': {
              backgroundColor: DarkColor.PrimaryColor30,
            },
            ':disabled': {
              color: DarkColor.PrimaryColorGreen,
              backgroundColor: DarkColor.PrimaryColor50,
              borderColor: DarkColor.PrimaryColorGreen,
            },
          },
        },
      },
    },
    typography: {
      fontFamily: 'inherit',
      button: {
        textTransform: 'none',
      },
    },
    palette: {
      mode: 'dark',
      primary: {
        main: 'rgba(160, 238, 9, 1)',
        contrastText: '#fff',
      },
      error: {
        main: 'rgba(255, 74, 40, 1)',
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#5F798C',
      },
    },
    app: {
      input: {
        color: '#FFFFFF',
        background: 'rgba(1, 11, 17, 1)',
        border: '1px solid rgba(255, 255, 255, 0.14)',
      },
      section: {
        background: '#f2f2f2',
      },
      border: {
        radius: '10px',
      },
    },
    color: DarkColor,
  }),
}
