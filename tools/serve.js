const esbuild = require("esbuild");

const serve = async () => {
  const expressCtx = await esbuild.context({
    entryPoints: ["src/index.ts"],
    bundle: true,
    platform: "node",
    outfile: "public/dist/api.js",
    packages: "external",
  });

  const reactCtx = await esbuild.context({
    entryPoints: ["src/views/App.tsx"],
    bundle: true,
    platform: "browser",
    outfile: "public/dist/app.js",
  });

  await Promise.all([expressCtx.watch(), reactCtx.watch()]);
};

serve().catch((err) => {
  console.error(err);
  process.exit(1);
});
