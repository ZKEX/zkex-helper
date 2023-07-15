import { GlobalStyles, ThemeProvider } from '@mui/material'
import 'assets/iconfont/iconfont.css'
import StyledContainer from 'components/StyledToastContainer'
import { WalletModal } from 'components/WalletModal'
import Web3Provider from 'components/Web3Provider'
import { RouterProvider } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import router from 'router/index'
import { useCurrentTheme } from 'store/settings/hooks'
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
          <StyledContainer />
          <RouterProvider router={router} />
          <WalletModal />
        </ThemeProvider>
      </Web3Provider>
    </>
  )
}

export default App
