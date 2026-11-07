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

const MAX_SKILL_LINES = 800;

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

test('modularized skills carry references/examples.md', () => {
  for (const dir of ['ada-neumann', 'ada-turing']) {
    const refPath = path.join(skillsRoot, dir, 'references', 'examples.md');
    assert.ok(fs.existsSync(refPath), `${dir} must have references/examples.md`);
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

test('README catalog count and coverage match the skills directory', () => {
  const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
  const heading = readme.match(/Cat[aá]logo Exhaustivo de Habilidades \((\d+) Skills\)/);
  assert.ok(heading, 'README must declare a catalog count');
  assert.equal(Number(heading[1]), skillDirs.length, 'README catalog count is stale');

  const missing = skillDirs.filter((name) => !readme.includes('`' + name + '`'));
  assert.deepEqual(missing, [], `README has no entry for: ${missing.join(', ')}`);
});

