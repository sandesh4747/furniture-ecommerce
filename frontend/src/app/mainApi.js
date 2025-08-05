import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const baseUrl = "http://localhost:5003/api";
export const baseUrl =
  import.meta.env.MODE === "development" ? "http://localhost:5003/api" : "/api";

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({ baseUrl, credentials: "include" }),
  tagTypes: ["User", "Product", "Order", "Auth", "Review", "Cart"],
  endpoints: (builder) => ({}),
});
