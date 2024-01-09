import { createSelector, createSlice } from '@reduxjs/toolkit';
import { selectCurrentChannelId } from './channels';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessage(state, { payload }) {
      const { message } = payload;
      state.messages.push(message);
    },
  }
});

export const selectMessagesState = (state) => state.messagesSlice;

export const selectMessagesList = createSelector(
  selectMessagesState,
  (state) => state.messages,
);

export const selectCurrentMessages = createSelector(
  selectMessagesList,
  selectCurrentChannelId,
  (messages, id) => messages.filter((message) => message.id === id),
);

export const { setMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
