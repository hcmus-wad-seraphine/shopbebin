import express from "express";
import bcrypt from "bcrypt";
import { getProduct, getProducts } from "../controllers/products";
import { createUser } from "models/users";

const router = express.Router();

router.post("/register", (req, res) => {
  const { email, phone, password } = req.query;

  const saltRounds = 10;

  bcrypt.hash(password as string, saltRounds, async (err, passwordHash) => {
    if (err !== null) {
      res.status(500).json({
        message: "[ERROR: bcrypt]" + err,
      });
      return;
    }

    const user = {
      email: email as string,
      phone: phone as string,
      passwordHash,
      addresses: [],
    };

    try {
      await createUser(user);
      res.status(201).json({
        message: "User created",
      });
    } catch (error) {
      res.status(500).json({
        message: "[ERROR: create user]" + (error as string),
      });
    }
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
