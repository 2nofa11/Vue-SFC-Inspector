# 変更履歴

<div align="center">

日本語 | [English](./CHANGELOG.md)

</div>

このファイルには、このプロジェクトの注目すべき変更がすべて記録されています。

フォーマットは[Keep a Changelog](https://keepachangelog.com/ja/)に基づき、
このプロジェクトは[セマンティックバージョニング](https://semver.org/lang/ja/)に準拠しています。

## v0.0.2

### 🎉 新機能

- **npxサポート**: CLIに適切なshebangと実行権限を追加し、`npx vue-sfc-inspector`での実行を可能に
- **多言語ドキュメント**: 英語版READMEと日本語版（README.ja.md）を追加
- **npm公開準備**: 完全なパッケージメタデータ（author、license、repository、keywords）を追加

### 🔨 その他

- MITライセンスファイルを追加
- CLI実行可能ファイルを確実にするためのpostbuildスクリプトを設定
- より良いCLIサポートのためのビルド設定を更新

## v0.0.1

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