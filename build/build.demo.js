const path = require('path');
const serve = require('rollup-plugin-serve');
const template = require('rollup-plugin-generate-html-template');
const livereload = require('rollup-plugin-livereload');
const typescript = require('rollup-plugin-typescript');

const getConfig = require('./config');
const resolveFile = function (filePath) {
  return path.join(__dirname, '..', filePath);
};
const PORT = 3002;
const config = getConfig({
  input: resolveFile('src/app.ts'),
  output: {
    file: resolveFile(`dist/demo/index.js`),
    format: 'es',
    globals: {
      'object-assign': 'ObjectAssign',
      'promise-polyfill': 'Promise',
    },
  },
  watch: {
    include: 'src/**',
  },
  plugins: [
    typescript(),
    serve({
      port: PORT,
      contentBase: [resolveFile('src'), resolveFile('dist')],
    }),
    livereload('dist'),
    template({
      template: resolveFile('src/index.html'),
      target: resolveFile('dist/demo/index.html'),
    }),
  ],
});
/*
const config = Object.assign({}, baseConfig, {
  input: resolveFile('src/app.ts'),
  output: {
    file: resolveFile(`dist/demo/index.js`),
    format: 'es',
    globals: {
      'object-assign': 'ObjectAssign',
      'promise-polyfill': 'Promise',
    },
  },
  watch: {
    include: 'src/**',
  },
  plugins: [
    ...[
      typescript(),
      serve({
        port: PORT,
        contentBase: [resolveFile('src'), resolveFile('dist')],
      }),
      livereload('dist'),
      template({
        template: resolveFile('src/index.html'),
        target: resolveFile('dist/demo/index.html'),
      }),
    ],
  ],
});
*/
module.exports = config;
