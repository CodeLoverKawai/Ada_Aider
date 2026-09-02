# Implementation Plan: `ada-orthodox` Skill

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create the `ada-orthodox` skill for Christian Orthodox theology, patristic writings, biblical exegesis, hesychasm, spiritual discernment, and maintaining the spiritual north star grounded in divine love.

**Architecture:** Create `skills/ada-orthodox/SKILL.md` following the TDD skill specification format, register it in `GEMINI.md` dynamic skill index and `README.md`, and verify quality criteria (frontmatter, triggers, patristic references, structured templates).

**Tech Stack:** Markdown GFM, Antigravity Agent Skill Engine, Patristic Greek terminology, KaTeX / BlockSuite integration.

## Global Constraints
- Skill file name: `skills/ada-orthodox/SKILL.md`
- YAML frontmatter: `name: ada-orthodox` and valid third-person trigger description.
- Include patristic references (Fathers, Philokalia, Desert Fathers, Mount Athos Elders).
- Include hesychastic prayer patterns, watchfulness (*nepsis*), *metanoia*, and spiritual discernment.
- Update `GEMINI.md` and `README.md`.

---

### Task 1: Create `skills/ada-orthodox/SKILL.md`

**Files:**
- Create: `skills/ada-orthodox/SKILL.md`

**Interfaces:**
- Consumes: Spec `docs/superpowers/specs/2026-09-01-ada-orthodox-skill-design.md`
- Produces: Complete, high-fidelity Orthodox theology & spiritual discernment skill.

- [ ] **Step 1: Write `skills/ada-orthodox/SKILL.md`**
Author comprehensive skill covering Trinitarian theology, biblical exegesis, Church Fathers, Hesychasm, Theosis, daily spiritual guidance, and AFFiNE note templates.

- [ ] **Step 2: Verify skill formatting and YAML frontmatter**
Check line count, frontmatter syntax, triggers, and absence of placeholders.

- [ ] **Step 3: Commit changes**
```bash
git add skills/ada-orthodox/SKILL.md
git commit -m "feat(skills): add ada-orthodox skill for Orthodox Christian theology and spiritual guidance"
```

---

### Task 2: Register in `GEMINI.md` and `README.md`

**Files:**
- Modify: `GEMINI.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: `ada-orthodox` skill definition
- Produces: Updated dynamic router and comprehensive README index.

- [ ] **Step 1: Update `GEMINI.md`**
Add `ada-orthodox` under Academic, Research & Engineering / Humanities Skills in `GEMINI.md`.

- [ ] **Step 2: Update `README.md`**
Add `ada-orthodox` as skill 36 (incrementing total count or updating catalog) and add to the file tree.

- [ ] **Step 3: Commit changes**
```bash
git add GEMINI.md README.md
git commit -m "docs: register ada-orthodox skill in GEMINI.md and README.md"
```

---

### Task 3: Verification

**Files:**
- Verification: Inspection of skill registration and execution format.

- [ ] **Step 1: Verify skill discoverability and syntax**
- [ ] **Step 2: Verify git status and clean tree**
