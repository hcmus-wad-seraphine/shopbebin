import { mockProducts } from "../models/database/mock";
import type { ProductMetadata } from "@prisma/client";

export const getProduct = async (id: string) => {
  const fetchProduct = async () => {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(mockProducts.find((product) => product.id === id));
      }, 500);
    });
  };

  const product = await fetchProduct();

  return product as ProductMetadata;
};

export const getProducts = async () => {
  const fetchProducts = async () => {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(mockProducts);
      }, 500);
    });
  };

  const products = await fetchProducts();

  return products as ProductMetadata[];
};
