import express from "express";
import { join, resolve } from "path";
import router from "./routes";

const app = express();

const publicDir = resolve("public");

app.use(express.static(publicDir));

app.use("/api", router);

app.get("*", (req, res) => {
    res.sendFile(join(publicDir, "index.html"));
});

const port = process.env.PORT || 3120;
app.listen(port);

console.log("App is listening on port " + port);
