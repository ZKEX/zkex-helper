import React, { FC } from 'react'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { styled } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

const Wrap = styled('div')`
  max-width: 992px;
  margin: 10px auto;
`
const Href = styled(Link)`
  color: inherit;
`
function capitalized(str: string) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''
}

const BasicBreadcrumbs: FC<{ style?: any }> = ({ style }) => {
  const { pathname } = useLocation()

  return pathname === '/' ? null : (
    <Wrap style={style} role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Href to="/">Home</Href>
        {pathname.split('/').map((item, idx) => {
          if (!item) return null
          return (
            <Typography key={idx} color="text.primary">
              {capitalized(item)}
            </Typography>
          )
        })}
      </Breadcrumbs>
    </Wrap>
  )
}

export default BasicBreadcrumbs
