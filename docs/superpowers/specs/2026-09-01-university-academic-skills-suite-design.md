# Design Spec: University Academic & Systems Engineering Skills Suite (13 Skills)

## 1. Context & Objective
Expand the Ada skill library with a comprehensive, rigorous suite of 13 academic skills tailored specifically for University Systems Engineering and Computer Science degrees. These skills empower the user across mathematics, digital circuits, signals, IoT, distributed systems, software engineering, quality assurance, HCI, cryptography, operations research, thesis authoring, and engineering ethics.

---

## 2. Skills Catalog & Triggers

### 1. `ada-discrete` (Discrete Mathematics, Logic & Combinatorics)
- **Path**: `skills/ada-discrete/SKILL.md`
- **Trigger**: `Use when formulating discrete mathematics proofs, propositional and predicate logic, mathematical induction, set theory, relations, combinatorics, graph theory (trees, Eulerian/Hamiltonian paths, coloring), or Boolean algebras.`

### 2. `ada-prob` (Probability & Stochastic Processes)
- **Path**: `skills/ada-prob/SKILL.md`
- **Trigger**: `Use when solving probability problems, analyzing discrete/continuous random variables, joint probability distributions, expected values, variance, Central Limit Theorem, Markov chains, or stochastic modeling.`

### 3. `ada-signals` (Signals & Linear Systems)
- **Path**: `skills/ada-signals/SKILL.md`
- **Trigger**: `Use when analyzing continuous and discrete-time signals, LTI systems, convolution, impulse response, Fourier Transform / FFT, Laplace Transform, Z-Transform, Bode plots, or digital signal filtering.`

### 4. `ada-circuits` (Digital Logic & Computer Architecture)
- **Path**: `skills/ada-circuits/SKILL.md`
- **Trigger**: `Use when designing digital logic circuits, minimizing Boolean functions with Karnaugh maps, designing combinational/sequential logic (Flip-Flops, ALUs, registers), Finite State Machines (Mealy/Moore), or analyzing CPU microarchitecture (Fetch-Decode-Execute, pipelining, Von Neumann vs Harvard).`

### 5. `ada-iot` (Internet of Things & Cyber-Physical Systems)
- **Path**: `skills/ada-iot/SKILL.md`
- **Trigger**: `Use when designing IoT architectures, interfacing sensors/actuators with microcontrollers (ESP32, STM32, Arduino), implementing lightweight communication protocols (MQTT, CoAP, BLE, LoRaWAN), edge computing, or IoT telemetry.`

### 6. `ada-req` (Requirements Engineering & UML/BPMN Modeling)
- **Path**: `skills/ada-req/SKILL.md`
- **Trigger**: `Use when eliciting, analyzing, and specifying software requirements (FURPS+, INVEST user stories), modeling business processes in BPMN 2.0, or creating UML diagrams (Use Cases, Class Diagrams, Sequence Diagrams, Statecharts).`

### 7. `ada-qa` (Software Quality Assurance & Advanced Testing)
- **Path**: `skills/ada-qa/SKILL.md`
- **Trigger**: `Use when designing software test plans, load/stress testing (k6, JMeter), mutation testing, measuring code complexity (McCabe Cyclomatic Complexity), technical debt analysis (SonarQube), or evaluating software quality standards (ISO/IEC 25010).`

### 8. `ada-hci` (Human-Computer Interaction & Usability Engineering)
- **Path**: `skills/ada-hci/SKILL.md`
- **Trigger**: `Use when evaluating user interface usability, conducting Nielsen heuristic evaluations, ensuring accessibility compliance (WCAG 2.2 AAA), structuring information architecture, user-centered design (UCD), or designing usability tests.`

### 9. `ada-distrib` (Distributed Systems & Cloud Computing)
- **Path**: `skills/ada-distrib/SKILL.md`
- **Trigger**: `Use when architecting distributed systems, applying the CAP theorem, consensus protocols (Raft, Paxos), eventual vs linearizable consistency, Conflict-free Replicated Data Types (CRDTs), gRPC/Protocol Buffers, event streaming (Kafka, RabbitMQ), or distributed transaction patterns (Saga).`

### 10. `ada-crypto` (Applied Cryptography & Defensive Security)
- **Path**: `skills/ada-crypto/SKILL.md`
- **Trigger**: `Use when implementing symmetric/asymmetric encryption (AES, ChaCha20, RSA, Elliptic Curves ECC), cryptographic hashing (SHA-256/3, BLAKE3), digital signatures, PKI infrastructure, Merkle trees, or zero-knowledge proofs (ZKP).`

### 11. `ada-or` (Operations Research & Optimization)
- **Path**: `skills/ada-or/SKILL.md`
- **Trigger**: `Use when formulating mathematical optimization models, solving Linear Programming via the Simplex Method and Duality, transportation/assignment models, Queueing Theory (M/M/1, M/M/c), or Monte Carlo stochastic simulations.`

### 12. `ada-thesis` (University Thesis & IEEE/APA Academic Writing)
- **Path**: `skills/ada-thesis/SKILL.md`
- **Trigger**: `Use when structuring university graduation theses, drafting research monographs, formatting papers in IEEE or APA 7th edition, managing BibTeX/Zotero bibliographies, writing state-of-the-art literature reviews, or preparing defense presentations.`

### 13. `ada-ethics` (Engineering Ethics, Deontology & Tech Law)
- **Path**: `skills/ada-ethics/SKILL.md`
- **Trigger**: `Use when evaluating engineering ethics dilemas, software deontology, Open Source licensing (MIT, GPLv3, AGPL, Apache 2.0), data privacy laws (Habeas Data, GDPR), cybersecurity legislation, or AI ethical frameworks.`

---

## 3. Integration & System Updates
- Update `GEMINI.md` dynamic skill index table with all 13 skills.
- Update `README.md` catalog, totals (from 54 to 67 skills), and directory tree.
- Full compatibility with `ada-affinite-note` and block formatting.
