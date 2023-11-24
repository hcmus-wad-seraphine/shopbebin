import {
  type Category,
  type ProductMetadata,
  type ProductSize,
  type Topping,
} from "@prisma/client";

export type Product = ProductMetadata & {
  availableSizes: ProductSize[];
  availableToppings: Topping[];
  categories: Category[];
};
