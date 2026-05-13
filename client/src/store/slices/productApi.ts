import type { Product, ProductMeta } from "@/types/product";
import { apiSlice } from "./api";
import type { ProductFormInputs } from "@/schema/product";

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
    getProductDetails: builder.query<Product, string>({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getProducts: builder.query({
      query: ({
        sizes,
        colors,
        category,
        minPrice,
        maxPrice,
        sortBy,
        keyword,
      }) => {
        const searchParams = new URLSearchParams();

        if (sizes && sizes.length)
          sizes.forEach((size: string) => searchParams.append("size", size));
        if (colors && colors.length)
          colors.forEach((color: string) =>
            searchParams.append("color", color),
          );
        console.log(colors);
        console.log(searchParams.toString());

        if (category) searchParams.append("category", category);
        if (minPrice) searchParams.append("minPrice", minPrice.toString());
        if (maxPrice) searchParams.append("maxPrice", maxPrice.toString());
        if (sortBy) searchParams.append("sortBy", sortBy);
        if (keyword) searchParams.append("keyword", keyword);
        return `/products?${searchParams.toString()}`;
      },
    }),
    getProductsMeta: builder.query<ProductMeta, string>({
      query: () => ({
        url: "/filters/meta",
        method: "GET",
        credentials: "include",
      }),
    }),

    createProduct: builder.mutation<Product, ProductFormInputs>({
      query: (productData) => ({
        url: "/products",
        method: "POST",
        credentials: "include",
        body: productData,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetNewArrivalsQuery,
  useGetFeaturedQuery,
  useGetProductDetailsQuery,
  useGetProductsQuery,
  useGetProductsMetaQuery,
} = productApiSlice;
