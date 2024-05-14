import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ROUTES from './apiConfig';

const baseQuery = fetchBaseQuery({
  baseUrl: ROUTES.LOGIN_API, 
});

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation: useLogin } = authApi;

export default authApi;