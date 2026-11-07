# Ada_Aider Robustness & Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Harden the release pipeline, packaging, CI, test coverage and documentation of `ada-agent` v1.4.0 so the repo is safe to publish and cannot silently drift.

**Architecture:** Every fix is driven by a failing test first. Repo-level invariants (gitignore, packaging manifest, CI file, skill frontmatter, router links, README counts) become static "hygiene" tests so drift fails `npm test`. `bin/release.js` is refactored so all checks run *before* any file is written and failures throw instead of calling `process.exit`, making the pipeline testable with an injected `exec`.

**Tech Stack:** Node.js >= 18, CommonJS, `node:test` / `node:assert`, Bash, GitHub Actions. Zero new dependencies.

## Global Constraints

- Runtime: Node.js `>=18` (`package.json` `engines`), CommonJS only (no ESM, no transpilation).
- Zero runtime and dev dependencies: do not add anything to `package.json` `dependencies` / `devDependencies`.
- Test command stays `node --test tests/*.test.js` (`npm test`); all 39 existing tests must keep passing after every task.
- Commits: short conventional commits (`type(scope): subject`), no AI signature lines.
- Skills stay token-efficient: no SKILL.md may exceed 1300 lines (current max is 1218).
- Do not touch `skills/*` content except where a task says so.

## Baseline (verified 2026-11-07)

| Finding | Evidence |
| :--- | :--- |
| No root `.gitignore`; release runs `git add -A` | `git ls-files .gitignore` empty; `bin/release.js:163` |
| `release.js` swallows git-status errors (fails open), silently reports success if commit/tag fails, calls `process.exit` inside `runRelease`, no tag-exists check, no version-drift check | `bin/release.js:100-111`, `:160-170` |
| `[Unreleased]` changelog content is never rotated; release prepends a bare `- Release vX` section | `CHANGELOG.md:3`, `bin/release.js:60-89` |
| `package.json` `files` omits `GEMINI.md`, `plugin.json`, `gemini-extension.json`, `CHANGELOG.md`, `NOTICE.md`; no `repository`/`author`/`keywords` | `package.json` |
| No CI | no `.github/` directory |
| Coverage 79.7% lines; `ada-tracker.js` branches 30.8%, `release.js` 50.5% | `node --test --experimental-test-coverage` |
| README says 38 skills / 25 tests; reality is 41 skills / 39 tests. `ada-mind`, `ada-signals` have no README entry | `README.md:24,139,141,642,690` |
| 10 skills not linked from the `GEMINI.md` router: `ada-agent, ada-arch, ada-brainstorm, ada-code, ada-debug, ada-plan, ada-review, ada-verify, receiving-code-review, writing-skills` | grep of `./skills/<name>/SKILL.md` |
| `ada-neumann` (1218 lines), `ada-turing` (1012), `writing-skills` (679+) exceed the 800-line `view_file` window | `wc -l skills/*/SKILL.md` |

## File Structure

| File | Action | Responsibility |
| :--- | :--- | :--- |
| `.gitignore` | Create | Block secrets, deps, local state from git |
| `package.json` | Modify | Complete packaging manifest + `test:coverage` script |
| `bin/release.js` | Modify | Preflight-first, fail-closed, explicit staging, Unreleased rotation |
| `.github/workflows/ci.yml` | Create | Run `npm test` on Node 18/20/22 |
| `GEMINI.md` | Modify | Link the 10 unreachable skills in the router |
| `README.md` | Modify | Correct counts, add 3 missing skill entries |
| `tests/repo-hygiene.test.js` | Create | `.gitignore`, packaging manifest, CI file invariants |
| `tests/release.test.js` | Modify (append) | `checkVersionSync`, changelog rotation |
| `tests/release-pipeline.test.js` | Create | `runRelease` behavior with injected `exec` |
| `tests/tracker.test.js` | Create | Branch coverage for `ada-tracker.js` |
| `tests/skills-lint.test.js` | Create | Frontmatter, router links, size ratchet, README drift |

---

### Task 1: Root `.gitignore`

**Files:**
- Create: `.gitignore`
- Test: `tests/repo-hygiene.test.js`

**Interfaces:**
- Produces: `tests/repo-hygiene.test.js` with `root` constant (`path.resolve(__dirname, '..')`); Tasks 2 and 6 append tests to it.

- [ ] **Step 1: Write the failing test**

Create `tests/repo-hygiene.test.js`:

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');

test('root .gitignore blocks secrets, dependencies and local state', () => {
  const gitignorePath = path.join(root, '.gitignore');
  assert.ok(fs.existsSync(gitignorePath), '.gitignore must exist at repo root');
  const rules = fs.readFileSync(gitignorePath, 'utf8').split(/\r?\n/);
  for (const rule of ['.env', '.env.*', '*.pem', '*.key', 'node_modules/', '.superpowers/']) {
    assert.ok(rules.includes(rule), `.gitignore is missing rule: ${rule}`);
  }
});

