---
name: ada-verify
description: Mandatory completion gate skill enforcing empirical test execution, exit code verification, and zero speculative claims.
---
# ada-verify (Mandatory Verification Gate)

## Directives
- **Evidence First**: MANDATORY to run tests/build scripts BEFORE declaring completion.
- **Empirical Report**: State exact test metrics and process exit code.
- **Zero Speculation**: "should work" or "seems fine" are FORBIDDEN without terminal log output.
- **Diff & Walkthrough**: Review `git status`/`git diff` and update `walkthrough.md`.

## Canonical Micro-Example
```
Executed: `npm test`
Result: 22 passed, 0 failed (exit code 0).
Updated: walkthrough.md with test log evidence.
```
