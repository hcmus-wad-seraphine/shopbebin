const esbuild = require("esbuild");

esbuild.buildSync({
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "node",
  outfile: "public/dist/api.js",
  packages: "external",
  minify: true,
});

esbuild.buildSync({
  entryPoints: ["src/views/App.tsx"],
  bundle: true,
  platform: "browser",
  outfile: "public/dist/app.js",
  minify: true,
});
