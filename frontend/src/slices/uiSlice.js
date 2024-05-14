import { createSlice } from '@reduxjs/toolkit';
import channelsApi from 'api/channelsApi.js';
import { DEFAULT_CHANNEL_ID } from './constants.js';

const initialState = {
  currentChannelId: DEFAULT_CHANNEL_ID,
  defaultChannelId: DEFAULT_CHANNEL_ID,
};

const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentChannel(state, { payload }) {
      const { channelId } = payload;
      state.currentChannelId = channelId;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      channelsApi.endpoints.addChannel.matchFulfilled,
      (state, action) => {
        debugger
        state.currentChannelId = action.payload.id;
      },
    );
  },
});

export const { setCurrentChannel } = slice.actions;

export default slice;
