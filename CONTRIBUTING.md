# Contributing to Vue SFC Inspector

## コミットメッセージのガイドライン

このプロジェクトでは[Conventional Commits](https://www.conventionalcommits.org/)仕様に従ったコミットメッセージを使用しています。

### コミットメッセージの形式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type（必須）

- **feat**: 新機能の追加
- **fix**: バグの修正
- **docs**: ドキュメントのみの変更
- **style**: コードの意味に影響を与えない変更（空白、フォーマット、セミコロンの欠落など）
- **refactor**: バグ修正や機能追加ではないコードの変更
- **perf**: パフォーマンスを向上させるコードの変更
- **test**: テストの追加や既存テストの修正
- **build**: ビルドシステムや外部依存関係に影響する変更
- **ci**: CI設定ファイルとスクリプトの変更
- **chore**: その他の変更（ソースやテストファイルの変更を含まない）

### Subject（必須）

変更内容の簡潔な説明：
- 命令形、現在形を使用（例："change" であり "changed" や "changes" ではない）
- 最初の文字を大文字にしない
- 文末にピリオドを付けない

### 例

```bash
# 新機能
feat(cli): add --output option for custom output path

# バグ修正
fix(parser): handle dynamic imports correctly

# ドキュメント
docs: update installation instructions

# 破壊的変更
feat(analyzer)!: change default export format

BREAKING CHANGE: The default export format has been changed from JSON to CSV.
```

## リリースプロセス

1. 変更をコミット（Conventional Commits形式で）
2. `npm run changelog` でCHANGELOGをプレビュー
3. `npm run release` でリリース（自動でバージョンアップ、タグ作成、プッシュ）

### 特定のバージョンアップを行う場合

```bash
# パッチリリース (0.0.0 -> 0.0.1)
npm run release:patch

# マイナーリリース (0.0.0 -> 0.1.0)
npm run release:minor

# メジャーリリース (0.0.0 -> 1.0.0)
npm run release:major
``` 