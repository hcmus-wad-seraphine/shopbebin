import express from "express";
import RootRouter from "./routes";

const app = express();

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use("/", RootRouter);

app.listen(3000, () => {
    console.log("--> Running on http://localhost:3000");
});
