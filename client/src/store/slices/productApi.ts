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
      providesTags: ["Product"],
    }),
    getFeatured: builder.query({
      query: () => ({
        url: "/products/featured",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Product"],
    }),
    getProductDetails: builder.query<Product, string>({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Product"],
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

        if (category) searchParams.append("category", category);
        if (minPrice) searchParams.append("minPrice", minPrice.toString());
        if (maxPrice) searchParams.append("maxPrice", maxPrice.toString());
        if (sortBy) searchParams.append("sortBy", sortBy);
        if (keyword) searchParams.append("keyword", keyword);
        return `/products?${searchParams.toString()}`;
      },
      providesTags: ["Product"],
    }),
    getProductsMeta: builder.query<ProductMeta, string>({
      query: () => ({
        url: "/filters/meta",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Product"],
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
    updateProduct: builder.mutation<
      Product,
      { id: string; data: ProductFormInputs }
    >({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<string, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
        credentials: "include",
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
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApiSlice;
