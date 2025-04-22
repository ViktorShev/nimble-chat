import eslint from '@eslint/js'
import stylisticJS from '@stylistic/eslint-plugin-js'
import stylisticTS from '@stylistic/eslint-plugin-ts'
import globals from 'globals'
import tseslint, { parser } from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['**/dist/', '.yarn/'] },
  { 
    files: ['src/**/*.{js,mjs,cjs,ts}', './eslint.config.js'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    languageOptions: { 
      globals: globals.node,
      parser,
    },
    plugins: {
      '@stylistic/ts': stylisticTS,
      '@stylistic/js': stylisticJS,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': ['error', {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@stylistic/ts/object-curly-spacing': ['error', 'always'],
      '@stylistic/ts/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      '@stylistic/ts/semi': ['error', 'never'],
      '@stylistic/ts/type-annotation-spacing': ['error', { before: false, after: true, overrides: { arrow: { before: true, after: true } } }],
      '@stylistic/ts/space-before-function-paren': ['error', { anonymous: 'always', named: 'always', asyncArrow: 'always' }],
      '@stylistic/ts/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/ts/space-infix-ops': 'error',
      '@stylistic/ts/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/ts/space-before-blocks': ['error', 'always'],
      '@stylistic/ts/padding-line-between-statements': [
        'error', 
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'never', prev: 'function-overload', 'next': 'function' },
      ],
      '@stylistic/js/arrow-spacing': 'error',
      '@stylistic/js/switch-colon-spacing': 'error',
      '@stylistic/js/space-in-parens': ['error', 'never'],
      '@stylistic/js/indent': ['error', 2],
    },
  },
)