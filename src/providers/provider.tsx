'use client'

import { ReactNode } from 'react'
import StoreProvider from './store-provider'
import QueryProvider from './query-provider'

export function Provider({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <QueryProvider>{children}</QueryProvider>
    </StoreProvider>
  )
}
