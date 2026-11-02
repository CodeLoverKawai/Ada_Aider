# Antigravity Skills Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bridge and integrate Ada-Aider with Google Antigravity's built-in skills (`generative_ui`, `automation`, `agy-customizations`, `antigravity-guide`, `plugin`) and ecosystem plugins (`google-antigravity-sdk`, `modern-web-guidance`, `firebase-*`, `android-*`).

**Architecture:** 
1. Expand the master router `GEMINI.md` and `ada-agent` to include an "Antigravity Native & Ecosystem Interoperability" index and routing protocol.
2. Synchronize domain skills (`ada-taste` with `generative_ui` & `modern-web-guidance`; `ada-proactive` with `automation` & `schedule`; `ada-arch` with `google-antigravity-sdk`).
3. Clean up legacy tool hallucinations in `skills/using-superpowers/references/antigravity-tools.md`.
4. Validate test integrity with `tests/orchestrator.test.js` ensuring 100% test pass rate and backward compatibility.

**Tech Stack:** Node.js test runner (`node --test`), Markdown / YAML frontmatter, Git.

## Global Constraints
- Router table in `GEMINI.md` must preserve strict format; local `./skills/` paths must exist on disk; external/native skills are categorized clearly.
- No hallucinated tool parameters (`IsArtifact`, `ArtifactType`, `multi_replace_file_content`).
- Zero regressions in existing 36 tests.

---

### Task 1: Write Verification Tests for Antigravity Skills Integration

**Files:**
- Modify: `tests/orchestrator.test.js`

- [x] **Step 1: Add unit tests verifying Antigravity skills indexing, tool reference cleanup, and cross-skill synergies in `tests/orchestrator.test.js`**
- [x] **Step 2: Run `npm test` and verify that the new tests fail as expected (RED phase)**

---

### Task 2: Update Tool Reference in `skills/using-superpowers/references/antigravity-tools.md`

**Files:**
- Modify: `skills/using-superpowers/references/antigravity-tools.md`

- [x] **Step 1: Replace legacy fields (`IsArtifact`, `ArtifactType: "task"`, `multi_replace_file_content`) with valid `ArtifactMetadata` schema and `replace_file_content`**
- [x] **Step 2: Add mappings for native Antigravity skills invocation (`generative_ui`, `automation`, `schedule`)**

---

### Task 3: Update `GEMINI.md` Master Router with Antigravity Interoperability

**Files:**
- Modify: `GEMINI.md`

- [x] **Step 1: Add the Antigravity Interoperability matrix and skill routing rules to `GEMINI.md`**
- [x] **Step 2: Ensure all local `./skills/` links exist on disk and pass router integrity test**

---

### Task 4: Connect Domain Skills (`ada-taste`, `ada-proactive`, `ada-agent`)

**Files:**
- Modify: `skills/ada-agent/SKILL.md`
- Modify: `skills/ada-taste/SKILL.md`
- Modify: `skills/ada-proactive/SKILL.md`

- [x] **Step 1: Update `skills/ada-agent/SKILL.md` with Antigravity Native & Ecosystem Interoperability section**
- [x] **Step 2: Update `skills/ada-taste/SKILL.md` to reference `generative_ui` (`<agent-embed>`) and `modern-web-guidance`**
- [x] **Step 3: Update `skills/ada-proactive/SKILL.md` to reference `automation` skill and native `schedule` tool**

---

### Task 5: Run Verification Suite and Update Documentation

**Files:**
- Modify: `README.md`
- Test: `npm test`

- [x] **Step 1: Run `npm test` to verify all tests pass (GREEN phase)**
- [x] **Step 2: Update `README.md` catalog with the Antigravity Interoperability architecture**

