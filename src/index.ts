import "dotenv/config";
import tcpPortUsed from "tcp-port-used";

import express from "express";

import { sequelize } from "./models/database/sequelize";

import RootRouter from "./routes";
import CustomerLoginRouter from "./routes/login";
import CustomerRegisterRouter from "./routes/register";
import CustomerCartRouter from "./routes/cart";
import CustomerCheckoutRouter from "./routes/checkout";

import AdminRouter from "./routes/admin";
import AdminLoginRouter from "./routes/admin/login";

const PORT = Number(process.env.PORT) || 3000;

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log("--> Connection has been established successfully.");
    } catch (error) {
        throw error;
    }

    const app = express();

    app.set("views", "./src/views");
    app.set("view engine", "ejs");

    app.use(express.static("public"));

    app.use("/", RootRouter);
    app.use("/login", CustomerLoginRouter);
    app.use("/register", CustomerRegisterRouter);
    app.use("/cart", CustomerCartRouter);
    app.use("/checkout", CustomerCheckoutRouter);

    app.use("/admin", AdminRouter);
    app.use("/admin/login", AdminLoginRouter);

    const portUsed = await tcpPortUsed.check(PORT);
    if (!portUsed) {
        app.listen(3000, () => {
            console.log(`--> Running on http://localhost:${3000}`);
        });
    } else {
        console.log(`--> Port ${PORT} is already in use.`);
    }
};

start();
