---
name: ada-brainstorm
description: Requirement discovery and architectural alignment skill triggered when requirements are ambiguous or a new feature is requested.
---
# ada-brainstorm (Interactive Alignment & Specs)

## Alignment Protocol
1. **1 Question Per Turn**: Ask exactly one high-leverage question at a time.
2. **Multiple Choice**: Provide 2-4 structured choices to minimize user fatigue.
3. **Decompose**: Split large feature requests into atomic sub-projects.
4. **Spec Artifact**: Write locked-in decisions to `docs/specs/YYYY-MM-DD-<topic>.md`.
5. **Trigger Plan**: Once approved, invoke `ada-plan`.

## Canonical Micro-Example
```
Question: How should session persistence be handled for the API gateway?
Options:
1. (Recommended) Redis store with TTL auto-expiry.
2. Encrypted JWT stored client-side in cookies.
3. In-memory LRU cache (local node only).
```
