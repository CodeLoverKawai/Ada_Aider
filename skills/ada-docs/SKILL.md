---
name: ada-docs
description: Living documentation skill enforcing automated README syncing and conventional CHANGELOG generation upon feature or release completions.
---
# ada-docs (Living Documentation & Auto-CHANGELOG)

## Directives
- **Auto-Sync README.md**: Whenever a new feature, CLI command, config flag, or API parameter is introduced:
  - Update `README.md` feature tables, command references, and usage examples.
  - Keep documentation in sync with actual codebase capabilities.
- **Auto-Generate CHANGELOG.md**: Before releasing or finishing major milestones:
  - Parse recent conventional commits or completed tasks in `implementation_plan.md`.
  - Prepend a formatted entry under `CHANGELOG.md` organized into:
    - 🚀 **Features**
    - 🐛 **Bug Fixes**
    - ⚡ **Performance & Optimization**
    - ⚠️ **Breaking Changes**
- **Zero Stale Docs**: No code changes to production endpoints/interfaces without matching doc updates.

## Canonical Micro-Example
```markdown
## [1.4.0] - 2026-08-02

### 🚀 Features
- Added `ada-workflow` deep project discovery skill.
- Added `ada-docs` auto-documentation and CHANGELOG engine.

### ⚡ Performance & Optimization
- Implemented Lazy Loading architecture in `GEMINI.md` reducing input tokens by 65%.
```
