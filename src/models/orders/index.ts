import { type Order } from "@prisma/client";

import { getPrismaClient } from "../prisma";

export const getOrderById = async (id: string) => {
  const client = getPrismaClient();

  return await client.order.findUnique({
    where: {
      id,
    },
  });
};

export const createOrder = async (order: Order) => {
  const client = getPrismaClient();

  const createdOrder = await client.order.create({
    data: order,
  });

  return createdOrder;
};

export const getOrder = async (id: string) => {
  const client = getPrismaClient();

  const order: Order | null = await client.order.findUnique({
    where: {
      id,
    },
  });

  return order;
};

export const getOrders = async () => {
  const client = getPrismaClient();

  const orders: Order[] = await client.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
};

export const getOrdersByUserId = async (userId: string) => {
  const client = getPrismaClient();

  const orders: Order[] = await client.order.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
};

export const updateOrder = async (id: string, order: Order) => {
  const client = getPrismaClient();

  const updatedOrder = await client.order.update({
    where: {
      id,
    },
    data: order,
  });

  return updatedOrder;
};