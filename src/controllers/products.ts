import { type RequestHandler } from "express";
import { type ErrorResponse } from "react-router-dom";

import { getProduct, getProducts, getTotalProducts } from "../models/products/productMetadatas";

export const fetchProduct: RequestHandler = (req, res) => {
  const handleFetchProduct = async () => {
    const product = await getProduct(req.params.id);
    res.json(product);
  };

  handleFetchProduct().catch((err) => {
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
    const products = await getProducts(offset, limit);
    res.json(products);
  };

  handleFetchProducts().catch((err) => {
    const errorResponse: ErrorResponse = {
      status: 500,
      statusText: "Internal server error",
      data: err,
    };

    res.status(500).json(errorResponse);
  });
};

export const fetchTotalProducts: RequestHandler = (req, res) => {
  const handleFetchTotalProducts = async () => {
    const totalProducts = await getTotalProducts();
    res.json(totalProducts);
  };

  handleFetchTotalProducts().catch((err) => {
    const errorResponse: ErrorResponse = {
      status: 500,
      statusText: "Internal server error",
      data: err,
    };

    res.status(500).json(errorResponse);
  });
};
