import { createBrowserRouter } from 'react-router-dom'
import BalanceView from 'views/Balance'
import { Layer2HashView } from 'views/Layer2Hash'
import { SignView } from 'views/Sign'
import { OnChainView } from 'views/Sign/OnChain'
import { TransferView } from 'views/Sign/Transfer'

export const routerItems = [
  {
    path: '/',
    element: <Layer2HashView />,
  },
  {
    path: '/balance',
    element: <BalanceView />,
  },
  {
    path: '/sign',
    element: <SignView />,
    children: [
      {
        path: 'changepubkey',
        element: <OnChainView />,
      },
      {
        path: 'transfer',
        element: <TransferView />,
      },
    ],
  },
]

const AppRouter = createBrowserRouter(routerItems, {
  basename: import.meta.env.BASE_URL,
})

export default AppRouter
