import { products } from './../views/internal';
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.render("Cart", {
        products,
    });
});

export default router;