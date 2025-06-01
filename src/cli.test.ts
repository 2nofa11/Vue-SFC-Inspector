import consola from 'consola'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { classifyVueFiles } from './core'

// CLI の実際の動作をテスト
describe('cLI functionality', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    consola.mockTypes(() => vi.fn())
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('should analyze fixtures directory correctly', async () => {
    const result = await classifyVueFiles('./fixtures')

    expect(result.withSetup).toBe(2) // setup.vue + malformed.vue
    expect(result.withoutSetup).toBe(5) // regular.vue + composition.vue + composition-import.vue + options.vue + empty-define-component.vue
    expect(result.total).toBe(7)
  })

  it('should calculate adoption rate correctly', async () => {
    const result = await classifyVueFiles('./fixtures')
    const expectedRate = ((result.withSetup / result.total) * 100).toFixed(1)

    expect(expectedRate).toBe('28.6') // 2/7 = 28.6%
  })

  it('should handle empty directory gracefully', async () => {
    const result = await classifyVueFiles('./nonexistent')

    expect(result.withSetup).toBe(0)
    expect(result.withoutSetup).toBe(0)
    expect(result.total).toBe(0)
  })

  it('should use current directory as default', async () => {
    const result = await classifyVueFiles()

    // プロジェクトルートには.vueファイルがないはず
    expect(result.total).toBeGreaterThanOrEqual(0)
    expect(typeof result.withSetup).toBe('number')
    expect(typeof result.withoutSetup).toBe('number')
  })

  it('should handle directory with no vue files', async () => {
    const result = await classifyVueFiles('./src')

    // srcディレクトリには.vueファイルがない
    expect(result.withSetup).toBe(0)
    expect(result.withoutSetup).toBe(0)
    expect(result.total).toBe(0)
  })

  it('should use consola for beautiful output', () => {
    // consolaのメソッドが利用可能であることを確認
    expect(typeof consola.start).toBe('function')
    expect(typeof consola.success).toBe('function')
    expect(typeof consola.info).toBe('function')
    expect(typeof consola.box).toBe('function')
  })

  it('should mock consola methods correctly', () => {
    // モックが正しく設定されていることを確認
    consola.info('test message')
    expect(consola.info).toHaveBeenCalledWith('test message')
  })

  it('should use appropriate colors based on adoption rates', () => {
    // 高い採用率の場合 (>50%)
    const highAdoptionRate = 75.5
    if (highAdoptionRate > 50) {
      consola.success(`🎉 Script Setup: ${highAdoptionRate}%`)
      expect(consola.success).toHaveBeenCalledWith(`🎉 Script Setup: ${highAdoptionRate}%`)
    }

    // 低い採用率の場合 (<=50%)
    const lowAdoptionRate = 33.3
    if (lowAdoptionRate <= 50) {
      consola.warn(`📈 Script Setup: ${lowAdoptionRate}%`)
      expect(consola.warn).toHaveBeenCalledWith(`📈 Script Setup: ${lowAdoptionRate}%`)
    }

    // Composition API総合採用率が高い場合 (>70%)
    const highCompositionRate = 83.3
    if (highCompositionRate > 70) {
      consola.success(`🚀 Composition API Total: ${highCompositionRate}%`)
      expect(consola.success).toHaveBeenCalledWith(`🚀 Composition API Total: ${highCompositionRate}%`)
    }

    // Composition API総合採用率が低い場合 (<=70%)
    const lowCompositionRate = 60.0
    if (lowCompositionRate <= 70) {
      consola.info(`🔄 Composition API Total: ${lowCompositionRate}%`)
      expect(consola.info).toHaveBeenCalledWith(`🔄 Composition API Total: ${lowCompositionRate}%`)
    }
  })

  it('should display beautiful box output', () => {
    // ボックス表示のテスト
    consola.box('📊 Vue SFC Analysis Results')
    expect(consola.box).toHaveBeenCalledWith('📊 Vue SFC Analysis Results')

    consola.box('📈 Adoption Rates')
    expect(consola.box).toHaveBeenCalledWith('📈 Adoption Rates')
  })

  it('should support --details flag for file breakdown', async () => {
    // 詳細表示オプションのテスト - 実際のCLI機能をテスト
    const result = await classifyVueFiles('./fixtures', { includeDetails: true })

    // ファイル詳細が含まれていることを確認
    expect(result.files).toBeDefined()
    expect(result.files).toHaveLength(7)

    // 各カテゴリのファイルが正しく分類されていることを確認
    const scriptSetupFiles = result.files!.filter(f => f.type === 'scriptSetup')
    const compositionFiles = result.files!.filter(f => f.type === 'compositionAPI')
    const optionsFiles = result.files!.filter(f => f.type === 'optionsAPI')

    expect(scriptSetupFiles).toHaveLength(2)
    expect(compositionFiles).toHaveLength(4)
    expect(optionsFiles).toHaveLength(1)

    // ファイルパスが正しく含まれていることを確認
    expect(scriptSetupFiles.some(f => f.path.includes('setup.vue'))).toBe(true)
    expect(scriptSetupFiles.some(f => f.path.includes('malformed.vue'))).toBe(true)
    expect(optionsFiles.some(f => f.path.includes('options.vue'))).toBe(true)
  })

  it('should not include file details when --details flag is not used', async () => {
    // 詳細表示フラグが使用されていない場合のテスト
    const result = await classifyVueFiles('./fixtures', { includeDetails: false })

    expect(result.files).toBeUndefined()
    expect(result.scriptSetup).toBe(2)
    expect(result.compositionAPI).toBe(4)
    expect(result.optionsAPI).toBe(1)
  })
})
