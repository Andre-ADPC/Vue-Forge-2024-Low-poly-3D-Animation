import { tresLintConfig } from '@tresjs/eslint-config'

export default tresLintConfig({

}, {
  rules: {
    'style/max-statements-per-line': 'off',
  },
})

module.exports = {
  parser: 'vue-eslint-parser',
  plugins: ['vue'],
  extends: ['plugin:vue/vue3-recommended', 'prettier'],
  rules: {
    // Add any additional rules here
  },
}
