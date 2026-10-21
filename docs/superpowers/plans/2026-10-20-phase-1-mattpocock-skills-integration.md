# Phase 1: Matt Pocock Engineering & Deep Modules Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate Ada's core engineering skills with methodologies from `mattpocock/skills`: decision-tree grilling with recommended answers in `ada-brainstorm`, Ousterhout's Deep Modules doctrine in `ada-arch` and `ada-code`, and living domain modeling (`GLOSSARY.md`) in `ada-docs`.

**Architecture:**
1. Upgrade `skills/ada-brainstorm/SKILL.md` to incorporate the Decision Tree Frontier grilling technique: questions asked in dependency-ordered rounds, each with an agent-recommended answer format allowing 1-word "yes" approvals, and autonomous fact-finding by subagents.
2. Upgrade `skills/ada-arch/SKILL.md` and `skills/ada-code/SKILL.md` to encode John Ousterhout's Deep Modules principles (*A Philosophy of Software Design*): small interfaces, deep implementations, the Deletion Test, natural seams, and "the interface is the test surface".
3. Upgrade `skills/ada-docs/SKILL.md` to establish living domain modeling via `GLOSSARY.md` (Domain-Driven Design), preventing naming fragmentation across code, ADRs, and database models.
4. Add automated test coverage in `tests/orchestrator.test.js` verifying that all new architectural principles, glossary templates, and grilling patterns are strictly enforced.

**Tech Stack:** Markdown, Node.js (`node:test`, `node:assert`), CommonJS.

## Global Constraints

- Keep skills token-efficient, dense, and actionable (avoid prose padding).
- Preserve existing C4 diagrams and ADR templates in `ada-arch`.
- Maintain 100% test pass rate with `npm test`.
- Maintain zero broken stubs and full Antigravity / Claude Code dual compatibility.

---

### Task 1: Elevate ada-brainstorm with Decision-Tree Grilling and Frontier Discovery

**Files:**
- Modify: `skills/ada-brainstorm/SKILL.md`
- Test: `tests/orchestrator.test.js`

**Interfaces:**
- Consumes: User intent, repository context, `ask_question` tool.
- Produces: Structured decision tree rounds with agent-recommended defaults and autonomous fact-finding.

- [x] **Step 1: Write failing test for grilling frontier and recommended answers**

Add test to `tests/orchestrator.test.js`:

