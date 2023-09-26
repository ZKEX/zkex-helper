import { Address, L1ID, L2ID, TokenID } from '@/types'
import api from 'api'
import { rpcPaylod } from 'api/rpc'
import { STATIC_HOST, ZKEX_API_URL } from 'config'

export interface ContractMap {
  faucet: Record<L1ID, Address>
  multicall: Record<L1ID, Address>
}
export const getContractsAddress = (): Promise<ContractMap> => {
  return api.get(`/contracts/main.json`, {
    baseURL: STATIC_HOST,
  })
}

export interface NetworkItem {
  name: string
  chainId: L1ID
  layerTwoChainId: L2ID
  symbol: string
  decimals: number
  rpcUrl: string
  explorerUrl: string
  iconUrl: string
}
export const getNetwork = (): Promise<NetworkItem[]> => {
  return api.get(`/networks/list.json`, {
    baseURL: STATIC_HOST,
  })
}

export interface SupportChain {
  chainId: L2ID
  chainType: number
  layerOneChainId: L1ID
  mainContract: Address
  layerZeroContract: Address
  web3Url: string
  gasTokenId: TokenID
  validator: Address
}
export const getChains = (): Promise<{
  result: SupportChain[]
}> => {
  return api.get(`/chains`, {
    baseURL: ZKEX_API_URL,
  })
}

export interface Token {
  id: TokenID
  chains: Record<
    L2ID,
    {
      address: Address
      chainId: L2ID
      decimals: number
      fastWithdraw: boolean
    }
  >
  symbol: string
  name: string
  currencyIcon: string
}
export const getAppTokens = (): Promise<{
  result: Record<TokenID, Token>
}> => {
  return api.get(`/tokens`, {
    baseURL: ZKEX_API_URL,
  })
}

export interface TokenRemainResponse {
  data: {
    error?: {
      code: number
      message: string
    }
    result?: {
      [x: number]: string
    }
  }
}

export function getTokenRemain(
  tokenId: number,
  mapping: boolean
): Promise<any> {
  return api.post(
    `/tokenReserve`,
    rpcPaylod('getTokenReserve', [tokenId, mapping]),
    {
      baseURL: ZKEX_API_URL,
    }
  )
}
