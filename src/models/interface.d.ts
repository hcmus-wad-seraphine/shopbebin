import {
  type ProductMetadata,
  type ProductReview,
  type ProductSize,
  type ProductTopping,
  type ReviewMetadata,
  type ToppingMetadata,
  type User,
} from "@prisma/client";

export type Topping = ProductTopping & {
  topping: ToppingMetadata;
};

export type ReviewUser = ReviewMetadata & {
  user: User;
};

export type Review = ProductReview & {
  reviewMetadata: ReviewUser;
};

export type Product = ProductMetadata & {
  availableSizes: ProductSize[];
  availableToppings: Topping[];
  reviews: Review[];
};
