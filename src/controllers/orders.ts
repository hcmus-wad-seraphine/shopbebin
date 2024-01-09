import { type Order, type OrderStatus, Role, type User } from "@prisma/client";
import { type RequestHandler } from "express";
import { type ErrorResponse } from "react-router-dom";

import {
  createOrder,
  getOrderById,
  getOrders,
  getOrdersByStatus,
  getOrdersByUserId,
  updateOrder,
} from "../models/orders";

export const fetchOrders: RequestHandler = (req, res) => {
  const handleFetchOrders = async () => {
    const user = req.user as User | undefined;
    if (user === undefined) {
      throw new Error("User is undefined");
    }

    if (user.role === Role.USER) {
      const orders = await getOrdersByUserId(user.id);
      return res.json(orders);
    }

    if (user.role === Role.ADMIN) {
      const { date, status, sort } = req.query;
      const offset = req.query.offset !== undefined ? parseInt(req.query.offset as string) : 0;
      const limit = req.query.limit !== undefined ? parseInt(req.query.limit as string) : 10;

      const data = await getOrders({
        date: date ? (date as string) : undefined,
        status: status as OrderStatus | undefined,
        offset,
        limit,
        sortAsc: sort === "asc",
      });

      return res.json(data);
    }

    res.status(403).json({
      status: 403,
      statusText: "Forbidden",
      data: "You don't have permission to access this resource",
    });
  };

  handleFetchOrders().catch((err) => {
    console.log("[ERROR] fetchOrders", err);

    const errorResponse: ErrorResponse = {
      status: 500,
      statusText: "Internal server error",
      data: err,
    };

    res.status(500).json(errorResponse);
  });
};

export const fetchOrderById: RequestHandler = (req, res) => {
  getOrderById(req.params.id)
    .then((order) => {
      res.json(order);
    })
    .catch((err) => res.status(500).json(err));
};

export const fetchOrdersByStatus: RequestHandler = (req, res) => {
  const handleFetchOrdersByStatus = async () => {
    const status = req.params.status;
    if (status === undefined) {
      throw new Error("Status is undefined");
    }

    const orders = await getOrdersByStatus(status as OrderStatus);

    res.json(orders);
  };

  handleFetchOrdersByStatus().catch((err) => {
    console.log("[ERROR] fetchOrdersByStatus", err);

    const errorResponse: ErrorResponse = {
      status: 500,
      statusText: "Internal server error",
      data: err,
    };

    res.status(500).json(errorResponse);
  });
};

export const putOrder: RequestHandler = (req, res) => {
  const handleInsertOrder = async () => {
    const user = req.user as User | undefined;
    if (user === undefined) {
      throw new Error("User is undefined");
    }

    const order = req.body.order;
    if (order === undefined) {
      throw new Error("Order is undefined");
    }

    await createOrder(order);

    res.json(order);
  };

  handleInsertOrder().catch((err) => {
    console.log("[ERROR] createOrder", err);

    const errorResponse: ErrorResponse = {
      status: 500,
      statusText: "Internal server error",
      data: err,
    };

    res.status(500).json(errorResponse);
  });
};

export const patchOrder: RequestHandler = (req, res) => {
  const handleUpdateOrder = async () => {
    const id = req.params.id;
    const order = await getOrderById(id);
    if (!order) {
      throw new Error("Order not found");
    }

    console.log("--> body", req.body);

    const newOrder: Order = {
      ...order,
      ...req.body,
    };

    const updatedOrder = await updateOrder(newOrder);

    res.json(updatedOrder);
  };

  handleUpdateOrder().catch((err) => {
    console.log("[ERROR] updateOrderStatus", err);
    res.status(500).json(err);
  });
};
