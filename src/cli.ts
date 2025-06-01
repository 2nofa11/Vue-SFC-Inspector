import process from 'node:process'
import { defineCommand, runMain } from 'citty'
import consola from 'consola'
import { classifyVueFiles } from './core'
import { createSegmentedProgressBar } from './utils/segmented-progress-bar'

const main = defineCommand({
  meta: {
    name: 'vue-sfc-inspector',
    version: '1.0.0',
    description: 'Analyze Vue SFC script setup adoption',
  },
  args: {
    dir: {
      type: 'positional',
      description: 'Directory to scan',
      default: '.',
      required: false,
    },
    details: {
      type: 'boolean',
      description: 'Show detailed file breakdown',
      alias: 'd',
    },
  },
  async run({ args }) {
    try {
      consola.start('Analyzing Vue SFC files...')
      const result = await classifyVueFiles(args.dir, { includeDetails: args.details })
      consola.success('Analysis completed!')

      // 結果をボックスで表示
      consola.box('📊 Vue SFC Analysis Results')

      consola.info(`📝  <script setup>: ${result.scriptSetup}`)
      consola.info(`🔧  Composition API (setup() in <script>): ${result.compositionAPI}`)
      consola.info(`⚙️  Options API: ${result.optionsAPI}`)
      consola.info(`📁 Total Files: ${result.total}`)

      if (result.total > 0) {
        const scriptSetupRate = (result.scriptSetup / result.total) * 100
        const compositionAPIRate = (result.compositionAPI / result.total) * 100
        const optionsAPIRate = (result.optionsAPI / result.total) * 100

        consola.box('📊 Vue SFC Composition')

        // セグメント化されたプログレスバー
        const segments = [
          {
            label: '<script setup>',
            count: result.scriptSetup,
            percentage: scriptSetupRate,
            color: 'blue' as const,
            emoji: '📝',
          },
          {
            label: 'Composition API',
            count: result.compositionAPI,
            percentage: compositionAPIRate,
            color: 'green' as const,
            emoji: '🔧',
          },
          {
            label: 'Options API',
            count: result.optionsAPI,
            percentage: optionsAPIRate,
            color: 'yellow' as const,
            emoji: '⚙️',
          },
        ]

        const { bar, legend } = createSegmentedProgressBar(segments)
        consola.log(bar)
        consola.log(legend)
      }

      // 詳細表示
      if (args.details && result.files) {
        consola.box('📋 File Details')

        // scriptSetup ファイル
        const scriptSetupFiles = result.files.filter(f => f.type === 'scriptSetup')
        if (scriptSetupFiles.length > 0) {
          consola.info(`  📝  <script setup> (${scriptSetupFiles.length} files):`)
          scriptSetupFiles.forEach((file) => {
            consola.info(`    • ${file.path}`)
          })
        }

        // compositionAPI ファイル
        const compositionFiles = result.files.filter(f => f.type === 'compositionAPI')
        if (compositionFiles.length > 0) {
          consola.info(`  🔧  Composition API (${compositionFiles.length} files):`)
          compositionFiles.forEach((file) => {
            consola.info(`    • ${file.path}`)
          })
        }

        // optionsAPI ファイル
        const optionsFiles = result.files.filter(f => f.type === 'optionsAPI')
        if (optionsFiles.length > 0) {
          consola.info(`  ⚙️  Options API (${optionsFiles.length} files):`)
          optionsFiles.forEach((file) => {
            consola.info(`    • ${file.path}`)
          })
        }
      }
    }
    catch (error) {
      consola.error('Failed to analyze Vue files', error)
      consola.info('💡 Make sure the directory contains .vue files')
      consola.info('💡 Check file permissions')
      process.exit(1)
    }
  },
})

runMain(main)
