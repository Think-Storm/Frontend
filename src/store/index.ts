import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./reducers/auth/authSlice";
import headerSlice from "./ui/headerSlice";
// import onboardingSlice from "./reducers/profile/onboardingSlice";
// import profileSlice from "./reducers/profile/profileSlice";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user"],
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: persistedAuthReducer,
      header: headerSlice,
      // onboarding: onboardingSlice,
      // profile: profileSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
