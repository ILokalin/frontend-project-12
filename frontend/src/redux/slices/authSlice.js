import { createSlice, createSelector } from '@reduxjs/toolkit';
import authApi from 'services/authApi';
import { STORAGE_APP_NAME } from './constants';
import { clearError, extractAuthError } from './helpers';

const initialState = {
  token: '',
  username: '',
  isError: false,
  error: '',
};

export const setError = (state, { payload }) => {
  const error = extractAuthError(payload?.status);
  if (!error) {
    clearError(state);
    return;
  }

  Object.assign(state, {
    error,
    isError: true,
  });
};

const prepareInitialState = () => {
  const hexletChatAuth = localStorage.getItem(STORAGE_APP_NAME);
  try {
    return {
      ...initialState,
      ...JSON.parse(hexletChatAuth),
    };
  } catch {
    return initialState;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: prepareInitialState(),
  reducers: {
    clearAuth: () => {
      localStorage.removeItem(STORAGE_APP_NAME);
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchPending, clearError);
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        Object.assign(state, {
          ...initialState,
          token: payload.token,
          username: payload.username,
        });
        localStorage.setItem(STORAGE_APP_NAME, JSON.stringify(payload));
      },
    );
    builder.addMatcher(authApi.endpoints.login.matchRejected, setError);
    builder.addMatcher(authApi.endpoints.signup.matchPending, clearError);
    builder.addMatcher(
      authApi.endpoints.signup.matchFulfilled,
      (state, { payload }) => {
        Object.assign(state, {
          ...initialState,
          token: payload.token,
          username: payload.username,
        });
        localStorage.setItem(STORAGE_APP_NAME, JSON.stringify(payload));
      },
    );
    builder.addMatcher(authApi.endpoints.signup.matchRejected, setError);
  },
});

export const { clearAuth } = authSlice.actions;

export const selectAuth = (state) => state.auth;

export const selectUser = createSelector(
  selectAuth,
  (authState) => authState.username,
);

export const selectToken = createSelector(
  selectAuth,
  (authState) => authState.token,
);

export const selectIsAuthError = createSelector(
  selectAuth,
  (authState) => authState.isError,
);

export const selectAuthError = createSelector(
  selectAuth,
  (authState) => authState.error,
);

export const selectIsAuth = createSelector(
  selectToken,
  selectIsAuthError,
  (token, isError) => Boolean(token) && !isError,
);

export default authSlice.reducer;
