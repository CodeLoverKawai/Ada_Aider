---
name: ada-prob
description: Use when solving probability problems, analyzing discrete/continuous random variables, joint probability distributions, expected values, variance, Central Limit Theorem, Markov chains, or stochastic modeling.
---

# ada-prob (Probabilidad, Variables Aleatorias y Procesos Estocásticos)

## Overview
Proporciona análisis riguroso y resolución de modelos para **Probabilidad y Procesos Estocásticos** en ingeniería.

Abarca axiomas de probabilidad de Kolmogorov, probabilidad condicional, Teorema de Bayes, variables aleatorias unidimensionales y conjuntas (discretas y continuas), funciones de distribución acumulada (CDF) y densidad (PDF/PMF), momentos estadísticos (Esperanza, Varianza, Covarianza), leyes de los grandes números, Teorema del Límite Central y cadenas de Markov de tiempo discreto.

---

## When to Use
- Cálculo de probabilidades condicionales, independencia estadística y actualización Bayesiana.
- Modelado de variables aleatorias clásicas:
  - **Discretas**: Bernoulli, Binomial, Geométrica, Hipergeométrica, Poisson.
  - **Continuas**: Uniforme, Exponencial, Normal (Gaussiana), Gamma, Beta.
- Análisis de variables aleatorias conjuntas, distribuciones marginales y condicionales.
- Derivación de valor esperado $\mathbb{E}[X]$, varianza $\text{Var}(X)$, covarianza $\text{Cov}(X, Y)$ y coeficiente de correlación $\rho_{XY}$.
- Aplicaciones en rendimiento de sistemas, fiabilidad de hardware, colas estocásticas y cadenas de Markov.
- Generación de notas y ejercicios resueltos para AFFiNE BlockSuite.

---

## 🎲 Axiomas y Fórmulas Fundamentales

### 1. Axiomas de Kolmogorov y Teorema de Bayes
* **Axioma 1**: $P(A) \ge 0$ para todo evento $A$.
* **Axioma 2**: $P(\Omega) = 1$ donde $\Omega$ es el espacio muestral.
* **Axioma 3**: Para eventos mutuamente excluyentes $A_1, A_2, \dots$:
  $$P\left(\bigcup_{i=1}^{\infty} A_i\right) = \sum_{i=1}^{\infty} P(A_i)$$
* **Teorema de Bayes**:
  $$P(A_k \mid B) = \frac{P(B \mid A_k) P(A_k)}{\sum_{j=1}^{n} P(B \mid A_j) P(A_j)}$$

### 2. Variables Aleatorias y Momentos

| Parámetro | Caso Discreto | Caso Continuo |
| :--- | :--- | :--- |
| **Condición de Normalización** | $\sum_x p_X(x) = 1$ | $\int_{-\infty}^{\infty} f_X(x) \, \d x = 1$ |
| **Función de Distribución (CDF)** | $F_X(x) = \sum_{k \le x} p_X(k)$ | $F_X(x) = \int_{-\infty}^{x} f_X(t) \, \d t$ |
| **Esperanza Matemática $\mathbb{E}[X]$** | $\sum_x x \cdot p_X(x)$ | $\int_{-\infty}^{\infty} x \cdot f_X(x) \, \d x$ |
| **Varianza $\text{Var}(X)$** | $\mathbb{E}[X^2] - (\mathbb{E}[X])^2$ | $\mathbb{E}[X^2] - (\mathbb{E}[X])^2$ |

### 3. Distribuciones Clave en Ingeniería

1. **Distribución Binomial**: $X \sim \text{Bin}(n, p)$
   $$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}, \quad \mathbb{E}[X] = np, \quad \text{Var}(X) = np(1-p)$$
2. **Distribución de Poisson**: $X \sim \text{Pois}(\lambda)$
   $$P(X = k) = \frac{\lambda^k e^{-\lambda}}{k!}, \quad \mathbb{E}[X] = \lambda, \quad \text{Var}(X) = \lambda$$
3. **Distribución Normal (Gaussiana)**: $X \sim \mathcal{N}(\mu, \sigma^2)$
   $$f_X(x) = \frac{1}{\sigma \sqrt{2\pi}} e^{-\frac{(x - \mu)^2}{2\sigma^2}}$$
4. **Distribución Exponencial** (Modelado de tiempos de vida / fallos con pérdida de memoria):
   $$f_X(x) = \lambda e^{-\lambda x} \quad (x \ge 0), \quad \mathbb{E}[X] = \frac{1}{\lambda}, \quad \text{Var}(X) = \frac{1}{\lambda^2}$$

### 4. Cadenas de Markov de Tiempo Discreto (DTMC)
* **Propiedad de Markov (Falta de Memoria)**:
  $$P(X_{n+1} = j \mid X_n = i, X_{n-1} = i_{n-1}, \dots, X_0 = i_0) = P(X_{n+1} = j \mid X_n = i) = P_{ij}$$
* **Matriz de Transición de Probabilidad**: $\mathbf{P} = [P_{ij}]$ donde $\sum_j P_{ij} = 1$.
* **Distribución Estacionaria $\boldsymbol{\pi}$**:
  $$\boldsymbol{\pi} \mathbf{P} = \boldsymbol{\pi} \quad \text{con} \quad \sum_i \pi_i = 1$$

---

## 📝 Plantilla para Notas de Probabilidad en AFFiNE

Al generar apuntes para `~/Documents/GitHub/Universidad/Affinite_Notes/Matematicas/<tema> (YYYY-MM-DD).md`:

```markdown
# [Tema de Probabilidad / Proceso Estocástico] (YYYY-MM-DD)
> 📅 **Fecha**: YYYY-MM-DD | 🏷️ **Tags**: #probabilidad #variables-aleatorias #procesos-estocasticos #[subtema]

> [!NOTE]
> **Definición**: Descripción clara del experimento aleatorio, espacio muestral y variables involucradas.

## 1. Función de Probabilidad / Densidad & Gráfica
- **Función Analítica**:
  $$f_X(x) = \begin{cases} \lambda e^{-\lambda x} & x \ge 0 \\ 0 & x < 0 \end{cases}$$
- **Cálculo de Momentos**:
  $$\mathbb{E}[X] = \frac{1}{\lambda}, \quad \text{Var}(X) = \frac{1}{\lambda^2}$$

## 2. Ejercicio Resuelto Paso a Paso
1. **Paso 1: Delimitación del problema y eventos**:
2. **Paso 2: Aplicación del modelo probabilístico**:
3. **Paso 3: Integración / Sumatoria y Resultado**:
   > [!IMPORTANT]
   > **Resultado**: $P(A) = \text{valor}$ con interpretación técnica.

## 3. Checklist de Estudio
- [ ] ¿Comprobé que la integral/sumatoria de probabilidad total sea igual a 1?
- [ ] ¿Distinguí correctamente entre $P(X \le x)$ (CDF) y $P(X = x)$ (PMF/PDF)?
```
