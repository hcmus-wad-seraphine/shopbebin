import express from "express";

import * as authController from "../controllers/auth";
import * as orderController from "../controllers/order";
import * as productsController from "../controllers/products";
import * as profileController from "../controllers/profile";
import * as vnpayController from "../controllers/vnpay";
import { requireAuth } from "./auth";

const router = express.Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

router.get("/profile", requireAuth, (req, res) => {
  res.send(req.user);
});
router.post("/profile/change-password", profileController.changePassword);

router.post("/update-cart", requireAuth, productsController.updateCart);

router.get("/products", productsController.fetchProducts);
router.get("/products/categories/:category", productsController.fetchProducts);
router.get("/products/:id", productsController.fetchProduct);

router.post("/checkout", requireAuth, vnpayController.handleCheckout);

router.get("/orders", requireAuth, orderController.fetchOrders);
router.post("/orders", requireAuth, orderController.makeOrder);
router.get("/orders/:id", requireAuth, orderController.fetchOrderById);

router.get("/categories/total", productsController.fetchTotalCategories);

export default router;
