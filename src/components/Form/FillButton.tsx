import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import { IconButton, IconButtonProps, InputAdornment } from '@mui/material'
import { memo } from 'react'

export const FillButton = memo<IconButtonProps>(({ onClick }) => (
  <InputAdornment position="end">
    <IconButton title="Auto Fill" aria-label="Auto Fill" onClick={onClick}>
      <AutoFixHighIcon />
    </IconButton>
  </InputAdornment>
))
