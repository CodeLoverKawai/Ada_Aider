---
name: ada-security
description: Security auditing skill for secret scanning, dependency hygiene, input sanitization, path traversal safety, and credential safety.
---
# ada-security (Security Auditing & Hardening)

<EXTREMELY-IMPORTANT>
NEVER commit secrets, private keys, API tokens, or hardcoded passwords to git repositories. Security checks must be performed before completing any task.
</EXTREMELY-IMPORTANT>

## Core Security Guardrails

1. **Zero Secrets in Source Code**:
   - Store all credentials, API keys, tokens, and database passwords in `.env` files or secure secret managers.
   - Ensure `.env`, `.env.local`, and sensitive credential files are explicitly listed in `.gitignore`.
2. **Automated Secret Scan Directive**:
   - Before completing tasks or releasing code, run a secret audit using `grep_search` across the repository for common secret patterns:
     - `api[_-]?key`, `secret`, `password`, `bearer`, `private[_-]?key`, `BEGIN (RSA|OPENSSH|PRIVATE) KEY`.
3. **Path Safety & Traversal Prevention**:
   - Validate absolute file paths before viewing or editing. Prevent unauthorized directory traversal attacks (`../..`).
   - Note: Authorized local development plugin symlinks (such as `~/.gemini/config/plugins/ada-agent`) are permitted.
4. **Input Sanitization & Injection Prevention**:
   - Parameterize all SQL queries (never concatenate raw strings into SQL).
   - Sanitize all user inputs before executing shell commands or passing to dynamic eval functions.
5. **Dependency Hygiene**:
   - Audit dependencies using package manager vulnerability scanners (`npm audit`, `cargo audit`, `pip audit`).
   - Pin exact dependency versions to prevent supply-chain attacks.

## Security Red Flags

| Thought | Reality |
|---|---|
| "I'll hardcode the API key for local testing" | STOP. Use an environment variable immediately. |
| "This string concatenation in SQL is safe because it's internal" | Always use parameterized queries. |
| "I can skip `.gitignore` check for now" | Check `.gitignore` before committing files containing secrets. |

## Checklist for Security Audits

- [ ] Repository scanned with `grep_search` for hardcoded secrets or API keys.
- [ ] All sensitive keys loaded via `process.env` / environment variables.
- [ ] `.gitignore` contains `.env`, `*.pem`, `*.key`, and build artifacts.
- [ ] SQL queries parameterized (zero string concatenation).
- [ ] Dependencies audited for known CVEs.

