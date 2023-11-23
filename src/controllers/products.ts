import { type RequestHandler } from "express";
import { type ErrorResponse } from "react-router-dom";

import { mockProducts } from "../models/database/mock";

export const getProduct: RequestHandler = (req, res) => {
  const fetchProduct = async () => {
    const product = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(mockProducts.find((product) => product.id === req.params.id));
      }, 200);
    });

    res.json(product);
  };

  fetchProduct().catch((err) => {
    const errorResponse: ErrorResponse = {
      status: 404,
      statusText: "Product not found",
      data: err,
    };

    res.status(404).json(errorResponse);
  });
};

export const getProducts: RequestHandler = (req, res) => {
  const fetchProducts = async () => {
    const products = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(mockProducts);
      }, 200);
    });

    res.json(products);
  };

  fetchProducts().catch((err) => {
    const errorResponse: ErrorResponse = {
      status: 500,
      statusText: "Internal server error",
      data: err,
    };

    res.status(500).json(errorResponse);
  });
};
