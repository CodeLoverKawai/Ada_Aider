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
