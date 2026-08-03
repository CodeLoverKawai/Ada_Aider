---
name: ada-code
description: Implementation phase skill enforcing Test-Driven Development (TDD), minimal precise edits, and strict code quality.
---
# ada-code (TDD & Implementation Discipline)

## Mandatory TDD Workflow
1. **Red**: Write a minimal, failing test case.
2. **Execute & Confirm**: Run test command and observe exact expected failure.
3. **Green**: Write minimal production code necessary to pass the test.
4. **Execute & Confirm**: Run test command and observe exact pass.
5. **Refactor**: Clean up implementation without altering external contracts.
6. **Repeat**: Proceed to next atomic task in `implementation_plan.md`.

## Implementation Guardrails
- **Bugfixes**: ALWAYS write or run a failing reproducing test first before applying production edits.
- **Zero Symptom Masking**: Never wrap unhandled exceptions in silent `try/catch` or return dummy fallbacks to force tests to pass.
- **Signature Verification**: Inspect exact function/component signatures and properties using `view_file` or `grep_search` before writing calls.
- **Preserve Documentation & Comments**: Retain pre-existing comments, docstrings, and contracts unless explicitly asked to modify them.
