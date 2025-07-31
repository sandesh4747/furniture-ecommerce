import { updateProfile } from "../../../../backend/src/controllers/user.controller";
import { mainApi } from "../../app/mainApi";

export const userApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "user/get-me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "user/all-users",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "user/update-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    updateProfilePic: builder.mutation({
      query: (formData) => ({
        url: "user/profile-pic",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
    favouritesProducts: builder.mutation({
      query: (productId) => ({
        url: `user/favourites/${productId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useFavouritesProductsMutation,
  useGetAllUsersQuery,
  useUpdateProfileMutation,
  useUpdateProfilePicMutation,
} = userApi;
