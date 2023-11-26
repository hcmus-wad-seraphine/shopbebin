import {
  type Category,
  type ProductMetadata,
  type ProductSize,
  type ProductTopping,
  type ToppingMetadata,
} from "@prisma/client";

export type Topping = ProductTopping & {
  topping: ToppingMetadata;
};

export type Product = ProductMetadata & {
  availableSizes: ProductSize[];
  availableToppings: Topping[];
  category: Category;
};
