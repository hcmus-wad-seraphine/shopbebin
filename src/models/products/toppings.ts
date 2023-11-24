import { type Topping } from "@prisma/client";

import { getPrismaClient } from "../prisma";

export const createTopping = async (topping: Omit<Topping, "id">) => {
  const client = getPrismaClient();

  const createdTopping = await client.topping.create({
    data: topping,
  });

  return createdTopping;
};

export const getToppings = async () => {
  const client = getPrismaClient();

  return await client.topping.findMany();
};

export const getTopping = async (id: string) => {
  const client = getPrismaClient();

  return await client.topping.findUnique({
    where: {
      id,
    },
  });
};

export const updateTopping = async (topping: Topping) => {
  const client = getPrismaClient();
  const { id, ...data } = topping;

  await client.topping.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteTopping = async (id: string) => {
  const client = getPrismaClient();

  await client.topping.delete({
    where: {
      id,
    },
  });
};
