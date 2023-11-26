import { type ProductMetadata } from "@prisma/client";

import { type Order } from "./Orders/OrderCard";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  toppingIds: string[];
  sizeIds: string[];
  stock: number;
}

export interface Topping {
  id: string;
  name: string;
  price: number;
}

export interface Size {
  id: string;
  name: string;
  price: number;
}

export const products: ProductMetadata[] = [
  {
    id: "smoothie-strawberry-bubble",
    name: "Strawberry Bubble",
    desc: "",
    images: ["/img/smoothie-strawberry-bubble.png"],
  },
  {
    id: "tea-lemon-bubble",
    name: "Lemon Bubble",
    desc: "",
    images: ["/img/tea-lemon-bubble.png"],
  },
  {
    id: "tea-matcha-bubble",
    name: "Matcha Bubble",
    desc: "",
    images: ["/img/tea-matcha-bubble.png"],
  },
  {
    id: "tea-redthai-bubble",
    name: "Red Thai Bubble",
    desc: "",
    images: ["/img/tea-redthai-bubble.png"],
  },
];

export const orders: Order[] = [
  {
    id: "1",
    status: "pending",
    createdAt: new Date(),
    singleProductInvoices: [
      {
        id: "1",
        invoiceId: "1",
        productMetadataId: "smoothie-strawberry-bubble",
        productSizeId: "S",
        quantity: 1,
        userId: "1",
        status: "pending",
      },
      {
        id: "2",
        invoiceId: "1",
        productMetadataId: "smoothie-strawberry-bubble",
        productSizeId: "S",
        quantity: 1,
        userId: "1",
        status: "pending",
      },
    ],
  },
  {
    id: "1",
    status: "pending",
    createdAt: new Date(),
    singleProductInvoices: [
      {
        id: "1",
        invoiceId: "1",
        productMetadataId: "smoothie-strawberry-bubble",
        productSizeId: "S",
        quantity: 1,
        userId: "1",
        status: "pending",
      },
      {
        id: "2",
        invoiceId: "1",
        productMetadataId: "smoothie-strawberry-bubble",
        productSizeId: "S",
        quantity: 1,
        userId: "1",
        status: "pending",
      },
    ],
  },
  {
    id: "1",
    status: "pending",
    createdAt: new Date(),
    singleProductInvoices: [
      {
        id: "1",
        invoiceId: "1",
        productMetadataId: "smoothie-strawberry-bubble",
        productSizeId: "S",
        quantity: 1,
        userId: "1",
        status: "pending",
      },
      {
        id: "2",
        invoiceId: "1",
        productMetadataId: "smoothie-strawberry-bubble",
        productSizeId: "S",
        quantity: 1,
        userId: "1",
        status: "pending",
      },
    ],
  },
];
