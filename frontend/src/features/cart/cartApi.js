import { mainApi } from "../../app/mainApi";

export const cartApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    addCart: builder.mutation({
      query: (val) => ({
        url: "cart/add",
        method: "POST",
        body: val,
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCart: builder.mutation({
      query: (val) => ({
        url: "cart/update",
        method: "PATCH",
        body: val,
      }),
      invalidatesTags: ["Cart"],
    }),
    removeCart: builder.mutation({
      query: (val) => ({
        url: "cart/remove",
        method: "DELETE",
        body: val,
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: "cart/clear",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useAddCartMutation,
  useUpdateCartMutation,
  useRemoveCartMutation,
  useClearCartMutation,
} = cartApi;
