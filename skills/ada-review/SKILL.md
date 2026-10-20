---
name: ada-review
description: Use when reviewing a pull request or code diff for correctness, security, performance, and test coverage.
---

# ada-review (Structured Single-Pass Code Review)

<EXTREMELY-IMPORTANT>
Review early, review rigorously. Every review must evaluate 4 core pillars: Correctness, Security, Performance, and Test Coverage. Never rubber-stamp diffs without line-by-line inspection.
</EXTREMELY-IMPORTANT>

## Review Dimensions

1. **Correctness & Logic**:
   - Boundary condition handling (null, empty arrays, edge cases, off-by-one).
   - Invariant enforcement and error propagation.
2. **Security Hardening**:
   - Input sanitization, injection risk, privilege escalation.
   - Secret leakage, credential handling, or insecure deserialization.
3. **Performance & Resources**:
   - Time complexity ($O(N)$ vs $O(N^2)$), memory footprint, unclosed handles/streams.
   - Unnecessary re-renders, DB n+1 queries, unindexed queries.
4. **Test Coverage & Quality**:
   - All changed logic paths covered by automated unit/integration tests.
   - Assertions test real outcomes, not just mock calls.

## Terse Tabular Review Output Format

Review findings must be summarized in a compact table:

| Dimension | Status | Severity | Finding & Actionable Fix |
|---|---|---|---|
| Correctness | PASS / FAIL | Critical / Minor / None | File:line — description of defect or edge case |
| Security | PASS / FAIL | Critical / Minor / None | File:line — sanitization or credential issue |
| Performance | PASS / FAIL | Critical / Minor / None | File:line — algorithmic or resource concern |
| Test Coverage | PASS / FAIL | Critical / Minor / None | Missing test coverage for edge case X |

### Status Definitions
- `PASS`: Meets production standards with zero blocking issues.
- `FAIL`: Requires resolution before merge.

### Severity Levels
- `Critical`: Blocks merge. Must be remediated immediately (bugs, vulnerabilities, regressions).
- `Minor`: Non-blocking suggestion (style, micro-optimization, documentation clarity).
- `None`: No issues detected.

## Review Action Protocol
- If any `Critical` findings exist: State overall status as **REJECTED**, list remediation steps, and trigger `ada-code`.
- If only `Minor` or `None` findings exist: State overall status as **APPROVED**, proceed to verification or merge.
