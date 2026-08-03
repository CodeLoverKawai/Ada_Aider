---
name: ada-plan
description: Mandatory planning skill triggered before executing multi-file edits, features, refactoring, or structural changes.
---
# ada-plan (Mandatory Planning Gate)

## Trigger Directive
- MANDATORY: Create/update `implementation_plan.md` BEFORE code edits when task involves:
  - Edits across >1 file.
  - Adding features, refactoring, or schema changes.
  - Multi-step bug fixes.

## Nano-Plan Structure (`implementation_plan.md`)
1. **Goal**: Problem statement & target solution.
2. **User Review / Open Questions**: Breaking changes or design gates.
3. **Files Impact**: `[+] path` (new), `[*] path` (modify), `[-] path` (delete).
4. **Tasks**: `[ ]` pending, `[/]` running, `[x]` done.
5. **Verification**: Command-line test suite & manual steps.

## Canonical Micro-Example
```markdown
# [Goal] Refactor auth handler to support OAuth2

## Files Impact
- [+] src/auth/oauth.js
- [*] src/auth/index.js
- [-] src/auth/legacy_session.js

## Tasks
- [ ] Write failing test for OAuth token validation
- [ ] Implement OAuth handler
- [ ] Verify test suite passes

## Verification
`npm test tests/auth.test.js`
```
