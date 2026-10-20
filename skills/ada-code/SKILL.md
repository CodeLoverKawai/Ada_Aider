---
name: ada-code
description: Implementation phase skill enforcing Test-Driven Development (TDD), minimal precise edits, and strict code quality.
---

# ada-code (Test-Driven Development & Precise Implementation)

<EXTREMELY-IMPORTANT>
NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST.
Never write implementation code speculatively. If code is written before a failing test exists, discard it and restart with a test.
</EXTREMELY-IMPORTANT>

## The RED-GREEN-REFACTOR Cycle

```mermaid
flowchart LR
    A[RED: Write Failing Test] --> B[Verify Test Fails]
    B --> C[GREEN: Write Minimal Code]
    C --> D[Verify All Tests Pass]
    D --> E[REFACTOR: Clean Code]
    E --> F[Verify Tests Stay Green]
```

### 1. RED (Failing Test First)
- Write an explicit, minimal test that asserts the desired behavior or reproduces a bug.
- Run the test suite immediately and observe it **fail** for the expected reason.
- If the test unexpectedly passes, refine the test assertions until the absence of the feature is proven.

### 2. GREEN (Minimal Implementation)
- Write only the simplest production code required to satisfy the failing test.
- Do NOT add speculative features, premature abstractions, or out-of-scope utilities.
- Target exact edits using `replace_file_content` instead of massive file rewrites.

### 3. REFACTOR (Clean & Harden)
- Clean up duplication and improve readability while maintaining passing tests.
- Re-run test commands after every refactoring edit to ensure zero regressions.

## Implementation Guardrails

1. **Documentation & Comment Integrity**:
   - Preserve all existing comments, type annotations, and docstrings unrelated to your changes.
   - Never strip existing comments or rewrite unrelated sections of a file.
2. **Minimal Precise Edits**:
   - Make localized changes with `replace_file_content`. Avoid replacing entire files when modifying specific methods.
3. **Zero Speculative Code (YAGNI)**:
   - Implement only what is strictly mandated by the test and the plan.