```javascript
test('ada-brainstorm encodes decision tree frontier and recommended answer grilling', () => {
  const skillFile = path.join(rootDir, 'skills', 'ada-brainstorm', 'SKILL.md');
  const content = fs.readFileSync(skillFile, 'utf8');

  // Must mention decision tree / frontier
  assert.match(content, /frontier/i, 'ada-brainstorm must mention decision tree frontier');

  // Must mention recommended answer pattern allowing 1-word yes confirmation
  assert.match(content, /recommended/i, 'ada-brainstorm must include recommended answer pattern');
  assert.match(content, /fact/i, 'ada-brainstorm must distinguish autonomous facts vs user decisions');
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `node --test tests/orchestrator.test.js`
Expected: FAIL because `skills/ada-brainstorm/SKILL.md` currently does not mention the decision tree frontier.

- [x] **Step 3: Update skills/ada-brainstorm/SKILL.md**

Enrich `skills/ada-brainstorm/SKILL.md`:
1. **Decision Tree Frontier Protocol**:
   - Model the problem as a decision tree where each choice branches into downstream decisions.
   - The *Frontier* consists of questions whose prerequisites are already settled.
   - Ask questions along the active frontier in numbered rounds using `ask_question`.
2. **Recommended Answer Convention**:
   - Every question MUST include the agent's recommended answer (`➡️ Recommended Answer: [Option A] - [rationale]`).
   - Format questions so the user can reply with a single "yes" or "confirm" to accept all recommendations, or selectively adjust.
3. **Fact-Finding vs. Decision-Making**:
   - Finding facts (inspecting code, configs, dependencies, schema) is strictly the agent's job. Never ask the user for information that can be read from the filesystem or tools.
   - Decisions (trade-offs, priorities, constraints) belong to the user.

- [x] **Step 4: Run test to verify it passes**

Run: `node --test tests/orchestrator.test.js`
Expected: PASS.

- [x] **Step 5: Commit**

```bash
git add skills/ada-brainstorm/SKILL.md tests/orchestrator.test.js
git commit -m "feat(skills): incorporate decision-tree frontier grilling in ada-brainstorm"
```

---

### Task 2: Embed Ousterhout's Deep Modules Doctrine in ada-arch and ada-code

**Files:**
- Modify: `skills/ada-arch/SKILL.md`
- Modify: `skills/ada-code/SKILL.md`
- Test: `tests/orchestrator.test.js`

**Interfaces:**
- Consumes: Software design patterns, system boundaries.
- Produces: Guidelines preventing shallow modules and enforcing high leverage at interfaces.

- [x] **Step 1: Write failing test for deep module doctrine in ada-arch and ada-code**

Add test to `tests/orchestrator.test.js`:

```javascript
test('ada-arch and ada-code enforce deep modules doctrine', () => {
  const archFile = path.join(rootDir, 'skills', 'ada-arch', 'SKILL.md');
  const codeFile = path.join(rootDir, 'skills', 'ada-code', 'SKILL.md');
  const archContent = fs.readFileSync(archFile, 'utf8');
  const codeContent = fs.readFileSync(codeFile, 'utf8');

  // ada-arch must define Deep Modules vs Shallow Modules
  assert.match(archContent, /deep module/i, 'ada-arch must define Deep Modules');
  assert.match(archContent, /shallow module/i, 'ada-arch must define Shallow Modules');
  assert.match(archContent, /deletion test/i, 'ada-arch must include the Deletion Test');

  // ada-code must enforce interface as test surface
  assert.match(codeContent, /interface is the test surface|test surface/i, 'ada-code must enforce testing through module interfaces');
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `node --test tests/orchestrator.test.js`
Expected: FAIL because `skills/ada-arch/SKILL.md` and `skills/ada-code/SKILL.md` do not yet define deep modules.

- [x] **Step 3: Update skills/ada-arch/SKILL.md and skills/ada-code/SKILL.md**

1. In `skills/ada-arch/SKILL.md`:
   - Add **Section: Deep Modules vs. Shallow Modules (John Ousterhout Doctrine)**:
     - **Deep Module**: Small, simple interface concealing large, complex, valuable implementation (high leverage).
     - **Shallow Module**: Large interface with little implementation (adds cognitive load without leverage).
     - **The Deletion Test**: When evaluating an abstraction: *If you delete it, does complexity concentrate in one logical place, or does it scatter across callers?*
     - **Seams & Locality**: Seams should isolate change and group related invariants together.
2. In `skills/ada-code/SKILL.md`:
   - Under REFACTOR and Implementation Guardrails:
     - **"The Interface is the Test Surface"**: Write tests through the module's public interface rather than breaking encapsulation to test internal private helpers.
     - Ban premature shallow extractions: Do not extract tiny 2-line helper functions across multiple files purely for vanity testing. Maintain locality.

- [x] **Step 4: Run test to verify it passes**

Run: `node --test tests/orchestrator.test.js`
Expected: PASS.

- [x] **Step 5: Commit**

```bash
git add skills/ada-arch/SKILL.md skills/ada-code/SKILL.md tests/orchestrator.test.js
git commit -m "feat(skills): embed Ousterhout deep module doctrine in ada-arch and ada-code"
```

---

### Task 3: Integrate Domain Modeling & Ubiquitous Language (GLOSSARY.md) in ada-docs

**Files:**
- Modify: `skills/ada-docs/SKILL.md`
- Test: `tests/orchestrator.test.js`

**Interfaces:**
- Consumes: Project requirements, domain terminology.
- Produces: Standardized `GLOSSARY.md` template and domain modeling rules.

- [x] **Step 1: Write failing test for GLOSSARY.md and domain modeling in ada-docs**

Add test to `tests/orchestrator.test.js`:

```javascript
test('ada-docs enforces GLOSSARY.md domain modeling standard', () => {
  const docsFile = path.join(rootDir, 'skills', 'ada-docs', 'SKILL.md');
  const content = fs.readFileSync(docsFile, 'utf8');

  // Must enforce GLOSSARY.md living domain model
  assert.match(content, /GLOSSARY\.md/, 'ada-docs must reference GLOSSARY.md');
  assert.match(content, /ubiquitous language|domain model/i, 'ada-docs must enforce ubiquitous language');
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `node --test tests/orchestrator.test.js`
Expected: FAIL because `skills/ada-docs/SKILL.md` does not yet mention `GLOSSARY.md`.

- [x] **Step 3: Update skills/ada-docs/SKILL.md**

Enrich `skills/ada-docs/SKILL.md`:
1. Add directive for **Living Domain Model (`GLOSSARY.md`)**:
   - In non-trivial projects, maintain a root `GLOSSARY.md` defining the Ubiquitous Language (Domain-Driven Design).
   - Ensure names in code (classes, types, DB tables, events) match the glossary verbatim.
   - Forbid ambiguous synonyms (e.g. Mixing "Account", "User", and "Customer" arbitrarily).
2. Add canonical `GLOSSARY.md` micro-template:
   - Term, Definition, Invariants, Synonyms to Avoid.

- [x] **Step 4: Run test to verify it passes**

Run: `node --test tests/orchestrator.test.js`
Expected: PASS.

- [x] **Step 5: Commit**

```bash
git add skills/ada-docs/SKILL.md tests/orchestrator.test.js
git commit -m "feat(skills): integrate living domain model and GLOSSARY.md standard in ada-docs"
```

---

### Task 4: Full Suite Verification & Sync

**Files:**
- Verify: Full test suite (`npm test`)

- [x] **Step 1: Run complete test suite**

Run: `npm test`
Expected: All 29 original tests + new Phase 1 orchestrator tests pass cleanly (100% PASS).

- [x] **Step 2: Final verification commit**

```bash
git add -A
git commit -m "chore(release): complete Phase 1 engineering skills integration"
```
