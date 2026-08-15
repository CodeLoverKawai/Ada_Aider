---
name: ada-feynman
description: Use when explaining complex engineering concepts, connecting academic curriculum subjects to practical code, simplifying theoretical topics, or applying the Feynman technique.
---
# ada-feynman (First Principles Pedagogy & Engineering Curriculum)

## 1. The 4-Tier Feynman Explanation Framework
When explaining any technical concept, algorithm, mathematical theorem, or hardware mechanism, structure the breakdown through 4 distinct levels:

### Tier 0: Pure Intuition & Real-World Analogy (Zero Jargon)
- Explain the problem using an everyday mental model that a 10-year-old or non-technical person instantly grasps.
- *Example*: "A Hash Table is like a coat check room with numbered bins based on the last digit of your ticket number, so you never search the whole room."

### Tier 1: First Principles & Conceptual Mechanics
- Unpack the fundamental components, invariants, and operational flow without heavy formalism.
- Explain **WHY** the mechanism exists and what physical or logical constraint forced its invention.

### Tier 2: Academic & Formal Rigor (Curriculum Mapping)
- Connect directly to university subjects:
  - **Calculus / Differential Equations**: Continuous rates of change, optimization gradients $\nabla f(x)$, Taylor series approximations.
  - **Linear Algebra**: Vector spaces, matrix transformations $Ax = \lambda x$, eigenvalues/eigenvectors, projections.
  - **Computer Architecture / OS**: Registers, cache hierarchy (L1/L2/L3), TLB, page tables, context switching, memory barriers.
  - **Discrete Math / Algorithms**: Recurrence relations (Master Theorem), loop invariants, asymptotic bounds ($\mathcal{O}, \Omega, \Theta$).
- State governing equations, formal proofs, or theorem statements clearly.

### Tier 3: Practical Implementation & Production Engineering
- Provide clean, runnable code, circuit diagrams, or system configs showing the concept in action.
- Highlight common edge cases, failure modes, and hardware-level performance implications.

## 2. Socratic Gap-Detection Protocol
1. **Identify Blind Spots**:
   - Ask targeted conceptual questions: *"If we double the input size $N$, what happens to memory page faults?"* or *"Why can't we use a simple mutex here instead of a compare-and-swap (CAS) spinlock?"*
2. **Eliminate Illusion of Explanatory Depth**:
   - Challenge rote memorization by altering a fundamental constraint and testing reasoning from first principles.

## 3. Curriculum Mapping Matrix
| University Subject | Core Fundamental | Real-World Application |
| :--- | :--- | :--- |
| **Linear Algebra** | Orthogonal Basis & Matrix Factorization | Graphics shaders, PCA dimensionality reduction, ML embeddings |
| **Multivariable Calculus** | Gradient Vectors & Jacobians | Gradient Descent optimization, PID control systems, physics engines |
| **Computer Architecture** | Spatial & Temporal Locality | Cache-friendly Struct-of-Arrays (SoA), SIMD vectorization |
| **Operating Systems** | Virtual Memory & Semaphore Primitives | Database buffer pools, coroutine schedulers, async event loops |
| **Discrete Mathematics** | Graph Traversals & DAGs | Build systems (Make/Bazel), package managers, transaction logs |

## Checklist for Feynman Explanations

- [ ] Starts with an intuitive, zero-jargon analogy before formulas.
- [ ] Connects concept to governing academic theory and university curriculum.
- [ ] Concludes with concrete, runnable implementation code or engineering schematic.
- [ ] Tests deep comprehension with at least one Socratic edge-case question.
