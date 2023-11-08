const esbuild = require("esbuild");

esbuild
    .build({
        entryPoints: ["src/index.ts"],
        outfile: "public/dist/bundle.js",
        bundle: true,
        minify: true,
        sourcemap: true,
        target: ["es2020"],
        platform: "node",
        plugins: [],
    })
    .catch(() => process.exit(1));
