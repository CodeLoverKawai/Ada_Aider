---
name: ada-collab
description: Use when navigating team dynamics, giving or receiving constructive feedback, communicating technical concepts to non-technical stakeholders, conducting blameless post-mortems, or resolving engineering disagreements.
---
# ada-collab (Soft Skills, Collaborative Engineering & Team Dynamics)

## 1. Technical Communication with Non-Technical Stakeholders
1. **The BLUF Principle (Bottom Line Up Front)**:
   - State the conclusion, impact, or required decision in the first sentence.
   - Follow with supporting data only as needed. Avoid chronological storytelling.
   - *Example*: "We recommend migrating our cache to Redis cluster by next Friday to prevent checkout timeouts during peak sales. Here is the cost/downtime breakdown..."
2. **Translate Architecture to Business Value**:
   - Frame technical debt and refactoring in terms of business metrics: **Risk reduction, latency improvement, development velocity, and infrastructure cost**.
   - Eliminate internal acronym soup (replace "B-Tree page split contention" with "database write throughput saturation under high traffic").

## 2. Ego-Free Code Review Culture
1. **Authoring Review Comments (Intent Prefixes)**:
   - Always label the severity of feedback explicitly:
     - `[blocking]`: Violates correctness, security, or core architecture. Must be resolved before merge.
     - `[suggestion]`: Alternative implementation with trade-offs. Author may accept or decline with brief reasoning.
     - `[question]`: Seeking clarification or understanding.
     - `[nit]`: Minor stylistic or cosmetic detail. Non-blocking.
     - `[praise]`: Acknowledge elegant solutions or clean patterns.
   - Focus on the code, never the person: *"This loop allocates memory on every iteration"* vs *"You wrote an inefficient loop"*.
2. **Receiving Code Feedback**:
   - Assume positive intent. Treat code reviews as collaborative pairing, not personal evaluation.
   - Avoid defensive pushback. If disagreeing, respond with empirical benchmarks, test cases, or architectural constraints.

## 3. Disagreement Resolution & Engineering Consensus
1. **Disagree and Commit Principle**:
   - Debate vigorously with data during the design phase.
   - Once a decision is finalized by the team/lead, fully commit to executing it without lingering resentment or sabotage.
2. **Combating Bikeshedding (Law of Triviality)**:
   - Timebox discussions on low-impact details (e.g., naming conventions, styling preferences).
   - Use automated formatters/linters to eliminate subjective aesthetic debates completely.

## 4. Blameless Post-Mortems & Psychological Safety
1. **Process & System Focus**:
   - Human error is a symptom of a fragile system, not the root cause.
   - Never ask *"Who made this mistake?"*; ask *"What systemic guardrail or automated check was missing that allowed this mistake to reach production?"*.
2. **Post-Mortem Anatomy**:
   - **Timeline**: Chronological sequence of events (UTC).
   - **Root Causes**: Systemic triggers identified via 5 Whys.
   - **Action Items**: Concrete engineering tasks with assigned owners and deadlines to prevent recurrence (e.g., automated canary check, rate limiter).

## 5. Pair & Mob Programming Dynamics
- **Driver Role**: Controls the keyboard, writes syntactic code, focuses on immediate line-by-line mechanics.
- **Navigator Role**: Reviews real-time, thinks 2 steps ahead, tracks edge cases, validates against system architecture.
- Swap roles every 25-30 minutes to maintain high engagement and shared code ownership.

## Checklist for Team Collaboration

- [ ] Communication structured using BLUF (Bottom Line Up Front).
- [ ] Code review comments tagged with explicit intent prefixes (`[blocking]`, `[suggestion]`, `[nit]`).
- [ ] Disagreements settled using data, benchmarks, or explicit "Disagree & Commit".
- [ ] Post-mortems conducted strictly blameless, focusing on systemic safeguards.
