import { describe, expect, it } from 'vitest'
import { classifyVueFiles } from './core'

describe('classifyVueFiles', () => {
  it('should classify script types correctly with new composition/options distinction', async () => {
    const result = await classifyVueFiles('./fixtures')

    expect(result.scriptSetup).toBe(2) // setup.vue + malformed.vue
    expect(result.compositionAPI).toBe(4) // composition.vue + composition-import.vue + regular.vue + empty-define-component.vue
    expect(result.optionsAPI).toBe(1) // options.vue
    expect(result.total).toBe(7)
  })

  it('should count script setup and regular script files correctly (legacy test)', async () => {
    const result = await classifyVueFiles('./fixtures')

    expect(result.withSetup).toBe(2) // setup.vue + malformed.vue
    expect(result.withoutSetup).toBe(5) // regular.vue + composition.vue + composition-import.vue + options.vue + empty-define-component.vue
    expect(result.total).toBe(7)
  })

  it('should handle empty directory', async () => {
    const result = await classifyVueFiles('./nonexistent')

    expect(result.withSetup).toBe(0)
    expect(result.withoutSetup).toBe(0)
    expect(result.total).toBe(0)
  })

  it('should use current directory as default', async () => {
    const result = await classifyVueFiles()

    expect(typeof result.withSetup).toBe('number')
    expect(typeof result.withoutSetup).toBe('number')
    expect(typeof result.total).toBe('number')
  })

  it('should include file details when requested', async () => {
    const result = await classifyVueFiles('./fixtures', { includeDetails: true })

    expect(result.files).toBeDefined()
    expect(result.files).toHaveLength(7)

    // scriptSetup ファイルの検証
    const scriptSetupFiles = result.files!.filter(f => f.type === 'scriptSetup')
    expect(scriptSetupFiles).toHaveLength(2)
    expect(scriptSetupFiles.map(f => f.path)).toContain('./fixtures/setup.vue')
    expect(scriptSetupFiles.map(f => f.path)).toContain('./fixtures/malformed.vue')

    // compositionAPI ファイルの検証
    const compositionFiles = result.files!.filter(f => f.type === 'compositionAPI')
    expect(compositionFiles).toHaveLength(4)
    expect(compositionFiles.map(f => f.path)).toContain('./fixtures/empty-define-component.vue')

    // optionsAPI ファイルの検証
    const optionsFiles = result.files!.filter(f => f.type === 'optionsAPI')
    expect(optionsFiles).toHaveLength(1)
    expect(optionsFiles[0].path).toBe('./fixtures/options.vue')
  })

  it('should not include file details by default', async () => {
    const result = await classifyVueFiles('./fixtures')
    expect(result.files).toBeUndefined()
  })

  it('should classify empty defineComponent as Composition API', async () => {
    const result = await classifyVueFiles('./fixtures', { includeDetails: true })

    // empty-define-component.vue が Composition API に分類されることを確認
    const compositionFiles = result.files!.filter(f => f.type === 'compositionAPI')
    const emptyDefineComponentFile = compositionFiles.find(f => f.path.includes('empty-define-component.vue'))

    expect(emptyDefineComponentFile).toBeDefined()
    expect(emptyDefineComponentFile!.type).toBe('compositionAPI')
  })
})
