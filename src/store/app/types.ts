import { TokenID } from '@/types'
import {
  ChainInfo,
  ContractMap,
  SupportChain,
  Token,
} from 'api/routes/broker-balance'

export interface ModalState {
  wallets: boolean
  account: boolean
}

export interface AppState {
  modal: ModalState
  supportNetwork: SupportChain[]
  networkInfo: ChainInfo[]
  supportToken: Record<TokenID, Token>
  contract: ContractMap
}

export enum Environment {
  Mainnet = 1,
  Testnet = 2,
  Devnet = 3,
}
