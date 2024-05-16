import { createSlice, createSelector } from '@reduxjs/toolkit';
import channelsApi from 'api/channelsApi.js';
import { DEFAULT_CHANNEL_ID } from './constants.js';

const initialState = {
  currentId: DEFAULT_CHANNEL_ID,
  defaultId: DEFAULT_CHANNEL_ID,
};

const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentChannel(state, { payload }) {
      state.currentId = payload.channelId;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      channelsApi.endpoints.addChannel.matchFulfilled,
      (state, { payload }) => {
        debugger
        state.currentId = payload.id;
      },
    );
  },
});

export const { setCurrentChannel } = slice.actions;

const selectUi = (state) => state.ui;

export const selectCurrentChannelId = createSelector(
  selectUi,
  (uiState) => uiState?.currentId || null,
)

export default slice.reducer;
