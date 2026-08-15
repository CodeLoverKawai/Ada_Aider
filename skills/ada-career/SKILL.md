---
name: ada-career
description: Use when building engineering portfolio projects, writing technical documentation (RFCs/post-mortems), contributing to open source, or planning software engineering career milestones.
---
# ada-career (Engineering Portfolio, Technical Writing & Career Mastery)

## 1. High-Impact Engineering Portfolio Design
Avoid generic toy apps (basic to-do lists, simple blog clones). Build projects demonstrating deep engineering depth:

1. **Hallmarks of a Tier-1 Engineering Project**:
   - **Real Technical Challenge**: Custom memory allocators, distributed key-value stores, bytecode interpreters, high-throughput network proxies, or hardware-accelerated algorithms.
   - **Benchmarking & Empirical Validation**: Include reproducible performance benchmarks, profiling data (flamegraphs, cache miss charts), and stress testing.
   - **Production-Grade Rigor**: 90%+ test coverage (unit + integration + fuzzing), GitHub Actions CI/CD pipeline, Docker containerization, and clean semantic documentation.
2. **README Excellence Formula**:
   - High-level architecture diagram (Mermaid/ASCII).
   - Exact benchmark numbers ($p99$ latency, ops/sec) vs industry baselines.
   - Quickstart running with a single reproducible command (`docker compose up` or `cargo run`).

## 2. Technical Writing: Request for Comments (RFC) Standard
When proposing significant technical systems or refactors, draft an RFC:

```markdown
# RFC-042: [Feature / Architecture Proposal]

## Summary
One-paragraph explanation of the proposed system or architectural evolution.

## Motivation & Value Proposition
Why are we building this now? What concrete bottlenecks or limitations does this eliminate?

## Detailed Technical Design
- System components, API payloads, schema definitions, and sequence diagrams.
- Error handling strategies and failure modes.

## Unresolved Questions & Drawbacks
- What remain the biggest technical uncertainties?
- What are the operational overheads introduced?
```

## 3. Open Source Contribution Strategy
1. **Repository Selection**: Choose active projects with established `good-first-issue` tags, active maintainers, and comprehensive CI.
2. **Contribution Protocol**:
   - Read `CONTRIBUTING.md` and local linting rules before touching code.
   - Reproduce the reported issue locally with a failing automated test.
   - Keep PRs hyper-focused: one logical change per PR, zero unrelated formatting changes.
   - Write clear PR descriptions linking to the original issue with exact reproduction steps.

## Checklist for Engineering Portfolio & Career Milestones

- [ ] Project demonstrates real technical depth (benchmarks, concurrency, or systems fundamentals).
- [ ] Documentation includes architecture diagrams and one-line setup instructions.
- [ ] Technical proposals structured using formal RFC formats.
- [ ] Pull requests accompanied by automated tests and conventional commit history.
