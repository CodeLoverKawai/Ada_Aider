---
name: ada-release
description: Automated release engine managing semantic versioning, multi-file version sync, automated CHANGELOG updates, and git tagging.
---
# ada-release (Automated Release Engine)

## Pre-Release Verification Protocol
1. **Clean Git Tree**: Verify no uncommitted changes (`git status --porcelain`).
2. **Automated Test Gate**: Run full test suite (`npm test`). Must pass cleanly with exit code 0.
3. **Semantic Bump Calculation**: Determine version type:
   - `patch`: Bug fixes, minor patches (1.3.0 -> 1.3.1)
   - `minor`: New features, backward-compatible additions (1.3.0 -> 1.4.0)
   - `major`: Breaking changes (1.3.0 -> 2.0.0)

## Version Sync & Release Pipeline
1. **Multi-File Version Bump**: Update version string in:
   - `package.json`
   - `plugin.json`
   - `gemini-extension.json`
   - `installed_version.json`
2. **CHANGELOG Generation**: Invoke `ada-docs` to prepend release notes under `CHANGELOG.md`.
3. **Git Release & Tagging**:
   - Create commit: `chore(release): vX.Y.Z`
   - Create git tag: `vX.Y.Z` (`git tag -a vX.Y.Z -m "Release vX.Y.Z"`)

## Canonical Release Command
```bash
npm run release -- minor
```
