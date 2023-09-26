import ContentCopyIcon from '@mui/icons-material/FileCopy'
import { IconButton, styled } from '@mui/material'
import copy from 'copy-to-clipboard'
import toast from 'react-hot-toast'

const Code = styled('code')`
  display: block;
  word-break: break-all;
  line-height: 1.6;
  padding: 40px 16px 16px;
  background-color: ${(props) => props.theme.color.BoxDialogBg};
  border-radius: 4px;
  position: relative;
  color: ${(props) => props.theme.color.TextColor60};
`
const Title = styled('div')`
  position: absolute;
  top: 10px;
  left: 16px;
  color: ${(props) => props.theme.color.TextColor20};
  user-select: none;
`
const Copy = styled(IconButton)`
  position: absolute;
  top: 6px;
  right: 6px;
  font-size: 16px;
`
export function CodeBoard({ code, title }: { code?: string; title?: string }) {
  return (
    <Code>
      {title ? <Title>{title}</Title> : null}
      <Copy
        onClick={() => {
          if (!code) {
            toast.error('code is undefined')
          } else {
            copy(code, {
              debug: true,
            })
            toast.success('Copied Successful')
          }
        }}>
        <ContentCopyIcon fontSize="small" />
      </Copy>
      {code}
    </Code>
  )
}
