import { createBrowserRouter } from "react-router-dom"
import Home from 'views/Index'

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  }
])

export default AppRouter