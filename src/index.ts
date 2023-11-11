import express from "express";
import RootRouter from "./routes";
import LoginRouter from "./routes/login";
import net from "net";

const app = express();

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static("public"));

const port = 3000;

const server = net.createServer();

server.once("error", (error) => {
    if (error.name === "EADDRINUSE") {
        console.log(`Port ${port} is already in use.`);
    } else {
        console.error("Error starting server:", error);
    }
});

server.once("listening", () => {
    server.close();
    app.use("/", RootRouter);
    app.use("/login", LoginRouter);
    app.listen(port, () => {
        console.log("--> Running on http://localhost:3000");
    });
});

server.listen(port);