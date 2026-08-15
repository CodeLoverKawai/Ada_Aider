---
name: ada-math
description: Use when formulating mathematical proofs, working with calculus, linear algebra, discrete math, probability, differential equations, or implementing numerical algorithms.
---
# ada-math (Applied Mathematics for Engineering & Computation)

## 1. Domain Coverage & Mathematical Formulations

### A. Linear Algebra & Vector Calculus
- **Matrix Decompositions**:
  - SVD: $A = U \Sigma V^T$, QR Decomposition: $A = QR$, Eigendecomposition: $A = Q \Lambda Q^{-1}$.
  - Geometric transformations: rotation matrices $\mathbf{R}(\theta)$, affine projection matrices $\mathbf{T}$.
- **Vector Calculus & Gradients**:
  - Gradient: $\nabla f(\mathbf{x}) = \left[ \frac{\partial f}{\partial x_1}, \dots, \frac{\partial f}{\partial x_n} \right]^T$
  - Hessian Matrix for Convexity Check: $\mathbf{H}_{ij} = \frac{\partial^2 f}{\partial x_i \partial x_j}$ (Positive Semi-Definite $\implies$ Convex).

### B. Calculus & Differential Equations
- **Ordinary Differential Equations (ODEs)**:
  - Linear 1st and 2nd order systems: $\frac{d^2 y}{dt^2} + 2\zeta\omega_n \frac{dy}{dt} + \omega_n^2 y = f(t)$.
  - Numerical solvers: Euler forward vs 4th-order Runge-Kutta (RK4).
- **Taylor Series & Approximations**:
  - $f(x) \approx \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!} (x - a)^n$ for linearizing non-linear system dynamics around operating points.

### C. Discrete Mathematics & Probability
- **Recurrence Relations**: Master Theorem for divide-and-conquer: $T(n) = a T(n/b) + \mathcal{O}(n^d)$.
- **Probability & Bayesian Inference**:
  - Bayes' Theorem: $P(A|B) = \frac{P(B|A) P(A)}{P(B)}$
  - Expected Value & Variance: $\mathbb{E}[X] = \sum x p(x)$, $\text{Var}(X) = \mathbb{E}[X^2] - (\mathbb{E}[X])^2$.

## 2. Numerical Computation Guidelines
1. **Floating-Point Stability**:
   - Guard against catastrophic cancellation when subtracting nearly equal floating-point numbers.
   - Use `log-sum-exp` trick for evaluating log-probabilities: $\log \sum e^{x_i} = c + \log \sum e^{x_i - c}$ where $c = \max(x_i)$.
2. **Matrix Vectorization**:
   - Replace explicit scalar loops with vectorized BLAS/LAPACK matrix operations (e.g., NumPy `np.dot`, `@` operator, SIMD intrinsics).

```python
import numpy as np

def rk4_step(f, t, y, dt):
    """Fourth-Order Runge-Kutta step for numerical integration."""
    k1 = f(t, y)
    k2 = f(t + 0.5 * dt, y + 0.5 * dt * k1)
    k3 = f(t + 0.5 * dt, y + 0.5 * dt * k2)
    k4 = f(t + dt, y + dt * k3)
    return y + (dt / 6.0) * (k1 + 2 * k2 + 2 * k3 + k4)
```

## Checklist for Mathematical Solutions

- [ ] All variables, dimensions, and matrix shapes explicitly defined.
- [ ] Boundary conditions and domain constraints (e.g., division by zero, non-invertible matrices) checked.
- [ ] Numerical algorithms vectorized and protected against float overflow/underflow.
- [ ] LaTeX equations properly formatted using standard delimiters.
