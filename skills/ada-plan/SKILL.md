---
name: ada-plan
description: Mandatory planning skill triggered before executing multi-file edits, features, refactoring, or structural changes.
---

# ada-plan (Nano-Plan Protocol & Execution Decomposition)

<EXTREMELY-IMPORTANT>
Never write production code without an approved plan. Deconstruct work into bite-sized, independently verifiable steps.
</EXTREMELY-IMPORTANT>

## Nano-Plan Storage Conventions

- Implementation plans are saved to: `docs/plans/YYYY-MM-DD-<feature-name>.md` (or `.superpowers/plans/YYYY-MM-DD-<feature-name>.md`).
- Artifact metadata must be human-readable and contain executable checkpoints.

## Nano-Plan Structure

Every Nano-Plan MUST include:
1. **Goal & Scope**: Brief statement of objective and boundaries.
2. **File Impact Table**: Direct tabular mapping of modified, added, or deleted files.
3. **Bite-Sized Task Breakdown**: Step-by-step tasks with exact file paths and verification commands.

### File Impact Table Format

| Impact | Path | Description |
|---|---|---|
| `[+]` | `src/auth/token.js` | Create OAuth2 token refresh helper |
| `[*]` | `src/api/client.js` | Integrate refresh hook on 401 response |
| `[-]` | `src/legacy/auth.js` | Remove deprecated auth adapter |

*Impact indicators:*
- `[+]`: Create new file
- `[*]`: Modify existing file
- `[-]`: Delete file

## Bite-Sized Task Template

Each task in the plan must represent 2-5 minutes of work and include:
- **Exact File Paths**: No ambiguous wildcards or directory references.
- **TDD Requirement**: Failing test specified first, followed by implementation.
- **Verification Command**: Exact shell command to execute and assert exit code 0.

```markdown
### Task N: <Action Summary>
- **Files:** `[+] tests/auth.test.js`, `[*] src/auth/token.js`
- **Step 1 (Test):** Write failing test in `tests/auth.test.js` asserting token refresh.
- **Step 2 (Verify Red):** Run `node --test tests/auth.test.js` -> MUST FAIL.
- **Step 3 (Implement):** Implement refresh helper in `src/auth/token.js`.
- **Step 4 (Verify Green):** Run `node --test tests/auth.test.js` -> MUST PASS (exit code 0).
- **Step 5 (Commit):** `git commit -m "feat(auth): add token refresh helper"`
```

## Plan Execution Discipline

- Follow tasks strictly in sequential order.
- Verify each task empirically with `ada-verify` before moving to the next.
- Stop and re-plan if requirements or architecture diverge during execution.
