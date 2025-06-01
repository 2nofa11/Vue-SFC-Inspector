import { readFile } from 'node:fs/promises'
import { parse } from '@vue/compiler-sfc'
import fg from 'fast-glob'

export interface FileClassification {
  path: string
  type: 'scriptSetup' | 'compositionAPI' | 'optionsAPI'
}

export interface ScanResult {
  // 新しい詳細分類
  scriptSetup: number
  compositionAPI: number
  optionsAPI: number
  total: number

  // 後方互換性のための既存プロパティ
  withSetup: number
  withoutSetup: number
}

export interface DetailedScanResult extends ScanResult {
  files?: FileClassification[]
}

export interface ClassifyOptions {
  includeDetails?: boolean
}

function hasCompositionAPI(content: string): boolean {
  // setup() 関数の存在
  if (/setup\s*\(/.test(content))
    return true

  // defineComponent の使用（TypeScript での型サポート目的も含む）
  if (/defineComponent/.test(content))
    return true

  // Composition API imports
  if (/import\s+\{[^}]*\b(?:ref|reactive|computed|watch|onMounted|onUnmounted)\b[^}]*\}\s+from\s+['"]vue['"]/.test(content)) {
    return true
  }

  return false
}

export async function classifyVueFiles(
  dir = '.',
  options: ClassifyOptions = {},
): Promise<DetailedScanResult> {
  try {
    const files = await fg('**/*.vue', {
      cwd: dir,
      ignore: ['**/node_modules/**'],
    })

    let scriptSetup = 0
    let compositionAPI = 0
    let optionsAPI = 0
    const fileDetails: FileClassification[] = []

    for (const file of files) {
      const source = await readFile(`${dir}/${file}`, 'utf8')
      const { descriptor } = parse(source)
      const filePath = `${dir}/${file}`

      if (descriptor.scriptSetup) {
        scriptSetup++
        if (options.includeDetails) {
          fileDetails.push({ path: filePath, type: 'scriptSetup' })
        }
      }
      else if (descriptor.script) {
        if (hasCompositionAPI(descriptor.script.content)) {
          compositionAPI++
          if (options.includeDetails) {
            fileDetails.push({ path: filePath, type: 'compositionAPI' })
          }
        }
        else {
          optionsAPI++
          if (options.includeDetails) {
            fileDetails.push({ path: filePath, type: 'optionsAPI' })
          }
        }
      }
    }

    const withSetup = scriptSetup
    const withoutSetup = compositionAPI + optionsAPI

    const result: DetailedScanResult = {
      scriptSetup,
      compositionAPI,
      optionsAPI,
      total: files.length,
      withSetup,
      withoutSetup,
    }

    if (options.includeDetails) {
      result.files = fileDetails
    }

    return result
  }
  catch (error: unknown) {
    console.error(error)
    // ディレクトリが存在しない場合など
    const errorResult: DetailedScanResult = {
      scriptSetup: 0,
      compositionAPI: 0,
      optionsAPI: 0,
      total: 0,
      withSetup: 0,
      withoutSetup: 0,
    }

    if (options.includeDetails) {
      errorResult.files = []
    }

    return errorResult
  }
}
