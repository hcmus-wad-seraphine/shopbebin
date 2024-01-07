import { type RequestHandler } from "express";

import { deleteCategory, getCategories, updateCategory } from "../models/products";

export const fetchCategories: RequestHandler = (req, res) => {
  const handleFetchCategories = async () => {
    const categories = await getCategories();
    res.json(categories);
  };

  handleFetchCategories().catch((err) => {
    console.log("[ERROR] fetchCategories", err);
    res.status(500).json(err);
  });
};

export const changeCategory: RequestHandler = (req, res) => {
  const category = req.body;

  const handleUpdateCategory = async () => {
    const result = await updateCategory(category);
    console.log(result);
    res.json(result);
  };

  handleUpdateCategory().catch((err) => {
    console.log("[ERROR] fetchCategories", err);
    res.status(500).json(err);
  });
};

export const removeCategory: RequestHandler = (req, res) => {
  const { id } = req.params;

  const handleRemoveCategory = async () => {
    await deleteCategory(id);
    res.json();
  };

  handleRemoveCategory().catch((err) => {
    console.log("[ERROR] fetchCategories", err);
    res.status(500).json(err);
  });
};
