import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import ROUTES from "./apiConfig";

const baseQuery = fetchBaseQuery({
  baseUrl: '.',
});

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: ROUTES.LOGIN,
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: ROUTES.SIGNUP,
        method: "POST",
        body: credentials,
      }),
    })
  }),
});

export const {
  useLoginMutation: useLogin,
  useSignupMutation: useSignup,
} = authApi;

export default authApi;
