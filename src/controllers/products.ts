import { type RequestHandler } from "express";
import { type ErrorResponse } from "react-router-dom";

import { getCategories } from "../models/products";
import { getProduct, getProducts } from "../models/products/productMetadatas";

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
    const search = req.query.search as string | undefined;
    const lowerBound =
      req.query.lowerBound !== undefined ? parseInt(req.query.lowerBound as string) : -1;
    const upperBound =
      req.query.upperBound !== undefined ? parseInt(req.query.upperBound as string) : 100000;
    const sortAscending = !(req.query.sortOrder === "descending");

    const category = req.params.category;

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
