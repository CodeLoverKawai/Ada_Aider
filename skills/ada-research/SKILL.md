---
name: ada-research
description: Use when formulating research plans, literature reviews, hypothesis testing, academic methodology, benchmarking studies, or technical state-of-the-art discovery.
---
# ada-research (Scientific & Technical Research Methodology)

## 1. Research Problem Formulation (PICO / SPIDER Framework)
1. **Define Core Question**:
   - Structure research around an unambiguous, falsifiable research question.
   - **Population/Problem**: Context and boundary conditions.
   - **Intervention/Method**: Proposed algorithm, architectural pattern, or experimental approach.
   - **Comparison**: Baseline implementation or state-of-the-art benchmark.
   - **Outcome/Metrics**: Measurable quantitative targets (latency $p99$, throughput, cache miss rate, accuracy $\text{F}_1$, energy efficiency).
2. **Hypothesis Formulation ($H_0$ / $H_1$)**:
   - $H_0$ (Null Hypothesis): The proposed approach produces no statistically significant improvement over baseline.
   - $H_1$ (Alternative Hypothesis): The proposed approach improves metric $M$ by $\ge X\%$ under workload $W$.

## 2. Systematic Literature Review (State of the Art)
1. **Primary Academic Sources**:
   - Prioritize peer-reviewed repositories: IEEE Xplore, ACM Digital Library, arXiv (cs.SE, cs.DC, cs.AI, cs.CR), ScienceDirect.
2. **Evaluation Matrix**:
   - Synthesize prior art into a comparison matrix:
   | Paper / Model | Year | Core Contribution | Limitations / Trade-offs | Relevant Baseline Metric |
   | :--- | :--- | :--- | :--- | :--- |

## 3. Experimental Design & Reproducibility Protocol
1. **Variable Isolation**:
   - **Independent Variables**: Parameter under test (e.g., thread count, buffer size, caching policy).
   - **Dependent Variables**: Measured outputs (e.g., latency ms, memory footprint MB, instructions per cycle).
   - **Controlled Variables**: Pinned CPU core affinity, fixed dataset seed, identical network topology.
2. **Statistical Rigor**:
   - Run $N \ge 10$ iterations per scenario to eliminate transient noise.
   - Report median, standard deviation ($\sigma$), and percentiles ($p50, p90, p99$) rather than raw arithmetic averages alone.
3. **Artifact Repository Structure**:
   - Store code, datasets, execution scripts (`run_benchmarks.sh`), and raw output CSVs in an isolated experiments directory.

## 4. Research Plan Template (`RESEARCH_PLAN.md`)

```markdown
# Research Plan: [Title]

## 1. Executive Summary & Objective
- **Problem Statement**: 
- **Research Question**: 
- **Target Hypothesis ($H_1$)**: 

## 2. State of the Art & Theoretical Framework
- Key citations and existing benchmarks.
- Theoretical foundations and governing mathematical models.

## 3. Experimental Methodology
- **Testbed Environment**: Hardware specs, OS kernel, compiler flags, runtime versions.
- **Evaluation Metrics & Baselines**:
- **Dataset / Workload Specification**:

## 4. Execution Phases & Milestones
- Phase 1: Baseline benchmarking & environment hardening.
- Phase 2: Implementation of candidate approaches.
- Phase 3: Empirical evaluation, statistical validation, and error analysis.

## 5. Potential Threats to Validity
- Internal validity (confounding variables, instrumentation overhead).
- External validity (generalizability to production workloads).
```

## Checklist for Technical Research

- [ ] Clear, falsifiable hypothesis formulated.
- [ ] State-of-the-art benchmarks identified from primary sources.
- [ ] Controlled variables isolated (CPU affinity, fixed seeds, warm-up runs).
- [ ] Raw data captured with percentiles ($p50, p99$) and standard deviation.
- [ ] Full replication steps and seeds committed with the artifact.
