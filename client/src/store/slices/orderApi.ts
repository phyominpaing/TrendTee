// /create-order

import type { OrderItem } from "@/types/order";
import { apiSlice } from "./api";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCheckOutSession: builder.mutation<
      { url: string },
      { items: OrderItem[]; bill: number }
    >({
      query: (body) => ({
        url: "/create-order",
        method: "POST",
        body,
        credentials: "include",
      }),
    }),
  }),
});


export const { useCreateCheckOutSessionMutation } = orderApiSlice;