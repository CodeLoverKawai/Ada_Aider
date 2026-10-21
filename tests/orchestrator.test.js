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

  // Must not contain @ prefixed paths in table
  const atTableLines = lines.filter(l => l.includes('|') && l.includes('`@./skills/'));
  assert.deepStrictEqual(atTableLines, [], 'Found @ prefix in skill index table paths');

  // Master instructions (using-superpowers and ada-agent core directives) inlined
  assert.ok(
    content.includes('Invoke relevant or requested skills BEFORE any response or action'),
    'Master skill invocation rule must be inlined in GEMINI.md'
  );
  assert.ok(
    content.includes('Process Skills First'),
    'Process skills priority must be inlined in GEMINI.md'
  );

  // Verify all table paths point to actual files on disk
  let matchCount = 0;
  for (const line of lines) {
    if (line.includes('|') && line.includes('skills/')) {
      const match = line.match(/`(\.\/skills\/[^`]+)`/);
      if (match) {
        matchCount++;
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
  assert.ok(matchCount > 0, 'Must have matched skill paths in table');
});

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

  // Permitted read-only diagnostics/audits
  assert.match(content, /read-only/i);
});

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

test('ada-brainstorm encodes decision tree frontier and recommended answer grilling', () => {
  const skillFile = path.join(rootDir, 'skills', 'ada-brainstorm', 'SKILL.md');
  const content = fs.readFileSync(skillFile, 'utf8');

  // Must mention decision tree / frontier
  assert.match(content, /frontier/i, 'ada-brainstorm must mention decision tree frontier');

  // Must mention recommended answer pattern allowing 1-word yes confirmation
  assert.match(content, /recommended/i, 'ada-brainstorm must include recommended answer pattern');
  assert.match(content, /fact/i, 'ada-brainstorm must distinguish autonomous facts vs user decisions');
});

test('ada-arch and ada-code enforce deep modules doctrine', () => {
  const archFile = path.join(rootDir, 'skills', 'ada-arch', 'SKILL.md');
  const codeFile = path.join(rootDir, 'skills', 'ada-code', 'SKILL.md');
  const archContent = fs.readFileSync(archFile, 'utf8');
  const codeContent = fs.readFileSync(codeFile, 'utf8');

  // ada-arch must define Deep Modules vs Shallow Modules
  assert.match(archContent, /deep module/i, 'ada-arch must define Deep Modules');
  assert.match(archContent, /shallow module/i, 'ada-arch must define Shallow Modules');
  assert.match(archContent, /deletion test/i, 'ada-arch must include the Deletion Test');

  // ada-code must enforce interface as test surface
  assert.match(codeContent, /interface is the test surface|test surface/i, 'ada-code must enforce testing through module interfaces');
});

test('ada-docs enforces GLOSSARY.md domain modeling standard', () => {
  const docsFile = path.join(rootDir, 'skills', 'ada-docs', 'SKILL.md');
  const content = fs.readFileSync(docsFile, 'utf8');

  // Must enforce GLOSSARY.md living domain model
  assert.match(content, /GLOSSARY\.md/, 'ada-docs must reference GLOSSARY.md');
  assert.match(content, /ubiquitous language|domain model/i, 'ada-docs must enforce ubiquitous language');
});

