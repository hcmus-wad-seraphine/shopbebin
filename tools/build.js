const esbuild = require("esbuild");

esbuild.buildSync({
    entryPoints: ["src/views/App.tsx"],
    outfile: "public/dist/app.js",
    bundle: true,
    minify: true,
    sourcemap: true,
});

esbuild.buildSync({
    entryPoints: ["src/index.ts"],
    outfile: "api/index.js",
    bundle: true,
    minify: false,
    sourcemap: false,
    format: "cjs",
    platform: "node",
});
