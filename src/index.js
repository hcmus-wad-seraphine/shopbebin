import express from "express";
import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const publicDir = resolve(__dirname, "..", "public");

app.use(express.static(publicDir));

app.get("*", (req, res) => {
    res.sendFile(join(publicDir, "index.html"));
});

const port = process.env.PORT || 3120;
app.listen(port);

console.log("App is listening on port " + port);
