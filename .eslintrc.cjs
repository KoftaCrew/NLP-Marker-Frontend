/* eslint-disable no-undef */
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  ignorePatterns: ['node_modules', 'dist', 'build', 'postcss.config.js', 'tailwind.config.js'],
  rules: {
    'camelcase': 'warn',
    'no-console': 'warn',
    'no-var': 'error',
    'prefer-const': 'warn',
    'comma-spacing': 'warn',
    'comma-style': 'warn',
    'comma-dangle': 'warn',
    'indent': ['warn', 2],
    'jsx-quotes': ['warn', 'prefer-single'],
    'max-len': ['warn', { code: 120 }],
    'no-tabs': 'warn',
    'no-trailing-spaces': 'warn',
    'no-multi-spaces': 'warn',
    'semi': ['error', 'always'],
    'semi-style': ['warn', 'last'],
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-alert': 'warn',
    'no-empty': 'warn',
    'no-empty-function': 'warn',
    'eol-last': ['warn', 'always']
  }
};
