import { baseConfig } from '@rheo/config/eslint.js';

export default [
  ...baseConfig,
  {
    files: ['rheo/**/scripts/**/*.mjs', 'scripts/**/*.mjs'],
    languageOptions: {
      globals: {
        console: 'readonly',
        process: 'readonly',
      },
    },
  },
  {
    ignores: ['rheo/**/scripts/lib/**'],
  },
  {
    files: ['test/fixtures/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
];
