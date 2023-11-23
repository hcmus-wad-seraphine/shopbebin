import express from "express";
import { getProduct, getProducts } from "../controllers/products";
import { createUser } from "models/users";

const router = express.Router();

router.post("/register", (req, res) => {
  const { email, phone, password } = req.body;

  const passwordHash = password; // TODO: Hash this using bcrypt

  const user = {
    email: email as string,
    phone: phone as string,
    passwordHash,
    addresses: [],
  };

  const register = async () => {
    await createUser(user);
    res.json({ message: "User created" });
  };

  register().catch((err) => {
    res.status(500).json({ error: err });
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
