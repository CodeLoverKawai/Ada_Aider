---
name: ada-algo
description: Use when designing advanced algorithms, proving algorithmic correctness, conducting asymptotic complexity analysis (Big-O/Theta), or solving competitive programming problems.
---
# ada-algo (Advanced Data Structures & Algorithmic Rigor)

## 1. Asymptotic Complexity & Formal Analysis
1. **Formal Definitions**:
   - $f(n) \in \mathcal{O}(g(n)) \iff \exists c > 0, n_0 \text{ s.t. } 0 \le f(n) \le c \cdot g(n) \quad \forall n \ge n_0$ (Upper bound).
   - $f(n) \in \Omega(g(n)) \iff \exists c > 0, n_0 \text{ s.t. } 0 \le c \cdot g(n) \le f(n) \quad \forall n \ge n_0$ (Lower bound).
   - $f(n) \in \Theta(g(n)) \iff f(n) \in \mathcal{O}(g(n)) \land f(n) \in \Omega(g(n))$ (Tight bound).
2. **Space & Time Accounting**:
   - Always distinguish between auxiliary space complexity vs input/output space.
   - Account for recursive call stack frames ($\mathcal{O}(h)$ where $h$ is tree recursion depth).

## 2. Correctness Proofs & Invariants
1. **Loop Invariants (3-Step Proof)**:
   - **Initialization**: True prior to the first iteration of the loop.
   - **Maintenance**: If true before an iteration, remains true before the next iteration.
   - **Termination**: When the loop terminates, the invariant provides a useful property showing the algorithm is correct.
2. **Inductive Reasoning**:
   - State Base Case $P(1)$ or $P(0)$.
   - State Inductive Hypothesis $P(k)$.
   - Prove $P(k+1)$ under hypothesis.

## 3. High-Performance Algorithmic Patterns
| Pattern | Typical Complexity | Canonical Problems | Key Invariant / Technique |
| :--- | :--- | :--- | :--- |
| **Two Pointers / Sliding Window** | $\mathcal{O}(N)$ Time, $\mathcal{O}(1)$ Space | Subarray sums, palindrome, container with most water | Monotonic index advancement |
| **Monotonic Stack / Queue** | $\mathcal{O}(N)$ Time, $\mathcal{O}(N)$ Space | Next Greater Element, Sliding Window Maximum | Stack preserves strictly increasing/decreasing order |
| **Disjoint-Set Union (DSU)** | $\mathcal{O}(\alpha(N))$ Amortized | Connected components, Kruskal MST, cycle detection | Path compression + Union by rank/size |
| **Segment Tree / Fenwick** | $\mathcal{O}(\log N)$ Query/Update | Dynamic range sum/minimum queries | Binary index decomposition |
| **Dynamic Programming (State Space)** | $\mathcal{O}(\text{States} \times \text{Transitions})$ | Knapsack, edit distance, matrix chain | Optimal substructure + Overlapping subproblems |

## 4. Implementation Invariant Example: DSU (Union-Find)

```cpp
struct DisjointSet {
    vector<int> parent, rank;
    DisjointSet(int n) : parent(n), rank(n, 0) {
        iota(parent.begin(), parent.end(), 0);
    }
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]); // Path compression
    }
    bool unite(int i, int j) {
        int root_i = find(i), root_j = find(j);
        if (root_i == root_j) return false;
        if (rank[root_i] < rank[root_j]) swap(root_i, root_j);
        parent[root_j] = root_i; // Union by rank
        if (rank[root_i] == rank[root_j]) rank[root_i]++;
        return true;
    }
};
```

## Checklist for Algorithmic Solutions

- [ ] Time and Space complexity calculated with tight asymptotic bounds ($\Theta$).
- [ ] Explicit loop invariants stated for complex iterations.
- [ ] Edge cases analyzed ($N=0, N=1$, maximum bounds, duplicate keys, overflow on 32-bit vs 64-bit ints).
- [ ] Zero unnecessary memory allocations in hot loops.
