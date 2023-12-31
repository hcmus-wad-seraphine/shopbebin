import { type Order, type OrderStatus } from "@prisma/client";

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

export const getOrders = async (props: {
  offset?: number;
  limit?: number;
  date?: string;
  status?: OrderStatus;
  sortAsc?: boolean;
}) => {
  const client = getPrismaClient();

  const startDate = props.date ? new Date(props.date).toISOString() : undefined;

  let endDate;
  if (props.date) {
    const tempDate = new Date(props.date);
    tempDate.setDate(tempDate.getDate() + 1);
    tempDate.setHours(0, 0, 0, 0);
    endDate = tempDate.toISOString();
  }

  const orders: Order[] = await client.order.findMany({
    where: {
      status: props.status,
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: {
      createdAt: props.sortAsc ? "asc" : "desc",
    },
    skip: props.offset,
    take: props.limit,
  });

  const total = await client.order.count({
    where: {
      status: props.status,
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  return {
    orders,
    total,
  };
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

export const getOrdersByStatus = async (status: OrderStatus) => {
  const client = getPrismaClient();

  const orders: Order[] = await client.order.findMany({
    where: {
      status,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
};

export const updateOrder = async (order: Order) => {
  const client = getPrismaClient();
  const { id, ...data } = order;

  const updatedOrder = await client.order.update({
    where: {
      id,
    },
    data,
  });

  return updatedOrder;
};
