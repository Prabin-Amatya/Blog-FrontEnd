import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import vitest from '@vitest/eslint-plugin'

export default [
  { ignores: ['dist'] },
  { 
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "react/prop-types": "off",
    },  
  },


  {
    files: ['**/*.test.jsx'], // Pattern to target test files
    plugins: {
      vitest
    },
    rules: {
      ...vitest.configs.recommended.rules, // Include recommended Vitest rules
      'vitest/max-nested-describe': ['error', { max: 3 }], // Custom Vitest rule
    },
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals, // Vitest environment globals
      }
    }
  }
]

