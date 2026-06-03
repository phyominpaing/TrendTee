// fakeOrders.ts
import type { Order } from "../types/order";

export const FAKE_ORDERS: Order[] = [
  {
    _id: "1",
    userId: "user-a",
    items: [
      {
        productId: "p01",
        name: "Denim Jacket",
        quantity: 2,
        price: 50,
        image: "/products/denim.jpg",
        size: "M",
        color: "Blue",
      },
    ],
    bill: 100,
    status: "delivered",
    createdAt: "2025-09-15T07:05:00Z",
    updatedAt: "2025-09-15T09:00:00Z",
    customer: "Alice Smith",
  },
  {
    _id: "2",
    userId: "user-b",
    items: [
      {
        productId: "p02",
        name: "Sneakers",
        quantity: 1,
        price: 80,
        image: "/products/sneakers.jpg",
        size: "42",
        color: "White",
      },
    ],
    bill: 80,
    status: "pending",
    createdAt: "2025-09-14T12:00:00Z",
    updatedAt: "2025-09-14T12:30:00Z",
    customer: "Bob Lee",
  },
  {
    _id: "3",
    userId: "user-c",
    items: [
      {
        productId: "p03",
        name: "Graphic Tee",
        quantity: 3,
        price: 30,
        image: "/products/tee.jpg",
        size: "L",
        color: "Black",
      },
    ],
    bill: 90,
    status: "shipped",
    createdAt: "2025-09-13T09:15:00Z",
    updatedAt: "2025-09-13T10:45:00Z",
    customer: "Charlie Brown",
  },
  {
    _id: "4",
    userId: "user-d",
    items: [
      {
        productId: "p04",
        name: "Leather Boots",
        quantity: 1,
        price: 120,
        image: "/products/boots.jpg",
        size: "43",
        color: "Brown",
      },
    ],
    bill: 120,
    status: "cancelled",
    createdAt: "2025-09-12T15:30:00Z",
    updatedAt: "2025-09-12T16:15:00Z",
    customer: "David Johnson",
    }
];
