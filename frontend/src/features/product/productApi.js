import { mainApi } from "../../app/mainApi";

export const productApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: () => ({
        url: "product",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    getSearchResults: builder.query({
      query: (search) => ({
        url: `/product?search=${search}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `product/${id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation({
      query: (formData) => ({
        url: "product/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `product/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    latestProduct: builder.query({
      query: () => ({
        url: "product/latest-products",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    highPricedProduct: builder.query({
      query: () => ({
        url: "product/high-priced-products",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    lowPricedProduct: builder.query({
      query: () => ({
        url: "product/low-priced-products",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    relevantProduct: builder.query({
      query: () => ({
        url: "product/relevant-products",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    featuredProduct: builder.query({
      query: () => ({
        url: "product/featured-products",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    relatedProduct: builder.query({
      query: (id) => ({
        url: `product/related-products/${id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    toggleFeaturedProduct: builder.mutation({
      query: (id) => ({
        url: `product/toggle-feature/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Product"],
    }),
    toggleInStockProduct: builder.mutation({
      query: (id) => ({
        url: `product/toggle-in-stock/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `product/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetAllProductQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useLatestProductQuery,
  useHighPricedProductQuery,
  useLowPricedProductQuery,
  useRelevantProductQuery,
  useRelatedProductQuery,
  useToggleFeaturedProductMutation,
  useToggleInStockProductMutation,
  useDeleteProductMutation,
  useFeaturedProductQuery,
  useGetSearchResultsQuery,
} = productApi;
