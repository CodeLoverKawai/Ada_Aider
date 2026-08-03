---
name: ada-debug
description: Evidence-based debugging skill triggered when investigating errors, test failures, or unexpected runtime behavior.
---
# ada-debug (Evidence-Based Debugging)

## 5-Step Systematic Debug Loop
1. **Reproduce**: Write a standalone reproducing test or script.
2. **Observe**: Read full, un-truncated error log/traceback. Never hypothesize without logs.
3. **Hypothesize**: Formulate explicit, testable root-cause hypothesis.
4. **Test Hypothesis**: Validate via targeted logging or test instrumentation.
5. **Fix & Verify**: Apply minimal root-cause fix. Re-run reproducer (must pass).

## Guardrails
- **No Guessing**: Code edits require citing an explicit log error line.
- **No Masking**: Never swallow exceptions or insert silent fallback stubs.

## Canonical Micro-Example
```
Log Evidence: `TypeError: Cannot read property 'owner' of undefined at src/user.js:42`
Reproducer: Created tests/reproduce_null_owner.test.js (Fails with TypeError)
Fix: Modified src/user.js:41-43 to initialize owner state before dereferencing.
Verification: tests/reproduce_null_owner.test.js passed (exit code 0).
```
