import { type CartItem, type User } from "@prisma/client";
import { type RequestHandler } from "express";
import { type ErrorResponse } from "react-router-dom";

import { getCategories, getProduct, getProducts } from "../models/products";
import { updateUser } from "../models/users";

export const fetchProduct: RequestHandler = (req, res) => {
  const handleFetchProduct = async () => {
    const product = await getProduct(req.params.id);
    res.json(product);
  };

  handleFetchProduct().catch((err) => {
    console.log("[ERROR] handleFetchProduct()", err);

    const errorResponse: ErrorResponse = {
      status: 404,
      statusText: "Product not found",
      data: err,
    };

    res.status(404).json(errorResponse);
  });
};

export const fetchProducts: RequestHandler = (req, res) => {
  const handleFetchProducts = async () => {
    const offset = req.query.offset !== undefined ? parseInt(req.query.offset as string) : 0;
    const limit = req.query.limit !== undefined ? parseInt(req.query.limit as string) : 10;
    const search = req.query.search as string | undefined;
    const lowerBound =
      req.query.lowerBound !== undefined ? parseInt(req.query.lowerBound as string) : -1;
    const upperBound =
      req.query.upperBound !== undefined ? parseInt(req.query.upperBound as string) : 100000;
    const sortAscending = !(req.query.sortOrder === "desc");

    const category = req.query.category as string | undefined;

    const data = await getProducts({
      category,
      offset,
      limit,
      search,
      lowerBound,
      upperBound,
      sortAscending,
    });
    res.json(data);
  };

  handleFetchProducts().catch((err) => {
    console.log("[ERROR] handleFetchProducts()", err);

    const errorResponse: ErrorResponse = {
      status: 500,
      statusText: "Internal server error",
      data: err,
    };

    res.status(500).json(errorResponse);
  });
};

export const fetchTotalCategories: RequestHandler = (req, res) => {
  const handleFetchTotalCategories = async () => {
    const totalCategories = await getCategories();
    res.json(totalCategories);
  };

  handleFetchTotalCategories().catch((err) => {
    const errorResponse: ErrorResponse = {
      status: 500,
      statusText: "Internal server error",
      data: err,
    };

    res.status(500).json(errorResponse);
  });
};

export const updateCart: RequestHandler = (req, res) => {
  const handleUpdateCart = async () => {
    const cart = req.body.cart as CartItem[] | undefined;
    if (cart === undefined) {
      throw new Error("Cart is undefined");
    }

    const user = req.user as User | undefined;
    if (user === undefined) {
      throw new Error("User is undefined");
    }

    user.cart = cart;
    await updateUser(user);

    res.json({ status: 200, statusText: "Cart updated successfully" });
  };

  handleUpdateCart().catch((err) => {
    console.log("[ERROR] updateCart", err);

    const errorResponse: ErrorResponse = {
      status: 500,
      statusText: "Internal server error",
      data: err,
    };

    res.status(500).json(errorResponse);
  });
};
