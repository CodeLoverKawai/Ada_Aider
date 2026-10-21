# Ada Orchestrator Fix & Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform `ada-agent` into a fully functioning, cross-platform (Antigravity & Claude Code) orchestrator by eliminating unexpanded stub skills, removing tool hallucinations, extending the transcript parser to support Antigravity logs, and securing configuration paths.

**Architecture:** 
1. Embed core router logic directly into `GEMINI.md` with valid absolute/relative workspace paths (zero `@` transclusion dependency).
2. Author self-contained, token-efficient Nano-Skills for all `ada-*` stubs (`ada-plan`, `ada-code`, `ada-brainstorm`, `ada-debug`, `ada-verify`, `ada-review`).
3. Correct Antigravity CLI tool mapping in `skills/ada-agent/SKILL.md` to conform to actual tool signatures (`replace_file_content` and correct `write_to_file` artifact metadata).
4. Extend `ada-stats.js` to recognize Antigravity `transcript.jsonl` events (`PLANNER_RESPONSE` / `MODEL`).
5. Ensure state and stats files default to `~/.claude/` or `~/.gemini/` instead of polluting `$HOME`.

**Tech Stack:** Node.js (Built-in Test Runner `node:test`, `node:assert`), Markdown, CommonJS hooks.

## Global Constraints

- Preserve backwards compatibility with Claude Code hooks in `src/hooks/`.
- Maintain 100% test pass rate with `npm test`.
- No empty stubs: every `SKILL.md` must be a self-contained, actionable guide.
- No schema hallucinations: never reference non-existent tools (`multi_replace_file_content`) or invalid metadata fields (`ArtifactType`, `IsArtifact`).
- Keep all skills concise and token-efficient.

---

### Task 1: Fix Path Resolution and Inline Router in GEMINI.md

**Files:**
- Modify: `GEMINI.md`
- Test: `tests/orchestrator.test.js`

**Interfaces:**
- Consumes: Workspace root structure, `skills/*/SKILL.md` paths.
- Produces: Validated markdown system prompt loaded cleanly by Google Antigravity without unexpanded directives.

- [ ] **Step 1: Write the failing test for GEMINI.md router integrity**

Create `tests/orchestrator.test.js` verifying that:
1. `GEMINI.md` contains no `@./skills/...` transclusion lines.
2. All paths in the Skill Index table point to existing files on disk without an `@` prefix.
3. Master instructions (`using-superpowers` and `ada-agent` core directives) are inlined directly in `GEMINI.md`.

