import { createBrowserRouter } from 'react-router-dom'
import BalanceView from 'views/Balance'
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
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
)

export default AppRouter
