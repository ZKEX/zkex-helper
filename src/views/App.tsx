import { GlobalStyles, ThemeProvider } from '@mui/material'
import 'assets/iconfont/iconfont.css'
import { WalletModal } from 'components/WalletModal'
import Web3Provider from 'components/Web3Provider'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import router from 'router/index'
import { useCurrentTheme } from 'store/settings/hooks'
import Updater from 'store/updater'
import { getMuiGlobalStyleOption } from 'styles/MuiGlobalStyle'

const App = () => {
  const MuiTheme = useCurrentTheme()
  return (
    <>
      <Web3Provider>
        <ThemeProvider theme={MuiTheme}>
          <GlobalStyles
            styles={(theme) => {
              const options = getMuiGlobalStyleOption(theme)
              return options
            }}
          />
          <RouterProvider router={router} />
          <Toaster />
          <WalletModal />
          <Updater />
        </ThemeProvider>
      </Web3Provider>
    </>
  )
}

export default App
