import { mainApi } from "../../app/mainApi";

export const authApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    userSignup: builder.mutation({
      query: (data) => ({
        url: "auth/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    changePassword: builder.mutation({
      query: (val) => ({
        url: "auth/changePassword",
        method: "PATCH",
        body: val,
      }),
      invalidatesTags: ["Auth"],
    }),
    userLogout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserSignupMutation,
  useUserLogoutMutation,
  useChangePasswordMutation,
} = authApi;
