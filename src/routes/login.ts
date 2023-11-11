import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.render("Login", {
        param1: "value3",
        param2: "value4",
    });
});

export default router;
