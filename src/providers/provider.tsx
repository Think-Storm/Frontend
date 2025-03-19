"use client";

import StoreProvider from "./store-provider";
import QueryProvider from "./query-provider";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <QueryProvider>{children}</QueryProvider>
    </StoreProvider>
  );
}
