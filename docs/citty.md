# citty - Elegant CLI Builder

## 概要

citty は、エレガントな CLI アプリケーションを構築するための JavaScript/TypeScript ライブラリです。

## 主な特徴

- **高速で軽量** - mri ベースの引数パーサーを使用
- **スマートな値解析** - 型キャスト、ブール値ショートカット、未知フラグの処理
- **ネストしたサブコマンド**対応
- **遅延・非同期コマンド**対応
- **プラガブルで組み合わせ可能な API**
- **自動生成される使用方法とヘルプ**

## インストール

```bash
# npm
npm install citty

# yarn
yarn add citty

# pnpm
pnpm install citty
```

## 基本的な使用例

```javascript
import { defineCommand, runMain } from 'citty'

const main = defineCommand({
  meta: {
    name: 'hello',
    version: '1.0.0',
    description: 'My Awesome CLI App',
  },
  args: {
    name: {
      type: 'positional',
      description: 'Your name',
      required: true,
    },
    friendly: {
      type: 'boolean',
      description: 'Use friendly greeting',
    },
  },
  run({ args }) {
    console.log(`${args.friendly ? 'Hi' : 'Greetings'} ${args.name}!`)
  },
})

runMain(main)
```

## 主要なユーティリティ関数

### `defineCommand`

コマンド定義のための型ヘルパー

### `runMain`

使用方法サポートとエラーハンドリングでコマンドを実行

### `createMain`

runMain を呼び出すコマンドラッパーを作成

### `runCommand`

引数を解析してコマンドとサブコマンドを実行（無監督）

### `parseArgs`

入力引数を解析してデフォルト値を適用

### `renderUsage`

コマンドの使用方法を文字列として描画

### `showUsage`

使用方法を描画してコンソールに出力

## ライセンス

MIT License の下で公開されており、引数パーサーは Luke Edwards 氏の[lukeed/mri](https://github.com/lukeed/mri)をベースにしています。

## 参考リンク

- [公式ドキュメント](https://unjs.io/packages/citty)
- [GitHub リポジトリ](https://github.com/unjs/citty)

---

_最終更新: 2025/6/1_
