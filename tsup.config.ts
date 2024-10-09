import { defineConfig } from 'tsup';

export default defineConfig({
  bundle: true,
  clean: true,
  entry: {
    main: 'src/index.ts',
    'fetch.worker': 'src/worker.ts'
  },
  external: [
    // Atom
    'atom',
    'electron',

    // Node
    'assert',
    'buffer',
    'child_process',
    'events',
    'fs',
    'os',
    'path',
    'stream',
    'util'
  ],
  format: 'cjs',
  minify: true,
  outDir: 'lib',
  platform: 'node',
  target: 'node14',
  treeshake: true
});
