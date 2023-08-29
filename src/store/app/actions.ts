import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getAppTokens, getContractsAddress, getNetwork, getSupportChain } from 'api/routes/broker-balance';
import { ModalState } from './types';


export const updateModal = createAction<{ modal: keyof ModalState; open: boolean }>(
  'app/updateModal'
)

export const getSupportNetworkAction = createAsyncThunk('app/getSupportNetworkAction', async () => {
  const r = await getSupportChain()
  return r.result
})

export const getFullNetworkAction = createAsyncThunk('app/getFullNetworkAction', async () => {
  const r = await getNetwork()
  return r
})

export const getContractsAddressAction = createAsyncThunk('app/getContractsAddressAction', async () => {
  const r = await getContractsAddress()
  return r
})

export const getAppTokensAction = createAsyncThunk('app/getAppTokensAction', async () => {
  const r = await getAppTokens()
  return r.result
})