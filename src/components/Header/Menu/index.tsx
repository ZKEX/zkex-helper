import { styled } from '@mui/material'
import { memo } from 'react'
import { Link, useLocation, useRoutes } from 'react-router-dom'
import { routerItems } from 'router/index'

const MenuWrap = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 100%;
  list-style: none;
  margin: 0 10px;

  a {
    position: relative;
    margin: 0 10px;
    height: 100%;
    display: flex;
    align-items: center;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    cursor: pointer;
    color: ${(props) => props.theme.color.TextColor50};

    svg {
      margin-right: 6px;
    }

    .svg-active {
      display: none;
    }

    &.active {
      color: ${(props) => props.theme.color.TextColor100};

      .svg {
        display: none;

        &-active {
          display: flex;
        }
      }
    }
    ${(props) => props.theme.breakpoints.down('xl')} {
      margin-right: 16px;
    }
    ${(props) => props.theme.breakpoints.down('lg')} {
      svg {
        display: none !important;
      }
    }
  }
`

interface IMenuRouterListChild {
  name: string
}

interface IMenuRouterList {
  name: string
  path: string
  child?: IMenuRouterListChild[]
}

const menuRouterList: IMenuRouterList[] = [
  {
    name: 'Layer2 Hash',
    path: '/',
  },
  {
    name: 'Sign ChangePubKey',
    path: '/sign/changepubkey',
  },
  {
    name: 'Sign Transfer',
    path: '/sign/transfer',
  },
  {
    name: 'Broker Balance',
    path: '/balance',
  },
]

export const Menu = memo(() => {
  const location = useLocation()
  const routes = useRoutes(routerItems)
  console.log(routes)

  return (
    <MenuWrap>
      {menuRouterList.map((item) => {
        const path = item.path
        const active = location.pathname === item.path ? 'active' : ''
        return (
          <Link to={path} key={item.name} className={active}>
            {item.name}
          </Link>
        )
      })}
    </MenuWrap>
  )
})
