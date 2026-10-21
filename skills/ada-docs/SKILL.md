---
name: ada-docs
description: Living documentation skill enforcing automated README syncing, domain modeling with GLOSSARY.md, GitHub Alert blocks, and conventional CHANGELOG generation upon feature or release completions.
---
# ada-docs (Living Documentation, Domain Modeling & Auto-CHANGELOG)

## Directives for Documentation Maintenance

1. **Living Domain Model (`GLOSSARY.md`)**:
   - In non-trivial projects, maintain a root `GLOSSARY.md` defining the Ubiquitous Language (Domain-Driven Design).
   - Ensure names in code (classes, types, DB tables, events) match the glossary verbatim.
   - Forbid ambiguous synonyms across code, ADRs, database schemas, and specs (e.g., mixing "Account", "User", and "Customer" arbitrarily).
2. **Auto-Sync `README.md`**:
   - Whenever introducing a new feature, CLI command, config flag, or API parameter, update `README.md` immediately.
   - Keep feature tables, usage examples, and command references 100% in sync with the codebase.
3. **GitHub Alert Blocks Usage**:
   - Structure markdown documentation using GitHub Flavored Markdown alerts:
     - `> [!NOTE]`: Useful context or background information.
     - `> [!TIP]`: Helpful tips and efficiency suggestions.
     - `> [!IMPORTANT]`: Critical requirement or key step.
     - `> [!WARNING]`: Potential breaking change or deprecation warning.
4. **Auto-Generate `CHANGELOG.md`**:
   - Before releasing or finishing major milestones, prepend a formatted entry under `CHANGELOG.md`.
   - Organize entries under standard headings:
     - 🚀 **Features**
     - 🐛 **Bug Fixes**
     - ⚡ **Performance & Optimization**
     - ⚠️ **Breaking Changes**
5. **Zero Stale Documentation**:
   - Code changes to production endpoints or interfaces MUST be accompanied by corresponding doc updates.

## Canonical Micro-Templates

### 1. `GLOSSARY.md` (Ubiquitous Language Micro-Template)

```markdown
# Domain Glossary & Ubiquitous Language

| Term | Definition | Invariants | Synonyms to Avoid |
| :--- | :--- | :--- | :--- |
| **Workspace** | Isolated directory tree holding a working copy of a project repository. | Must contain an initialized git repository or worktree. | Do not use *Environment*, *Sandbox*, or *Folder*. |
| **Agent** | Autonomous entity executing tool calls within an active conversation context. | Must have a distinct conversation ID and assigned role. | Do not use *Worker*, *Bot*, or *Runner*. |
| **Task** | A single bounded unit of work decomposed from a milestone plan. | Must produce empirical verification evidence before completion. | Do not use *Ticket*, *Job*, or *Issue*. |
```

### 2. `CHANGELOG.md` Micro-Example

```markdown
## [1.5.0] - 2026-08-04

### 🚀 Features
- Integrated Superpowers core engine into Ada_Aider.
- Upgraded `ada-taste`, `ada-db`, `ada-security`, and `ada-release` skills.

### 🐛 Bug Fixes
- Fixed path resolution in `writing-skills` reference links.
```


