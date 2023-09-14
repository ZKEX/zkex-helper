import { createAction } from '@reduxjs/toolkit'
import { LinkStatus } from 'store/link/types'
import { Wallet } from 'zklink-js-sdk'

export const updateConnected = createAction<{ connected: boolean }>(
  'link/updateConnected'
)
export const updateLinkWallet = createAction<{
  wallet: Wallet
}>('link/updateLinkWallet')
export const disconnectLink = createAction('link/disconnectLink')
export const updateActivating = createAction<{ activating: boolean }>(
  'link/updateActivating'
)
export const updateLinkStatus = createAction<LinkStatus>(
  'link/updateLinkStatus'
)
