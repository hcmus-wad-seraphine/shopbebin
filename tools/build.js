import esbuild from "esbuild";

esbuild.buildSync({
    entryPoints: ["src/views/App.tsx"],
    bundle: true,
    minify: true,
    sourcemap: true,
    outfile: "public/dist/app.js",
});
