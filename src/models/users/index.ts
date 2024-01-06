import { type Role, type User } from "@prisma/client";

import { getPrismaClient } from "../prisma";

export interface UserProps {
  role?: Role;
  isBanned?: string;
}

export const createUser = async (user: User) => {
  const client = getPrismaClient();

  const { id, ...data } = user;

  const createdUser = await client.user.create({
    data,
  });

  return createdUser;
};

export const getUser = async (id: string) => {
  const client = getPrismaClient();

  return await client.user.findUnique({
    where: {
      id,
    },
  });
};

export const getUserByEmail = async (email: string) => {
  const client = getPrismaClient();

  return await client.user.findUnique({
    where: {
      email,
    },
  });
};

export const getUserByPhone = async (phone: string) => {
  const client = getPrismaClient();
  return await client.user.findUnique({
    where: {
      phone,
    },
  });
};

export const getUsers = async (userProps: UserProps) => {
  const { role, isBanned } = userProps;
  const client = getPrismaClient();
  console.log(role, isBanned);

  return await client.user.findMany({
    where: {
      role,
      isBanned: isBanned === "true",
    },
  });
};

export const updateUser = async (user: User) => {
  const client = getPrismaClient();
  const { id, ...data } = user;

  await client.user.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteUser = async (id: string) => {
  const client = getPrismaClient();

  await client.user.delete({
    where: {
      id,
    },
  });
};
