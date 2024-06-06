import { createSlice } from '@reduxjs/toolkit';
import channelsApi from 'services/channelsApi.js';
import authApi from 'services/authApi';
import messagesApi from 'services/messagesApi.js';
import { DEFAULT_CHANNEL_ID } from './constants.js';
import { clearError, extractUiError } from './helpers.js';

const initialState = {
  currentId: DEFAULT_CHANNEL_ID,
  defaultId: DEFAULT_CHANNEL_ID,
  error: '',
  isError: false,
};

export const setError = (state, { payload }) => {
  const error = extractUiError(payload?.status);
  if (!error) {
    clearError(state);
    return;
  }

  Object.assign(state, {
    error,
    isError: true,
  });
};

const clearErrorEndpoints = [
  authApi.endpoints.login.matchPending,
  authApi.endpoints.signup.matchPending,
  channelsApi.endpoints.addChannel.matchPending,
  channelsApi.endpoints.deleteChannel.matchPending,
  channelsApi.endpoints.updateChannel.matchPending,
  messagesApi.endpoints.addMessage.matchPending,
  messagesApi.endpoints.getMessages.matchPending,
];

const setErrorEndpoints = [
  authApi.endpoints.login.matchRejected,
  authApi.endpoints.signup.matchRejected,
  channelsApi.endpoints.addChannel.matchRejected,
  channelsApi.endpoints.deleteChannel.matchRejected,
  channelsApi.endpoints.updateChannel.matchRejected,
  messagesApi.endpoints.addMessage.matchRejected,
  messagesApi.endpoints.getMessages.matchRejected,
];

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentChannel(state, { payload }) {
      Object.assign(state, {
        currentId: payload.id,
      });
    },
  },
  extraReducers: (builder) => {
    clearErrorEndpoints.forEach((endpoint) => {
      builder.addMatcher(endpoint, clearError);
    });
    setErrorEndpoints.forEach((endpoint) => {
      builder.addMatcher(endpoint, setError);
    });

    builder.addMatcher(
      channelsApi.endpoints.addChannel.matchFulfilled,
      (state, { payload }) => {
        Object.assign(state, {
          currentId: payload.id,
          isError: false,
        });
      },
    );
    builder.addMatcher(
      channelsApi.endpoints.deleteChannel.matchFulfilled,
      (state, { payload }) => {
        const updates = {
          isError: false,
          error: '',
        };
        if (state.currentId === payload.id) {
          updates.currentId = state.defaultId;
        }
        Object.assign(state, updates);
      },
    );
  },
});

export const { setCurrentChannel } = uiSlice.actions;

export default uiSlice.reducer;
