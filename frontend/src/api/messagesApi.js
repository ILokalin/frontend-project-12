import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSelector } from '@reduxjs/toolkit';
import ROUTES from './apiConfig';
import { selectCurrentChannelId } from 'slices/uiSlice';
import { prepareHeaders } from './helpers';

const baseQuery = fetchBaseQuery({
  baseUrl: ROUTES.MESSAGES_API,
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
    updateMessage: builder.mutation({
      query: (message) => ({
        method: 'PATCH',
        body: message,
      }),
    }),
    deleteMessage: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
    }),
  }),
});

const selectMessages = messagesApi.endpoints.getMessages.select();

const selectMessagesData = createSelector(
  selectMessages,
  (messagesState) => {
    debugger
    return messagesState.data ?? []
  }
);

export const selectCurrentMessages = createSelector(
  [selectMessagesData, selectCurrentChannelId],
  (messages, currentChannelId) => {
    debugger
    return messages.filter(({ channelId }) => channelId === currentChannelId) || null
  }
);

export const {
  useAddMessageMutation: useAddMessage,
  useGetMessagesQuery: useGetMessages,
  useUpdateMessageMutation: useUpdateMessage,
  useDeleteMessageMutation: useDeleteMessage,
} = messagesApi;

export default messagesApi;
