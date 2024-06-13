import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ROUT_LOGIN, ROUT_SIGNUP, getRoute } from 'configs/apiRouts';

const baseQuery = fetchBaseQuery({
  baseUrl: '.',
});

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: getRoute(ROUT_LOGIN),
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: getRoute(ROUT_SIGNUP),
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {
  useLoginMutation: useLogin,
  useSignupMutation: useSignup,
} = authApi;

export default authApi;
