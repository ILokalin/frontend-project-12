import { configureStore } from "@reduxjs/toolkit";
import authSlice from "slices/authSlice";
import uiSlice from "slices/uiSlice";
import channelsApi from "api/channelsApi";
import authApi from "api/authApi";
import messagesApi from "api/messagesApi";

const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    [authApi.reducerPath]: authApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(channelsApi.middleware)
      .concat(messagesApi.middleware),
  devTools: true,
});

export default store;
