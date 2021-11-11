module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:testcafe/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'testcafe',
  ],
  rules: {
    'class-methods-use-this': 0,
    'max-classes-per-file': ['error', 2],
    'no-mixed-spaces-and-tabs': 0,
    'no-tabs': 0,
    'no-async-promise-executor': 0,
    'for-direction': 0,
    'no-await-in-loop': 0,
    'no-console': 0,
    'no-unused-expressions': 0,
    'no-param-reassign': 0,
    'linebreak-style': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['Tests', 'PageObjects'],
      },
    },
  },
};
