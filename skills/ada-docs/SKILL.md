---
name: ada-docs
description: Living documentation skill enforcing automated README syncing, GitHub Alert blocks, and conventional CHANGELOG generation upon feature or release completions.
---
# ada-docs (Living Documentation & Auto-CHANGELOG)

## Directives for Documentation Maintenance

1. **Auto-Sync `README.md`**:
   - Whenever introducing a new feature, CLI command, config flag, or API parameter, update `README.md` immediately.
   - Keep feature tables, usage examples, and command references 100% in sync with the codebase.
2. **GitHub Alert Blocks Usage**:
   - Structure markdown documentation using GitHub Flavored Markdown alerts:
     - `> [!NOTE]`: Useful context or background information.
     - `> [!TIP]`: Helpful tips and efficiency suggestions.
     - `> [!IMPORTANT]`: Critical requirement or key step.
     - `> [!WARNING]`: Potential breaking change or deprecation warning.
3. **Auto-Generate `CHANGELOG.md`**:
   - Before releasing or finishing major milestones, prepend a formatted entry under `CHANGELOG.md`.
   - Organize entries under standard headings:
     - 🚀 **Features**
     - 🐛 **Bug Fixes**
     - ⚡ **Performance & Optimization**
     - ⚠️ **Breaking Changes**
4. **Zero Stale Documentation**:
   - Code changes to production endpoints or interfaces MUST be accompanied by corresponding doc updates.

## Canonical Micro-Example

```markdown
## [1.5.0] - 2026-08-04

### 🚀 Features
- Integrated Superpowers core engine into Ada_Aider.
- Upgraded `ada-taste`, `ada-db`, `ada-security`, and `ada-release` skills.

### 🐛 Bug Fixes
- Fixed path resolution in `writing-skills` reference links.
```

