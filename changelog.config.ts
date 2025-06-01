export default {
  repo: {
    provider: 'github',
    owner: '2nofa11',
    name: 'Vue-SFC-Inspector',
  },

  types: {
    feat: { title: '🎉 新機能', emoji: '🎉' },
    fix: { title: '🐛 バグ修正', emoji: '🐛' },
    docs: { title: '📚 ドキュメント', emoji: '📚' },
    style: { title: '💄 スタイル', emoji: '💄' },
    refactor: { title: '♻️ リファクタリング', emoji: '♻️' },
    perf: { title: '⚡ パフォーマンス改善', emoji: '⚡' },
    test: { title: '✅ テスト', emoji: '✅' },
    build: { title: '🏗️ ビルド', emoji: '🏗️' },
    ci: { title: '🔧 CI', emoji: '🔧' },
    chore: { title: '🔨 その他', emoji: '🔨' },
  },

  templates: {
    commitMessage: 'chore(release): v{{newVersion}}',
    tagMessage: 'v{{newVersion}}',
  },

  contributors: {
    hideAuthorEmail: true,
  },
}
