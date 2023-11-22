import express from "express";
import { getProduct, getProducts } from "../controllers";

const router = express.Router();

router.get("/product/:id", async (req, res) => {
    const product = await getProduct(req.params.id);
    res.json(product);
});

router.get("/products", async (req, res) => {
    const products = await getProducts();
    res.json(products);
});

export default router;
