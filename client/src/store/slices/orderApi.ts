// /create-order

import type { Order, OrderItem } from "@/types/order";
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
    confirmSession: builder.query<Order, string>({
      query: (session_id) => ({
        url: `/confirm-order/${session_id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getOrdersByUserId: builder.query<Order[], undefined>({
      query: () => ({
        url: "/orders",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Order"],
    }),
    getAllOrders: builder.query<Order[], undefined>({
      query: () => ({
        url: "/orders/all",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Order"],
    }),
    changeOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/order/${orderId}`,
        method: "PATCH",
        body: { status },
        credentials: "include",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateCheckOutSessionMutation,
  useConfirmSessionQuery,
  useGetOrdersByUserIdQuery,
  useGetAllOrdersQuery,
  useChangeOrderStatusMutation,
} = orderApiSlice;
