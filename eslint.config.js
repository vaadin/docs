import prettier from 'eslint-config-vaadin/prettier';
import typescript from 'eslint-config-vaadin/typescript-requiring-type-checking';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

export default [
  {
    ignores: [
      'dspublisher/out/**/*',
      'target/**/*',
      'frontend/generated/**/*',
      'vite.generated.ts',
    ],
  },
  ...typescript,
  ...prettier,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['scripts/*.js', 'scripts/pick/*.js', '*.ts'],
        },
      },
    },
    rules: {
      '@typescript-eslint/class-methods-use-this': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/member-ordering': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/prefer-readonly': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/unbound-method': 'off',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            [
              // Side-effects group
              '^\\u0000',
              // React group
              '^Frontend/demo/react-example',
              '^react',
              // External group
              '^',
              // Vaadin group
              '^@vaadin',
              // Frontend group
              '^Frontend',
              // Parent group
              '^\\.\\.',
              // Sibling group
              '^\\.',
            ],
          ],
        },
      ],
      'class-methods-use-this': 'off',
      'logical-assignment-operators': 'off',
      'max-params': 'off',
      'no-console': 'off',
      'no-plusplus': 'off',
      'prefer-destructuring': 'off',
      radix: 'off',
      'require-unicode-regexp': 'off',
    },
  },
  {
    files: ['frontend/**/*'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ['scripts/**/*'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'no-console': 'off',
      'preserve-caught-error': 'off',
    },
  },
];
