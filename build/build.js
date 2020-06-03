const rollup = require('rollup');
const path = require('path');
const uglify = require('rollup-plugin-uglify');
const typescript = require('rollup-plugin-typescript');

const getConfig = require('./config');
const { name } = require('../package.json');
const resolveFile = function (filePath) {
  return path.join(__dirname, '..', filePath);
};

const buildConfigInfo = {
  core: {
    input: resolveFile('src/module/core.ts'),
    output: {
      file: resolveFile(`dist/${name}-core.esm.js`),
      format: 'es',
    },
  },
  taro: {
    input: resolveFile('src/index-taro.ts'),
    output: {
      file: resolveFile(`dist/${name}-taro.esm.js`),
      format: 'es',
    },
  },
  axios: {
    input: resolveFile('src/index.ts'),
    output: {
      file: resolveFile(`dist/${name}.esm.js`),
      format: 'es',
    },
  },
};

const buildConfig = Object.keys(buildConfigInfo).map((name) =>
  getConfig(
    Object.assign({}, buildConfigInfo[name], { plugins: [typescript()] })
  )
);
module.exports = buildConfig;
// async function build(config) {
//   const inputOptions = config;
//   const outputOptions = config.output;
//   // create a bundle
//   const bundle = await rollup.rollup(inputOptions);

//   console.log(`[INFO] 开始编译 ${inputOptions.input}`);

//   // generate code and a sourcemap
//   const { code, map } = await bundle.generate(outputOptions);

//   console.log(`[SUCCESS] 编译结束 ${outputOptions.file}`);

//   // or write the bundle to disk
//   await bundle.write(outputOptions);
// }

// buildConfig.forEach((config) => {
//   build(config);
// });
