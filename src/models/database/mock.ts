import { type ProductMetadata, type ProductSize, Size, type User } from "@prisma/client";

export const mockProducts: ProductMetadata[] = [
  {
    id: "smoothie-strawberry-bubble",
    name: "Strawberry Bubble",
    desc: "",
    images: [
      "/img/smoothie-strawberry-bubble.png",
      "/img/tea-lemon-bubble.png",
      "/img/smoothie-strawberry-bubble.png",
      "/img/smoothie-strawberry-bubble.png",
    ],
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

export const mockProductSizes: ProductSize[] = [
  {
    id: "1",
    productMetadataId: "smoothie-strawberry-bubble",
    price: 2,
    size: Size.S,
    stock: 10,
  },
  {
    id: "2",
    productMetadataId: "smoothie-strawberry-bubble",
    price: 2.2,
    size: Size.M,
    stock: 10,
  },
  {
    id: "3",
    productMetadataId: "smoothie-strawberry-bubble",
    price: 2.4,
    size: Size.L,
    stock: 10,
  },
];

export const mockUsers: User[] = [
  {
    id: "1",
    email: "user1@shopbebin.com",
    phone: "09123456789",
    addresses: [
      {
        unitNumber: "123A",
        street: "Street 1",
        district: "District 1",
        city: "City 1",
      },
    ],
    passwordHash: "123456",
  },
  {
    id: "2",
    email: "user2@shopbebin.com",
    phone: "09123456789",
    addresses: [
      {
        unitNumber: "123B",
        street: "Street 2",
        district: "District 2",
        city: "City 2",
      },
    ],
    passwordHash: "123456",
  },
];
