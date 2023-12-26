import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cookie, COOKIE_KEYS } from "libs/Cookie";
import { IDashboard } from "../DashboardRepository";

export const DashboardQuery = createApi({
  reducerPath: "DashboardQuery",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_HOST,
    prepareHeaders(headers) {
      headers.append("Authorization", `Bearer ${Cookie.get(COOKIE_KEYS.JWT_TOKEN)}`);
    },
  }),
  endpoints: (builder) => ({
    getDashboard: builder.query<IDashboard, string>({
      query: () => `/dashboard/current`,
    }),
  }),
});
