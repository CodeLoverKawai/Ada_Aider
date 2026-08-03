---
name: ada-workflow
description: Deep project discovery skill that audits build tools, test runners, release configurations, and generates tailored project-workflow.md specs.
---
# ada-workflow (Project Discovery & Workflow Automation)

## Audit Directive
When entering a new project repository or executing a workflow audit:
1. **Stack Detection**: Inspect `package.json`, `Cargo.toml`, `pyproject.toml`, `go.mod`, `Makefile`, etc.
2. **Test & Linters**: Identify exact test framework (`npm test`, `pytest`, `cargo test`, `jest`) and linter commands.
3. **Version Files Location**: Map all files containing version strings (`package.json`, `plugin.json`, `gemini-extension.json`, `installed_version.json`, `pyproject.toml`).
4. **Release Scripts**: Locate existing release scripts (`bin/release.js`, `scripts/release.sh`, `.github/workflows/`).
5. **Generate Workflow Spec**: Write/update `docs/specs/project-workflow.md` documenting:
   - Verification command pipeline
   - Version sync file manifest
   - Automated release protocol

## Canonical Micro-Example
```markdown
# [Project Workflow Spec] Ada_Aider

## Stack & Test Engine
- Node.js (Built-in Test Runner `node --test tests/*.test.js`)
- Verification: `npm test`

## Version Manifest
- `package.json` (.version)
- `plugin.json` (.version)
- `gemini-extension.json` (.version)
- `installed_version.json` (.version)

## Release Protocol
- Command: `npm run release -- [patch|minor|major]`
```
