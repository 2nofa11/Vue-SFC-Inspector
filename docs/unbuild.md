# unbuild - A unified javascript build system

## 概要

unbuild は、TypeScript をサポートし、CommonJS と ES Module 形式 + 型宣言を生成する統一された JavaScript ビルドシステムです。

## 主な特徴

### 📦 **最適化されたバンドラー**

- Rollup ベースの堅牢なバンドラー
- TypeScript サポート
- CommonJS と ES Module 形式の生成
- 型宣言ファイルの自動生成

### 🪄 **自動設定**

- `package.json` からビルド設定とエントリーポイントを自動推論
- 設定ファイル不要で即座に使用開始可能

### 📁 **バンドルレスビルド**

- mkdist との統合
- ファイル単位でのトランスパイル
- 元のソース構造を保持

### ✨ **パッシブウォッチャー**

- jiti を使用して `dist` を一度スタブ化
- 開発中の監視・再ビルド不要
- プロジェクトのリンクとテストが簡単

### ✍ **Untype ジェネレーター**

- untyped との統合
- 型定義の自動生成

### ✔️ **セキュアビルド**

- 潜在的な**不足**および**未使用**の依存関係を自動チェック
- CI での自動失敗
- 出力サイズとエクスポートの表示

## インストールと基本使用法

### 1. ソースファイルの作成

`src/index.ts` を作成：

```typescript
export function log(...args) {
  console.log(...args)
}
```

### 2. package.json の更新

```json
{
  "type": "module",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    }
  },
  "main": "./dist/index.cjs",
  "types": "./dist/index.d.ts",
  "files": ["dist"]
}
```

### 3. ビルドの実行

```bash
npx unbuild
```

設定は `package.json` のフィールドから自動推論され、`src/` ディレクトリにマップされます。

## 設定

### 基本設定

`build.config.ts` を作成：

```typescript
export default {
  entries: ['./src/index'],
}
```

### 詳細設定

```typescript
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  // エントリーポイント（未指定の場合は package.json から自動推論）
  entries: [
    // デフォルト
    './src/index',
    // mkdist ビルダーでファイル単位トランスパイル
    {
      builder: 'mkdist',
      input: './src/package/components/',
      outDir: './build/components',
    },
  ],

  // 出力ディレクトリ（デフォルト: 'dist'）
  outDir: 'build',

  // 型宣言ファイルの生成
  declaration: true,
})
```

### 複数ビルド設定

```typescript
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig([
  {
    entries: ['./src/index'],
    outDir: 'build',
    declaration: 'compatible', // .d.mts, .d.cts, .d.ts を生成
  },
  {
    name: 'minified',
    entries: ['./src/index'],
    outDir: 'build/min',
    rollup: {
      esbuild: {
        minify: true,
      },
    },
  },
])
```

## 設定オプション

### 設定ファイルの場所

- `package.json` の `unbuild` キー
- `build.config.{js,cjs,mjs,ts,mts,cts,json}`

### declaration オプション

- `"compatible"`: `.d.mts`, `.d.cts`, `.d.ts` を生成
- `"node16"`: `.d.mts`, `.d.cts` を生成
- `true`: `"compatible"` と同等
- `false`: 型宣言生成を無効化
- `undefined`: `package.json` から自動検出

## 開発

```bash
# リポジトリのクローン
git clone <repository>

# Corepack の有効化
corepack enable

# 依存関係のインストール
pnpm install

# インタラクティブテストの実行
pnpm dev
```

## ライセンス

MIT License

## 参考リンク

- [公式ドキュメント](https://unjs.io/packages/unbuild)
- [GitHub リポジトリ](https://github.com/unjs/unbuild)
- [プロジェクトテンプレート](https://github.com/unjs/template)

---

_最終更新: 2025/6/1_
