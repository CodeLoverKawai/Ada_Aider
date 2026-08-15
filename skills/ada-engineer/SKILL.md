---
name: ada-engineer
description: Use when applying systems thinking, root-cause analysis (5 Whys/Ishikawa), technical trade-off evaluation, numerical methods, or engineering problem-solving frameworks.
---
# ada-engineer (Systems Thinking & Engineering Methodology)

## 1. Systems Thinking & Dynamics
1. **Feedback Loops**:
   - **Reinforcing (+)**: Growth spirals (e.g., cache thundering herds, cascade retries crashing backends).
   - **Balancing (-)**: Stabilizing mechanisms (e.g., exponential backoff with full jitter, circuit breakers, rate limiters).
2. **Bottlenecks & Theory of Constraints**:
   - Optimizations outside the primary constraint (Amdahl's Law) yield marginal returns.
   - Always profile and measure the bottleneck (I/O, Memory Bandwidth, CPU lock contention) before refactoring.

## 2. Root Cause Analysis (RCA Frameworks)
1. **5 Whys Analysis**:
   - Trace symptoms down to systemic and process failures:
   ```
   Problem: Database node ran out of memory.
   Why 1: In-memory hash join buffer overflowed.
   Why 2: Query planner chose hash join over merge join due to stale statistics.
   Why 3: Auto-vacuum analyze job failed to execute.
   Why 4: Lock timeout killed the maintenance worker.
   Why 5 (Root Cause): Lock timeout threshold was shorter than daily backup lock duration.
   ```
2. **Ishikawa (Fishbone) Fault Classification**:
   - **Environment / Infra**: Kernel OOM, noisy neighbor, network packet drop.
   - **Code / Logic**: Memory leak, race condition, missing index.
   - **Data / Workload**: Payload spike, unindexed wildcard query, skew.
   - **Process / Config**: Misconfigured connection pool, missing canary check.

## 3. Formal Engineering Trade-Off Matrix
Never declare a solution "better" without stating what is sacrificed:
| Architecture Option | Latency ($p99$) | Memory Usage | Consistency | Complexity | Verdict / Trade-off |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Option A (Write-through Cache) | Low (5ms) | High | Strong | Moderate | Best for read-heavy OLTP |
| Option B (Write-behind / Async) | Ultra-low (1ms)| High | Eventual | High | Risk of data loss on crash |

## 4. First Principles Problem-Solving Workflow
1. **Strip Assumptions**: Question all inherited architecture and conventions.
2. **Deconstruct to Physics/Fundamentals**: Clock cycles, network packet round-trips ($RTT$), cache lines (64 bytes), disk seek latency.
3. **Reconstruct Minimal Optimal Path**: Build solution upwards strictly constrained by fundamental physical limits.

## Checklist for Engineering Analysis

- [ ] Problem traced past superficial symptoms to systemic root cause.
- [ ] Explicit trade-off matrix produced comparing at least 2 viable architectures.
- [ ] Reinforcing and balancing feedback loops mapped for stability.
- [ ] Performance claims bounded by Amdahl's Law and hardware limits.
