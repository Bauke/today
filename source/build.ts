// Import native Node libraries.
import path from "node:path";
import process from "node:process";
import fsp from "node:fs/promises";
// Import Esbuild and associated plugins.
import esbuild from "esbuild";
import copyPlugin from "esbuild-copy-static-files";
import {sassPlugin} from "esbuild-sass-plugin";
// Import PostCSS and associated plugins.
import cssnano from "cssnano";
import postcss from "postcss";

/**
 * Create an absolute path from a given relative one, using the directory
 * this file is located in as the base.
 *
 * @param relative The relative path to make absolute.
 * @returns The absolute path.
 */
function toAbsolutePath(relative: string): string {
  return new URL(relative, import.meta.url).pathname;
}

// Create variables based on the environment.
const dev = process.env.NODE_ENV === "development";
const watch = process.env.WATCH === "true";

// Create absolute paths to various directories.
const outDir = toAbsolutePath("../build");
const sourceDir = toAbsolutePath("../source");

// Ensure that the output directory exists.
await fsp.mkdir(outDir, {recursive: true});

const cssProcessor = postcss([cssnano()]);

const options: esbuild.BuildOptions = {
  bundle: true,
  // Define variables to be replaced in the code. Note that these are replaced
  // "as is" and so we have to stringify them as JSON, otherwise a string won't
  // have its quotes for example.
  define: {
    $dev: JSON.stringify(dev),
  },
  entryPoints: [path.join(sourceDir, "setup.tsx")],
  format: "esm",
  logLevel: "info",
  minify: !dev,
  outdir: outDir,
  plugins: [
    // Copy all files from `source/assets/` to the output directory.
    copyPlugin({src: path.join(sourceDir, "assets/"), dest: outDir}),

    // Compile SCSS to CSS.
    sassPlugin({
      type: "style",
      async transform(source) {
        // In development, don't do any extra processing.
        if (dev) {
          return source;
        }

        // But in production, run the CSS through PostCSS.
        const {css} = await cssProcessor.process(source, {from: undefined});
        return css;
      },
    }),
  ],
  // Link sourcemaps in development but omit them in production.
  sourcemap: dev ? "linked" : false,
  splitting: true,
  // Target ES2022, and the first Chromium and Firefox releases from 2022.
  target: ["es2022", "chrome97", "firefox102"],
  treeShaking: true,
};

if (watch) {
  const context = await esbuild.context(options);
  await context.watch();
} else {
  await esbuild.build(options);
}