```javascript
// tests/orchestrator.test.js
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');
const geminiMdPath = path.join(rootDir, 'GEMINI.md');

test('GEMINI.md router integrity', () => {
  assert.strictEqual(fs.existsSync(geminiMdPath), true);
  const content = fs.readFileSync(geminiMdPath, 'utf8');

  // Must not contain raw unexpanded @ transclusions
  const lines = content.split('\n');
  const transclusionLines = lines.filter(l => l.trim().startsWith('@./skills/'));
  assert.deepStrictEqual(transclusionLines, [], 'Found unexpanded @./skills/ lines in GEMINI.md');

  // Verify all table paths point to actual files on disk
  const tableRowRegex = /\|\s*`([^`]+)`\s*\|$/;
  for (const line of lines) {
    if (line.includes('|') && line.includes('skills/')) {
      const match = line.match(/`(\.\/skills\/[^`]+)`/);
      if (match) {
        const relPath = match[1];
        const absPath = path.resolve(rootDir, relPath);
        assert.strictEqual(
          fs.existsSync(absPath),
          true,
          `Path listed in GEMINI.md does not exist: ${relPath}`
        );
      }
    }
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/orchestrator.test.js`
Expected: FAIL because `GEMINI.md` currently contains unexpanded `@./skills/...` lines and `@` prefixes.

- [ ] **Step 3: Update GEMINI.md**

Refactor `GEMINI.md`:
1. Remove raw `@./skills/...` lines.
2. Inline the core discipline rules: Skill Invocation before any action, Process Skills First, and the Dynamic Skill Index table.
3. Clean the Skill Index table paths to valid relative paths (e.g., `./skills/brainstorming/SKILL.md`) and remove `@` prefixes.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/orchestrator.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add tests/orchestrator.test.js GEMINI.md
git commit -m "fix(orchestrator): inline master prompt and remove invalid transclusions in GEMINI.md"
```

---

### Task 2: Correct Antigravity Tool Mapping and Exploration Rules in ada-agent/SKILL.md

**Files:**
- Modify: `skills/ada-agent/SKILL.md:49-85`
- Test: `tests/orchestrator.test.js`

**Interfaces:**
- Consumes: Antigravity native tool schemas (`replace_file_content`, `write_to_file`, `view_file`, `invoke_subagent`).
- Produces: Accurate platform guide preventing schema rejection and tool call failures.

- [ ] **Step 1: Write the failing test for tool mapping and exploration guardrails**

Add tests to `tests/orchestrator.test.js`:
1. Check that `skills/ada-agent/SKILL.md` does not mention `multi_replace_file_content`.
2. Check that `skills/ada-agent/SKILL.md` does not mention `IsArtifact: true` or `ArtifactMetadata.ArtifactType`.
3. Check that `replace_file_content` is documented as the sole file editing tool.
4. Check that exploration rules permit read-only codebase diagnostic/audit inspections without blocking on procedural locks.

```javascript
test('ada-agent/SKILL.md tool mapping and guardrails', () => {
  const skillFile = path.join(rootDir, 'skills', 'ada-agent', 'SKILL.md');
  const content = fs.readFileSync(skillFile, 'utf8');

  // Must not hallucinate multi_replace_file_content
  assert.strictEqual(
    content.includes('multi_replace_file_content'),
    false,
    'Hallucinated tool multi_replace_file_content still present'
  );

  // Must not have invalid ArtifactMetadata fields
  assert.strictEqual(
    content.includes('IsArtifact: true'),
    false,
    'Invalid parameter IsArtifact: true still present'
  );
  assert.strictEqual(
    content.includes('ArtifactType: "task"'),
    false,
    'Invalid parameter ArtifactType still present'
  );

  // Must contain valid replace_file_content
  assert.match(content, /`replace_file_content`/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/orchestrator.test.js`
Expected: FAIL because `skills/ada-agent/SKILL.md` contains `multi_replace_file_content` and invalid artifact arguments.

- [ ] **Step 3: Update skills/ada-agent/SKILL.md**

1. In the Antigravity CLI Tool Mapping table:
   - Change `Edit file` to: `replace_file_content`.
   - Change `Task tracking` to: `Markdown task artifact (write_to_file with ArtifactMetadata: { RequestFeedback: false, Summary: "...", UserFacing: true })`.
2. Update the Red Flags section to explicitly permit read-only diagnostics/audits of the workspace when answering meta-queries or inspecting architecture.
3. Clarify Subagent Delegation: Delegate when grepping or reading across $>3$ separate modules/directories, not for reading a small handful of known files.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/orchestrator.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add skills/ada-agent/SKILL.md tests/orchestrator.test.js
git commit -m "fix(skills): correct Antigravity tool mappings and clarify exploration rules in ada-agent"
```

---

### Task 3: Author Self-Contained Nano-Skills for All Stub Skills

**Files:**
- Modify: `skills/ada-brainstorm/SKILL.md`
- Modify: `skills/ada-plan/SKILL.md`
- Modify: `skills/ada-code/SKILL.md`
- Modify: `skills/ada-verify/SKILL.md`
- Modify: `skills/ada-debug/SKILL.md`
- Modify: `skills/ada-review/SKILL.md`
- Test: `tests/orchestrator.test.js`

**Interfaces:**
- Consumes: Nano-Skill specifications from `docs/specs/2026-07-02-smart-agent-design.md`.
- Produces: High-density, self-contained, actionable workflow skills without broken `@` stubs.

- [ ] **Step 1: Write failing test verifying zero stub skills remain in skills/ directory**

Add test to `tests/orchestrator.test.js`:

```javascript
test('All skills in skills/ directory have standalone content (no unresolved stubs)', () => {
  const skillsDir = path.join(rootDir, 'skills');
  const entries = fs.readdirSync(skillsDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const skillPath = path.join(skillsDir, entry.name, 'SKILL.md');
      assert.strictEqual(
        fs.existsSync(skillPath),
        true,
        `Missing SKILL.md in skills/${entry.name}`
      );
      const content = fs.readFileSync(skillPath, 'utf8');

      // Check that it has valid frontmatter
      assert.match(content, /^---\s*\nname:\s*[\w.-]+\ndescription:/, `Invalid frontmatter in ${entry.name}`);

      // Must not contain unresolved delegating @ lines
      const lines = content.split('\n');
      const stubLines = lines.filter(l => l.trim().startsWith('@./skills/'));
      assert.deepStrictEqual(
        stubLines,
        [],
        `Skill ${entry.name} is an unresolved stub containing: ${stubLines.join(', ')}`
      );

      // Must contain actual instructions (> 15 lines of content)
      assert.strictEqual(
        lines.length >= 15,
        true,
        `Skill ${entry.name} is too short (${lines.length} lines) to be a functioning skill`
      );
    }
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/orchestrator.test.js`
Expected: FAIL on `ada-brainstorm`, `ada-code`, `ada-debug`, `ada-plan`, `ada-review`, `ada-verify`.

- [ ] **Step 3: Implement self-contained Nano-Skill content**

Write complete, compressed, self-contained instructions for each:
1. `skills/ada-brainstorm/SKILL.md`:
   - Interactive maieutic: Ask 1 question at a time using `ask_question`.
   - Provide 2-3 focused design options.
   - Formulate architectural consensus before plan phase.
2. `skills/ada-plan/SKILL.md`:
   - Nano-Plan protocol: Table of file impact (`[+]` create, `[*]` edit, `[-]` delete).
   - Bite-sized steps with exact paths and TDD verification commands.
   - Plan storage conventions.
3. `skills/ada-code/SKILL.md`:
   - Strict RED-GREEN-REFACTOR cycle.
   - Minimal code edits; no speculative features.
   - Preserves comments and docstrings.
4. `skills/ada-debug/SKILL.md`:
   - 4-step root cause analysis: Reproduce with failing test $\to$ Trace cause $\to$ Implement fix $\to$ Verify test suite.
   - Zero symptom masking.
5. `skills/ada-verify/SKILL.md`:
   - Evidence-based completion gate: Execute test command, verify exit code is 0, report exact count of passed tests.
   - Zero speculative claims.
6. `skills/ada-review/SKILL.md`:
   - 1-pass structured code review: correctness, security, performance, test coverage.
   - Terse tabular review output.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/orchestrator.test.js`
Expected: PASS for all skills.

- [ ] **Step 5: Commit**

```bash
git add skills/ada-*/SKILL.md tests/orchestrator.test.js
git commit -m "feat(skills): convert all stub skills into self-contained token-efficient nano-skills"
```

---

### Task 4: Upgrade ada-stats.js for Antigravity Transcripts and Isolate Configurations

**Files:**
- Modify: `src/hooks/ada-stats.js:140-220`
- Modify: `src/hooks/ada-config.js:15-25`
- Test: `tests/stats.test.js`

**Interfaces:**
- Consumes: Claude Code `.jsonl` session files AND Antigravity `.gemini/antigravity/brain/*/transcript.jsonl` files.
- Produces: Aggregated character and token savings calculations across both platforms.

- [ ] **Step 1: Write failing unit test for Antigravity transcript parsing**

Add test to `tests/stats.test.js`:

```javascript
test('ada-stats processes Antigravity transcript format (PLANNER_RESPONSE / MODEL)', (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ada-stats-antigravity-test-'));
  const brainDir = path.join(tempDir, 'brain', 'conv-123', '.system_generated', 'logs');
  fs.mkdirSync(brainDir, { recursive: true });

  const transcriptFile = path.join(brainDir, 'transcript.jsonl');
  const logEntries = [
    JSON.stringify({ step_index: 0, source: 'USER_EXPLICIT', type: 'USER_INPUT', content: 'hello' }),
    JSON.stringify({ step_index: 1, source: 'MODEL', type: 'PLANNER_RESPONSE', content: 'Short compressed response.' }),
    JSON.stringify({ step_index: 2, source: 'USER_EXPLICIT', type: 'USER_INPUT', content: 'next task' }),
    JSON.stringify({ step_index: 3, source: 'MODEL', type: 'PLANNER_RESPONSE', content: 'Another terse reply.' })
  ].join('\n') + '\n';

  fs.writeFileSync(transcriptFile, logEntries, 'utf8');

  // We test the parsing logic with our temp directory passed or mock
  const { parseTranscriptFile } = require('../src/hooks/ada-stats.js');
  const result = parseTranscriptFile(transcriptFile);

  assert.strictEqual(result.turns, 2);
  assert.strictEqual(result.chars, 'Short compressed response.'.length + 'Another terse reply.'.length);

  fs.rmSync(tempDir, { recursive: true, force: true });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/stats.test.js`
Expected: FAIL because `parseTranscriptFile` does not exist or does not match `PLANNER_RESPONSE` / `MODEL`.

- [ ] **Step 3: Implement Antigravity transcript support and config isolation**

1. In `src/hooks/ada-stats.js`:
   - Extract and export `parseTranscriptFile(filePath)` to cleanly handle both Claude Code (`type === 'assistant'`) and Antigravity (`type === 'PLANNER_RESPONSE' && source === 'MODEL'`).
   - Support `content` as string or array of parts.
   - Update `processMostRecentLog()` to use `parseTranscriptFile`.
   - Update `getSavingsPath()` and `getLastParsedPath()` to use `path.join(os.homedir(), '.claude')` when `CLAUDE_CONFIG_DIR` is not set, preventing pollution of `$HOME`.
2. In `src/hooks/ada-config.js`:
   - Update `getFlagPath()` to use `path.join(os.homedir(), '.claude')` when `CLAUDE_CONFIG_DIR` is not set.

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test tests/stats.test.js tests/config.test.js tests/hooks.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/ada-stats.js src/hooks/ada-config.js tests/stats.test.js
git commit -m "feat(hooks): add Antigravity transcript parser and isolate state directory"
```

---

### Task 5: End-to-End Suite Verification and Global Plugin Sync

**Files:**
- Modify: `docs/specs/project-workflow.md` (if needed)
- Verify: Full test suite (`npm test`)
- Verify: Symlink in `~/.gemini/config/plugins/ada-agent` points cleanly to workspace

- [ ] **Step 1: Run complete test suite**

Run: `npm test`
Expected: All 25 existing tests + new orchestrator and transcript tests pass cleanly (100% PASS).

- [ ] **Step 2: Verify plugin symlink and load integrity**

Run: `ls -la ~/.gemini/config/plugins/ada-agent`
Verify that `~/.gemini/config/plugins/ada-agent` points to `/home/rousseau/Documents/GitHub/Ada_Aider`.

- [ ] **Step 3: Final verification commit**

```bash
git add -A
git commit -m "chore(release): verify all tests pass and orchestrator is fully synchronized"
```
