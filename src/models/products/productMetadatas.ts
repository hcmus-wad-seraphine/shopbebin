import { type ProductMetadata } from "@prisma/client";

import { getPrismaClient } from "../prisma";

export const createProduct = async (productMetadata: Omit<ProductMetadata, "id">) => {
  const client = getPrismaClient();

  await client.productMetadata.create({
    data: productMetadata,
  });
};

export const getProduct = async (id: string) => {
  const client = getPrismaClient();
  return await client.productMetadata.findUnique({
    where: {
      id,
    },
    include: {
      availableSizes: true,
      availableToppings: true,
      Category: true,
    },
  });
};

export const getProducts = async () => {
  const client = getPrismaClient();
  return await client.productMetadata.findMany({
    include: {
      availableSizes: true,
      availableToppings: true,
      Category: true,
    },
  });
};

export const updateProduct = async (product: ProductMetadata) => {
  const client = getPrismaClient();
  const { id, ...data } = product;

  await client.productMetadata.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteProduct = async (id: string) => {
  const client = getPrismaClient();

  await client.productMetadata.delete({
    where: {
      id,
    },
  });
};
