# Vue SFC Inspector

Vue Single File Component (SFC) の `<script setup>` 採用状況を解析するCLIツール

## 概要

Vue SFC Inspector は、プロジェクト内の Vue SFC ファイルを走査し、以下の分類で統計を表示します：

- **`<script setup>`**: Vue 3.2+ の Composition API シンタックスシュガー
- **Composition API (setup() in `<script>`)**: 従来の `setup()` 関数を使用
- **Options API**: Vue 2 スタイルの Options API

## インストール

```bash
npm install vue-sfc-inspector
```

## 使用方法

### CLI コマンド

```bash
# カレントディレクトリを解析
npx vue-sfc-inspector

# 特定のディレクトリを解析
npx vue-sfc-inspector ./src

# プロジェクトルートを解析
npx vue-sfc-inspector .

# 詳細表示（ファイル一覧付き）
npx vue-sfc-inspector ./src --details
```

### 出力例

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

### 詳細表示オプション

`--details` または `-d` フラグを使用すると、各カテゴリのファイル一覧も表示されます：

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

## プログラマティック API

```typescript
import { classifyVueFiles } from 'vue-sfc-inspector'

const result = await classifyVueFiles('./src')

console.log(result)
// {
//   scriptSetup: 2,
//   compositionAPI: 4,
//   optionsAPI: 1,
//   total: 7,
//   withSetup: 2,        // 後方互換性
//   withoutSetup: 5      // 後方互換性
// }

// 詳細情報付きで取得
const detailedResult = await classifyVueFiles('./src', { includeDetails: true })
console.log(detailedResult.files)
// [
//   { path: './src/Header.vue', type: 'scriptSetup' },
//   { path: './src/UserProfile.vue', type: 'compositionAPI' },
//   ...
// ]
```

### 型定義

```typescript
interface ScanResult {
  // 詳細分類
  scriptSetup: number      // <script setup> の件数
  compositionAPI: number   // setup() 関数使用の件数
  optionsAPI: number       // Options API の件数
  total: number           // 総ファイル数
  
  // 後方互換性
  withSetup: number       // scriptSetup と同じ
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

## 判定ロジック

### `<script setup>` の判定
- `@vue/compiler-sfc` の `descriptor.scriptSetup` プロパティの存在

### Composition API の判定
- `setup()` 関数の存在
- `defineComponent()` の使用（TypeScript での型サポート目的も含む）
- Composition API 関数のインポート (`ref`, `reactive`, `computed`, `watch`, `onMounted` など)

### Options API の判定
- 上記に該当しない `<script>` ブロック

## 特徴

### 🎨 美しい視覚的出力
- GitHubスタイルのセグメント化されたプログレスバー
- 色分けされた統計表示
- エモジとアイコンによる直感的な表示

### 📊 詳細な分析
- 3つのカテゴリでの正確な分類
- ファイル単位での詳細情報
- TypeScript プロジェクトにも対応

### ⚡ 高速処理
- `fast-glob` による高速ファイル検索
- 大規模プロジェクトでも効率的な処理

### 🔧 開発者フレンドリー
- 直感的なCLIインターフェース
- プログラマティックAPI
- TypeScript 型定義完備

## 技術スタック

- **[@vue/compiler-sfc](https://github.com/vuejs/core/tree/main/packages/compiler-sfc)** - Vue SFC パーサー
- **[fast-glob](https://github.com/mrmlnc/fast-glob)** - 高速ファイル検索
- **[consola](https://github.com/unjs/consola)** - エレガントなコンソール出力
- **[citty](https://github.com/unjs/citty)** - CLI フレームワーク
- **[unbuild](https://github.com/unjs/unbuild)** - ユニバーサルビルドツール

## 開発

### セットアップ

```bash
# 依存関係のインストール
npm install

# 開発モードで実行
npm run dev

# ビルド
npm run build

# テスト実行
npm test

# リンティング
npm run lint
```

### テスト

```bash
# 全テスト実行
npm test

# ウォッチモード
npm run test:watch

# カバレッジ付き
npm run test:coverage
```

### プロジェクト構造

```
src/
├── cli.ts                          # CLI エントリーポイント
├── core.ts                         # コア解析ロジック
├── index.ts                        # API エクスポート
├── cli.test.ts                     # CLI テスト
├── core.test.ts                    # コア機能テスト
└── utils/
    ├── segmented-progress-bar.ts   # プログレスバーユーティリティ
    └── segmented-progress-bar.test.ts # プログレスバーテスト

fixtures/                           # テスト用フィクスチャ
├── setup.vue                       # <script setup> サンプル
├── composition.vue                 # Composition API サンプル
├── options.vue                     # Options API サンプル
├── empty-define-component.vue      # defineComponent({}) サンプル
└── ...
```

## 関連リンク

- [Vue.js 公式ドキュメント - `<script setup>`](https://vuejs.org/api/sfc-script-setup.html)
- [Vue.js 公式ドキュメント - Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vue.js 公式ドキュメント - Single File Components](https://vuejs.org/guide/scaling-up/sfc.html)
