import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { combineReducers } from 'redux'
import { load, save } from 'redux-localstorage-simple'
import appReducer from './app/reducer'
import linkReducer from './link/reducer'
import settingReducer from './settings/reducer'

const rootReducer = combineReducers({
  settings: settingReducer,
  link: linkReducer,
  app: appReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

const PERSISTED_KEYS: string[] = ['settings']

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['link/updateLinkWallet', 'link/updateUserPrivateKey'],
        ignoredPaths: ['link.wallet', 'link.privateKey'],
      },
    }).concat(save({ states: PERSISTED_KEYS, debounce: 1000 })),
  preloadedState: load({
    states: PERSISTED_KEYS,
  }),
})
