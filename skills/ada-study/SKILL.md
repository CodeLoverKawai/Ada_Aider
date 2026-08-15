---
name: ada-study
description: Use when preparing for university exams, generating technical practice quizzes, creating spaced repetition flashcards, or conducting active recall study sessions.
---
# ada-study (Active Recall & High-Yield Technical Exam Prep)

## 1. Active Recall & Spaced Repetition Protocols
1. **Testing Effect vs Passive Review**:
   - Passive re-reading creates a false sense of fluency. High-yield retention requires active retrieval from memory without looking at reference notes.
2. **Flashcard Design Principles (Anki / Markdown)**:
   - **Atomic Invariant**: Each flashcard must test exactly ONE discrete concept or derivation.
   - **Context-Rich Questions**: Frame questions around problem scenarios rather than isolated keyword definitions.

```markdown
# Target: Computer Systems / OS

Q: What specific hardware mechanism triggers when a process accesses a virtual page whose Present Bit is 0 in the Page Table Entry?
A: The MMU raises a Page Fault hardware exception (interrupt vector 14 on x86), transitioning execution to the OS kernel page fault handler to fetch the frame from swap/disk into physical RAM.
---
```

## 2. Interactive Technical Exam Simulator
When conducting an exam preparation session:
1. **Graduated Problem Generation**:
   - **Level 1 (Foundation)**: Formula derivation, core definition, or basic $O(N)$ calculation.
   - **Level 2 (Application & Synthesis)**: Multi-step engineering problem (e.g., calculate cache miss rate for a nested loop with given stride).
   - **Level 3 (Final Exam Challenge / Edge Case)**: Complex scenario with resource constraints, race conditions, or non-obvious failure modes.
2. **Strict Evaluation Rubric**:
   - Break down scoring into:
     - Mathematical / Logical setup ($40\%$).
     - Step-by-step intermediate derivation ($40\%$).
     - Final result, units, and complexity verification ($20\%$).
   - Deliver constructive breakdown identifying the exact step where an error occurred.

## 3. Exam Time-Management & Triage Protocol
```
Exam Duration: T minutes
1. First 5 mins (Triage): Read entire exam. Classify questions:
   - Category A (High confidence, immediate solve): Execute immediately.
   - Category B (Clear path, requires long computation): Schedule second.
   - Category C (Uncertain, complex edge cases): Flag for remaining time.
2. Dimensional & Limit Sanity Check (Last 10 mins):
   - Check units on all physics/engineering formulas ($kg \cdot m/s^2$, $Hz$, $bytes/s$).
   - Check boundary limits ($n=0, n=1, \infty$).
```

## Checklist for Study & Exam Sessions

- [ ] Flashcards follow the single-concept atomic rule.
- [ ] Practice questions accompanied by an explicit multi-tier grading rubric.
- [ ] Explanations pinpoint root reasoning errors rather than just restating the answer.
- [ ] Dimensional and boundary-value sanity checks enforced on all numerical answers.
