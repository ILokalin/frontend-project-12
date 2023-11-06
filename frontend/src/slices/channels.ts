import { createSlice } from "@reduxjs/toolkit";

export interface ChannelEntity {
  id: number;
  name: string;
  removable: boolean;
}

interface InitialState {
  channels: ChannelEntity[];
  currentChannelId: number | null;
}

const initialState = {
  channels: [],
  currentChannelId: null,
};

const slice = createSlice({
  name: "channelsSlice",
  initialState,
  reducers: {
    addChannels(state, { payload }) {
      const { channels, currentChannelId } = payload;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
    },
    setCurrentChannel(state, { payload }) {
      const { id } = payload;
      state.currentChannelId = id;
    },
  },
});

export const selectChannelsSlice = (state: { channelsSlice: InitialState }) =>
  state.channelsSlice;

export const { addChannels, setCurrentChannel } = slice.actions;

export default slice.reducer;
