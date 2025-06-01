import antfu from '@antfu/eslint-config'
import vitest from '@vitest/eslint-plugin'

// @ts-check
/// <reference path="./eslint-typegen.d.ts" />
import typegen from 'eslint-typegen'

export default typegen(
  await antfu({
    vue: true,
    typescript: true,
    ignores: ['coverage/**/*', '**/*.md', 'fixtures/**/*'],
  }),
  {
    files: ['src/**/*.{test,spec}.{js,ts,vue}'],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
    settings: {
      vitest: {
        typecheck: true,
      },
    },
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
  },
)
