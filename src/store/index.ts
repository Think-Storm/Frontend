import { configureStore } from '@reduxjs/toolkit'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authSlice from './reducers/auth/authSlice'
import userSlice from './reducers/user/userSlice'
import headerSlice from './reducers/ui/headerSlice'

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user'],
}

const persistedAuthReducer = persistReducer(persistConfig, authSlice)

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: persistedAuthReducer,
      user: userSlice,
      header: headerSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
