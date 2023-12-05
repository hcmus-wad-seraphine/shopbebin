import express from "express";

import * as authController from "../controllers/auth";
import * as productsController from "../controllers/products";
import { requireAuth } from "./auth";

const router = express.Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

router.get("/profile", requireAuth, (req, res) => {
  res.send(req.user);
});

router.get("/products", productsController.fetchProducts);
router.get("/products/categories/:name", productsController.fetchProductsByCategory);
router.get("/products/:id", productsController.fetchProduct);
router.get("/categories/total", productsController.fetchTotalCategories);

export default router;
