import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default [
  // Base recommended rules
  js.configs.recommended,
  
  // Global settings
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
    
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    
    rules: {
      // React plugin rules
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      
      // React Hooks rules
      ...reactHooks.configs.recommended.rules,
      
      // React Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      
      // React specific rules
      'react/prop-types': 'off', // Using TypeScript/JSDoc instead
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
      'react/jsx-uses-react': 'off', // Not needed in React 17+
      'react/jsx-uses-vars': 'error',
      'react/jsx-key': [
        'error',
        {
          checkFragmentShorthand: true,
          checkKeyMustBeforeSpread: true,
          warnOnDuplicates: true,
        },
      ],
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-undef': 'error',
      'react/jsx-pascal-case': 'error',
      'react/no-array-index-key': 'warn',
      'react/no-children-prop': 'error',
      'react/no-danger': 'warn',
      'react/no-deprecated': 'warn',
      'react/no-direct-mutation-state': 'error',
      'react/no-unescaped-entities': 'warn',
      'react/no-unknown-property': 'error',
      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true,
        },
      ],
      'react/void-dom-elements-no-children': 'error',
      
      // General JavaScript/ES6+ rules
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],
      'no-debugger': 'warn',
      'no-alert': 'warn',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'warn',
      'prefer-template': 'warn',
      'prefer-spread': 'warn',
      'prefer-rest-params': 'warn',
      'prefer-destructuring': [
        'warn',
        {
          array: false,
          object: true,
        },
      ],
      'object-shorthand': 'warn',
      'arrow-body-style': ['warn', 'as-needed'],
      'no-param-reassign': [
        'warn',
        {
          props: true,
          ignorePropertyModificationsFor: ['state', 'acc', 'e', 'ctx', 'req', 'request', 'res', 'response', '$scope'],
        },
      ],
      'no-nested-ternary': 'warn',
      'no-unneeded-ternary': 'warn',
      'no-else-return': 'warn',
      'no-lonely-if': 'warn',
      'no-useless-return': 'warn',
      'no-useless-concat': 'warn',
      'no-useless-escape': 'warn',
      'no-duplicate-imports': 'error',
      'no-useless-rename': 'warn',
      'no-empty-function': 'warn',
      'no-implicit-coercion': 'warn',
      'no-return-assign': 'error',
      'no-sequences': 'error',
      'no-throw-literal': 'error',
      'no-unmodified-loop-condition': 'warn',
      'no-unused-expressions': [
        'warn',
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
      'no-useless-call': 'warn',
      'no-useless-computed-key': 'warn',
      'no-useless-constructor': 'warn',
      'no-void': 'warn',
      'prefer-promise-reject-errors': 'warn',
      'prefer-regex-literals': 'warn',
      'prefer-named-capture-group': 'warn',
      'require-await': 'warn',
      
      // Code quality rules
      'complexity': ['warn', { max: 15 }],
      'max-depth': ['warn', { max: 4 }],
      'max-lines': ['warn', { max: 500, skipBlankLines: true, skipComments: true }],
      'max-lines-per-function': ['warn', { max: 100, skipBlankLines: true, skipComments: true }],
      'max-params': ['warn', { max: 4 }],
      'max-nested-callbacks': ['warn', { max: 4 }],
      
      // Best practices
      'array-callback-return': 'error',
      'consistent-return': 'warn',
      'curly': ['error', 'all'],
      'default-case': 'warn',
      'default-case-last': 'error',
      'dot-notation': 'warn',
      'eqeqeq': ['error', 'always', { null: 'ignore' }],
      'guard-for-in': 'warn',
      'no-caller': 'error',
      'no-eval': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'warn',
      'no-floating-decimal': 'error',
      'no-implied-eval': 'error',
      'no-iterator': 'error',
      'no-labels': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-octal-escape': 'error',
      'no-proto': 'error',
      'no-redeclare': 'error',
      'no-script-url': 'error',
      'no-self-compare': 'error',
      'no-underscore-dangle': ['warn', { allow: ['_id', '__dirname', '__filename'] }],
      'no-with': 'error',
      'radix': 'error',
      'vars-on-top': 'off', // Not needed with let/const
      'wrap-iife': ['error', 'inside'],
      'yoda': 'error',
    },
  },
  
  // Ignore patterns
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'build/**',
      '*.config.js',
      '*.config.mjs',
      '*.config.cjs',
      'coverage/**',
      '.vite/**',
    ],
  },
];

