---
name: ada-os
description: Use when designing operating systems components, low-level concurrency primitives, thread synchronization, memory management (virtual memory/paging), syscalls, or using debugging profilers (gdb/perf/strace).
---
# ada-os (Operating Systems, Concurrency & Kernel Engineering)

## 1. Concurrency Primitives & Synchronization
1. **Synchronization Mechanisms**:
   - **Mutex vs Spinlock**: Use mutexes (yielding context) for I/O and longer critical sections; use spinlocks only in kernel/ISR or ultra-short lock-free rings.
   - **Atomic Operations (CAS)**: Implement lock-free structures using atomic compare-and-swap (`std::atomic`, `__atomic_compare_exchange`).
   - **Condition Variables**: Always check predicate in a `while` loop around `wait()` to protect against spurious wakeups.
2. **Deadlock Prevention (Coffman Conditions)**:
   - Enforce a global lock acquisition order across all threads.
   - Use `try_lock` with timeout and backoff to break circular wait conditions.

## 2. Virtual Memory & Paging Hierarchy
1. **Address Translation**:
   - Virtual Address $\implies$ Page Directory Pointer $\implies$ Page Directory $\implies$ Page Table $\implies$ Physical Offset.
   - Account for TLB (Translation Lookaside Buffer) hit rates and cache line alignment (64 bytes).
2. **Memory Protection & Syscalls**:
   - Use `mmap` with appropriate flags (`PROT_READ`, `PROT_WRITE`, `MAP_ANONYMOUS`, `MAP_SHARED`) for zero-copy buffer allocations.
   - Handle `SIGSEGV` and `SIGBUS` explicitly when working with memory-mapped files.

## 3. High-Performance Linux I/O Multiplexing
- Prefer modern event notification interfaces over legacy `select`/`poll`:
  - **`epoll`** (Edge-triggered `EPOLLET` with non-blocking file descriptors).
  - **`io_uring`** (Kernel submission/completion queue rings for true zero-syscall asynchronous I/O).

## 4. Kernel Diagnostic & Profiling Toolchain
| Tool | Primary Use Case | Canonical Command |
| :--- | :--- | :--- |
| **`strace`** | Intercept & trace system calls and signals | `strace -c -f -p <PID>` |
| **`gdb`** | Inspect thread stacks, registers, core dumps | `gdb ./binary core -ex "thread apply all bt"` |
| **`perf`** | CPU cache misses, branch mispredictions | `perf stat -d -p <PID>` / `perf record -g` |
| **`valgrind`** | Memory leaks & invalid pointer reads | `valgrind --leak-check=full --track-origins=yes ./binary` |

## Checklist for Systems & OS Code

- [ ] All shared state protected by explicit mutexes or atomic memory barriers.
- [ ] Memory allocations checked for leaks and aligned to cache line boundaries.
- [ ] Non-blocking file descriptors used with `epoll` or `io_uring`.
- [ ] Profiling performed via `strace`/`perf` to verify syscall and CPU efficiency.
