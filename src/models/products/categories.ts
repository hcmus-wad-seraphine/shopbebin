import { type Category } from "@prisma/client";

import { getPrismaClient } from "../prisma";

export const createCategory = async (category: Category) => {
  const client = getPrismaClient();

  const { id, ...data } = category;

  const createdCategory = await client.category.create({
    data,
  });

  return createdCategory;
};

export const getCategories = async () => {
  const client = getPrismaClient();

  return await client.category.findMany();
};

export const getCategory = async (id: string) => {
  const client = getPrismaClient();

  return await client.category.findUnique({
    where: {
      id,
    },
  });
};

export const getCategoryByName = async (name: string) => {
  const client = getPrismaClient();

  return await client.category.findUnique({
    where: {
      name,
    },
  });
};

export const updateCategory = async (category: Category) => {
  const client = getPrismaClient();
  const { id, ...data } = category;

  const result = await client.category.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

export const deleteCategory = async (id: string) => {
  const client = getPrismaClient();

  await client.category.delete({
    where: {
      id,
    },
  });
};
