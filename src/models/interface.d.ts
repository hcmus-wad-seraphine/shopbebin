import {
  type ProductMetadata,
  type ProductReview,
  type ProductSize,
  type ProductTopping,
  type ReviewMetadata,
  type ToppingMetadata,
  type User,
} from "@prisma/client";

export type ShopbebinTopping = ProductTopping & {
  topping: ToppingMetadata;
};

export type ShopbebinReviewUser = ReviewMetadata & {
  user: User;
};

export type ShopbebinReview = ProductReview & {
  reviewMetadata: ShopbebinReviewUser;
};

export type ShopbebinProduct = ProductMetadata & {
  availableSizes: ProductSize[];
  availableToppings: ShopbebinTopping[];
  reviews: ShopbebinReview[];
};
