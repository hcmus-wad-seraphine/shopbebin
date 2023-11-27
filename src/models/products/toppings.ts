import { type ProductTopping, type ToppingMetadata } from "@prisma/client";

import { getPrismaClient } from "../prisma";

export const createTopping = async (topping: ToppingMetadata) => {
  const client = getPrismaClient();

  const { id, ...data } = topping;

  const createdTopping = await client.toppingMetadata.create({
    data,
  });

  return createdTopping;
};

export const createProductTopping = async (productTopping: ProductTopping) => {
  const client = getPrismaClient();

  const createdProductTopping = await client.productTopping.create({
    data: {
      productMetadataId: productTopping.productMetadataId,
      toppingMetadataId: productTopping.toppingMetadataId,
    },
    include: {
      topping: true,
    },
  });

  return createdProductTopping;
};

export const getProductTopping = async (id: string) => {
  const client = getPrismaClient();

  return await client.productTopping.findUnique({
    where: {
      id,
    },
    include: {
      topping: true,
    },
  });
};

export const getToppings = async () => {
  const client = getPrismaClient();

  return await client.toppingMetadata.findMany();
};

export const getTopping = async (id: string) => {
  const client = getPrismaClient();

  return await client.toppingMetadata.findUnique({
    where: {
      id,
    },
  });
};

export const getToppingByName = async (name: string) => {
  const client = getPrismaClient();

  return await client.toppingMetadata.findUnique({
    where: {
      name,
    },
  });
};

export const updateTopping = async (topping: ToppingMetadata) => {
  const client = getPrismaClient();
  const { id, ...data } = topping;

  await client.toppingMetadata.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteTopping = async (id: string) => {
  const client = getPrismaClient();

  await client.productTopping.deleteMany({
    where: {
      toppingMetadataId: id,
    },
  });

  await client.toppingMetadata.delete({
    where: {
      id,
    },
  });
};
