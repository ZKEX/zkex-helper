import { createBrowserRouter } from 'react-router-dom'
import Home from 'views/Index'

const AppRouter = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />,
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
)

export default AppRouter
