import {
  FormControl,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from '@mui/material'
import { kebabCase } from 'lodash'
import { memo } from 'react'

export const FormOutlinedInput = memo<
  OutlinedInputProps & {
    register?: any
  }
>(({ label, register, ...props }) => {
  const id = kebabCase(label as string)

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor={id} shrink>
        {label}
      </InputLabel>
      <OutlinedInput id={id} label={label} {...register} {...props} />
    </FormControl>
  )
})
