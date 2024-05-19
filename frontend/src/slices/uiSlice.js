import { createSlice, createSelector } from "@reduxjs/toolkit";
import channelsApi from "api/channelsApi.js";
import { DEFAULT_CHANNEL_ID } from "./constants.js";

const initialState = {
  currentId: DEFAULT_CHANNEL_ID,
  defaultId: DEFAULT_CHANNEL_ID,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCurrentChannel(state, { payload }) {
      state.currentId = payload.id;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      channelsApi.endpoints.addChannel.matchFulfilled,
      (state, { payload }) => {
        state.currentId = payload.id;
      }
    );
    builder.addMatcher(
      channelsApi.endpoints.deleteChannel.matchFulfilled,
      (state, { payload }) => {
        if (state.currentId === payload.id) {
          state.currentId = state.defaultId;
        }
      }
    );
  },
});

export const { setCurrentChannel, openModal, closeModal } = uiSlice.actions;

const selectUi = (state) => state.ui;

export const selectCurrentChannelId = createSelector(
  selectUi,
  (uiState) => uiState?.currentId
);

export const selectDefaultChannelId = createSelector(
  selectUi,
  (uiState) => uiState?.defaultId
);

export default uiSlice.reducer;
