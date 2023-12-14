import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [] as string[],
};

const slice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage(state, { payload }) {
      const { message } = payload;
      state.messages.push(message);
    },
  }
});

export const { addMessage } = slice.actions;

export default slice.reducer;
