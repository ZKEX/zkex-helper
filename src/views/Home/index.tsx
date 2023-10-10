import { styled, SvgIconTypeMap } from '@mui/material'
import { Link } from 'react-router-dom'
import { useThemeStore } from '../../store/settings/theme'
import { SvgIcon } from '@mui/material'
import TagIcon from '@mui/icons-material/Tag'
import KeyIcon from '@mui/icons-material/Key'
import MoveDownIcon from '@mui/icons-material/MoveDown'
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone'
import BalanceTwoToneIcon from '@mui/icons-material/BalanceTwoTone'
import { OverridableComponent } from '@mui/material/OverridableComponent'

interface CardList {
  name: string
  path: string
  icon: OverridableComponent<SvgIconTypeMap> & { muiName: string }
  dec: string
}

const Wrap = styled('div')`
  max-width: 1200px;
  height: calc(100% - 104px);
  margin: 84px auto 20px;
  padding: 24px;
  border-radius: 8px;
  background: ${(props) => props.theme.color.BoxHashWrapBg};
`
const Title = styled('h3')`
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 133.333% */
`
const CardWrap = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
const Card = styled(Link)`
  display: flex;
  max-width: 564px;
  width: 100%;
  margin-top: 24px;
  padding: 12px 50px 47px 12px;
  border-radius: 8px;
  background: ${(props) => props.theme.color.BgColorDarkPopupBg};
  border: 1px solid transparent;
  transition: background-color 0.1s;
  color: inherit;

  &.cLight:hover {
    background-color: rgba(142, 205, 30, 1);
  }
  &.cDark:hover {
    border: 1px solid rgba(142, 205, 30, 1);
  }
  &:hover .iconWrap {
    background-color: rgba(255, 255, 255, 1);
    color: rgba(142, 205, 30, 1);
  }
`
const IconWrap = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 36px;
  margin-right: 12px;
  border-radius: 50%;
  transition: background-color 0.1s;
  background-color: rgba(142, 205, 30, 1);
  color: #fff;
  > .icon {
    height: 24px;
    width: 24px;
    color: inherit;
  }
`
const Box = styled('div')`
  margin-top: 8px;
`
const CardTitle = styled('h3')`
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
`
const CardDec = styled('p')`
  max-width: 454px;
  margin-top: 13px;
  color: ${(props) => props.theme.color.BoxHashTextDec};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`

const cardList: CardList[] = [
  {
    name: 'Layer2 Hash',
    path: '/Layer2Hash',
    icon: TagIcon,
    dec: '',
  },
  {
    name: 'Sign ChangePubKey',
    path: '/sign/changepubkey',
    icon: KeyIcon,
    dec: '',
  },
  {
    name: 'Sign Transfer',
    path: '/sign/transfer',
    icon: MoveDownIcon,
    dec: '',
  },
  {
    name: 'Transaction Sender',
    path: '/transaction/sender',
    icon: SendTwoToneIcon,
    dec: '',
  },
  {
    name: 'Broker Balance',
    path: '/balance',
    icon: BalanceTwoToneIcon,
    dec: '',
  },
]

export const HomeView = () => {
  const { currentTheme } = useThemeStore()

  return (
    <Wrap>
      <Title>ZKEX Tools</Title>
      <CardWrap>
        {cardList.map((item, idx) => (
          <Card
            key={idx}
            to={item.path}
            className={currentTheme === 'light' ? 'cLight' : 'cDark'}>
            <IconWrap className={'iconWrap'}>
              <SvgIcon className={'icon'} component={item.icon} />
            </IconWrap>
            <Box>
              <CardTitle>{item.name}</CardTitle>
              {/*<CardDec>
              Batch Deposit detail Batch Deposit detail Batch Deposit detail Batch
              Deposit detail
            </CardDec>*/}
            </Box>
          </Card>
        ))}
      </CardWrap>
    </Wrap>
  )
}
