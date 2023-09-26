import { GlobalStyles, ThemeProvider } from '@mui/material'
import 'assets/iconfont/iconfont.css'
import { WalletModal } from 'components/WalletModal'
import Web3Provider from 'components/Web3Provider'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import router from 'router/index'
import { useThemeStore } from 'store/settings/theme'
import Updater from 'store/updater'
import { getMuiGlobalStyleOption } from 'styles/MuiGlobalStyle'
import { muiThemes } from 'styles/Themes'

const App = () => {
  const { currentTheme } = useThemeStore()
  const theme = muiThemes[currentTheme]

  return (
    <Web3Provider>
      <ThemeProvider theme={theme}>
        <GlobalStyles
          styles={(theme) => {
            const options = getMuiGlobalStyleOption(theme)
            return options
          }}
        />
        <RouterProvider router={router} />
        <Toaster position="bottom-center" />
        <WalletModal />
        <Updater />
      </ThemeProvider>
    </Web3Provider>
  )
}

export default App
