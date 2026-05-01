import type { Product } from "@/types/product";
import { apiSlice } from "./api";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNewArrivals: builder.query({
      query: () => ({
        url: "/products/new",
        method: "GET",
        credentials: "include",
      }),
    }),
    getFeatured: builder.query({
      query: () => ({
        url: "/products/featured",
        method: "GET",
        credentials: "include",
      }),
    }),
    getProductDetails: builder.query<Product , string>({
      query: (id : string) => ({
        url: `/products/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetNewArrivalsQuery,
  useGetFeaturedQuery,
  useGetProductDetailsQuery,
} = productApiSlice;
