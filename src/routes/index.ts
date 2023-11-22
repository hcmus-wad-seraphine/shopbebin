import express from "express";
import { getProduct, getProducts } from "../controllers/products";

const router = express.Router();

router.get("/product/:id", (req, res) => {
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
