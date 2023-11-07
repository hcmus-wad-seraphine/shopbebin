import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", {
        param1: "value1",
        param2: "value2",
    });
});

export default router;
