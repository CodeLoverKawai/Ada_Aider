#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

/**
 * Bumps a semver string (X.Y.Z) based on type ('patch' | 'minor' | 'major').
 */
function bumpSemver(version, type = 'patch') {
  const parts = version.split('.').map(n => parseInt(n, 10));
  if (parts.length < 3 || parts.some(isNaN)) {
    throw new Error(`Invalid semver version: "${version}"`);
  }

  let [major, minor, patch] = parts;
  switch (type.toLowerCase()) {
    case 'major':
      major += 1;
      minor = 0;
      patch = 0;
      break;
    case 'minor':
      minor += 1;
      patch = 0;
      break;
    case 'patch':
    default:
      patch += 1;
      break;
  }

  return `${major}.${minor}.${patch}`;
}

/**
 * Updates JSON file version property safely.
 */
function updateJsonVersion(filePath, newVersion, dryRun = false) {
  if (!fs.existsSync(filePath)) return false;
  const content = fs.readFileSync(filePath, 'utf8');
  let data;
  try {
    data = JSON.parse(content);
  } catch (err) {
    throw new Error(`Failed to parse JSON file "${filePath}": ${err.message}`);
  }

  data.version = newVersion;
  const updatedContent = JSON.stringify(data, null, 2) + '\n';
  if (!dryRun) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
  }
  return true;
}

/**
 * Prepends a release section to CHANGELOG.md if present.
 */
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

module.exports = {
  VERSION_FILES,
  ReleaseError,
  checkVersionSync,
  bumpSemver,
  updateJsonVersion,
  updateChangelog,
  runRelease
};
