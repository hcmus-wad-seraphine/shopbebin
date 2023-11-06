const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

const viewsDir = path.resolve(__dirname, "./views");
const buildDir = path.resolve(__dirname, "./build");

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

fs.readdir(viewsDir, (err, files) => {
    if (err) {
        console.error("Error reading views directory:", err);
        process.exit(1);
    }

    const cssFiles = files.filter((file) => file.endsWith(".css"));

    cssFiles.forEach((file) => {
        const entryPoint = path.join(viewsDir, file);
        const outFile = path.join(buildDir, file);

        esbuild
            .build({
                entryPoints: [entryPoint],
                outfile: outFile,
                bundle: true,
                minify: true,
                sourcemap: true,
                target: ["es2020"],
                platform: "browser",
            })
            .catch(() => {
                console.error(`Error building ${file}`);
                process.exit(1);
            });
    });
});
