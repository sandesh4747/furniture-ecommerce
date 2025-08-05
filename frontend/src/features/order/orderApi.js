import { mainApi } from "../../app/mainApi";

export const orderApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrder: builder.query({
      query: () => ({
        url: "order",
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: "order/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),
    getOrdersByUser: builder.query({
      query: () => ({
        url: "order/my-order",
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    updateAddress: builder.mutation({
      query: ({ id, shippingAddress }) => ({
        url: `order/${id}/address`,
        method: "PATCH",
        body: { shippingAddress },
      }),
      invalidatesTags: ["Order"],
    }),
    GetSingleOrder: builder.query({
      query: (id) => ({
        url: `order/${id}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `order/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrderQuery,
  useDeleteOrderMutation,
  useGetSingleOrderQuery,
  useUpdateAddressMutation,
  useGetOrdersByUserQuery,
} = orderApi;