test('git actually ignores .env and key material', () => {
  for (const file of ['.env', '.env.local', 'server.pem', 'id.key']) {
    const result = spawnSync('git', ['check-ignore', '-q', file], { cwd: root });
    assert.equal(result.status, 0, `${file} should be ignored by git`);
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/repo-hygiene.test.js`
Expected: FAIL with `.gitignore must exist at repo root`

- [ ] **Step 3: Write minimal implementation**

Create `.gitignore`:

```gitignore
# Secrets and key material
.env
.env.*
!.env.example
*.pem
*.key

# Dependencies, logs, coverage
node_modules/
npm-debug.log*
coverage/
.nyc_output/

# Local workspace and runtime state
.superpowers/
.ada-agent-active
.ada-stats-*
.DS_Store
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/repo-hygiene.test.js`
Expected: PASS (2 tests)

- [ ] **Step 5: Confirm nothing tracked became ignored, then commit**

Run: `git ls-files -ci --exclude-standard`
Expected: no output (no tracked file matches the new rules)

```bash
git add .gitignore tests/repo-hygiene.test.js
git commit -m "chore: add root .gitignore with hygiene test"
```

---

### Task 2: Complete the packaging manifest

**Files:**
- Modify: `package.json`
- Test: `tests/repo-hygiene.test.js` (append)

**Interfaces:**
- Consumes: `root` from Task 1.
- Produces: `package.json` `scripts["test:coverage"]`.

- [ ] **Step 1: Write the failing test**

Append to `tests/repo-hygiene.test.js`:

```js
test('package.json ships every runtime manifest and entry file', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  const required = [
    'bin/', 'src/', 'skills/', 'GEMINI.md', 'plugin.json',
    'gemini-extension.json', 'README.md', 'LICENSE', 'CHANGELOG.md', 'NOTICE.md',
  ];
  for (const entry of required) {
    assert.ok(pkg.files.includes(entry), `package.json "files" is missing: ${entry}`);
    assert.ok(fs.existsSync(path.join(root, entry)), `"files" entry does not exist on disk: ${entry}`);
  }
});

test('package.json carries publishing metadata', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  assert.equal(pkg.repository.url, 'git+https://github.com/CodeLoverKawai/Ada_Aider.git');
  assert.ok(pkg.author, 'author is required');
  assert.ok(Array.isArray(pkg.keywords) && pkg.keywords.length >= 3, 'keywords are required');
  assert.equal(pkg.scripts['test:coverage'], 'node --test --experimental-test-coverage tests/*.test.js');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/repo-hygiene.test.js`
Expected: FAIL with `package.json "files" is missing: GEMINI.md`

- [ ] **Step 3: Write minimal implementation**

Replace the contents of `package.json` with:

```json
{
  "name": "ada-agent",
  "version": "1.4.0",
  "description": "Unified, modular, and token-efficient coding assistant skills system",
  "license": "MIT",
  "author": "CodeLoverKawai",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/CodeLoverKawai/Ada_Aider.git"
  },
  "homepage": "https://github.com/CodeLoverKawai/Ada_Aider#readme",
  "bugs": {
    "url": "https://github.com/CodeLoverKawai/Ada_Aider/issues"
  },
  "keywords": [
    "ai-agent",
    "skills",
    "antigravity",
    "claude-code",
    "gemini",
    "tdd"
  ],
  "bin": {
    "ada-agent": "./bin/install.js",
    "ada-release": "./bin/release.js"
  },
  "engines": {
    "node": ">=18"
  },
  "scripts": {
    "test": "node --test tests/*.test.js",
    "test:coverage": "node --test --experimental-test-coverage tests/*.test.js",
    "release": "node bin/release.js"
  },
  "files": [
    "bin/",
    "src/",
    "skills/",
    "GEMINI.md",
    "plugin.json",
    "gemini-extension.json",
    "README.md",
    "LICENSE",
    "CHANGELOG.md",
    "NOTICE.md"
  ]
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/repo-hygiene.test.js && npm pack --dry-run 2>&1 | grep -E "GEMINI.md|plugin.json|gemini-extension.json"`
Expected: PASS, and `npm pack` lists the three manifest files.

- [ ] **Step 5: Commit**

```bash
git add package.json tests/repo-hygiene.test.js
git commit -m "chore(pkg): ship all manifests and add publishing metadata"
```

---

### Task 3: Release version-drift preflight

**Files:**
- Modify: `bin/release.js:36` (add constants and `checkVersionSync` after `updateJsonVersion`), `bin/release.js:179-184` (exports)
- Test: `tests/release.test.js` (append)

**Interfaces:**
- Produces: `VERSION_FILES: string[]`, `checkVersionSync(rootDir: string, files?: string[]) => { ok: boolean, versions: Record<string,string> }`, exported from `bin/release.js`. Task 5 consumes both.

- [ ] **Step 1: Write the failing test**

Append to `tests/release.test.js`:

```js
const releaseModule = require('../bin/release.js');

function makeRelRoot(versions) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ada-sync-test-'));
  for (const [file, version] of Object.entries(versions)) {
    fs.writeFileSync(path.join(dir, file), JSON.stringify({ name: 'x', version }, null, 2) + '\n');
  }
  return dir;
}

test('checkVersionSync passes when all manifests share a version', () => {
  const dir = makeRelRoot({ 'package.json': '1.4.0', 'plugin.json': '1.4.0' });
  const result = releaseModule.checkVersionSync(dir);
  assert.equal(result.ok, true);
  assert.deepEqual(result.versions, { 'package.json': '1.4.0', 'plugin.json': '1.4.0' });
  fs.rmSync(dir, { recursive: true, force: true });
});

test('checkVersionSync reports drift between manifests', () => {
  const dir = makeRelRoot({ 'package.json': '1.4.0', 'plugin.json': '1.3.9' });
  const result = releaseModule.checkVersionSync(dir);
  assert.equal(result.ok, false);
  assert.equal(result.versions['plugin.json'], '1.3.9');
  fs.rmSync(dir, { recursive: true, force: true });
});

test('checkVersionSync throws naming the file when JSON is invalid', () => {
  const dir = makeRelRoot({ 'package.json': '1.4.0' });
  fs.writeFileSync(path.join(dir, 'plugin.json'), '{ not json');
  assert.throws(() => releaseModule.checkVersionSync(dir), /plugin\.json/);
  fs.rmSync(dir, { recursive: true, force: true });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/release.test.js`
Expected: FAIL with `releaseModule.checkVersionSync is not a function`

- [ ] **Step 3: Write minimal implementation**

In `bin/release.js`, insert after the closing brace of `updateJsonVersion` (line 55):

```js
const VERSION_FILES = [
  'package.json',
  'plugin.json',
  'gemini-extension.json',
  'installed_version.json'
];

/**
 * Reads the version of every manifest present in rootDir and reports drift.
 */
function checkVersionSync(rootDir, files = VERSION_FILES) {
  const versions = {};
  for (const rel of files) {
    const full = path.join(rootDir, rel);
    if (!fs.existsSync(full)) continue;
    try {
      versions[rel] = JSON.parse(fs.readFileSync(full, 'utf8')).version;
    } catch (err) {
      throw new Error(`Failed to parse JSON file "${rel}": ${err.message}`);
    }
  }
  return { ok: new Set(Object.values(versions)).size <= 1, versions };
}
```

Replace the `module.exports` block with:

```js
module.exports = {
  VERSION_FILES,
  bumpSemver,
  updateJsonVersion,
  checkVersionSync,
  updateChangelog,
  runRelease
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/release.test.js`
Expected: PASS (6 tests)

- [ ] **Step 5: Commit**

```bash
git add bin/release.js tests/release.test.js
git commit -m "feat(release): add version drift preflight helper"
```

---

### Task 4: Rotate `[Unreleased]` into the new release

**Files:**
- Modify: `bin/release.js` (`updateChangelog`, currently lines 60-89)
- Test: `tests/release.test.js` (append)

**Interfaces:**
- Consumes: `releaseModule` from Task 3's appended test code (already declared in the file).
- Produces: `updateChangelog(changelogPath, newVersion, dryRun)` now moves the `[Unreleased]` body under `## [newVersion] - YYYY-MM-DD` and leaves an empty `## [Unreleased]`.

- [ ] **Step 1: Write the failing test**

Append to `tests/release.test.js`:

```js
test('updateChangelog rotates Unreleased notes into the new version', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ada-rotate-test-'));
  const file = path.join(dir, 'CHANGELOG.md');
  fs.writeFileSync(file, '# Changelog\n\n## [Unreleased]\n\n### Added\n- feature x\n\n## [1.0.0] - 2026-01-01\n\n- Initial\n');

  assert.equal(releaseModule.updateChangelog(file, '1.1.0', false), true);

  const content = fs.readFileSync(file, 'utf8');
  const today = new Date().toISOString().split('T')[0];
  assert.ok(content.includes(`## [Unreleased]\n\n## [1.1.0] - ${today}\n\n### Added\n- feature x`));
  assert.ok(content.indexOf('## [Unreleased]') < content.indexOf('## [1.1.0]'));
  assert.ok(content.indexOf('## [1.1.0]') < content.indexOf('## [1.0.0]'));
  fs.rmSync(dir, { recursive: true, force: true });
});

test('updateChangelog adds a bullet when Unreleased is empty', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ada-rotate-empty-'));
  const file = path.join(dir, 'CHANGELOG.md');
  fs.writeFileSync(file, '# Changelog\n\n## [Unreleased]\n\n## [1.0.0] - 2026-01-01\n\n- Initial\n');

  assert.equal(releaseModule.updateChangelog(file, '1.0.1', false), true);

  assert.ok(fs.readFileSync(file, 'utf8').includes('## [1.0.1]') );
  assert.ok(fs.readFileSync(file, 'utf8').includes('- Release v1.0.1'));
  fs.rmSync(dir, { recursive: true, force: true });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/release.test.js`
Expected: FAIL on `updateChangelog rotates Unreleased notes into the new version` (the current code prepends a bare `- Release v1.1.0` and leaves `feature x` under `[Unreleased]`)

- [ ] **Step 3: Write minimal implementation**

In `bin/release.js`, replace the entire `updateChangelog` function with:

```js
function updateChangelog(changelogPath, newVersion, dryRun = false) {
  if (!fs.existsSync(changelogPath)) return false;
  const content = fs.readFileSync(changelogPath, 'utf8');
  const today = new Date().toISOString().split('T')[0];

  // Avoid duplicating header if already prepended
  if (content.includes(`## [${newVersion}]`)) {
    return false;
  }

  let updated;
  const unreleased = content.match(/^## \[Unreleased\][^\n]*\n+/m);
  if (unreleased) {
    // Rotate: the Unreleased body becomes the body of the new release.
    const rest = content.slice(unreleased.index + unreleased[0].length);
    const body = /^## /.test(rest) || rest.trim() === '' ? `- Release v${newVersion}\n\n` : '';
    updated =
      content.slice(0, unreleased.index) +
      `## [Unreleased]\n\n## [${newVersion}] - ${today}\n\n${body}` +
      rest;
  } else {
    const header = `## [${newVersion}] - ${today}\n\n- Release v${newVersion}\n\n`;
    if (content.startsWith('# Changelog') || content.startsWith('# CHANGELOG')) {
      const titleEnd = content.indexOf('\n\n');
      updated = titleEnd !== -1
        ? content.slice(0, titleEnd + 2) + header + content.slice(titleEnd + 2)
        : content + '\n\n' + header;
    } else {
      updated = header + content;
    }
  }

  if (!dryRun) {
    fs.writeFileSync(changelogPath, updated, 'utf8');
  }
  return true;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/release.test.js`
Expected: PASS (8 tests, including the original `updateChangelog prepends version section without duplicating`)

- [ ] **Step 5: Commit**

```bash
git add bin/release.js tests/release.test.js
git commit -m "feat(release): rotate Unreleased changelog notes into new version"
```

---

### Task 5: Fail-closed, preflight-first `runRelease`

**Files:**
- Modify: `bin/release.js` (`runRelease` and the `require.main` block, currently lines 91-177)
- Test: `tests/release-pipeline.test.js`

**Interfaces:**
- Consumes: `VERSION_FILES`, `checkVersionSync`, `bumpSemver`, `updateJsonVersion`, `updateChangelog` from Tasks 3-4.
- Produces: `ReleaseError` (exported), and `runRelease(args: string[], options?: { rootDir?: string, exec?: (cmd: string, opts?: object) => string, log?: (msg: string) => void })` which **throws `ReleaseError` instead of calling `process.exit`**, and runs every check before writing any file.

- [ ] **Step 1: Write the failing test**

Create `tests/release-pipeline.test.js`:

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { runRelease, ReleaseError } = require('../bin/release.js');

const MANIFESTS = ['package.json', 'plugin.json', 'gemini-extension.json', 'installed_version.json'];

function makeRoot(versions = {}) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ada-pipeline-'));
  for (const file of MANIFESTS) {
    fs.writeFileSync(path.join(dir, file), JSON.stringify({ name: 'x', version: versions[file] || '1.0.0' }, null, 2) + '\n');
  }
  fs.writeFileSync(path.join(dir, 'CHANGELOG.md'), '# Changelog\n\n## [Unreleased]\n\n- thing\n');
  return dir;
}

function fakeExec({ status = '', statusThrows = false, tagExists = false } = {}) {
  const calls = [];
  const exec = (cmd) => {
    calls.push(cmd);
    if (cmd.startsWith('git status')) {
      if (statusThrows) throw new Error('not a git repository');
      return status;
    }
    if (cmd.startsWith('git rev-parse')) {
      if (tagExists) return 'deadbeef';
      throw new Error('unknown revision');
    }
    return '';
  };
  return { exec, calls };
}

const quiet = { log: () => {} };

test('runRelease aborts on version drift without writing any file', () => {
  const dir = makeRoot({ 'plugin.json': '0.9.0' });
  const before = fs.readFileSync(path.join(dir, 'package.json'), 'utf8');
  const { exec } = fakeExec();
  assert.throws(() => runRelease(['patch'], { rootDir: dir, exec, ...quiet }), /drift/i);
  assert.equal(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'), before);
  fs.rmSync(dir, { recursive: true, force: true });
});

test('runRelease fails closed when git status cannot be read', () => {
  const dir = makeRoot();
  const { exec } = fakeExec({ statusThrows: true });
  assert.throws(() => runRelease(['patch'], { rootDir: dir, exec, ...quiet }), ReleaseError);
  fs.rmSync(dir, { recursive: true, force: true });
});

test('runRelease aborts on a dirty working tree', () => {
  const dir = makeRoot();
  const { exec } = fakeExec({ status: ' M README.md' });
  assert.throws(() => runRelease(['patch'], { rootDir: dir, exec, ...quiet }), /uncommitted/);
  fs.rmSync(dir, { recursive: true, force: true });
});

test('runRelease aborts when the target tag already exists', () => {
  const dir = makeRoot();
  const { exec } = fakeExec({ tagExists: true });
  assert.throws(() => runRelease(['patch'], { rootDir: dir, exec, ...quiet }), /v1\.0\.1.*already exists/);
  assert.equal(JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8')).version, '1.0.0');
  fs.rmSync(dir, { recursive: true, force: true });
});

test('runRelease --dry-run writes nothing and never stages', () => {
  const dir = makeRoot();
  const { exec, calls } = fakeExec();
  runRelease(['minor', '--dry-run', '--skip-test'], { rootDir: dir, exec, ...quiet });
  assert.equal(JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8')).version, '1.0.0');
  assert.ok(!calls.some((c) => c.startsWith('git add')));
  fs.rmSync(dir, { recursive: true, force: true });
});

test('runRelease stages an explicit file list, never git add -A', () => {
  const dir = makeRoot();
  const { exec, calls } = fakeExec();
  runRelease(['patch', '--skip-test'], { rootDir: dir, exec, ...quiet });

  const add = calls.find((c) => c.startsWith('git add'));
  assert.equal(add, 'git add package.json plugin.json gemini-extension.json installed_version.json CHANGELOG.md');
  assert.ok(!calls.some((c) => c.includes('-A')));
  assert.ok(calls.includes('git commit -m "chore(release): v1.0.1"'));
  assert.ok(calls.includes('git tag -a v1.0.1 -m "Release v1.0.1"'));
  for (const file of MANIFESTS) {
    assert.equal(JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8')).version, '1.0.1');
  }
  fs.rmSync(dir, { recursive: true, force: true });
});

test('runRelease surfaces commit failures instead of reporting success', () => {
  const dir = makeRoot();
  const exec = (cmd) => {
    if (cmd.startsWith('git status')) return '';
    if (cmd.startsWith('git rev-parse')) throw new Error('no such tag');
    if (cmd.startsWith('git commit')) throw new Error('author identity unknown');
    return '';
  };
  assert.throws(() => runRelease(['patch', '--skip-test'], { rootDir: dir, exec, ...quiet }), /commit/i);
  fs.rmSync(dir, { recursive: true, force: true });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/release-pipeline.test.js`
Expected: FAIL with `ReleaseError is not a constructor` / `runRelease` ignoring `rootDir` and `exec`

- [ ] **Step 3: Write minimal implementation**

In `bin/release.js`, replace the entire `runRelease` function and the `require.main` block with:

```js
class ReleaseError extends Error {}

function runRelease(args = process.argv.slice(2), options = {}) {
  const rootDir = options.rootDir || path.resolve(__dirname, '..');
  const exec = options.exec || ((cmd, opts) => execSync(cmd, { cwd: rootDir, encoding: 'utf8', ...opts }));
  const log = options.log || console.log;

  const bumpType = args.find(a => ['patch', 'minor', 'major'].includes(a.toLowerCase())) || 'patch';
  const dryRun = args.includes('--dry-run');
  const skipTest = args.includes('--skip-test');
  const allowDirty = args.includes('--allow-dirty');

  log(`🚀 Starting Ada_Aider Automated Release Pipeline (${bumpType.toUpperCase()}${dryRun ? ' - DRY RUN' : ''})...`);

  // --- Preflight: every check runs before any file is written ---

  // 1. Git clean check (fails closed: an unreadable tree is not a clean tree)
  if (!allowDirty && !dryRun) {
    let status;
    try {
      status = String(exec('git status --porcelain')).trim();
    } catch (err) {
      throw new ReleaseError(`Cannot verify git working tree (${err.message}). Use --allow-dirty to bypass.`);
    }
    if (status.length > 0) {
      throw new ReleaseError('Working tree has uncommitted changes. Commit or stash them first.');
    }
  }

  // 2. Version manifests must agree
  const sync = checkVersionSync(rootDir);
  if (!sync.ok) {
    throw new ReleaseError(`Version drift detected across manifests: ${JSON.stringify(sync.versions)}`);
  }
  const oldVersion = sync.versions['package.json'];
  if (!oldVersion) {
    throw new ReleaseError('package.json not found or has no version.');
  }
  const newVersion = bumpSemver(oldVersion, bumpType);

  // 3. Target tag must not exist yet
  if (!dryRun) {
    let tagExists = false;
    try {
      exec(`git rev-parse -q --verify refs/tags/v${newVersion}`);
      tagExists = true;
    } catch (err) {
      // rev-parse exits non-zero when the tag is missing: that is the good case.
    }
    if (tagExists) {
      throw new ReleaseError(`Tag v${newVersion} already exists.`);
    }
  }

  // 4. Test suite
  if (!skipTest) {
    log('🧪 Running automated test suite verification...');
    try {
      exec('npm test', { stdio: 'inherit' });
      log('✅ Test suite passed cleanly.');
    } catch (err) {
      throw new ReleaseError('Test suite failed. Release aborted.');
    }
  }

  // --- Mutation ---

  log(`📦 Bumping version: ${oldVersion} ➔ ${newVersion}`);
  for (const relPath of VERSION_FILES) {
    const fullPath = path.join(rootDir, relPath);
    if (fs.existsSync(fullPath)) {
      updateJsonVersion(fullPath, newVersion, dryRun);
      log(`  └─ Updated ${relPath}`);
    }
  }

  const changelogPath = path.join(rootDir, 'CHANGELOG.md');
  if (updateChangelog(changelogPath, newVersion, dryRun)) {
    log('  └─ Updated CHANGELOG.md');
  }

  if (!dryRun) {
    const staged = [...VERSION_FILES, 'CHANGELOG.md'].filter(f => fs.existsSync(path.join(rootDir, f)));
    try {
      exec(`git add ${staged.join(' ')}`);
      exec(`git commit -m "chore(release): v${newVersion}"`);
      exec(`git tag -a v${newVersion} -m "Release v${newVersion}"`);
    } catch (err) {
      throw new ReleaseError(`Git commit/tag failed: ${err.message}. Files were updated but not committed.`);
    }
    log(`🏷️ Created git commit and tag v${newVersion}.`);
  }

  log(`🎉 Successfully completed release v${newVersion}!`);
}

if (require.main === module) {
  try {
    runRelease();
  } catch (err) {
    console.error(`❌ Error: ${err.message}`);
    process.exit(1);
  }
}
```

Add `ReleaseError` to `module.exports`:

```js
module.exports = {
  VERSION_FILES,
  ReleaseError,
  bumpSemver,
  updateJsonVersion,
  checkVersionSync,
  updateChangelog,
  runRelease
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/release-pipeline.test.js tests/release.test.js && node bin/release.js patch --dry-run --skip-test`
Expected: PASS (7 pipeline tests); the dry run prints `Bumping version: 1.4.0 ➔ 1.4.1` and leaves `git status --short` unchanged.

- [ ] **Step 5: Commit**

```bash
git add bin/release.js tests/release-pipeline.test.js
git commit -m "fix(release): preflight-first, fail-closed pipeline with explicit staging"
```

---

### Task 6: GitHub Actions CI

**Files:**
- Create: `.github/workflows/ci.yml`
- Test: `tests/repo-hygiene.test.js` (append)

**Interfaces:**
- Consumes: `root` from Task 1.

- [ ] **Step 1: Write the failing test**

Append to `tests/repo-hygiene.test.js`:

```js
test('CI workflow runs npm test on the supported Node matrix', () => {
  const ciPath = path.join(root, '.github', 'workflows', 'ci.yml');
  assert.ok(fs.existsSync(ciPath), '.github/workflows/ci.yml must exist');
  const ci = fs.readFileSync(ciPath, 'utf8');
  assert.match(ci, /npm test/);
  assert.match(ci, /node-version:\s*\[18,\s*20,\s*22\]/);
  assert.match(ci, /contents:\s*read/, 'workflow must use least-privilege permissions');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/repo-hygiene.test.js`
Expected: FAIL with `.github/workflows/ci.yml must exist`

- [ ] **Step 3: Write minimal implementation**

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

permissions:
  contents: read

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        node-version: [18, 20, 22]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm test
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/repo-hygiene.test.js`
Expected: PASS (5 tests)

- [ ] **Step 5: Commit**

```bash
git add .github/workflows/ci.yml tests/repo-hygiene.test.js
git commit -m "ci: run test suite on Node 18, 20 and 22"
```

> After the first push, check the Actions tab. If any test fails on Node 18 only, record it in `CHANGELOG.md` under `[Unreleased]` and either fix the test or raise the `engines` floor; do not silently drop 18 from the matrix.

---

### Task 7: Branch coverage for `ada-tracker.js`

**Files:**
- Test: `tests/tracker.test.js`

No production change expected: these tests pin the existing behavior of `src/hooks/ada-tracker.js` (lines 30-31, 64-65, 72-86, 108-122 are uncovered today). If a test fails, treat it as a bug and fix the hook in the same task.

**Interfaces:**
- Consumes: `CLAUDE_CONFIG_DIR` env var (read by `getFlagPath()` in `src/hooks/ada-config.js:17`).

- [ ] **Step 1: Write the tests**

Create `tests/tracker.test.js`:

```js
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { spawnSync } = require('node:child_process');

const trackerPath = path.resolve(__dirname, '../src/hooks/ada-tracker.js');

function runTracker(input, env) {
  return spawnSync(process.execPath, [trackerPath], { input, env, encoding: 'utf8' });
}

test('ada-tracker branches', async (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ada-tracker-test-'));
  t.after(() => fs.rmSync(tempDir, { recursive: true, force: true }));

  const env = { ...process.env, CLAUDE_CONFIG_DIR: tempDir };
  delete env.ADA_DEFAULT_MODE;
  const flagPath = path.join(tempDir, '.ada-agent-active');
  const payload = (prompt) => JSON.stringify({ prompt });

  await t.test('empty stdin exits 0 with no output', () => {
    const result = runTracker('', env);
    assert.equal(result.status, 0);
    assert.equal(result.stdout, '');
  });

  await t.test('invalid JSON is echoed back unchanged', () => {
    const result = runTracker('not json', env);
    assert.equal(result.stdout, 'not json');
  });

  await t.test('unknown mode is blocked with a usage hint', () => {
    const result = runTracker(payload('/ada turbo'), env);
    const out = JSON.parse(result.stdout);
    assert.equal(out.decision, 'block');
    assert.match(out.reason, /Unknown ada-agent mode: turbo/);
  });

  await t.test('bare /ada reports inactive, then the active mode', () => {
    fs.rmSync(flagPath, { force: true });
    assert.equal(JSON.parse(runTracker(payload('/ada'), env).stdout).reason, 'Ada-agent is inactive.');

    fs.writeFileSync(flagPath, 'lite');
    assert.equal(JSON.parse(runTracker(payload('/ada'), env).stdout).reason, 'Ada-agent is active in mode: lite');
  });

  await t.test('plan-file prompts suspend compression', () => {
    fs.writeFileSync(flagPath, 'full');
    const out = JSON.parse(runTracker(payload('please update implementation_plan.md'), env).stdout);
    assert.match(out.hookSpecificOutput.additionalContext, /SUSPEND COMPRESSION/);
  });

  await t.test('ultra mode injects the max-savings reminder', () => {
    fs.writeFileSync(flagPath, 'ultra');
    const out = JSON.parse(runTracker(payload('refactor the parser'), env).stdout);
    assert.match(out.hookSpecificOutput.additionalContext, /MAX TOKEN SAVINGS MODE/);
  });

  await t.test('inactive agent leaves the prompt untouched', () => {
    fs.rmSync(flagPath, { force: true });
    const out = JSON.parse(runTracker(payload('refactor the parser'), env).stdout);
    assert.equal(out.prompt, 'refactor the parser');
    assert.equal(out.hookSpecificOutput, undefined);
  });
});
```

- [ ] **Step 2: Run the tests**

Run: `node --test tests/tracker.test.js`
Expected: PASS (7 subtests). If one fails, read the assertion message, fix `src/hooks/ada-tracker.js` minimally, and re-run.

- [ ] **Step 3: Confirm branch coverage improved**

Run: `npm run test:coverage 2>&1 | grep -E "ada-tracker|all files"`
Expected: `ada-tracker.js` branch % above 30.77 (it was the lowest in the repo).

- [ ] **Step 4: Commit**

```bash
git add tests/tracker.test.js
git commit -m "test(hooks): cover ada-tracker slash, plan-file and passthrough branches"
```

---

### Task 8: Skills lint and router reachability

**Files:**
- Create: `tests/skills-lint.test.js`
- Modify: `GEMINI.md` (router tables)

**Interfaces:**
- Produces: `tests/skills-lint.test.js` exporting nothing; defines `skillDirs: string[]` and `root` at module top. Task 9 appends to this file and reuses both.

- [ ] **Step 1: Write the failing test**

Create `tests/skills-lint.test.js`:

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const skillsRoot = path.join(root, 'skills');
const skillDirs = fs.readdirSync(skillsRoot, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

const MAX_SKILL_LINES = 1300;

function readSkill(name) {
  return fs.readFileSync(path.join(skillsRoot, name, 'SKILL.md'), 'utf8').replace(/\r\n/g, '\n');
}

function parseFrontmatter(content) {
  const block = content.match(/^---\n([\s\S]*?)\n---/);
  if (!block) return null;
  const name = block[1].match(/^name:\s*(.+)$/m);
  const description = block[1].match(/^description:\s*(.+)$/m);
  return {
    name: name ? name[1].trim().replace(/^["']|["']$/g, '') : null,
    description: description ? description[1].trim().replace(/^["']|["']$/g, '') : null,
  };
}

test('every skill has SKILL.md with matching name and a description', () => {
  assert.ok(skillDirs.length > 0);
  for (const dir of skillDirs) {
    assert.ok(fs.existsSync(path.join(skillsRoot, dir, 'SKILL.md')), `${dir}/SKILL.md is missing`);
    const fm = parseFrontmatter(readSkill(dir));
    assert.ok(fm, `${dir}/SKILL.md has no frontmatter`);
    assert.equal(fm.name, dir, `${dir}/SKILL.md name must equal its directory`);
    assert.ok(fm.description && fm.description.length >= 20, `${dir}/SKILL.md needs a real description`);
  }
});

test('no SKILL.md grows past the size ratchet', () => {
  for (const dir of skillDirs) {
    const lines = readSkill(dir).split('\n').length;
    assert.ok(lines <= MAX_SKILL_LINES, `${dir}/SKILL.md has ${lines} lines (max ${MAX_SKILL_LINES})`);
  }
});

test('every router link in GEMINI.md resolves to a real skill', () => {
  const gemini = fs.readFileSync(path.join(root, 'GEMINI.md'), 'utf8');
  const linked = [...gemini.matchAll(/`\.\/skills\/([^`/]+)\/SKILL\.md`/g)].map((m) => m[1]);
  assert.ok(linked.length > 0, 'GEMINI.md should link skills');
  for (const name of linked) {
    assert.ok(skillDirs.includes(name), `GEMINI.md links unknown skill: ${name}`);
  }
});

test('every skill is reachable from the GEMINI.md router', () => {
  const gemini = fs.readFileSync(path.join(root, 'GEMINI.md'), 'utf8');
  const linked = new Set([...gemini.matchAll(/`\.\/skills\/([^`/]+)\/SKILL\.md`/g)].map((m) => m[1]));
  const orphans = skillDirs.filter((name) => !linked.has(name));
  assert.deepEqual(orphans, [], `Skills missing from the router: ${orphans.join(', ')}`);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/skills-lint.test.js`
Expected: first three tests PASS; `every skill is reachable from the GEMINI.md router` FAILS listing `ada-agent, ada-arch, ada-brainstorm, ada-code, ada-debug, ada-plan, ada-review, ada-verify, receiving-code-review, writing-skills`. If the first three fail, fix the reported skill file (frontmatter or size) before continuing.

- [ ] **Step 3: Link the orphans in `GEMINI.md`**

Replace this line in the Core Process table:

```markdown
| **Parallel Agent Dispatch** | `./skills/dispatching-parallel-agents/SKILL.md` |
```

with:

```markdown
| **Parallel Agent Dispatch** | `./skills/dispatching-parallel-agents/SKILL.md` |
| **Receiving Code Review Feedback** | `./skills/receiving-code-review/SKILL.md` |
| **Creating & Verifying Skills** | `./skills/writing-skills/SKILL.md` |
```

Then insert this new section directly before the `### Specialized Domain & Automation Skills (Ada System)` heading:

```markdown
### Ada Bridge Skills (Semantic Aliases)
| Workflow / Trigger | Skill File Path |
| :--- | :--- |
| **Master Orchestrator & Caveman Mode** | `./skills/ada-agent/SKILL.md` |
| **Requirement Discovery (alias of brainstorming)** | `./skills/ada-brainstorm/SKILL.md` |
| **Multi-File Planning (alias of writing-plans)** | `./skills/ada-plan/SKILL.md` |
| **Implementation with TDD (alias of test-driven-development)** | `./skills/ada-code/SKILL.md` |
| **Evidence-Based Debugging (alias of systematic-debugging)** | `./skills/ada-debug/SKILL.md` |
| **Completion Gate (alias of verification-before-completion)** | `./skills/ada-verify/SKILL.md` |
| **Pull Request & Diff Review** | `./skills/ada-review/SKILL.md` |
| **Software Architecture, C4 & ADRs** | `./skills/ada-arch/SKILL.md` |
```

- [ ] **Step 4: Run the full suite**

Run: `npm test`
Expected: PASS, 0 failures (the existing `GEMINI.md router integrity` test in `tests/orchestrator.test.js` must still pass; if it asserts on exact table contents, adjust only the new rows to satisfy it).

- [ ] **Step 5: Commit**

```bash
git add tests/skills-lint.test.js GEMINI.md
git commit -m "test(skills): lint frontmatter, size ratchet and router reachability"
```

---

### Task 9: README drift fix

**Files:**
- Modify: `README.md` (lines 24, 28, 139, 141, 642, 690 plus new entries)
- Test: `tests/skills-lint.test.js` (append)

**Interfaces:**
- Consumes: `root`, `skillDirs` from Task 8.

- [ ] **Step 1: Write the failing test**

Append to `tests/skills-lint.test.js`:

```js
test('README catalog count and coverage match the skills directory', () => {
  const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
  const heading = readme.match(/Cat[aá]logo Exhaustivo de Habilidades \((\d+) Skills\)/);
  assert.ok(heading, 'README must declare a catalog count');
  assert.equal(Number(heading[1]), skillDirs.length, 'README catalog count is stale');

  const missing = skillDirs.filter((name) => !readme.includes('`' + name + '`'));
  assert.deepEqual(missing, [], `README has no entry for: ${missing.join(', ')}`);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/skills-lint.test.js`
Expected: FAIL with `README catalog count is stale` (38 !== 41)

- [ ] **Step 3: Fix counts and add the missing entries**

Run:

```bash
sed -i \
  -e 's/(38 Skills)/(41 Skills)/g' \
  -e 's/-38-skills)/-41-skills)/g' \
  -e 's/las 38 habilidades/las 41 habilidades/g' \
  -e 's/Ada Polymath Council - 5 Skills/Ada Polymath Council - 7 Skills/g' \
  -e 's/council---5-skills/council---7-skills/g' \
  -e 's/Suite de 25 pruebas/Suite de 39 pruebas/' \
  README.md
grep -n "38 \|25 pruebas" README.md
```

Expected: the final `grep` prints nothing except unrelated prose; if a hit is a stale count, fix it the same way.

Insert these three entries after the `#### 38. \`ada-neumann\`` block (just before the next `##` heading), then renumber:

```markdown
#### 39. `ada-arch` (Arquitectura de Software & ADRs)
- **Ubicación**: [skills/ada-arch/SKILL.md](skills/ada-arch/SKILL.md)
- **Propósito**: Diseño de arquitectura de software, diagramas C4, modelado de sistemas distribuidos, evaluación de patrones de diseño y redacción de Architectural Decision Records (ADRs) con doctrina de módulos profundos.
- **Salida**: Diagramas C4, ADRs fechados y evaluaciones de trade-offs arquitectónicos.

#### 40. `ada-mind` (Perfil Cognitivo & Esquema Mental)
- **Ubicación**: [skills/ada-mind/SKILL.md](skills/ada-mind/SKILL.md)
- **Propósito**: Perfilado cognitivo, esquemas de modelos mentales, debriefing metacognitivo (`/mind reflect`), detección de sesgos cognitivos y calibración epistémica.
- **Salida**: Perfil cognitivo actualizado y reflexiones metacognitivas estructuradas.

#### 41. `ada-signals` (Señales, Sistemas LTI & Transformadas)
- **Ubicación**: [skills/ada-signals/SKILL.md](skills/ada-signals/SKILL.md)
- **Propósito**: Análisis de señales continuas y discretas, sistemas LTI, convolución, respuesta al impulso, Transformada de Fourier/FFT, Laplace y Z, diagramas de Bode y filtrado digital.
- **Salida**: Desarrollos analíticos de transformadas, respuestas de sistemas y diseños de filtros.
```

Add to the directory tree (before `├── src/`, after the `ada-neumann/` line, converting that line's `└──` to `├──`):

```text
│   ├── ada-arch/             # Arquitectura de software, C4 y ADRs
│   ├── ada-mind/             # Perfil cognitivo y reflexión metacognitiva
│   └── ada-signals/          # Señales, sistemas LTI y transformadas
```

Confirm the heading count first, then renumber headings sequentially:

```bash
grep -c '^#### [0-9]*\. ' README.md   # expect 41
node -e "const fs=require('fs');let n=0;const t=fs.readFileSync('README.md','utf8').replace(/^#### \d+\. /gm,()=>'#### '+(++n)+'. ');fs.writeFileSync('README.md',t)"
git diff --stat README.md
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS, 0 failures.

- [ ] **Step 5: Commit**

```bash
git add README.md tests/skills-lint.test.js
git commit -m "docs(readme): sync skill and test counts, document ada-arch, ada-mind, ada-signals"
```

---

### Task 10: Changelog entry and final verification

**Files:**
- Modify: `CHANGELOG.md` (`[Unreleased]` section)

- [ ] **Step 1: Add the changelog entry**

Add under `## [Unreleased]`, above the existing `### Added` list:

```markdown
### Changed
- **Release engine hardened**: preflight-first pipeline (clean tree fails closed, version-drift check, tag-exists check), explicit file staging instead of `git add -A`, errors thrown instead of `process.exit`, and `[Unreleased]` notes rotated into the new version.
- **Packaging**: `package.json` now ships `GEMINI.md`, `plugin.json`, `gemini-extension.json`, `CHANGELOG.md`, `NOTICE.md` and carries publishing metadata.

### Added
- Root `.gitignore`, GitHub Actions CI (Node 18/20/22), `npm run test:coverage`.
- Hygiene tests: skill frontmatter, router reachability, size ratchet, README drift, tracker branches, release pipeline.
```

(Keep the existing `### Added` bullets; merge the new bullets into that list rather than creating a second `### Added` heading.)

- [ ] **Step 2: Run the full verification**

Run: `npm test && npm run test:coverage 2>&1 | tail -20 && node bin/release.js patch --dry-run --skip-test && git status --short`
Expected: all tests pass (>= 60), coverage line % above the 79.70 baseline, dry run prints a bump to `1.4.1`, and `git status` shows only `CHANGELOG.md` modified.

- [ ] **Step 3: Commit**

```bash
git add CHANGELOG.md
git commit -m "docs(changelog): record robustness and polish changes"
```

---

## Phase 2 (deferred — needs its own brainstorm → spec → plan cycle)

Not included above because each is an independent subsystem with open design questions:

1. **Split oversized skills** (`ada-neumann` 1218 lines, `ada-turing` 1012, `writing-skills` 679+): `view_file` returns at most 800 lines per call, so these cannot load in one read, which contradicts the lazy-loading promise. Design question: split into `SKILL.md` + `references/*.md` loaded on demand.
2. **Bridge-skill consolidation**: `ada-brainstorm/plan/code/debug/verify/review` are aliases of Superpowers skills. Decide whether to keep as thin pointers or retire.
3. **Roadmap features** (`docs/plans/future-roadmap.md`): context gauge, `/ada compress`, semantic skill loading, MCP dependency mapping, Ada-Crew orchestration.
4. **Statusline portability**: `ada-statusline.sh` is Bash-only (no Windows/PowerShell path).

## Self-Review

- **Spec coverage:** every row of the Baseline table maps to a task: `.gitignore` → T1; `git add -A`/fail-open/`process.exit`/tag/drift → T3, T5; changelog rotation → T4; packaging → T2; CI → T6; coverage → T7; README drift → T9; router orphans → T8; oversized skills → Phase 2 (ratchet in T8 prevents growth meanwhile).
- **Placeholders:** none; every code step contains the actual code.
- **Type consistency:** `VERSION_FILES`, `checkVersionSync`, `ReleaseError`, `runRelease(args, { rootDir, exec, log })` are defined in T3/T5 and used with the same names and signatures in the tests; `root` and `skillDirs` are defined in T1/T8 and reused in T2/T6/T9.

## Open Questions

1. `package.json` `author` is set to `CodeLoverKawai` (the GitHub remote owner). `plugin.json` still says `Antigravity developer`. Confirm the intended author string for both.
2. Task 9 renumbers every `#### N.` catalog heading. If other documents deep-link to those numbers, they need a follow-up.
