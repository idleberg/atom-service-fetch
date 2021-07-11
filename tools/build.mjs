import logSymbols from 'log-symbols';
import { build } from 'esbuild';

const options = {
  bundle: true,
  external: [
    'atom',
    'electron'
  ],
  minify: true,
  platform: 'node',
  sourcemap: true,
  target: 'es2018'
};

/* eslint-disable @typescript-eslint/no-var-requires */
build({
  ...options,
  entryPoints: [
    'src/worker.ts'
  ],
  outfile: 'lib/fetch.worker.js',
  watch: process.env.ESBUILD_WATCH && {
    onRebuild(error) {
      if (error) {
        console.error(`${logSymbols.error} Worker build failed:`, error.errors.text);
      } else {
        console.log(`${logSymbols.success} Worker build succeeded`);
      }
    },
  },
}).catch(() => process.exit(1));

build({
  ...options,
  entryPoints: [
    'src/index.ts'
  ],
  outfile: 'lib/main.js',
  watch: process.env.ESBUILD_WATCH && {
    onRebuild(error) {
      if (error) {
        console.error(`${logSymbols.error} Main build failed:`, error.errors.text);
      } else {
        console.log(`${logSymbols.success} Main build succeeded`);
      }
    },
  },
}).catch(() => process.exit(1));
