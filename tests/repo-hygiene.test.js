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

