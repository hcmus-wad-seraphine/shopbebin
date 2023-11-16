import express from "express";
import { getProducts } from "../controllers";

const router = express.Router();

router.get("/products", async (req, res) => {
    const products = await getProducts();
    res.json(products);
});

export default router;
