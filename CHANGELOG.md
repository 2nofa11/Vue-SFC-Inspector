# Changelog

<div align="center">

[日本語](./README.ja.md) | English

</div>

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/)
and this project adheres to [Semantic Versioning](https://semver.org/).

## v0.0.2

### 🎉 Features

- **npx support**: Added proper shebang and executable permissions for CLI to enable `npx vue-sfc-inspector` usage
- **Multilingual documentation**: Added English README with Japanese version (README.ja.md)
- **npm publishing preparation**: Added complete package metadata (author, license, repository, keywords)

### 🔨 Chores

- Added MIT license file
- Configured postbuild script to ensure CLI executable
- Updated build configuration for better CLI support

## v0.0.1

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

