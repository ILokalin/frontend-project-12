import { configureStore } from '@reduxjs/toolkit';
import authSlice from 'redux/slices/authSlice';
import uiSlice from 'redux/slices/uiSlice';
import channelsApi from 'services/channelsApi';
import authApi from 'services/authApi';
import messagesApi from 'services/messagesApi';

const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    [authApi.reducerPath]: authApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authApi.middleware)
    .concat(channelsApi.middleware)
    .concat(messagesApi.middleware),
  devTools: true,
});

export default store;
