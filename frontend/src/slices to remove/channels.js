import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  channels: [],
  currentChannelId: null,
};

const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    setChannels(state, { payload }) {
      const { channels, currentChannelId } = payload;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
    },
    setCurrentChannelId(state, { payload }) {
      const { id } = payload;
      state.currentChannelId = id;
    },
  },
});

export const selectChannelsState = (state) => state.channelsSlice;

export const selectCurrentChannelId = createSelector(
  selectChannelsState,
  (state) => state.currentChannelId,
);

export const selectChannelsList = createSelector(
  selectChannelsState,
  (state) => state.channels,
);

export const selectCurrentChannel = createSelector(
  selectChannelsList,
  selectCurrentChannelId,
  (channels, id) => channels.find((channel) => channel === id) || null,
);

export const { setChannels, setCurrentChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
