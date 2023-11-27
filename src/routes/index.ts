import express from "express";

import * as authController from "../controllers/auth";
import * as productsController from "../controllers/products";

const router = express.Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

router.get("/products/total", productsController.fetchTotalProducts);
router.get("/products/:id", productsController.fetchProduct);
router.get("/products", productsController.fetchProducts);

export default router;
