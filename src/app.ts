import "dotenv/config";

import express from "express";

import compression from "compression";

import { sequelize } from "./models/database/sequelize";

import RootRouter from "./routes";
import CustomerLoginRouter from "./routes/login";
import CustomerRegisterRouter from "./routes/register";
import CustomerCartRouter from "./routes/cart";
import CustomerCheckoutRouter from "./routes/checkout";

import AdminRouter from "./routes/admin";
import AdminLoginRouter from "./routes/admin/login";

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
