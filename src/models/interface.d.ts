import {
  type Category,
  type ProductMetadata,
  type ProductSize,
  type ProductTopping,
} from "@prisma/client";

export type Product = ProductMetadata & {
  availableSizes: ProductSize[];
  availableToppings: ProductTopping[];
  category: Category;
};
