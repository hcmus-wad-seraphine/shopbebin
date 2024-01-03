import { type OrderStatus, type User } from "@prisma/client";
import { type RequestHandler } from "express";
import { type ErrorResponse } from "react-router-dom";

import { createOrder, getOrderById, getOrdersByStatus, getOrdersByUserId } from "../models/orders";

export const fetchOrders: RequestHandler = (req, res) => {
  const handleFetchOrders = async () => {
    const user = req.user as User | undefined;
    if (user === undefined) {
      throw new Error("User is undefined");
    }

    const orders = await getOrdersByUserId(user.id);

    res.json(orders);
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

export const makeOrder: RequestHandler = (req, res) => {
  const handleMakeOrder = async () => {
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

  handleMakeOrder().catch((err) => {
    console.log("[ERROR] createOrder", err);

    const errorResponse: ErrorResponse = {
      status: 500,
      statusText: "Internal server error",
      data: err,
    };

    res.status(500).json(errorResponse);
  });
};
