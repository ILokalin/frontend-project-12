import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ROUTES from './apiConfig';
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

export const {
  useAddMessageMutation: useAddMessage,
  useGetMessagesQuery: useGetMessages,
  useUpdateMessageMutation: useUpdateMessage,
  useDeleteMessageMutation: useDeleteMessage,
} = messagesApi;

export default messagesApi;
