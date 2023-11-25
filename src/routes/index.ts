import express from "express";

import * as authController from "../controllers/auth";
import * as productsController from "../controllers/products";

const router = express.Router();

router.post("/auth/register", authController.register);

router.get("/products/:id", productsController.getProduct);
router.get("/products", productsController.getProducts);

export default router;
