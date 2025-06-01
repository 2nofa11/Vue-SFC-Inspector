# 変更履歴

<div align="center">

日本語 | [English](./CHANGELOG.md)

</div>

このファイルには、このプロジェクトの注目すべき変更がすべて記録されています。

フォーマットは[Keep a Changelog](https://keepachangelog.com/ja/)に基づき、
このプロジェクトは[セマンティックバージョニング](https://semver.org/lang/ja/)に準拠しています。

## v0.0.2

[変更を比較](https://github.com/2nofa11/Vue-SFC-Inspector/compare/v0.0.1...v0.0.2)

### 🎉 新機能

- npxサポートの追加とnpm公開の準備 ([7962bc8](https://github.com/2nofa11/Vue-SFC-Inspector/commit/7962bc8))
  - CLIに適切なshebangと実行権限を追加し、`npx vue-sfc-inspector`での実行を可能に
  - 英語版READMEと日本語版（README.ja.md）を追加
  - npm用の完全なパッケージメタデータ（author、license、repository、keywords）を追加

### 🔨 その他

- changelog設定の更新、LICENSEファイルの追加、package.jsonへのauthorとrepository詳細の追加、日本語READMEの作成 ([985ed41](https://github.com/2nofa11/Vue-SFC-Inspector/commit/985ed41))
- CLIに実行権限を設定するpostbuildスクリプトの追加とCLIエントリー用のunbuild設定の更新 ([bca3cec](https://github.com/2nofa11/Vue-SFC-Inspector/commit/bca3cec))

### ❤️ コントリビューター

- 2nofa11 <agsh0505@gmail.com>

## v0.0.1

[変更を比較](https://github.com/2nofa11/Vue-SFC-Inspector/compare/dbcabfa...v0.0.1)

### 🎉 新機能

- **vue-sfc-inspectorの初期リリース** - 包括的な機能を備えたVue SFCスクリプトセットアップ採用状況分析CLIツール ([1af186c](https://github.com/2nofa11/Vue-SFC-Inspector/commit/1af186c))
  - Vue SFCコンポーネントのAPIスタイル（Options API、Composition API、Script Setup）を分析
  - ディレクトリの再帰的スキャン機能
  - 詳細な統計レポートの生成
  - 進捗バー表示によるUX向上
  - 包括的なテストカバレッジ
  - TypeScriptフルサポート
  - ESLint設定
  - Vitestによるテスト環境
  - Unbuildによるビルド設定
  - Changelogenによるチェンジログ管理

### ❤️ コントリビューター

- 2nofa11 <agsh0505@gmail.com>

## ライセンス

MIT License © 2025 2nofa11 