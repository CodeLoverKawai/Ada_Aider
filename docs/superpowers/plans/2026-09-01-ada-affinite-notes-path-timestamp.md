# Ada Affinite Note Path Resolution & Timestamp Naming Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update `ada-affinite-note` skill instructions, directory resolution logic, and documentation to target `~/Documents/GitHub/Universidad/Affinite_Notes/<Categoria>/` with multi-OS support and `(YYYY-MM-DD)` parenthetical timestamp naming convention.

**Architecture:** Update skill markdown prompts and docs to specify the prioritized multi-platform directory resolution (`$AFFINITE_NOTES_DIR` -> `~/Documents/GitHub/Universidad/Affinite_Notes/` -> fallback), parenthetical timestamp format `<kebab-case> (YYYY-MM-DD).md`, sync changes between the repository and `~/.gemini/config/plugins/ada-agent/`, and verify end-to-end with a sample test generation.

**Tech Stack:** Markdown GFM, Antigravity Agent Skill definitions, Bash.

## Global Constraints
- Target standard directory: `~/Documents/GitHub/Universidad/Affinite_Notes/<Categoria>/`
- Supported subcategories: `Matematicas/`, `Ciencias_Fisica/`, `Ingenieria_Software/`, `Investigacion/`, `General/`
- Filename pattern: `<nombre-en-kebab-case> (YYYY-MM-DD).md`
- Clickable links in responses formatted properly with URL encoding: `[file (YYYY-MM-DD).md](file:///path/file%20(YYYY-MM-DD).md)`
- Sync changes to both repository `skills/ada-affinite-note/` and installed plugin `~/.gemini/config/plugins/ada-agent/skills/ada-affinite-note/`.

---

### Task 1: Update `skills/ada-affinite-note/SKILL.md`

**Files:**
- Modify: `skills/ada-affinite-note/SKILL.md`

**Interfaces:**
- Consumes: Design spec in `docs/superpowers/specs/2026-09-01-ada-affinite-notes-path-timestamp-design.md`
- Produces: Updated `ada-affinite-note` skill rules with multi-platform path resolution and `(YYYY-MM-DD)` timestamp filename convention.

- [ ] **Step 1: Edit `skills/ada-affinite-note/SKILL.md`**
Update target directory definitions, multi-platform resolution table, naming convention rules, and response link guidelines.

- [ ] **Step 2: Verify `skills/ada-affinite-note/SKILL.md` contents**
Verify no outdated `~/Documents/Affinite_Notes/` paths remain as the primary path and that `(YYYY-MM-DD)` is documented.

- [ ] **Step 3: Commit changes**
```bash
git add skills/ada-affinite-note/SKILL.md
git commit -m "feat(skills): update ada-affinite-note path to Universidad repository and add timestamp naming"
```

---

### Task 2: Update Project Documentation (`README.md`)

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: Updated `ada-affinite-note` definitions
- Produces: Synchronized README describing the new target path and timestamp naming.

- [ ] **Step 1: Edit `README.md` section for `ada-affinite-note`**
Update description of output directory to `~/Documents/GitHub/Universidad/Affinite_Notes/<Categoria>/<nombre> (YYYY-MM-DD).md` and cross-platform resolution.

- [ ] **Step 2: Verify `README.md` changes**
Check git diff to confirm accuracy.

- [ ] **Step 3: Commit changes**
```bash
git add README.md
git commit -m "docs: update ada-affinite-note documentation in README"
```

---

### Task 3: Synchronize to Plugin Installation Directory

**Files:**
- Modify: `~/.gemini/config/plugins/ada-agent/skills/ada-affinite-note/SKILL.md`
- Modify: `~/.gemini/config/plugins/ada-agent/README.md`
- Create: `~/.gemini/config/plugins/ada-agent/docs/superpowers/specs/2026-09-01-ada-affinite-notes-path-timestamp-design.md`

**Interfaces:**
- Consumes: Repository files in `Ada_Aider`
- Produces: Updated active plugin installation in `~/.gemini/config/plugins/ada-agent/`

- [ ] **Step 1: Copy updated files to plugin installation**
Copy `skills/ada-affinite-note/SKILL.md`, `README.md`, and specs into `~/.gemini/config/plugins/ada-agent/`.

- [ ] **Step 2: Verify diff between repo and installed plugin**
Ensure both locations are identical.

---

### Task 4: Empirical Verification with Test Note Generation

**Files:**
- Test Output: `/home/rousseau/Documents/GitHub/Universidad/Affinite_Notes/General/test-verificacion-affinite (2026-09-01).md`

**Interfaces:**
- Consumes: New resolution and naming rules
- Produces: Verified note file in target location, verified file permissions, and clean teardown/retention.

- [ ] **Step 1: Create a test note in the target location**
Generate test note at `/home/rousseau/Documents/GitHub/Universidad/Affinite_Notes/General/test-verificacion-affinite (2026-09-01).md` using the new format.

- [ ] **Step 2: Verify file existence and contents**
Verify file exists, markdown parses BlockSuite blocks and macros properly, and clean up test note if needed.
