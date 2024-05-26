import { createSlice, createSelector } from "@reduxjs/toolkit";
import authApi from "services/authApi";
import { STORAGE_APP_NAME } from "./constants";

const initialState = {
  token: "",
  username: "",
  isError: false,
  error: "",
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
  name: "auth",
  initialState: prepareInitialState(),
  reducers: {
    clearAuth: () => {
      localStorage.removeItem(STORAGE_APP_NAME);
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchPending,
      (state) => {
        Object.assign(state, initialState);
      }
    );
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        const newState = {
          ...initialState,
          token: payload.token,
          username: payload.username,
        };
        Object.assign(state, newState);
        localStorage.setItem(STORAGE_APP_NAME, JSON.stringify(payload));
      }
    );
    builder.addMatcher(
      authApi.endpoints.login.matchRejected,
      (state, { payload }) => {
        const newState = {
          ...initialState,
          isError: true,
          error: payload?.data?.message ?? "unknown",
        };
        Object.assign(state, newState);
      }
    );
    builder.addMatcher(
      authApi.endpoints.signup.matchFulfilled,
      (state, { payload }) => {
        const newState = {
          ...initialState,
          token: payload.token,
          username: payload.username,
        };
        Object.assign(state, newState);
        localStorage.setItem(STORAGE_APP_NAME, JSON.stringify(payload));
      }
    );
    builder.addMatcher(
      authApi.endpoints.signup.matchRejected,
      (state, { payload }) => {
        const newState = {
          ...initialState,
          isError: true,
          error: payload?.data?.message ?? "unknown",
        };
        Object.assign(state, newState);
      }
    );
  },
});

export const { clearAuth } = authSlice.actions;

export const selectAuth = (state) => state.auth;

export const selectUser = createSelector(
  selectAuth,
  (authState) => authState.username
);

export const selectToken = createSelector(
  selectAuth,
  (authState) => authState.token
);

export const selectIsError = createSelector(
  selectAuth,
  (authState) => authState.isError
);

export const selectError = createSelector(
  selectAuth,
  (authState) => authState.error
);

export const selectIsAuth = createSelector(
  selectToken,
  selectIsError,
  (token, isError) => Boolean(token) && !isError
);

export default authSlice.reducer;
