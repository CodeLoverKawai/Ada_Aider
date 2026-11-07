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
