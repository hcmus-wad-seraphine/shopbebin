import { categories, products } from '../views/internal';
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", {
        categories,
        products,
        pageNumber: 1,
    });
});

export default router;
