const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { bumpSemver, updateJsonVersion, updateChangelog } = require('../bin/release.js');

test('bumpSemver increments patch, minor, and major correctly', () => {
  assert.equal(bumpSemver('1.3.0', 'patch'), '1.3.1');
  assert.equal(bumpSemver('1.3.0', 'minor'), '1.4.0');
  assert.equal(bumpSemver('1.3.0', 'major'), '2.0.0');
  assert.throws(() => bumpSemver('invalid.version', 'patch'), /Invalid semver/);
});

test('updateJsonVersion updates json version field safely', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ada-release-test-'));
  const targetFile = path.join(tmpDir, 'test.json');

  fs.writeFileSync(targetFile, JSON.stringify({ name: 'test-app', version: '1.0.0' }, null, 2), 'utf8');

  const updated = updateJsonVersion(targetFile, '1.1.0', false);
  assert.equal(updated, true);

  const updatedContent = JSON.parse(fs.readFileSync(targetFile, 'utf8'));
  assert.equal(updatedContent.version, '1.1.0');

  // Clean up
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

test('updateChangelog prepends version section without duplicating', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ada-changelog-test-'));
  const changelogFile = path.join(tmpDir, 'CHANGELOG.md');

  fs.writeFileSync(changelogFile, '# CHANGELOG\n\n## [1.0.0] - 2026-01-01\n\n- Initial release\n', 'utf8');

  const prepended = updateChangelog(changelogFile, '1.1.0', false);
  assert.equal(prepended, true);

  const content = fs.readFileSync(changelogFile, 'utf8');
  assert.ok(content.includes('## [1.1.0]'));
  assert.ok(content.includes('## [1.0.0]'));

  // Duplicate check
  const duplicate = updateChangelog(changelogFile, '1.1.0', false);
  assert.equal(duplicate, false);

  // Clean up
  fs.rmSync(tmpDir, { recursive: true, force: true });
});
