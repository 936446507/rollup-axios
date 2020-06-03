const path = require('path');
const typescript = require('rollup-plugin-typescript');
const { babel } = require('@rollup/plugin-babel');
const json = require('@rollup/plugin-json');
const postcss = require('rollup-plugin-postcss');
const cssnano = require('cssnano');

const { name } = require('../package.json');

const baseConfig = {
  external: ['object-assign', 'promise-polyfill', 'axios', 'qs', 'taro'],
  plugins: [
    babel({
      presets: ['@babel/preset-env'],
      exclude: 'node_modules/**',
    }),
    json(),
    postcss({
      plugins: [cssnano()],
    }),
  ],
};
const getConfig = (config) => {
  const { input, output } = config;
  const baseOutput = {
    format: 'es',
    name,
    globals: {
      'object-assign': 'ObjectAssign',
      'promise-polyfill': 'Promise',
    },
  };
  return Object.assign({}, baseConfig, {
    ...config,
    input,
    output: Object.assign({}, baseOutput, output),
    plugins: [...baseConfig.plugins, ...config.plugins],
  });
};

exports.baseConfig = baseConfig;
module.exports = getConfig;
