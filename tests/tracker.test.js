const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { spawnSync } = require('node:child_process');

const trackerPath = path.resolve(__dirname, '../src/hooks/ada-tracker.js');

function runTracker(input, env) {
  return spawnSync(process.execPath, [trackerPath], { input, env, encoding: 'utf8' });
}

test('ada-tracker branches', async (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ada-tracker-test-'));
  t.after(() => fs.rmSync(tempDir, { recursive: true, force: true }));

  const env = { ...process.env, CLAUDE_CONFIG_DIR: tempDir };
  delete env.ADA_DEFAULT_MODE;
  const flagPath = path.join(tempDir, '.ada-agent-active');
  const payload = (prompt) => JSON.stringify({ prompt });

  await t.test('empty stdin exits 0 with no output', () => {
    const result = runTracker('', env);
    assert.equal(result.status, 0);
    assert.equal(result.stdout, '');
  });

  await t.test('invalid JSON is echoed back unchanged', () => {
    const result = runTracker('not json', env);
    assert.equal(result.stdout, 'not json');
  });

  await t.test('unknown mode is blocked with a usage hint', () => {
    const result = runTracker(payload('/ada turbo'), env);
    const out = JSON.parse(result.stdout);
    assert.equal(out.decision, 'block');
    assert.match(out.reason, /Unknown ada-agent mode: turbo/);
  });

  await t.test('bare /ada reports inactive, then the active mode', () => {
    fs.rmSync(flagPath, { force: true });
    assert.equal(JSON.parse(runTracker(payload('/ada'), env).stdout).reason, 'Ada-agent is inactive.');

    fs.writeFileSync(flagPath, 'lite');
    assert.equal(JSON.parse(runTracker(payload('/ada'), env).stdout).reason, 'Ada-agent is active in mode: lite');
  });

  await t.test('plan-file prompts suspend compression', () => {
    fs.writeFileSync(flagPath, 'full');
    const out = JSON.parse(runTracker(payload('please update implementation_plan.md'), env).stdout);
    assert.match(out.hookSpecificOutput.additionalContext, /SUSPEND COMPRESSION/);
  });

  await t.test('ultra mode injects the max-savings reminder', () => {
    fs.writeFileSync(flagPath, 'ultra');
    const out = JSON.parse(runTracker(payload('refactor the parser'), env).stdout);
    assert.match(out.hookSpecificOutput.additionalContext, /MAX TOKEN SAVINGS MODE/);
  });

  await t.test('inactive agent leaves the prompt untouched', () => {
    fs.rmSync(flagPath, { force: true });
    const out = JSON.parse(runTracker(payload('refactor the parser'), env).stdout);
    assert.equal(out.prompt, 'refactor the parser');
    assert.equal(out.hookSpecificOutput, undefined);
  });
});
