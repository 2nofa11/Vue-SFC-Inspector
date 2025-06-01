# Changelog

<div align="center">

[日本語](./CHANGELOG.ja.md) | English

</div>

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/)
and this project adheres to [Semantic Versioning](https://semver.org/).

## v0.0.2

[compare changes](https://github.com/2nofa11/Vue-SFC-Inspector/compare/v0.0.1...v0.0.2)

### 🎉 Features

- Add npx support and prepare for npm publishing ([7962bc8](https://github.com/2nofa11/Vue-SFC-Inspector/commit/7962bc8))
  - Added proper shebang and executable permissions for CLI to enable `npx vue-sfc-inspector` usage
  - Added English README with Japanese version (README.ja.md)
  - Added complete package metadata (author, license, repository, keywords)

### 🔨 Chores

- Update changelog configuration, add LICENSE file, enhance package.json with author and repository details, and create Japanese README ([985ed41](https://github.com/2nofa11/Vue-SFC-Inspector/commit/985ed41))
- Add postbuild script to set executable permissions for CLI and update unbuild configuration for CLI entry ([bca3cec](https://github.com/2nofa11/Vue-SFC-Inspector/commit/bca3cec))

### ❤️ Contributors

- 2nofa11 <agsh0505@gmail.com>

## v0.0.1

[compare changes](https://github.com/2nofa11/Vue-SFC-Inspector/compare/dbcabfa...v0.0.1)

### 🎉 Features

- **Initial release of vue-sfc-inspector** - CLI tool to analyze Vue SFC script setup adoption with comprehensive features ([1af186c](https://github.com/2nofa11/Vue-SFC-Inspector/commit/1af186c))
  - Analyzes Vue SFC components API styles (Options API, Composition API, Script Setup)
  - Recursive directory scanning
  - Detailed statistics report generation
  - Progress bar display for better UX
  - Comprehensive test coverage
  - Full TypeScript support
  - ESLint configuration
  - Vitest testing environment
  - Unbuild build configuration
  - Changelogen for changelog management

### ❤️ Contributors

- 2nofa11 <agsh0505@gmail.com>

## License

MIT License © 2025 2nofa11

