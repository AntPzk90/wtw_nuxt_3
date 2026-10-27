// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import prettier from 'eslint-config-prettier/flat'

// Formatting is Prettier's job, so eslint-config-prettier goes last to turn off rules that clash with it.
export default withNuxt(
  { ignores: ['markup/**'] },
  {
    files: ['mock-server/**'],
    rules: { 'no-unused-vars': ['error', { ignoreRestSiblings: true }] },
  },
  prettier,
)
