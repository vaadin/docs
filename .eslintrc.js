module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'lit'],
  rules: {
    'lit/attribute-value-entities': 'warn',
    'lit/binding-positions': 'warn',
    'lit/no-duplicate-template-bindings': 'warn',
    'lit/no-invalid-escape-sequences': 'warn',
    'lit/no-invalid-html': 'warn',
    'lit/no-legacy-template-syntax': 'warn',
    'lit/no-private-properties': 'warn',
    'lit/no-property-change-update': 'warn',
    'lit/no-template-bind': 'warn',
    'lit/no-value-attribute': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-empty-function': 'off'
  }
};
