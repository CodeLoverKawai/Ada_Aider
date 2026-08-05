---
name: ada-release
description: Automated release engine managing semantic versioning, multi-file version sync, automated CHANGELOG updates, and git tagging.
---
# ada-release (Automated Release Engine)

<EXTREMELY-IMPORTANT>
Release operations MUST be executed only when git working tree is clean and all unit tests pass with exit code 0.
</EXTREMELY-IMPORTANT>

## Pre-Release Verification Protocol

1. **Clean Git Tree Check**:
   - Run `git status --porcelain` to verify zero uncommitted changes.
2. **Automated Test Gate**:
   - Run full test suite (`npm test`). All tests MUST pass with exit code 0.
3. **Semantic Version Bump Calculation**:
   - `patch`: Bug fixes, non-breaking patches (e.g., 1.4.0 -> 1.4.1).
   - `minor`: New backward-compatible features (e.g., 1.4.0 -> 1.5.0).
   - `major`: Breaking changes (e.g., 1.4.0 -> 2.0.0).

## Version Sync & Release Pipeline

1. **Multi-File Version Bump**:
   - Update version string simultaneously in:
     - `package.json`
     - `plugin.json`
     - `gemini-extension.json`
     - `installed_version.json`
2. **CHANGELOG Generation (`ada-docs`)**:
   - Invoke `ada-docs` to prepend a new release section under `CHANGELOG.md`.
3. **Git Release & Tagging**:
   - Create commit: `chore(release): vX.Y.Z`
   - Create git tag: `git tag -a vX.Y.Z -m "Release vX.Y.Z"`

## Canonical Release Command

```bash
npm run release -- minor
```

