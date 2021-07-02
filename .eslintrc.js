/* eslint-disable */
module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:json/recommended'
  ],
  globals: {
    atom: "readonly"
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  rules: {},
  ignorePatterns: [
    'bower_components',
    'lib',
    'node_modules'
  ]
};
