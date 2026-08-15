---
name: ada-physics
description: Use when solving physics problems (classical mechanics, electromagnetism, thermodynamics), modeling dynamical systems, drawing free-body diagrams, or implementing numerical physics simulations (Verlet/RK4).
---
# ada-physics (University Physics, Electromagnetism & Simulation)

## 1. Classical Mechanics & Dynamics
1. **Newtonian Mechanics**:
   - $\sum \mathbf{F} = m \mathbf{a} = \frac{d\mathbf{p}}{dt}$.
   - Free-Body Diagrams (FBD): Explicitly identify all contact forces (Normal $\mathbf{N}$, Friction $\mathbf{f}_k = \mu_k N$, Tension $\mathbf{T}$) and field forces (Gravity $m\mathbf{g}$).
2. **Rotational Dynamics & Conservation**:
   - Torque: $\boldsymbol{\tau} = \mathbf{r} \times \mathbf{F} = I \boldsymbol{\alpha}$.
   - Angular Momentum: $\mathbf{L} = I \boldsymbol{\omega}$ (Conserved when external torque $\sum \boldsymbol{\tau}_{ext} = 0$).
   - Conservation of Mechanical Energy: $E = K_{trans} + K_{rot} + U_g + U_s = \text{constant}$.

## 2. Electromagnetism & Maxwell's Equations
1. **Governing Laws in Differential Form**:
   - Gauss's Law (Electrostatics): $\nabla \cdot \mathbf{E} = \frac{\rho}{\varepsilon_0}$
   - Gauss's Law (Magnetism): $\nabla \cdot \mathbf{B} = 0$ (No magnetic monopoles)
   - Faraday's Law of Induction: $\nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t}$
   - Ampère-Maxwell Law: $\nabla \times \mathbf{B} = \mu_0 \mathbf{J} + \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}$
2. **Circuit Dynamics (RLC Systems)**:
   - Second-order differential equation: $L \frac{d^2 q}{dt^2} + R \frac{dq}{dt} + \frac{1}{C} q = V(t)$.
   - Damping factor $\zeta = \frac{R}{2} \sqrt{\frac{C}{L}}$ (Underdamped $\zeta < 1$, Overdamped $\zeta > 1$, Critically damped $\zeta = 1$).

## 3. Computational Physics Simulation (Verlet Integration)
For orbital mechanics, particles, and rigid bodies, use symplectic Verlet integration to preserve total energy over long timescales (unlike standard Euler which diverges):

```python
def verlet_step(pos, prev_pos, accel, dt):
    """Verlet integration step preserving energy invariants."""
    new_pos = 2.0 * pos - prev_pos + accel * (dt ** 2)
    return new_pos, pos
```

## Checklist for Physics Problems & Simulations

- [ ] All vectors resolved into explicit orthogonal components ($x, y, z$).
- [ ] SI units ($m, kg, s, N, J, V, T$) consistently maintained across all terms.
- [ ] Energy and momentum conservation invariants verified at boundaries.
- [ ] Numerical simulations use energy-preserving symplectic integrators (Verlet / Symplectic Euler).
