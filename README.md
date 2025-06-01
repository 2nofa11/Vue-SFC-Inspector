# Vue SFC Inspector

<div align="center">

[日本語](./README.ja.md) | English

</div>

A CLI tool to analyze Vue Single File Component (SFC) `<script setup>` adoption

## Overview

Vue SFC Inspector scans Vue SFC files in your project and provides statistics in the following categories:

- **`<script setup>`**: Vue 3.2+ Composition API syntactic sugar
- **Composition API (setup() in `<script>`)**: Traditional `setup()` function usage
- **Options API**: Vue 2 style Options API

## Quick Start

```bash
npx vue-sfc-inspector
```

## Installation

### Global Installation (Optional)

```bash
# npm
npm install -g vue-sfc-inspector

# yarn
yarn global add vue-sfc-inspector

# pnpm
pnpm add -g vue-sfc-inspector
```

### Local Installation

```bash
# npm
npm install --save-dev vue-sfc-inspector

# yarn
yarn add -D vue-sfc-inspector

# pnpm
pnpm add -D vue-sfc-inspector
```

## Usage

### CLI Commands

```bash
# Analyze current directory
npx vue-sfc-inspector

# Analyze specific directory
npx vue-sfc-inspector ./src

# Analyze project root
npx vue-sfc-inspector .

# Show details with file list
npx vue-sfc-inspector ./src --details
```

### Example Output

```
◐ Analyzing Vue SFC files...
✔ Analysis completed!

 ╭───────────────────────────────╮
 │                               │
 │  📊 Vue SFC Analysis Results  │
 │                               │
 ╰───────────────────────────────╯

ℹ 📝  <script setup>: 2
ℹ 🔧  Composition API (setup() in <script>): 4
ℹ ⚙️  Options API: 1
ℹ 📁 Total Files: 7

 ╭──────────────────────────╮
 │                          │
 │  📊 Vue SFC Composition  │
 │                          │
 ╰──────────────────────────╯

████████████████████████████████████████████████████████████████████████████████
📝 <script setup> (2) 28.6%  🔧 Composition API (4) 57.1%  ⚙️ Options API (1) 14.3%
```

### Details Option

Use the `--details` or `-d` flag to display file lists for each category:

```bash
npx vue-sfc-inspector ./src --details
```

```
 ╭───────────────────╮
 │                   │
 │  📋 File Details  │
 │                   │
 ╰───────────────────╯

ℹ   📝  <script setup> (2 files):
ℹ     • ./src/components/Header.vue
ℹ     • ./src/components/Footer.vue
ℹ   🔧  Composition API (4 files):
ℹ     • ./src/components/UserProfile.vue
ℹ     • ./src/components/ProductList.vue
ℹ     • ./src/components/SearchForm.vue
ℹ     • ./src/components/Modal.vue
ℹ   ⚙️  Options API (1 files):
ℹ     • ./src/components/LegacyComponent.vue
```

## Programmatic API

```typescript
import { classifyVueFiles } from 'vue-sfc-inspector'

const result = await classifyVueFiles('./src')

console.log(result)
// {
//   scriptSetup: 2,
//   compositionAPI: 4,
//   optionsAPI: 1,
//   total: 7,
//   withSetup: 2,        // for backward compatibility
//   withoutSetup: 5      // for backward compatibility
// }

// Get detailed information
const detailedResult = await classifyVueFiles('./src', { includeDetails: true })
console.log(detailedResult.files)
// [
//   { path: './src/Header.vue', type: 'scriptSetup' },
//   { path: './src/UserProfile.vue', type: 'compositionAPI' },
//   ...
// ]
```

### Type Definitions

```typescript
interface ScanResult {
  // Detailed classification
  scriptSetup: number      // Count of <script setup>
  compositionAPI: number   // Count of setup() function usage
  optionsAPI: number       // Count of Options API
  total: number           // Total file count
  
  // Backward compatibility
  withSetup: number       // Same as scriptSetup
  withoutSetup: number    // compositionAPI + optionsAPI
}

interface DetailedScanResult extends ScanResult {
  files?: FileClassification[]
}

interface FileClassification {
  path: string
  type: 'scriptSetup' | 'compositionAPI' | 'optionsAPI'
}
```

## Classification Logic

### `<script setup>` Detection
- Presence of `descriptor.scriptSetup` property from `@vue/compiler-sfc`

### Composition API Detection
- Presence of `setup()` function
- Usage of `defineComponent()` (including TypeScript type support)
- Import of Composition API functions (`ref`, `reactive`, `computed`, `watch`, `onMounted`, etc.)

### Options API Detection
- `<script>` blocks that don't match the above criteria

## Features

### 🎨 Beautiful Visual Output
- GitHub-style segmented progress bars
- Color-coded statistics
- Intuitive emoji and icon indicators

### 📊 Detailed Analysis
- Accurate classification into 3 categories
- Per-file detailed information
- TypeScript project support

### ⚡ High Performance
- Fast file searching with `fast-glob`
- Efficient processing for large projects

### 🔧 Developer Friendly
- Intuitive CLI interface
- Programmatic API
- Complete TypeScript type definitions

## Tech Stack

- **[@vue/compiler-sfc](https://github.com/vuejs/core/tree/main/packages/compiler-sfc)** - Vue SFC parser
- **[fast-glob](https://github.com/mrmlnc/fast-glob)** - Fast file searching
- **[consola](https://github.com/unjs/consola)** - Elegant console output
- **[citty](https://github.com/unjs/citty)** - CLI framework
- **[unbuild](https://github.com/unjs/unbuild)** - Universal build tool

## Development

### Setup

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build
npm run build

# Run tests
npm test

# Lint
npm run lint
```

### Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# With coverage
npm run test:coverage
```

### Project Structure

```
src/
├── cli.ts                          # CLI entry point
├── core.ts                         # Core analysis logic
├── index.ts                        # API exports
├── cli.test.ts                     # CLI tests
├── core.test.ts                    # Core functionality tests
└── utils/
    ├── segmented-progress-bar.ts   # Progress bar utility
    └── segmented-progress-bar.test.ts # Progress bar tests

fixtures/                           # Test fixtures
├── setup.vue                       # <script setup> sample
├── composition.vue                 # Composition API sample
├── options.vue                     # Options API sample
├── empty-define-component.vue      # defineComponent({}) sample
└── ...
```

## Related Links

- [Vue.js Official Documentation - `<script setup>`](https://vuejs.org/api/sfc-script-setup.html)
- [Vue.js Official Documentation - Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vue.js Official Documentation - Single File Components](https://vuejs.org/guide/scaling-up/sfc.html)

## License

MIT License © 2025 2nofa11
