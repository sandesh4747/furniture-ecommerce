import { getReviewsByProduct } from "../../../../backend/src/controllers/review.controller";
import { mainApi } from "../../app/mainApi";

export const reviewApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: () => ({
        url: "review",
        method: "GET",
      }),
      providesTags: ["Review"],
    }),
    getReviewsByProduct: builder.query({
      query: (id) => ({
        url: `review/${id}`,
        method: "GET",
      }),
      providesTags: ["Review"],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: "review/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Review"],
    }),
    updateReview: builder.mutation({
      query: ({ id, comment, rating }) => ({
        url: `review/update/${id}`,
        method: "PATCH",
        body: { comment, rating },
      }),
      invalidatesTags: ["Review"],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `review/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetAllReviewsQuery,
  useGetReviewsByProductQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
