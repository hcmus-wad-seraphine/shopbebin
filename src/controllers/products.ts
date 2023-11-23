import type { ProductMetadata } from "@prisma/client";
import { type RequestHandler } from "express";

import { mockProducts } from "../models/database/mock";
import { type ApiResponse } from "./types";

export const getProduct: RequestHandler = (req, res) => {
  const fetchProduct = async () => {
    const product = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(mockProducts.find((product) => product.id === req.params.id));
      }, 200);
    });

    const response: ApiResponse = {
      ok: true,
      data: product as ProductMetadata,
    };

    res.json(response);
  };

  fetchProduct().catch(() => {
    const response: ApiResponse = {
      ok: false,
      errorMessage: "Product not found",
    };
    res.status(404).json(response);
  });
};

export const getProducts: RequestHandler = (req, res) => {
  const fetchProducts = async () => {
    const products = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(mockProducts);
      }, 200);
    });

    const response: ApiResponse = {
      ok: true,
      data: products,
    };

    res.json(response);
  };

  fetchProducts().catch(() => {
    const response: ApiResponse = {
      ok: false,
      errorMessage: "Products not found",
    };
    res.status(404).json(response);
  });
};
