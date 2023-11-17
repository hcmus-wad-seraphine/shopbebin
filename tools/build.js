import esbuild from "esbuild";

esbuild.buildSync({
    entryPoints: ["src/views/App.tsx"],
    bundle: true,
    minify: true,
    sourcemap: true,
    outfile: "public/dist/app.js",
});

esbuild.buildSync({
    entryPoints: ["src/index.ts"],
    bundle: true,
    minify: true,
    sourcemap: true,
    platform: "node",
    format: "esm",
    outfile: "public/dist/api.js",
});
