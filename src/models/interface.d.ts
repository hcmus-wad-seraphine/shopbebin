import {
  type ProductMetadata,
  type ProductSize,
  type ProductTopping,
  type Review,
  type ToppingMetadata,
  type User,
} from "@prisma/client";

export type ShopbebinTopping = ProductTopping & {
  topping: ToppingMetadata;
};

export type ShopbebinReview = Review & {
  User: User;
};

export type ShopbebinProduct = ProductMetadata & {
  availableSizes: ProductSize[];
  availableToppings: ShopbebinTopping[];
  reviews: ShopbebinReview[];
};
