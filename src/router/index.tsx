import { createBrowserRouter } from 'react-router-dom'
import BalanceView from 'views/Balance'
import { ChangePubKeyView } from 'views/ChangePubKey'
import Home from 'views/Index'

const AppRouter = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/balance',
      element: <BalanceView />,
    },
    {
      path: '/changepubkey',
      element: <ChangePubKeyView />,
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
)

export default AppRouter
