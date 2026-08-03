#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

  const header = `## [${newVersion}] - ${today}\n\n- Release v${newVersion}\n\n`;

  // Avoid duplicating header if already prepended
  if (content.includes(`## [${newVersion}]`)) {
    return false;
  }

  // Prepend right after the title or at top
  let updated;
  if (content.startsWith('# Changelog') || content.startsWith('# CHANGELOG')) {
    const titleEnd = content.indexOf('\n\n');
    if (titleEnd !== -1) {
      updated = content.slice(0, titleEnd + 2) + header + content.slice(titleEnd + 2);
    } else {
      updated = content + '\n\n' + header;
    }
  } else {
    updated = header + content;
  }

  if (!dryRun) {
    fs.writeFileSync(changelogPath, updated, 'utf8');
  }
  return true;
}

function runRelease(args = process.argv.slice(2)) {
  const rootDir = path.resolve(__dirname, '..');
  const bumpType = args.find(a => ['patch', 'minor', 'major'].includes(a.toLowerCase())) || 'patch';
  const dryRun = args.includes('--dry-run');
  const skipTest = args.includes('--skip-test');
  const allowDirty = args.includes('--allow-dirty');

  console.log(`🚀 Starting Ada_Aider Automated Release Pipeline (${bumpType.toUpperCase()}${dryRun ? ' - DRY RUN' : ''})...`);

  // 1. Git Clean Check
  if (!allowDirty && !dryRun) {
    try {
      const status = execSync('git status --porcelain', { cwd: rootDir, encoding: 'utf8' }).trim();
      if (status.length > 0) {
        console.error('❌ Error: Working tree has uncommitted changes. Commit or stash them first.');
        process.exit(1);
      }
    } catch (e) {
      // Git command failed or not in a git repo
    }
  }

  // 2. Pre-Release Test Verification
  if (!skipTest) {
    console.log('🧪 Running automated test suite verification...');
    try {
      execSync('npm test', { cwd: rootDir, stdio: 'inherit' });
      console.log('✅ Test suite passed cleanly.');
    } catch (err) {
      console.error('❌ Error: Test suite failed. Release aborted.');
      process.exit(1);
    }
  }

  // 3. Read current version from package.json
  const packageJsonPath = path.join(rootDir, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.error('❌ Error: package.json not found.');
    process.exit(1);
  }

  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const oldVersion = pkg.version;
  const newVersion = bumpSemver(oldVersion, bumpType);

  console.log(`📦 Bumping version: ${oldVersion} ➔ ${newVersion}`);

  // 4. Update Target Version Files
  const targetFiles = [
    'package.json',
    'plugin.json',
    'gemini-extension.json',
    'installed_version.json'
  ];

  for (const relPath of targetFiles) {
    const fullPath = path.join(rootDir, relPath);
    if (fs.existsSync(fullPath)) {
      updateJsonVersion(fullPath, newVersion, dryRun);
      console.log(`  └─ Updated ${relPath}`);
    }
  }

  // 5. Update CHANGELOG.md
  const changelogPath = path.join(rootDir, 'CHANGELOG.md');
  if (updateChangelog(changelogPath, newVersion, dryRun)) {
    console.log('  └─ Updated CHANGELOG.md');
  }

  // 6. Git Commit & Tag
  if (!dryRun) {
    try {
      execSync('git add -A', { cwd: rootDir });
      execSync(`git commit -m "chore(release): v${newVersion}"`, { cwd: rootDir });
      execSync(`git tag -a v${newVersion} -m "Release v${newVersion}"`, { cwd: rootDir });
      console.log(`🏷️ Created git commit and tag v${newVersion}.`);
    } catch (e) {
      console.log('ℹ️ Git commit/tag skipped (not in a clean git repo or git not configured).');
    }
  }

  console.log(`🎉 Successfully completed release v${newVersion}!`);
}

if (require.main === module) {
  runRelease();
}

module.exports = {
  bumpSemver,
  updateJsonVersion,
  updateChangelog,
  runRelease
};
