import { createBrowserRouter } from 'react-router-dom'
import BalanceView from 'views/Balance'
import { Layer2HashView } from 'views/Layer2Hash'
import { MainView } from 'views/Main'
import { SignView } from 'views/Sign'
import { ChangePubKeyView } from 'views/Sign/ChangePubKey'
import { TransferView } from 'views/Sign/Transfer'
import { TransactionSenderView } from 'views/Transaction/Sender'

export const routerItems = [
  {
    path: '/',
    element: <MainView />,
    children: [
      {
        path: '',
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
            element: <ChangePubKeyView />,
          },
          {
            path: 'transfer',
            element: <TransferView />,
          },
        ],
      },
      {
        path: 'transaction/sender',
        element: <TransactionSenderView />,
      },
    ],
  },
]

const AppRouter = createBrowserRouter(routerItems, {
  basename: import.meta.env.BASE_URL,
})

export default AppRouter
