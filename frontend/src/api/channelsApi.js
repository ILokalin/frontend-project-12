import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSelector } from '@reduxjs/toolkit';
import ROUTES from './apiConfig';
import { selectCurrentChannelId } from 'slices/uiSlice';
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

const selectChannels = channelsApi.endpoints.getChannels.select();

const selectChannelsData = createSelector(
  selectChannels,
  (channelsState) => channelsState.data ?? []
);

export const selectCurrentChannel = createSelector(
  [selectChannelsData, selectCurrentChannelId],
  (channels, currentChannelId) => channels.find(channel => channel.id === currentChannelId) || null
);

export const {
  useGetChannelsQuery: useGetChannels,
  useAddChannelMutation: useAddChannel,
} = channelsApi;

export default channelsApi;
