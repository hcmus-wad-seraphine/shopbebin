import express from "express";
import multer from "multer";

import * as authController from "../controllers/auth";
import * as categoriesController from "../controllers/categories";
import * as ordersController from "../controllers/orders";
import * as productsController from "../controllers/products";
import * as profilesController from "../controllers/profiles";
import * as reviewsController from "../controllers/reviews";
import * as storageController from "../controllers/storage";
import * as usersController from "../controllers/users";
import * as vnpayController from "../controllers/vnpay";
import { requireAdminAuth, requireAuth } from "./auth";

const router = express.Router();

const upload = multer();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

router.get("/profile", requireAuth, (req, res) => {
  res.send(req.user);
});
router.post("/profile/change-password", requireAuth, profilesController.changePassword);
router.post("/profile/update", requireAuth, profilesController.updateProfile);

router.post("/update-cart", requireAuth, productsController.updateCart);

router.get("/products", productsController.fetchProducts);
router.get("/products/categories/:category", productsController.fetchProducts);
router.get("/products/toppings", productsController.fetchToppings);
router.get("/products/:id", productsController.fetchProduct);
router.put("/products/:id", requireAdminAuth, productsController.putProduct);

router.post("/checkout", requireAuth, vnpayController.handleCheckout);

router.get("/orders", requireAuth, ordersController.fetchOrders);
router.get("/orders/status/:status", requireAuth, ordersController.fetchOrdersByStatus);
router.get("/orders/:id", requireAuth, ordersController.fetchOrderById);
router.post("/orders", requireAuth, ordersController.putOrder);
router.patch("/orders/:id", requireAdminAuth, ordersController.patchOrder);

router.post("/reviews", requireAuth, reviewsController.makeReview);

router.get("/categories/total", productsController.fetchTotalCategories);

router.post("/upload/avatar", requireAuth, upload.single("avatar"), storageController.uploadImage);

router.get("/users", requireAdminAuth, usersController.fetchUsers);
router.post("/users/update", requireAdminAuth, profilesController.updateProfile);

router.get("/categories", categoriesController.fetchCategories);
router.post("/categories", requireAdminAuth, categoriesController.changeCategory);

export default router;
