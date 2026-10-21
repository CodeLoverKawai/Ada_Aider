---
name: ada-arch
description: Use when designing software architecture, creating C4 model diagrams, modeling distributed systems, evaluating design patterns, or authoring Architectural Decision Records (ADRs).
---
# ada-arch (System Design, C4 Modeling & Architectural Decision Records)

## 1. The C4 Architecture Modeling Standard
When architecting systems, describe them across 4 zoom levels:
1. **Level 1: System Context Diagram**:
   - High-level view showing users, external systems, and boundary interfaces.
2. **Level 2: Container Diagram**:
   - High-level technical layout: Web apps, API Gateways, databases, message brokers, caching nodes.
3. **Level 3: Component Diagram**:
   - Internal modular breakdown of a container (controllers, domain services, repositories).
4. **Level 4: Code Diagram**:
   - Class diagrams, interface definitions, or state machines for critical subsystems.

```mermaid
graph TD
    User([Customer]) -->|HTTPS / REST| APIGW[API Gateway / Envoy]
    APIGW -->|gRPC| AuthSvc[Auth Microservice]
    APIGW -->|gRPC| OrderSvc[Order Processing Service]
    OrderSvc -->|Pub/Sub Events| Kafka{Kafka Event Bus}
    OrderSvc -->|Read/Write Pool| DB[(PostgreSQL 16 Primary)]
    Kafka -->|Consumer Stream| AnalyticsSvc[Analytics Worker]
```

## 2. Distributed System Design Patterns & Trade-offs
1. **Resilience & Fault Tolerance**:
   - **Circuit Breaker**: Trip to fallback when downstream error rate $> threshold$.
   - **Idempotency**: Require unique idempotency keys on mutation endpoints to handle network retries safely.
   - **Saga Pattern (Choreography vs Orchestration)**: Manage distributed transactions across microservices without 2PC blocking locks.
2. **Consistency vs Availability (CAP / PACELC)**:
   - For transactional financial data $\implies$ CP (Strong Consistency, Raft/Paxos).
   - For high-volume social feed or telemetry $\implies$ AP (Eventual Consistency, CRDTs).

## 3. Deep Modules vs. Shallow Modules (John Ousterhout Doctrine)

When designing interfaces, classes, and system boundaries, prioritize **Deep Modules** over **Shallow Modules** (*A Philosophy of Software Design*):

1. **Deep Module**:
   - Small, simple interface concealing large, complex, valuable implementation (high leverage).
   - Maximizes information hiding: callers interact with minimal surface area while the module encapsulates significant complexity.
2. **Shallow Module**:
   - Large or fragmented interface with little implementation relative to its surface area.
   - Adds cognitive load, indirection, and maintenance overhead without providing leverage.
3. **The Deletion Test**:
   - When evaluating an abstraction: *If you delete it, does complexity concentrate in one logical place, or does it scatter across callers?*
   - If deleting an abstraction reduces indirection without scattering complexity, the module is shallow and should be inlined.
4. **Seams & Locality**:
   - Seams should isolate change and group related invariants together.
   - Keep closely coupled operations local; avoid premature layer proliferation that divides cohesive behavior.

## 4. Architectural Decision Record Template (`ADR-000.md`)

```markdown
# ADR-001: [Decision Title, e.g., Adoption of Event Sourcing for Ledger]

## Status
[Proposed | Accepted | Superseded by ADR-XXX | Deprecated]

## Context & Problem Statement
- What technical challenge or business constraint are we solving?
- What are the throughput, latency, and compliance requirements?

## Decision Drivers
- Performance ($< 10\text{ms}$ write latency).
- Immutable audit trail requirement.
- Team operational familiarity.

## Considered Options
1. Option 1: Relational CRUD updates with trigger-based audit table.
2. Option 2: Event Sourcing with Apache Kafka + PostgreSQL projection tables.

## Decision Outcome & Rationale
Chosen Option: **Option 2**.
Because it guarantees zero data mutation, provides full auditability, and decouples analytics projections from the write path.

## Consequences & Trade-offs
- **Positive**: Complete historical replay capability, horizontally scalable consumer projections.
- **Negative**: Increased complexity in handling schema evolution and eventual consistency on read models.
```

## Checklist for Architecture Reviews

- [ ] System described using standard C4 model diagrams.
- [ ] Deep modules verified (small, high-leverage interface concealing implementation complexity).
- [ ] Abstractions pass the Deletion Test (complexity does not scatter across callers if deleted).
- [ ] Single points of failure (SPOF) identified and mitigated with redundancy/failover.
- [ ] Formal ADR written documenting context, rejected alternatives, and trade-offs.
- [ ] Data consistency model explicitly stated (Strict vs Eventual).
