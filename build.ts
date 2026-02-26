import { startBuild } from "./esbuild.js";

startBuild()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .then(() => process.exit(0));
