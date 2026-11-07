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

  assert.ok(fs.readFileSync(file, 'utf8').includes('## [1.0.1]'));
  assert.ok(fs.readFileSync(file, 'utf8').includes('- Release v1.0.1'));
  fs.rmSync(dir, { recursive: true, force: true });
});

