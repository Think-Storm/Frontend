"use client";

import { useRef, ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import { Persistor, persistStore } from "redux-persist";

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  const persistorRef = useRef<Persistor>({} as Persistor);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    persistorRef.current = persistStore(storeRef.current);
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate
        loading={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        }
        persistor={persistorRef.current}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
