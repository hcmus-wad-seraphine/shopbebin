import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.render("admin");
});

router.get("/profile", (req, res) => {
    res.render("admin/Profile");
});

router.get("/accounts", (req, res) => {
    res.render("admin/Accounts");
});

router.get("/vendors", (req, res) => {
    res.render("admin/Vendors");
});

router.get("/products", (req, res) => {
    res.render("admin/Products");
});

export default router;
