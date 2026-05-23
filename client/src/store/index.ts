import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import cartReducer, { type CartState } from "./slices/cart";
import { apiSlice } from "./slices/api";
import storage from "redux-persist/lib/storage";
// import { persistReducer, persistStore } from "redux-persist";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const cartPersistConfig = {
  key: "cart",
  storage: (storage as any).default || storage,
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: persistReducer<CartState>(cartPersistConfig, cartReducer),
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // This tells Redux Toolkit to ignore the special action types dispatched by redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
  devTools: true,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
