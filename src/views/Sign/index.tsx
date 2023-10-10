import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import { Wrapper } from 'views/styles'

export const SignView = memo(() => {
  return (
    <Wrapper maxWidth="md">
      <Outlet/>
    </Wrapper>
  )
})
