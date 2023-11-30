/* 
    build.mjs
    Custom Vite build script for extension files,
    to execute after default build finishes its work.
*/
import { build } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const extScripts = [
  {
    entry: path.resolve(__dirname, 'src/scripts/main.js'),
    fileName: 'main'
  },
  {
    entry: path.resolve(__dirname, 'src/scripts/contentscript.js'),
    fileName: 'contentscript'
  },
];

extScripts.forEach(async (scr) => {
  await build({
    build: {
      outDir: '.vercel/output/static',
      lib: {
        ...scr,
        formats: ['es']
      },
      emptyOutDir: false
    },
    configFile: false
  });
});
