import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ROUTES from './apiConfig';
import { prepareHeaders } from './helpers';

const baseQuery = fetchBaseQuery({
  baseUrl: ROUTES.CHANNELS_API,
  prepareHeaders,
});

const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery,
  tagTypes: ['Channels'],
  endpoints: (builder) => ({
    addChannel: builder.mutation({
      query: (channel) => ({
        method: 'POST',
        body: channel,
      })
    }),
    getChannels: builder.query({
      query: () => '',
      providesTags: ['Channels'],
    }),
  })
});

export const {
  useGetChannelsQuery: useGetChannels,
  useAddChannelMutation: useAddChannel,
} = channelsApi;

export default channelsApi;
