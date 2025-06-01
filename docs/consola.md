# consola - Elegant Console Wrapper

## 概要

consola は、エレガントなコンソールラッパーライブラリで、Node.js とブラウザの両方で動作します。

## 主な特徴

- 👌 **使いやすい** - シンプルで直感的な API
- 💅 **美しい出力** - ミニマル環境でのフォールバック対応
- 🔌 **プラガブルレポーター** - カスタムレポーターの追加が可能
- 💻 **一貫した CLI 体験** - コマンドライン環境での統一されたインターフェース
- 🏷 **タグサポート** - ログにタグを付けて分類
- 🚏 **リダイレクト機能** - console や stdout/stderr を consola にリダイレクト
- 🌐 **ブラウザサポート** - ブラウザ環境でも動作
- ⏯ **一時停止/再開** - ログの一時停止と再開が可能
- 👻 **モッキングサポート** - テスト環境でのモック機能
- 👮‍♂️ **スパム防止** - ログのスロットリング機能
- ❯ **インタラクティブプロンプト** - clack を使用したプロンプト機能

## インストール

```bash
# npm
npm i consola

# yarn
yarn add consola

# pnpm
pnpm i consola
```

## 基本的な使用例

```javascript
// ESM
import { consola, createConsola } from "consola";

// CommonJS
const { consola, createConsola } = require("consola");

consola.info("Using consola 3.0.0");
consola.start("Building project...");
consola.warn("A new version of consola is available: 3.0.1");
consola.success("Project built!");
consola.error(new Error("This is an example error. Everything is fine!"));
consola.box("I am a simple box");
await consola.prompt("Deploy to the production?", {
  type: "confirm",
});
```

## 軽量版の使用

バンドルサイズを 80% 削減できる軽量版も利用可能：

```javascript
import { consola, createConsola } from "consola/basic";
import { consola, createConsola } from "consola/browser";
import { createConsola } from "consola/core";
```

## 主要なメソッド

### ログメソッド

- `consola.info()`, `consola.warn()`, `consola.error()` など - 各種ログレベルでの出力

### プロンプト

- `await consola.prompt(message, { type })` - インタラクティブプロンプト（text, confirm, select, multiselect）

### レポーター管理

- `addReporter(reporter)` - カスタムレポーターの追加
- `removeReporter(reporter)` - レポーターの削除
- `setReporters(reporters)` - レポーターの置き換え

### インスタンス作成

- `create(options)` - 新しい Consola インスタンスの作成
- `withDefaults(defaults)` - デフォルト設定付きインスタンスの作成
- `withTag(tag)` - タグ付きインスタンスの作成

### リダイレクト機能

- `wrapConsole()` / `restoreConsole()` - console のリダイレクト
- `wrapStd()` / `restoreStd()` - stdout/stderr のリダイレクト
- `wrapAll()` / `restoreAll()` - 両方のリダイレクト

### ログ制御

- `pauseLogs()` / `resumeLogs()` - ログの一時停止/再開
- `mockTypes()` - テスト用のモック機能

## ログレベル

利用可能なログレベル（デフォルト: 3）：

- `0`: Fatal と Error
- `1`: Warnings
- `2`: Normal logs
- `3`: Informational logs, success, fail, ready, start など
- `4`: Debug logs
- `5`: Trace logs
- `-999`: Silent
- `+999`: Verbose logs

設定方法：

- `createConsola` の `level` オプション
- インスタンスの `consola.level` プロパティ
- `CONSOLA_LEVEL` 環境変数

## カスタムレポーター

`{ log(logObject): () => {} }` インターフェースを実装したカスタムレポーターを作成可能：

```javascript
import { createConsola } from 'consola'

const consola = createConsola({
  reporters: [
    {
      log: (logObj) => {
        console.log(JSON.stringify(logObj))
      },
    },
  ],
})
```

## テスト環境での使用

### Jest/Vitest との統合

```javascript
describe('your-consola-mock-test', () => {
  beforeAll(() => {
    consola.wrapAll()
  })

  beforeEach(() => {
    consola.mockTypes(() => jest.fn())
  })

  test('your test', async () => {
    // テストコード
    const consolaMessages = consola.log.mock.calls.map(c => c[0])
    expect(consolaMessages).toContain('your message')
  })
})
```

## コンソールユーティリティ

```javascript
import {
  align,
  box,
  centerAlign,
  colorize,
  colors,
  getColor,
  leftAlign,
  rightAlign,
  stripAnsi,
} from 'consola/utils'
```

## ライセンス

MIT License

## 参考リンク

- [公式ドキュメント](https://unjs.io/packages/consola)
- [GitHub リポジトリ](https://github.com/unjs/consola)

---

_最終更新: 2025/6/1_
