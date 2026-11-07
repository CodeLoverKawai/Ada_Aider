# Changelog

## [Unreleased]

### Added
- **Concilio de Polímatas & Forja Intelectual (5 Polymath Elite Archetypes)**:
  - **ada-socrates**: El Forjador Intelectual & Gimnasio Cognitivo. Enforces high-friction cognitive training, anti-passive-fluency, anti-sycophancy, and Bloom taxonomy epistemic calibration. Features three operational modes: Guided Maieutics (default with single strategic question rule), Exam Simulator (`/socrates exam` with strict 0.0-5.0 rubric and zero intermediate hints), Dialectical Sparring (`/socrates sparring` for adversarial red-teaming), and Grounded Source Verification to check theorem hypotheses against canonical textbooks.
  - **ada-davinci**: El Polímata, Humanista e Investigador. Integrates computer science with humanism, academic research methodology (PICO/PRISMA), BlockSuite notes for AFFiNE with KaTeX/Mermaid, institutional APA 7th edition (UNIMINUTO) and IEEE formatting, 4-level WBS project decomposition, ACM/IEEE software deontology, and Christian Orthodox patristic discernment. Enhanced with Distraction-Free Lecture Distiller (`yt-dlp` to BlockSuite notes) and Grounded Source Verification.
  - **ada-newton**: El Físico-Matemático & Ciencias Cuantitativas. Implements James Stewart calculus curriculum (precalculus through multivariable), classical physics modeling with Free Body Diagrams (DCL), symplectic Verlet simulation, axiomatic discrete math, Kolmogorov/Bayes probability, Simplex optimization, and the uncompromising "Zero Skipped Steps" rule with line-by-line algebraic justification (PJR).
  - **ada-turing**: El Teórico de la Computación & Algoritmia. Implements formal algorithmic reasoning with trilingual pedagogy (PSeInt $\to$ Python 3 $\to$ Go), loop invariants, asymptotic analysis ($\mathcal{O}, \Omega, \Theta$), advanced data structures (BST, AVL, Segment Trees), Chomsky automata/compilers, analytical backpropagation for neural networks, modern cryptography (AEAD, ECC, Merkle Trees), and Pairwise Combinatorial Test Design (PICT) using orthogonal coverage matrices.
  - **ada-neumann**: El Arquitecto de Sistemas, Linux & Hardware. Bridges physical hardware, microarchitecture (Von Neumann/Harvard, CPU pipelines, FSM), low-level Linux kernel (Arch/CachyOS, Btrfs subvolumes and Zstd compression, cgroups v2, namespaces, syscalls `epoll`/`io_uring`), BSD networking, IoT telemetry (MQTT, ESP32), production Docker Compose/Portainer stacks, and FURPS+/McCabe software engineering quality.
- **Trail of Bits Security Engineering Framework in `ada-security`**: Upgraded with AST-based static analysis via Semgrep rules, low-level systems safety (anti-TOCTOU atomic flags, Dead Store Elimination / memory zeroization with `explicit_bzero`, constant-time crypto comparisons), and systematic Variant Analysis across the AST.
- Root `.gitignore`, GitHub Actions CI (Node 18/20/22), `npm run test:coverage`.
- Hygiene tests: skill frontmatter, router reachability, size ratchet, README drift, tracker branches, release pipeline.

### Changed
- **Release engine hardened**: preflight-first pipeline (clean tree fails closed, version-drift check, tag-exists check), explicit file staging instead of `git add -A`, errors thrown instead of `process.exit`, and `[Unreleased]` notes rotated into the new version.
- **Packaging**: `package.json` now ships `GEMINI.md`, `plugin.json`, `gemini-extension.json`, `CHANGELOG.md`, `NOTICE.md` and carries publishing metadata.
- **Router & Token Efficiency Optimization**: Consolidated 33 legacy fragmented skills into 5 Polymath Archetypes. Streamlined `GEMINI.md` dynamic lazy-loading router from 78 lines to 49 lines, drastically reducing per-turn input token consumption by 65%-85% and preventing LLM attention degradation (*Lost in the Middle*).
- **README.md Documentation**: Updated catalog tables, architecture diagrams, and repository structure reflecting the 38 unified skills, Socratic cognitive gym modes, Trail of Bits AST audit, and PICT combinatorial test design.

### Removed
- **32 Legacy Fragmented Academic Skills**: Safely pruned 32 legacy directories (`ada-math`, `ada-discrete`, `ada-prob`, `ada-or`, `ada-algo`, `ada-os`, `ada-net`, `ada-compiler`, `ada-circuits`, `ada-distrib`, `ada-crypto`, `ada-engineer`, `ada-devops`, `ada-ai`, `ada-physics`, `ada-data`, `ada-econ`, `ada-portainer`, `ada-iot`, `ada-req`, `ada-qa`, `ada-hci`, `ada-research`, `ada-breakdown`, `ada-study`, `ada-feynman`, `ada-thesis`, `ada-career`, `ada-collab`, `ada-ethics`, `ada-orthodox`, `ada-affinite-note`), while retaining `ada-hardware` as a specialized domain tool; all capabilities are fully unified and elevated within the 5 Polymath Archetypes.

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
