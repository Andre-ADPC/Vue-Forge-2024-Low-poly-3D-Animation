/** @format */

module.exports = {
  plugins: ['vue', '@typescript-eslint', 'tailwindcss'], // Plugins for Vue, TypeScript, and Tailwind
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
    'prettier', // Integrate Prettier to handle formatting conflicts
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser', // Use TypeScript parser
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  globals: {
    // Project-specific global variables
    App: true,
    axios: true,
    collect: true,
    Vue: true,
    moment: true,
    _: true,
    $: true,
    FormErrors: true,
    store: true,
    jQuery: true,
    route: true,
    trans: true,
    swal: true,
    s: true,
    jest: true,
    describe: true,
    it: true,
    afterEach: true,
    afterAll: true,
    beforeEach: true,
    beforeAll: true,
    test: true,
    expect: true,
    xit: true,
    xdescribe: true,
    i18n: true,
    UrlParser: true,
    $alerts: true,
    beeAuth: true,
    chrome: true,
  },
  rules: {
    // ---------------------
    // Vue.js 3 Rules
    // ---------------------
    'vue/multi-word-component-names': 'warn', // Avoid single-word component names
    'vue/no-unused-components': 'warn', // Warn for unused components in templates
    'vue/no-multiple-template-root': 'error', // Prevent multiple root nodes in templates
    'vue/no-mutating-props': 'error', // Prevent direct mutation of props
    'vue/no-template-shadow': 'warn', // Avoid variable shadowing in templates
    'vue/valid-template-root': 'error', // Templates must have a valid root
    'vue/no-setup-props-destructure': 'off', // Allow destructuring props in script setup
    'vue/component-name-in-template-casing': ['warn', 'PascalCase'], // Enforce PascalCase for components
    'vue/html-closing-bracket-spacing': [
      'warn',
      {
        startTag: 'never',
        endTag: 'never',
        selfClosingTag: 'always',
      },
    ],
    'vue/html-indent': ['error', 2], // Enforce 2-space indentation for Vue templates
    'vue/max-attributes-per-line': [
      'warn',
      {
        singleline: 3,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'never',
          normal: 'never',
          component: 'never',
        },
        svg: 'always',
        math: 'always',
      },
    ],

    // ---------------------
    // TypeScript Rules
    // ---------------------
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warn for unused variables except for args prefixed with "_"
    '@typescript-eslint/explicit-function-return-type': 'warn', // Encourage explicit function return types
    '@typescript-eslint/no-empty-function': 'warn', // Warn for empty functions
    '@typescript-eslint/no-inferrable-types': 'off', // Allow explicit type annotations
    '@typescript-eslint/no-non-null-assertion': 'warn', // Warn for non-null assertions
    '@typescript-eslint/no-explicit-any': 'warn', // Discourage use of `any`
    '@typescript-eslint/consistent-type-imports': 'warn', // Prefer `import type`
    '@typescript-eslint/no-var-requires': 'warn', // Warn for CommonJS `require` usage

    // ---------------------
    // Tailwind CSS Rules
    // ---------------------
    'tailwindcss/classnames-order': 'warn', // Enforce proper ordering of Tailwind classnames
    'tailwindcss/no-custom-classname': 'off', // Allow custom classnames
    'tailwindcss/no-contradicting-classname': 'error', // Prevent conflicting Tailwind classnames

    // ---------------------
    // General Best Practices
    // ---------------------
    'arrow-body-style': ['warn', 'as-needed'], // Use concise arrow functions when possible
    camelcase: [
      'error',
      {
        ignoreDestructuring: true,
        properties: 'never',
      },
    ],
    'no-console': ['warn', { allow: ['warn', 'error'] }], // Warn for console logs except `warn` and `error`
    eqeqeq: ['warn', 'always'], // Enforce strict equality
    'prefer-const': 'warn', // Prefer `const` for variables that are never reassigned
    'no-var': 'error', // Disallow `var` declarations
    'object-shorthand': ['warn', 'always'], // Encourage shorthand object properties
    curly: ['error', 'multi-line'], // Require curly braces for multi-line control structures
    'max-lines': [
      'warn',
      {
        max: 300, // Flag files with more than 300 lines
        skipBlankLines: true,
        skipComments: true,
      },
    ],
  },
};
