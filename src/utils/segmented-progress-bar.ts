import { colorize } from 'consola/utils'

export interface ProgressSegment {
  label: string
  count: number
  percentage: number
  color: 'blue' | 'green' | 'yellow' | 'red' | 'cyan' | 'magenta' | 'gray'
  emoji?: string
}

export interface ProgressBarOptions {
  width?: number
  showLegend?: boolean
  showCounts?: boolean
}

export interface ProgressBarResult {
  bar: string
  legend: string
}

export function createSegmentedProgressBar(
  segments: ProgressSegment[],
  options: ProgressBarOptions = {},
): ProgressBarResult {
  const { width = 80, showLegend = true, showCounts = true } = options

  // プログレスバー生成
  let bar = ''
  for (const segment of segments) {
    const segmentWidth = Math.round((segment.percentage / 100) * width)
    if (segmentWidth > 0) {
      const segmentBar = '█'.repeat(segmentWidth)
      bar += colorize(segment.color, segmentBar)
    }
  }

  // 凡例生成
  let legend = ''
  if (showLegend) {
    const legendItems = segments.map((segment) => {
      const count = showCounts ? ` (${segment.count})` : ''
      const emoji = segment.emoji ? `${segment.emoji} ` : ''
      return `${emoji}${segment.label}${count} ${segment.percentage.toFixed(1)}%`
    })
    legend = legendItems.join('  ')
  }

  return { bar, legend }
}
