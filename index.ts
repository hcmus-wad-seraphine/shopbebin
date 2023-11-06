import express from "express";
import path from "path";
import fs from "fs";

const getHTML = (fileName: string) => {
    return fs.readFileSync(
        path.resolve(__dirname, `../views/${fileName}`),
        "utf-8"
    );
};

const app = express();

app.use(express.static(path.resolve(__dirname, "../views")));

app.get("/", (req, res) => {
    const html = getHTML("index.html");
    res.send(html);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
