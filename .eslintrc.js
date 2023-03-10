module.exports = {
  'env': {
    'browser': true,
    'node': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  'overrides': [
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'settings': {
    'react': {
      'version': 'detect'
    },
  },
  'plugins': [
    'react',
    '@typescript-eslint'
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true
      }
    ],
    'quotes': [
      'error',
      'single'
    ],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'semi': [
      'error',
      'always'
    ]
  }
};
