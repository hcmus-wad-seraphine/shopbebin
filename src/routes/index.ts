import express from "express";

import * as authController from "../controllers/auth";
import * as ordersController from "../controllers/orders";
import * as productsController from "../controllers/products";
import * as profilesController from "../controllers/profiles";
import * as reviewsController from "../controllers/reviews";
import * as storageController from "../controllers/storage";
import * as vnpayController from "../controllers/vnpay";
import { requireAuth } from "./auth";

const router = express.Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

router.get("/profile", requireAuth, (req, res) => {
  res.send(req.user);
});
router.post("/profile/change-password", profilesController.changePassword);
router.post("/profile/update", requireAuth, profilesController.updateProfile);

router.post("/update-cart", requireAuth, productsController.updateCart);

router.get("/products", productsController.fetchProducts);
router.get("/products/categories/:category", productsController.fetchProducts);
router.get("/products/:id", productsController.fetchProduct);

router.post("/checkout", requireAuth, vnpayController.handleCheckout);

router.get("/orders", requireAuth, ordersController.fetchOrders);
router.get("/orders/status/:status", requireAuth, ordersController.fetchOrdersByStatus);
router.get("/orders/:id", requireAuth, ordersController.fetchOrderById);
router.post("/orders", requireAuth, ordersController.makeOrder);
router.post("/orders/status/:id", requireAuth, ordersController.updateOrderStatus);

router.post("/reviews", requireAuth, reviewsController.makeReview);

router.get("/categories/total", productsController.fetchTotalCategories);

router.post("/storage/upload-image", requireAuth, storageController.uploadImage);

export default router;
