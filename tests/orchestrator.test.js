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
