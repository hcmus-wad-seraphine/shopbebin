const esbuild = require("esbuild");
const path = require("path");

const buildDir = path.resolve(__dirname, "./public/dist");

esbuild
    .build({
        entryPoints: ["./index.js"],
        outfile: path.join(buildDir, "bundle.js"),
        bundle: true,
        minify: true,
        sourcemap: true,
        target: ["es2020"],
        platform: "node",
    })
    .catch(() => process.exit(1));
