import type { ProgressSegment } from './segmented-progress-bar'
import { describe, expect, it } from 'vitest'
import { createSegmentedProgressBar } from './segmented-progress-bar'

describe('createSegmentedProgressBar', () => {
  it('should create a basic segmented progress bar', () => {
    const segments: ProgressSegment[] = [
      {
        label: 'Script Setup',
        count: 2,
        percentage: 50,
        color: 'blue',
        emoji: '📝',
      },
      {
        label: 'Options API',
        count: 2,
        percentage: 50,
        color: 'yellow',
        emoji: '⚙️',
      },
    ]

    const result = createSegmentedProgressBar(segments, { width: 10 })

    expect(result.bar).toBeDefined()
    expect(result.legend).toBeDefined()
    expect(result.bar.length).toBeGreaterThan(0)
    expect(result.legend).toContain('Script Setup (2) 50.0%')
    expect(result.legend).toContain('Options API (2) 50.0%')
  })

  it('should handle Vue SFC realistic data', () => {
    const segments: ProgressSegment[] = [
      {
        label: '<script setup>',
        count: 2,
        percentage: 28.6,
        color: 'blue',
        emoji: '📝',
      },
      {
        label: 'Composition API',
        count: 4,
        percentage: 57.1,
        color: 'green',
        emoji: '🔧',
      },
      {
        label: 'Options API',
        count: 1,
        percentage: 14.3,
        color: 'yellow',
        emoji: '⚙️',
      },
    ]

    const result = createSegmentedProgressBar(segments, { width: 80 })

    expect(result.bar).toBeDefined()
    expect(result.legend).toContain('📝 <script setup> (2) 28.6%')
    expect(result.legend).toContain('🔧 Composition API (4) 57.1%')
    expect(result.legend).toContain('⚙️ Options API (1) 14.3%')
  })

  it('should handle single segment', () => {
    const segments: ProgressSegment[] = [
      {
        label: 'Script Setup',
        count: 4,
        percentage: 100,
        color: 'green',
        emoji: '📝',
      },
    ]

    const result = createSegmentedProgressBar(segments, { width: 20 })

    expect(result.bar).toBeDefined()
    expect(result.legend).toContain('Script Setup (4) 100.0%')
  })

  it('should handle zero percentage segments', () => {
    const segments: ProgressSegment[] = [
      {
        label: 'Script Setup',
        count: 0,
        percentage: 0,
        color: 'blue',
        emoji: '📝',
      },
      {
        label: 'Options API',
        count: 4,
        percentage: 100,
        color: 'yellow',
        emoji: '⚙️',
      },
    ]

    const result = createSegmentedProgressBar(segments, { width: 10 })

    expect(result.bar).toBeDefined()
    expect(result.legend).toContain('Script Setup (0) 0.0%')
    expect(result.legend).toContain('Options API (4) 100.0%')
  })

  it('should support options without counts', () => {
    const segments: ProgressSegment[] = [
      {
        label: 'Script Setup',
        count: 2,
        percentage: 50,
        color: 'blue',
        emoji: '📝',
      },
    ]

    const result = createSegmentedProgressBar(segments, {
      width: 10,
      showCounts: false,
    })

    expect(result.legend).toContain('📝 Script Setup 50.0%')
    expect(result.legend).not.toContain('(2)')
  })

  it('should support options without legend', () => {
    const segments: ProgressSegment[] = [
      {
        label: 'Script Setup',
        count: 2,
        percentage: 50,
        color: 'blue',
        emoji: '📝',
      },
    ]

    const result = createSegmentedProgressBar(segments, {
      width: 10,
      showLegend: false,
    })

    expect(result.bar).toBeDefined()
    expect(result.legend).toBe('')
  })
})
