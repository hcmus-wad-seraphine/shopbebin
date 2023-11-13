import "dotenv/config";
import tcpPortUsed from "tcp-port-used";

import { sequelize } from "./models/database/sequelize";

import app from "./app";

const PORT = Number(process.env.PORT) || 3000;

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log("--> Connection has been established successfully.");
    } catch (error) {
        throw error;
    }

    const portUsed = await tcpPortUsed.check(PORT);
    if (!portUsed) {
        app.listen(3000, () => {
            console.log(`--> Running on http://localhost:${PORT}`);
        });
    } else {
        console.log(`--> Port ${PORT} is already in use.`);
    }
};

start();
