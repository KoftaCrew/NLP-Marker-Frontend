module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    rules: {
        'camelcase': 'error',
        'no-console': 'error',
        'no-var': 'error',
        'prefer-const': 'error',
        'comma-spacing': 'error',
        'comma-style': 'error',
        'comma-dangle': 'error',
        'indent': ['error', 2],
        'jsx-quotes': ['error', 'prefer-single'],
        'max-len': ['error', { code: 120 }],
        'no-tabs': 'error',
        'no-trailing-spaces': 'error',
        'no-multi-spaces': 'error',
        'semi': ['error', 'always'],
        'semi-style': ['error', 'last'],
    }
  };
