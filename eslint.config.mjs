import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: { process: true, console: true } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-unused-expressions': 'error',
      'no-unused-vars': 'warn',
      'prefer-const': 'error',
      'no-console': 'off',
      'no-undef': 2,
    },
  },
  {
    ignores: ['dist/', 'node_modules/', 'config'],
  },
]
