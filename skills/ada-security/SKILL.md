---
name: ada-security
description: Security auditing skill for credentials, dependency management, input sanitization, and path safety.
---
# ada-security (Security & Path Safety)

## Security Guardrails
- **Zero Secrets**: Forbid hardcoded secrets, API keys, or default credentials. Utilize secure environment variables.
- **Path Safety Check**: Prevent unintended symlink traversal attacks when writing user project target files. Authorized plugin symlinks (such as `~/.gemini/config/plugins/ada-agent`) are permitted for local development.
- **Input Sanitization**: Validate and sanitize all external/untrusted inputs to prevent command injection and prompt attacks.
- **Dependency Hygiene**: Pin dependencies to stable, audited versions in `package.json` or requirements files.
- **Clarification Gate**: Halt execution and present structured choices if a prompt requests unsafe configurations or hazardous operations.
