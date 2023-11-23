import express from "express";
import bcrypt from "bcryptjs";
import { getProduct, getProducts } from "../controllers/products";
import { createUser } from "../models/users";

export interface ApiResponse {
  ok: boolean;
  data?: object;
  message?: string;
  errorMessage?: string;
}

const router = express.Router();

router.post("/register", (req, res) => {
  const { email, phone, password } = req.body;

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const passwordHash = bcrypt.hashSync(password, salt);

  const user = {
    email: email as string,
    phone: phone as string,
    passwordHash,
    addresses: [],
  };

  const register = async () => {
    await createUser(user);
    const response: ApiResponse = {
      ok: true,
      data: user,
    };
    res.json(response);
  };

  register().catch(() => {
    const response: ApiResponse = {
      ok: false,
      errorMessage: "Email or phone number already exists",
    };
    res.status(500).json(response);
  });
});

router.get("/products/:id", (req, res) => {
  const fetchProduct = async () => {
    const product = await getProduct(req.params.id);
    res.json(product);
  };

  fetchProduct().catch((err) => {
    console.log("[ERROR: fetch product]", err);
  });
});

router.get("/products", (req, res) => {
  const fetchProducts = async () => {
    const products = await getProducts();
    res.json(products);
  };

  fetchProducts().catch((err) => {
    console.log("[ERROR: fetch products]", err);
  });
});

export default router;
