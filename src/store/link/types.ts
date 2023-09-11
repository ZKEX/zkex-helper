import { Wallet } from 'zklink-js-sdk'

export enum LinkStatus {
  init,
  linkL1Pending,
  linkL1Success,
  linkL1Failed,
  linkL2Pending,
  linkL2Success,
  linkL2Failed,
  apiLoginPending,
  apiLoginSuccess,
  apiLoginFailed,
}

export interface LinkState {
  connected: boolean
  wallet: Wallet | undefined
  ethSignature: Uint8Array | undefined
  viewInExplorerLink: string
  linkStatus: LinkStatus
  privateKey: Uint8Array | undefined
  pubKey: Uint8Array | undefined
  pubKeyHash: Uint8Array | undefined
}
