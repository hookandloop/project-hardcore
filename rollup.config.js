// ================================================= /
// Soho Xi - Rollup Configuration
// ================================================= /
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import license from 'rollup-plugin-license';

const bundleBanner = require('./scripts/generate-bundle-banner');

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'dist/js/sohoxi.js',
    format: 'iife',
    sourcemap: true,
    sourcemapFile: 'dist/js/sohoxi.js.map',
    name: 'Soho',
    globals: {
      jquery: '$',
      d3: 'd3',
      alert: 'alert',
      console: 'console'
    }
  },
  plugins: [
    resolve(),
    json(),
    babel({
      exclude: 'node_modules/**', // only transpile our source code
      plugins: ['external-helpers']
    }),
    license({
      sourceMap: true,
      banner: bundleBanner
    })
  ],
};
