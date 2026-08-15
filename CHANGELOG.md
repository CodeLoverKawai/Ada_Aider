# Changelog

## [Unreleased]

### Added
- **Academic, Research & Engineering Growth Skills Suite**:
  - **ada-research**: Scientific & technical research methodology, hypothesis formulation ($H_0/H_1$), and `RESEARCH_PLAN.md`.
  - **ada-breakdown**: Hierarchical project decomposition (WBS), critical path analysis (CPM/PERT), and risk matrices.
  - **ada-engineer**: Systems thinking, root-cause analysis (5 Whys/Ishikawa), and formal architectural trade-off evaluations.
  - **ada-feynman**: 4-tier conceptual explanation framework (analogy $\rightarrow$ concept $\rightarrow$ rigor $\rightarrow$ code) and curriculum mapping.
  - **ada-math**: Applied mathematics for engineering (multivariable calculus, linear algebra SVD/eigenvalues, ODEs, RK4).
  - **ada-study**: Active recall exam preparation, graduated problem generation, and atomic flashcards.
  - **ada-algo**: Advanced data structures, loop invariants, and formal asymptotic analysis ($O, \Omega, \Theta$).
  - **ada-arch**: System design, C4 architecture modeling diagrams, and Architectural Decision Records (`ADR-001.md`).
  - **ada-career**: High-impact engineering portfolio design with benchmarks, RFC technical proposals, and open-source strategies.
  - **ada-collab**: Soft skills, BLUF communication, ego-free code reviews (`[blocking]`, `[suggestion]`, `[nit]`), and blameless post-mortems.
  - **ada-os**: Operating systems, low-level concurrency (mutex, atomics, lock-free CAS), virtual memory, syscalls (`epoll`/`io_uring`), and profiling toolchain (`gdb`, `strace`, `perf`).
  - **ada-net**: Computer networking, non-blocking BSD sockets, packet inspection (`tcpdump`), HTTP/2, HTTP/3 (QUIC), and TLS 1.3.
  - **ada-devops**: Minimal multi-stage Dockerfiles, Linux cgroups/namespaces, GitHub Actions CI/CD pipelines, and server hardening.
  - **ada-ai**: Neural network mathematics, backpropagation derivations, Transformer architectures (Self-Attention), and ONNX export.
  - **ada-compiler**: Chomsky automata hierarchy (DFA/NFA), BNF/EBNF grammars, recursive descent AST parsers, and DSL engineering.
  - **ada-physics**: Classical mechanics, Maxwell's electromagnetism, RLC circuits, and Verlet symplectic simulation.
  - **ada-data**: Exploratory data analysis (EDA), statistical hypothesis testing ($t$-test, ANOVA, $p$-values), and scientific visualization.
  - **ada-econ**: Engineering economics, NPV/IRR capital budgeting, cloud vs on-prem TCO models, and financial decision analysis.
  - **ada-portainer**: Portainer stack design (Docker Compose v3), UID/GID volume mount permissions, webhook auto-updates, and Docker socket hardening.
- Integrated all 19 skills into `GEMINI.md` dynamic lazy-loading index and updated `README.md`.

## [1.4.0] - 2026-08-03

### Added
- **ada-workflow**: Deep project discovery skill that audits build tools, test runners, release configurations, and generates `project-workflow.md` specs.
- **ada-docs**: Living documentation skill enforcing auto-syncing `README.md` and conventional `CHANGELOG.md` generation.
- **bin/release.js CLI**: Production-grade release pipeline CLI replacing fragile bash scripts (`npm run release -- [patch|minor|major]`).
- **Micro-Thinking Directive**: Internal `Thought:` directive requiring micro-reasoning before tool calls or code edits.
- **5 Core Operational Guardrails**: Planning Gate, Evidence Debugging Gate, Anti-Hallucination Gate, Verification Gate, and Subagent Delegation Gate.

### Changed
- **Lazy Loading Architecture**: `GEMINI.md` converted to ultra-lean sitemap router (~200 tokens), reducing per-turn input context overhead by 65%.
- **ada-release**: Upgraded with multi-file JSON version synchronization across `package.json`, `plugin.json`, `gemini-extension.json`, and `installed_version.json`.

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2026-07-10

### Added
- Second batch of advanced agent skills:
  - **ada-telemetry**: Observability, error monitoring (Sentry, OpenTelemetry), and distributed logs analysis.
  - **ada-release**: CI/CD pipeline automation, automated release checklists, staging gates, and deployment strategies.
  - **ada-db**: Database schema design (3NF/analytical schemas), reversible migration management, and execution plan optimization (EXPLAIN-driven).
  - **ada-proactive**: Background task offloading, scheduled monitoring timers, and proactive workspace asset updates.
  - **ada-hardware**: Low-level embedded C/C++ constraints (static allocation, minimal ISRs) and FPGA RTL synthesis/simulation guidelines.
- Skills registered in `GEMINI.md` and documented in `README.md`.

## [1.2.0] - 2026-07-10

### Added
- New advanced agent skills:
  - **ada-debug**: Systematic debugging loop (reproduce, observe, hypothesize, test, fix).
  - **ada-taste**: Frontend taste engineering and anti-slop visual design guidelines.
  - **ada-security**: Security checklists, safe symlink validation, and clarification gates.
  - **ada-mcp**: Rules for configuring and utilizing Model Context Protocol (MCP) servers and tools.
  - **ada-mem**: Rules for context token budget monitoring and session history summarization.
- New skills registered in `GEMINI.md` and documented in `README.md`.

## [1.1.0] - 2026-07-10

### Changed
- Project renamed from **Smart-Agent** to **Ada-Aider**.
- Main skill and plugin package renamed to **ada-agent** (matching the new project branding).
- All sub-skills renamed from `smart-*` (`smart-brainstorm`, `smart-plan`, `smart-code`, `smart-verify`, `smart-commit`, `smart-review`) to `ada-*` (`ada-brainstorm`, `ada-plan`, `ada-code`, `ada-verify`, `ada-commit`, `ada-review`).
- Hook files in `src/hooks/` renamed to use `ada-` prefix (`ada-activate.js`, `ada-config.js`, `ada-stats.js`, `ada-statusline.sh`, `ada-tracker.js`).
- Command triggers updated: slash commands `/smart` and `/smart-agent` are now `/ada` and `/ada-agent`.
- Statusline badge updated from `[SMART:MODE]` to `[ADA:MODE]`.
- Environment variable `SMART_DEFAULT_MODE` renamed to `ADA_DEFAULT_MODE`.
- Config flags and stats files renamed to `.ada-agent-active`, `.ada-stats-savings`, and `.ada-stats-last`.
- All documentation (including `README.md`, specs, and roadmap) and tests fully updated to reflect the new naming conventions.
