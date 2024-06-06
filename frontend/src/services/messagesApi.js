import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSelector } from '@reduxjs/toolkit';
import { API_ROUTES } from 'configs/apiRouts';
import { selectCurrentChannelId } from 'redux/slices/uiSelectors';
import { prepareHeaders } from './helpers';

const baseQuery = fetchBaseQuery({
  baseUrl: API_ROUTES.MESSAGES,
  prepareHeaders,
});

const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery,
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    addMessage: builder.mutation({
      query: (message) => ({
        method: 'POST',
        body: message,
      }),
    }),
    getMessages: builder.query({
      query: () => '',
      providesTags: ['Messages'],
    }),
  }),
});

const selectMessages = messagesApi.endpoints.getMessages.select();

const selectMessagesData = createSelector(
  selectMessages,
  (messagesState) => messagesState.data ?? [],
);

export const selectCurrentMessages = createSelector(
  [selectMessagesData, selectCurrentChannelId],
  (messages, currentChannelId) => (
    messages.filter(({ channelId }) => channelId === currentChannelId) || null
  ),
);

export const {
  useAddMessageMutation: useAddMessage,
  useGetMessagesQuery: useGetMessages,
} = messagesApi;

export default messagesApi;
