import { type ProductSize } from "@prisma/client";

import { getPrismaClient } from "../prisma";

export const createProductSize = async (productSize: Omit<ProductSize, "id">) => {
  const client = getPrismaClient();

  const createdProductSize = await client.productSize.create({
    data: productSize,
  });

  return createdProductSize;
};

export const getProductSizes = async () => {
  const client = getPrismaClient();

  return await client.productSize.findMany();
};

export const getProductSizesByProductMetadataId = async (productMetadataId: string) => {
  const client = getPrismaClient();

  return await client.productSize.findMany({
    where: {
      productMetadataId,
    },
  });
};

export const getProductSize = async (id: string) => {
  const client = getPrismaClient();

  return await client.productSize.findUnique({
    where: {
      id,
    },
  });
};

export const updateProductSize = async (productSize: ProductSize) => {
  const client = getPrismaClient();
  const { id, ...data } = productSize;

  await client.productSize.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteProductSize = async (id: string) => {
  const client = getPrismaClient();

  await client.productSize.delete({
    where: {
      id,
    },
  });
};
