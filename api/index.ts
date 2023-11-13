import "dotenv/config";

import express from "express";

import compression from "compression";

import RootRouter from "../src/routes";
import CustomerLoginRouter from "../src/routes/login";
import CustomerRegisterRouter from "../src/routes/register";
import CustomerCartRouter from "../src/routes/cart";
import CustomerCheckoutRouter from "../src/routes/checkout";

import AdminRouter from "../src/routes/admin";
import AdminLoginRouter from "../src/routes/admin/login";

const app = express();

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(compression());
app.use(express.static("public"));

app.use("/", RootRouter);
app.use("/login", CustomerLoginRouter);
app.use("/register", CustomerRegisterRouter);
app.use("/cart", CustomerCartRouter);
app.use("/checkout", CustomerCheckoutRouter);

app.use("/admin", AdminRouter);
app.use("/admin/login", AdminLoginRouter);

export default app;
