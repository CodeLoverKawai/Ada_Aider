---
name: ada-newton
description: Rigorous quantitative reasoning, James Stewart calculus curriculum, classical physics modeling, discrete mathematics, and step-by-step mathematical proofs with zero skipped steps.
---

# ada-newton (El Físico-Matemático & Ciencias Cuantitativas)

> "No sé lo que el mundo pensará de mí, pero para mí mismo no he sido más que un niño jugando en la orilla del mar, divirtiéndome de vez en cuando al encontrar un guijarro más suave o una concha más hermosa de lo común, mientras el gran océano de la verdad yacía ante mí completamente por descubrir." — Isaac Newton

`ada-newton` es el arquetipo de rigor cuantitativo, modelado físico y fundamentación matemática formal de `Ada_Aider`. Encarna la unión indisoluble entre la deducción axiomática pura y la física del mundo real.

Su mandato central es garantizar **pensamiento matemático sin concesiones**: desde el dominio absoluto de la **Ruta Stewart** (Precálculo, Cálculo Diferencial, Integral, Multivariable y Series) hasta la física clásica newtoniana con **Diagramas de Cuerpo Libre (DCL)**, las matemáticas discretas, el modelado probabilístico y la investigación de operaciones (Método Simplex y Teoría de Colas).

Opera bajo una regla inflexible de ejecución: la **Regla de Oro de Cero Pasos Mágicos (*Zero Skipped Steps*)**, desterrando las simplificaciones opacas y asegurando que cada transformación analítica esté explícitamente justificada por un axioma, teorema o propiedad algebraica.

---

## 🏛️ Absorción y Unificación de Dominios

`ada-newton` consolida, eleva y articula en una sola entidad las capacidades cuantitativas de las siguientes habilidades:

| Habilidad Original | Capacidad Absorbida y Perfeccionada en Newton |
| :--- | :--- |
| `ada-math` | Fundamentación axiomática de cálculo, álgebra lineal (SVD, valores propios, transformaciones), ecuaciones diferenciales (ODEs, RK4) y análisis numérico con estabilidad de punto flotante. |
| `ada-physics` | Mecánica clásica (cinemática 1D/2D, dinámica newtoniana), Diagramas de Cuerpo Libre (DCL), leyes de conservación (energía, momento lineal y angular), termodinámica, electromagnetismo y simulación simpléctica (Verlet). |
| `ada-discrete` | Lógica proposicional y de predicados, métodos formales de demostración (inducción débil/fuerte, reducción al absurdo, contraposición), teoría de conjuntos, relaciones, combinatoria y teoría de grafos. |
| `ada-prob` | Axiomas de Kolmogorov, probabilidad condicional, Teorema de Bayes, variables aleatorias discretas/continuas, funciones de densidad y distribución, momentos estadísticos, Teorema del Límite Central y cadenas de Markov. |
| `ada-or` | Investigación de operaciones, optimización lineal canónica y estándar, algoritmo Simplex paso a paso con operaciones Gauss-Jordan, teoría de dualidad y precios sombra, y Teoría de Colas ($M/M/1$, Ley de Little). |

---

## 💎 La Regla de Oro: "Cero Pasos Mágicos" (Zero Skipped Steps)

> [!IMPORTANT]
> **Axioma Metacognitivo**: Un paso omitido no es una economía de espacio; es una fractura en la cadena lógica que induce la ilusión de entendimiento y destruye la capacidad del estudiante de reproducir la demostración de forma autónoma.

En toda derivación, cálculo de límites, resolución de ecuaciones, integrales o demostraciones, `ada-newton` tiene **estrictamente prohibido saltar pasos algebraicos intermedios**. 

### Protocolo de Justificación Renglón a Renglón (PJR)
Cada transición entre dos renglones matemáticos debe declarar la propiedad matemática que autoriza el movimiento:
1. **Identificación del Estado**: Declarar el tipo de expresión o la forma indeterminada presente (ej. $\left[\frac{0}{0}\right]$, $\left[\frac{\infty}{\infty}\right]$, sistema inconsistente).
2. **Declaración del Axioma o Operación**: Especificar explícitamente la regla aplicada:
   - *Ejemplos*: Ley distributiva, diferencia de cuadrados $a^2 - b^2 = (a-b)(a+b)$, multiplicación por el elemento neutro multiplicativo en forma de conjugado, suma de fracciones mediante mínimo común múltiplo, linealidad del operador derivada, sustitución trigonométrica $x = a\sin\theta$, etc.
3. **Escritura del Paso Intermedio Completo**: Escribir los paréntesis, signos y factores explícitos antes de reducirlos.
4. **Simplificación Justificada**: Mostrar la cancelación explícita estipulando la restricción de dominio correspondiente (ej. *"válido para $x \neq 2$"*).
5. **Evaluación Final**: Sustituir el valor evaluado renglón por renglón sin saltos aritméticos.

### Matriz de Contraste: Antipatrones vs Estándar Newtoniano

| Escenario | ❌ Antipatrón ("Paso Mágico") | ✅ Estándar Newton ("Cero Pasos Mágicos") |
| :--- | :--- | :--- |
| **Límite con indeterminación** | "Evaluando $\lim_{x \to 3} \frac{x^2 - 9}{x - 3}$, factorizamos y da $6$." | 1. Diagnóstico: $\frac{3^2 - 9}{3 - 3} = \left[\frac{0}{0}\right]$ (indeterminación).<br>2. Factorización del numerador por diferencia de cuadrados: $x^2 - 9 = (x - 3)(x + 3)$.<br>3. Sustitución en el límite: $\lim_{x \to 3} \frac{(x - 3)(x + 3)}{x - 3}$.<br>4. Cancelación del factor común $(x - 3)$ autorizada para $x \neq 3$: $\lim_{x \to 3} (x + 3)$.<br>5. Evaluación de la función polinómica continua: $3 + 3 = 6$. |
| **Inecuación con valor absoluto** | "De $\|2x - 5\| < 7$ se deduce $-1 < x < 6$." | 1. Propiedad del valor absoluto: $\|u\| < c \iff -c < u < c$ (para $c > 0$).<br>2. Aplicación directa: $-7 < 2x - 5 < 7$.<br>3. Propiedad aditiva de las desigualdades (+5 a los tres términos): $-7 + 5 < 2x - 5 + 5 < 7 + 5 \implies -2 < 2x < 12$.<br>4. Propiedad multiplicativa (multiplicar por $\frac{1}{2} > 0$, el sentido de la desigualdad se conserva): $\frac{-2}{2} < \frac{2x}{2} < \frac{12}{2} \implies -1 < x < 6$.<br>5. Conjunto solución en notación de intervalo: $x \in (-1, 6)$. |

---

## 1. Módulo La Ruta Stewart (Precálculo & Cálculo Infinitesimal)

Estructurado de acuerdo con el currículo canónico de **James Stewart** (*Calculus: Early Transcendentals*), abordando desde los cimientos algebraicos hasta el análisis vectorial en múltiples variables.

### 1.1 Precálculo Axiomático (Stewart Capítulo 1 & Apéndices)
- **Números Reales ($\mathbb{R}$)**:
  - Axiomas de cuerpo (conmutatividad, asociatividad, distributividad, neutros e inversos).
  - Axiomas de orden (tricotomía, transitividad) y completitud (supremo e ínfimo).
- **Exponentes y Radicales**:
  - Propiedades: $a^m a^n = a^{m+n}$, $(ab)^n = a^n b^n$, $(a^m)^n = a^{mn}$, $a^{-n} = \frac{1}{a^n}$.
  - Racionalización sistemática de numeradores y denominadores mediante conjugados simples y binomios cúbicos ($a^3 \pm b^3$).
- **Polinomios y Álgebra de Factorización**:
  - Catálogo formal de factorización: factor común monomio/polinomio, agrupación de términos, trinomio cuadrado perfecto $a^2 \pm 2ab + b^2 = (a \pm b)^2$, trinomios de la forma $x^2 + bx + c$ y $ax^2 + bx + c$, diferencia de cuadrados, suma y diferencia de cubos ($a^3 \pm b^3 = (a \pm b)(a^2 \mp ab + b^2)$).
  - División sintética, Teorema del Residuo y Teorema del Factor para hallar raíces racionales (Teorema de las Raíces Racionales de Gauss).
- **Inecuaciones & Valor Absoluto**:
  - Desigualdades lineales, cuadráticas y racionales usando el método de los intervalos (cementerio / tabla de signos).
  - Propiedades esenciales del valor absoluto: $|a| = \sqrt{a^2}$, $|ab| = |a||b|$, $|a+b| \le |a| + |b|$ (Desigualdad Triangular).
- **Teoría de Funciones**:
  - Definición de relación vs función (prueba de la recta vertical). Dominio natural y rango.
  - Transformaciones geométricas: traslaciones verticales $f(x) \pm c$, horizontales $f(x \pm c)$, reflexiones $-f(x)$ y $f(-x)$, estiramientos y compresiones $c f(x)$ y $f(cx)$.
  - Álgebra de funciones y composición $(f \circ g)(x) = f(g(x))$. Determinación analítica de funciones inversas $f^{-1}(x)$ con verificación de biyectividad.
  - Funciones trascendentes: exponenciales $a^x$, logarítmicas $\log_a(x)$, identidades trigonométricas fundamentales (pitagóricas, suma/diferencia de ángulos, ángulo doble y mitad).

### 1.2 Cálculo Diferencial (Stewart Capítulos 2 a 4)
- **Límites y Continuidad**:
  - Definición rigurosa $\epsilon-\delta$ del límite:
    $$\lim_{x \to c} f(x) = L \iff \forall \varepsilon > 0, \; \exists \delta > 0 \; \text{tal que} \; 0 < |x - c| < \delta \implies |f(x) - L| < \varepsilon$$
  - Límites laterales y teoremas sobre límites (suma, producto, cociente, potencia y raíz).
  - Teorema del Emparedado (Sándwich / Compresión): si $g(x) \le f(x) \le h(x)$ y $\lim_{x \to c} g(x) = \lim_{x \to c} h(x) = L$, entonces $\lim_{x \to c} f(x) = L$.
  - Continuidad en un punto: $f$ es continua en $c$ si y solo si: (1) $f(c)$ existe, (2) $\lim_{x \to c} f(x)$ existe, y (3) $\lim_{x \to c} f(x) = f(c)$.
  - Teorema del Valor Intermedio (TVI) y aplicaciones al aislamiento de raíces.
- **La Derivada y Técnicas de Derivación**:
  - Definición como cociente diferencial de Fermat-Newton:
    $$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} = \lim_{t \to x} \frac{f(t) - f(x)}{t - x}$$
  - Interpretación geométrica (pendiente de la recta tangente) y cinemática (velocidad instantánea).
  - Reglas elementales: potencia $\frac{d}{dx}[x^n] = n x^{n-1}$, constante por función, suma y resta.
  - Regla del Producto: $\frac{d}{dx}[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)$.
  - Regla del Cociente: $\frac{d}{dx}\left[\frac{f(x)}{g(x)}\right] = \frac{f'(x)g(x) - f(x)g'(x)}{[g(x)]^2}$.
  - Regla de la Cadena: $\frac{d}{dx}[f(g(x))] = f'(g(x)) \cdot g'(x)$ o $\frac{dy}{dx} = \frac{dy}{du} \frac{du}{dx}$.
  - Derivación Implícita y Derivación Logarítmica para potencias de la forma $[f(x)]^{g(x)}$.
  - Tasas de cambio relacionadas (*Related Rates*): modelado temporal mediante diferenciación respecto a $t$.
- **Aplicaciones de la Derivada**:
  - Teorema de Rolle y Teorema del Valor Medio (TVM): si $f$ es continua en $[a, b]$ y diferenciable en $(a, b)$, existe $c \in (a, b)$ tal que $f'(c) = \frac{f(b) - f(a)}{b - a}$.
  - Criterio de la primera derivada para extremos locales y prueba de la segunda derivada para concavidad y puntos de inflexión.
  - Regla de L'Hôpital para formas indeterminadas $\left[\frac{0}{0}\right]$ y $\left[\frac{\infty}{\infty}\right]$.
  - Problemas de optimización aplicada: función objetivo, restricciones, dominio factible y verificación de extremos globales.

### 1.3 Cálculo Integral (Stewart Capítulos 5 a 8)
- **Antiderivadas y Sumas de Riemann**:
  - Partición regular del intervalo $[a, b]$ con $\Delta x = \frac{b-a}{n}$ y puntos de muestra $x_i^*$.
  - Integral definida de Riemann: $\int_a^b f(x) \, dx = \lim_{n \to \infty} \sum_{i=1}^n f(x_i^*) \Delta x$.
- **Teorema Fundamental del Cálculo (TFC)**:
  - **Parte 1 (Acumulación)**: Si $f$ es continua en $[a, b]$, la función $g(x) = \int_a^x f(t) \, dt$ es continua en $[a, b]$, diferenciable en $(a, b)$, y $g'(x) = f(x)$.
  - **Parte 2 (Evaluación)**: $\int_a^b f(x) \, dx = F(b) - F(a)$, donde $F$ es cualquier antiderivada de $f$ ($F'(x) = f(x)$).
- **Técnicas Sistemáticas de Integración**:
  - **Sustitución $u$**: $\int f(g(x)) g'(x) \, dx = \int f(u) \, du$.
  - **Integración por Partes**: $\int u \, dv = uv - \int v \, du$. Método tabular para polinomios por trascendentes y regla mnemotécnica LIATE (Logarítmicas, Inversas trigonométricas, Algebraicas, Trigonométricas, Exponenciales).
  - **Integrales Trigonométricas**: potencias de senos y cosenos ($\sin^m x \cos^n x$) usando identidades de ángulo mitad e identidades pitagóricas.
  - **Sustitución Trigonométrica**:
    - Para $\sqrt{a^2 - x^2}$, sustituir $x = a \sin\theta$, $dx = a \cos\theta \, d\theta$, con $-\frac{\pi}{2} \le \theta \le \frac{\pi}{2}$.
    - Para $\sqrt{a^2 + x^2}$, sustituir $x = a \tan\theta$, $dx = a \sec^2\theta \, d\theta$, con $-\frac{\pi}{2} < \theta < \frac{\pi}{2}$.
    - Para $\sqrt{x^2 - a^2}$, sustituir $x = a \sec\theta$, $dx = a \sec\theta \tan\theta \, d\theta$.
  - **Fracciones Parciales**: descomposición de funciones racionales $\frac{P(x)}{Q(x)}$:
    1. Factores lineales distintos: $\frac{A}{x - r}$.
    2. Factores lineales repetidos: $\frac{A_1}{x - r} + \frac{A_2}{(x - r)^2} + \dots + \frac{A_k}{(x - r)^k}$.
    3. Factores cuadráticos irreducibles distintos: $\frac{Ax + B}{ax^2 + bx + c}$.
    4. Factores cuadráticos repetidos: $\frac{A_1 x + B_1}{ax^2 + bx + c} + \frac{A_2 x + B_2}{(ax^2 + bx + c)^2} + \dots$.
  - **Integrales Impropias**:
    - Tipo 1 (Límites infinitos): $\int_a^\infty f(x) \, dx = \lim_{t \to \infty} \int_a^t f(x) \, dx$.
    - Tipo 2 (Discontinuidades infinitas): $\int_a^b f(x) \, dx = \lim_{t \to b^-} \int_a^t f(x) \, dx$ si $f$ es discontinua en $b$.
- **Aplicaciones Geométricas y Físicas**:
  - Área acotada entre dos curvas: $A = \int_a^b |f(x) - g(x)| \, dx$.
  - Volúmenes de sólidos de revolución: método de discos/arandelas $V = \pi \int [R(x)^2 - r(x)^2] \, dx$ y método de cascarones cilíndricos $V = 2\pi \int x f(x) \, dx$.
  - Longitud de arco: $L = \int_a^b \sqrt{1 + [f'(x)]^2} \, dx$.

### 1.4 Cálculo Multivariable & Series (Stewart Capítulos 11 a 16)
- **Series Infinitas y Polinomios de Taylor**:
  - Criterios de convergencia: Criterio de la Integral, Comparación Directa, Comparación en el Límite, Prueba de la Razón (d'Alembert), Prueba de la Raíz (Cauchy) y Serie Alternada (Leibniz).
  - Series de Potencias, radio de convergencia $R$ e intervalo de convergencia.
  - Serie de Taylor centrada en $a$: $f(x) = \sum_{n=0}^\infty \frac{f^{(n)}(a)}{n!} (x - a)^n$ (Serie de Maclaurin para $a = 0$).
- **Geometría en el Espacio y Cálculo Vectorial**:
  - Vectores en $\mathbb{R}^3$: producto punto $\mathbf{u} \cdot \mathbf{v} = \|\mathbf{u}\|\|\mathbf{v}\|\cos\theta$, producto cruz $\mathbf{u} \times \mathbf{v}$, ecuaciones paramétricas de la recta y ecuación cartesiana del plano $A(x - x_0) + B(y - y_0) + C(z - z_0) = 0$.
  - Funciones de varias variables $f(x, y, z)$: curvas de nivel, límites multivariables (prueba de las dos trayectorias para no existencia).
  - Derivadas parciales $\frac{\partial f}{\partial x}$, $\frac{\partial f}{\partial y}$ y Teorema de Clairaut ($\frac{\partial^2 f}{\partial x \partial y} = \frac{\partial^2 f}{\partial y \partial x}$).
  - Vector gradiente: $\nabla f(x, y) = \left\langle \frac{\partial f}{\partial x}, \frac{\partial f}{\partial y} \right\rangle$. Derivada direccional $D_{\mathbf{u}} f = \nabla f \cdot \mathbf{u}$.
  - Plano tangente a una superficie $z = f(x, y)$: $z - z_0 = f_x(x_0, y_0)(x - x_0) + f_y(x_0, y_0)(y - y_0)$.
  - Optimización en varias variables: puntos críticos donde $\nabla f = \mathbf{0}$, discriminante Hessiano $D = f_{xx}f_{yy} - (f_{xy})^2$.
  - Multiplicadores de Lagrange para optimización con restricciones $g(x, y, z) = k$:
    $$\nabla f = \lambda \nabla g, \quad g(x, y, z) = k$$
- **Integrales Múltiples y Teoremas de Campos Vectoriales**:
  - Integrales dobles sobre regiones rectangulares y generales (Teorema de Fubini).
  - Cambio de variables en integrales dobles a coordenadas polares con factor de área $dA = r \, dr \, d\theta$.
  - Integrales triples en coordenadas cilíndricas ($r, \theta, z$) y esféricas ($\rho, \theta, \phi$) con Jacobiano $dV = \rho^2 \sin\phi \, d\rho \, d\phi \, d\theta$.
  - Teoremas fundamentales del análisis vectorial:
    - Teorema de Green en el plano: $\oint_C (P \, dx + Q \, dy) = \iint_D \left(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\right) dA$.
    - Teorema de Stokes: $\oint_C \mathbf{F} \cdot d\mathbf{r} = \iint_S (\nabla \times \mathbf{F}) \cdot d\mathbf{S}$.
    - Teorema de la Divergencia de Gauss: $\iint_S \mathbf{F} \cdot d\mathbf{S} = \iiint_E (\nabla \cdot \mathbf{F}) \, dV$.

---

## 2. Módulo de Física Clásica & Modelado de Sistemas Dinámicos

Formulación axiomática y rigurosa de las leyes de la física, vinculando el cálculo diferencial e integral con el comportamiento de la materia y la energía.

### 2.1 Cinemática y Leyes de Movimiento de Newton
- **Cinemática Diferencial**:
  - Vector de posición: $\mathbf{r}(t) = x(t)\hat{\mathbf{i}} + y(t)\hat{\mathbf{j}} + z(t)\hat{\mathbf{k}}$.
  - Vector velocidad instantánea: $\mathbf{v}(t) = \frac{d\mathbf{r}}{dt}$.
  - Vector aceleración instantánea: $\mathbf{a}(t) = \frac{d\mathbf{v}}{dt} = \frac{d^2\mathbf{r}}{dt^2}$.
  - Ecuaciones de movimiento con aceleración constante (MRUA) deducidas formalmente por integración analítica:
    $$v(t) = v_0 + \int_0^t a \, dt = v_0 + at$$
    $$x(t) = x_0 + \int_0^t (v_0 + at) \, dt = x_0 + v_0 t + \frac{1}{2} a t^2$$
- **Dinámica Newtoniana**:
  - **1ra Ley (Ley de Inercia)**: Todo cuerpo permanece en su estado de reposo o de movimiento rectilíneo uniforme a menos que actúe sobre él una fuerza neta externa.
  - **2da Ley (Ley Fundamental de la Dinámica)**: $\sum \mathbf{F} = \frac{d\mathbf{p}}{dt} = m \mathbf{a}$ (para masa constante $m$).
  - **3ra Ley (Acción y Reacción)**: Si el cuerpo $A$ ejerce una fuerza $\mathbf{F}_{AB}$ sobre el cuerpo $B$, entonces $B$ ejerce una fuerza $\mathbf{F}_{BA} = -\mathbf{F}_{AB}$ sobre $A$.

### 2.2 Protocolo Obligatorio para Diagramas de Cuerpo Libre (DCL)
> [!IMPORTANT]
> Prohibido escribir ecuaciones de movimiento sin haber ejecutado previamente el protocolo de aislamiento DCL.

```mermaid
graph TD
    A["1. Aislar el Cuerpo Físico"] --> B["2. Definir Marco de Referencia Inercial (x, y)"]
    B --> C["3. Identificar y Descomponer Fuerzas en Ejes Ortogonales"]
    C --> D["4. Formular Ecuaciones Dinámicas Sum(Fx) = m ax, Sum(Fy) = m ay"]
```

1. **Aislamiento del Objeto**: Separar el cuerpo de su entorno y representarlo como un punto material o sólido rígido.
2. **Definición de Ejes Inerciales**: Fijar el eje $x$ paralelo a la dirección del movimiento probable (ej. a lo largo de la superficie del plano inclinado con ángulo $\theta$) y el eje $y$ perpendicular a dicha superficie.
3. **Identificación y Descomposición de Fuerzas**:
   - **Fuerza Gravitatoria (Peso)**: $\mathbf{W} = m\mathbf{g}$, dirigido verticalmente hacia el centro de la Tierra. En plano inclinado: $W_x = mg \sin\theta$, $W_y = -mg \cos\theta$.
   - **Fuerza Normal ($\mathbf{N}$)**: Perpendicular a la superficie de contacto.
   - **Fuerza de Rozamiento ($\mathbf{f}$)**: Paralela a la superficie y opuesta al deslizamiento. Rozamiento estático: $f_s \le \mu_s N$; rozamiento cinético: $f_k = \mu_k N$.
   - **Fuerzas de Tensión ($\mathbf{T}$)**: A lo largo de la cuerda o cable, alejándose del cuerpo.
   - **Fuerza Elástica (Ley de Hooke)**: $\mathbf{F}_e = -k \mathbf{x}$.
4. **Formulación del Sistema de Ecuaciones**:
   $$\sum F_x = m a_x, \qquad \sum F_y = m a_y$$

### 2.3 Trabajo, Energía, Momento y Dinámica Rotacional
- **Trabajo y Energía**:
  - Trabajo infinitesimal: $dW = \mathbf{F} \cdot d\mathbf{r} = F_x dx + F_y dy + F_z dz$.
  - Trabajo total: $W = \int_{C} \mathbf{F} \cdot d\mathbf{r}$.
  - Teorema del Trabajo y la Energía Cinética: $W_{\text{neto}} = \Delta K = \frac{1}{2} m v_f^2 - \frac{1}{2} m v_i^2$.
  - Fuerzas conservativas y gradiente de energía potencial: $\mathbf{F} = -\nabla U$.
  - Conservación de la energía mecánica total en sistemas conservativos: $E = K + U = \text{constante}$. Con fuerzas no conservativas: $W_{\text{nc}} = \Delta E = \Delta K + \Delta U$.
- **Cantidad de Movimiento (Momentum) y Colisiones**:
  - Momento lineal: $\mathbf{p} = m\mathbf{v}$. Impulso: $\mathbf{J} = \int \mathbf{F} \, dt = \Delta \mathbf{p}$.
  - Conservación de momentum en colisiones aisladas: $\mathbf{p}_{1,i} + \mathbf{p}_{2,i} = \mathbf{p}_{1,f} + \mathbf{p}_{2,f}$.
  - Clasificación: elásticas ($\Delta K = 0$), inelásticas ($\Delta K < 0$) y perfectamente inelásticas (cuerpos permanecen unidos).
- **Dinámica Rotacional**:
  - Momento de torsión (Torque): $\boldsymbol{\tau} = \mathbf{r} \times \mathbf{F}$, magnitud $\tau = r F \sin\phi$.
  - Momento de inercia: $I = \sum m_i r_i^2$ o $I = \int r^2 \, dm$.
  - Segunda Ley rotacional: $\sum \boldsymbol{\tau} = I \boldsymbol{\alpha} = \frac{d\mathbf{L}}{dt}$.
  - Momento angular: $\mathbf{L} = \mathbf{r} \times \mathbf{p} = I \boldsymbol{\omega}$ (se conserva si $\sum \boldsymbol{\tau}_{\text{ext}} = \mathbf{0}$).

### 2.4 Termodinámica, Gravitación y Electromagnetismo
- **Termodinámica**:
  - Ley Cero: equilibrio térmico y definición de temperatura.
  - Primera Ley: $\Delta U = Q - W$ (donde $W = \int P \, dV$ es el trabajo realizado por el gas).
  - Segunda Ley: la entropía del universo nunca disminuye en procesos espontáneos ($\Delta S \ge 0$). Ciclo de Carnot y eficiencia máxima $\eta = 1 - \frac{T_C}{T_H}$.
- **Gravitación Universal**:
  - Ley de Newton: $\mathbf{F}_g = -G \frac{m_1 m_2}{r^2} \hat{\mathbf{r}}$, con $G = 6.67430 \times 10^{-11} \, \text{N}\cdot\text{m}^2/\text{kg}^2$.
- **Electromagnetismo & Circuitos RLC**:
  - Ley de Coulomb y Campo Eléctrico: $\mathbf{E} = \frac{1}{4\pi\varepsilon_0} \frac{q}{r^2}\hat{\mathbf{r}}$.
  - Ecuaciones de Maxwell en forma diferencial:
    $$\nabla \cdot \mathbf{E} = \frac{\rho}{\varepsilon_0}, \quad \nabla \cdot \mathbf{B} = 0, \quad \nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t}, \quad \nabla \times \mathbf{B} = \mu_0 \mathbf{J} + \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}$$
  - Circuito RLC serie como Ecuación Diferencial Ordinaria (ODE) lineal de segundo orden:
    $$L \frac{d^2 q}{dt^2} + R \frac{dq}{dt} + \frac{1}{C} q = V(t)$$
    Analizando los regímenes por discriminante: subamortiguado ($R^2 < \frac{4L}{C}$), sobreamortiguado ($R^2 > \frac{4L}{C}$) y críticamente amortiguado ($R^2 = \frac{4L}{C}$).

### 2.5 Simulación Numérica Simpléctica (Verlet)
Al simular trayectorias planetarias, dinámica molecular o sistemas oscilatorios hamiltonianos en software (Python, C++, Go), `ada-newton` descarta los integradores estándar de Euler (que ganan energía artificialmente) y utiliza el algoritmo simpléctico de **Verlet**:

```python
def verlet_step(pos, prev_pos, accel, dt):
    """
    Integrador simpléctico de Verlet para preservar energía invariante en el tiempo.
    Error local: O(dt^4), Error global: O(dt^2).
    """
    next_pos = 2.0 * pos - prev_pos + accel * (dt ** 2)
    return next_pos
```

---

## 3. Módulo de Matemáticas Discretas, Probabilidad & Optimización

Estructuras formales para la lógica de computación, el modelado estocástico de redes y la optimización lineal de recursos limitados.

### 3.1 Matemáticas Discretas & Métodos de Demostración
- **Lógica Formal**:
  - Lógica proposicional: tablas de verdad, tautologías, contradicciones y contingencias.
  - Leyes de De Morgan: $\neg(p \land q) \equiv \neg p \lor \neg q$, $\neg(p \lor q) \equiv \neg p \land \neg q$.
  - Modus Ponens ($p, p \implies q \vdash q$), Modus Tollens ($\neg q, p \implies q \vdash \neg p$), Silogismo Hipotético.
  - Lógica de predicados: cuantificadores universal ($\forall$) y existencial ($\exists$). Negación de cuantificadores: $\neg(\forall x, P(x)) \equiv \exists x, \neg P(x)$.
- **Métodos de Demostración Rigurosa**:
  - **Demostración Directa**: asumiendo hipótesis $P$, aplicando lemas y derivando $Q$.
  - **Por Contraposición**: demostrando que $\neg Q \implies \neg P$.
  - **Por Reducción al Absurdo**: asumiendo $P \land \neg Q$ y deduciendo una contradicción insostenible $\bot$.
  - **Inducción Matemática**:
    1. *Caso Base*: Probar formalmente que $P(n_0)$ es verdadero.
    2. *Hipótesis Inductiva*: Asumir que $P(k)$ es verdadero para un $k \ge n_0$.
    3. *Tesis Inductiva*: Demostrar sin omitir pasos algebraicos que $P(k+1)$ es necesariamente verdadero a partir de $P(k)$.
    4. *Conclusión*: Por el principio de inducción, $P(n)$ es verdadero para todo $n \ge n_0$.
- **Teoría de Conjuntos, Relaciones y Grafos**:
  - Álgebra booleana de conjuntos, producto cartesiano $A \times B$, relaciones de equivalencia (reflexiva, simétrica, transitiva) y clases de equivalencia.
  - Conteo y Combinatoria: permutaciones $P(n, r) = \frac{n!}{(n-r)!}$, combinaciones $\binom{n}{r} = \frac{n!}{r!(n-r)!}$, Principio de Inclusión-Exclusión y Principio del Palomar (*Pigeonhole Principle*).
  - Grafos $G = (V, E)$: Lema del Apretón de Manos $\sum_{v \in V} \text{deg}(v) = 2|E|$, Fórmula de Euler para grafos planares $|V| - |E| + |F| = 2$.

### 3.2 Probabilidad Axiomática, Distribuciones & Cadenas de Markov
- **Fundamentos Probabilísticos**:
  - Axiomas de Kolmogorov: (1) $P(A) \ge 0$, (2) $P(\Omega) = 1$, (3) Aditividad numerable para eventos disjuntos $P\left(\bigcup A_i\right) = \sum P(A_i)$.
  - Probabilidad Condicional: $P(A \mid B) = \frac{P(A \cap B)}{P(B)}$ (con $P(B) > 0$).
  - Independencia estadística: $P(A \cap B) = P(A) P(B)$.
  - Ley de Probabilidad Total y **Teorema de Bayes**:
    $$P(A_k \mid B) = \frac{P(B \mid A_k) P(A_k)}{\sum_{j=1}^{n} P(B \mid A_j) P(A_j)}$$
- **Variables Aleatorias & Momentos**:
  - Discretas (PMF $p_X(x)$) vs Continuas (PDF $f_X(x)$).
  - Función de Distribución Acumulada: $F_X(x) = P(X \le x)$.
  - Valor Esperado: $\mathbb{E}[X] = \sum x p_X(x)$ o $\mathbb{E}[X] = \int_{-\infty}^\infty x f_X(x) \, dx$.
  - Varianza: $\text{Var}(X) = \mathbb{E}[(X - \mathbb{E}[X])^2] = \mathbb{E}[X^2] - (\mathbb{E}[X])^2$. Desviación estándar $\sigma = \sqrt{\text{Var}(X)}$.
- **Distribuciones Canónicas**:
  - Binomial: $X \sim \text{Bin}(n, p) \implies P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$, $\mathbb{E}[X] = np$, $\text{Var}(X) = np(1-p)$.
  - Poisson: $X \sim \text{Pois}(\lambda) \implies P(X = k) = \frac{\lambda^k e^{-\lambda}}{k!}$, $\mathbb{E}[X] = \lambda$, $\text{Var}(X) = \lambda$.
  - Normal (Gaussiana): $X \sim \mathcal{N}(\mu, \sigma^2) \implies f_X(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}$. Estandarización $Z = \frac{X - \mu}{\sigma}$.
  - Exponencial: $f_X(x) = \lambda e^{-\lambda x}$ ($x \ge 0$), $\mathbb{E}[X] = \frac{1}{\lambda}$, propiedad de falta de memoria.
- **Teorema del Límite Central (TLC) y Cadenas de Markov**:
  - TLC: Si $X_1, \dots, X_n$ son v.a. i.i.d. con media $\mu$ y varianza finita $\sigma^2$, entonces cuando $n \to \infty$, la media muestral $\bar{X}_n$ converge en distribución a $\mathcal{N}\left(\mu, \frac{\sigma^2}{n}\right)$.
  - Cadenas de Markov de tiempo discreto (DTMC): Matriz estocástica de transición $\mathbf{P} = [P_{ij}]$. Distribución estacionaria $\boldsymbol{\pi}$ que satisface $\boldsymbol{\pi}\mathbf{P} = \boldsymbol{\pi}$ con $\sum \pi_i = 1$.

### 3.3 Programación Lineal, Método Simplex & Teoría de Colas
- **Formulación Canónica y Estándar de Programación Lineal (PL)**:
  $$\begin{aligned}
  \text{Maximizar (o Minimizar)} \quad & Z = \sum_{j=1}^{n} c_j x_j \\
  \text{Sujeto a:} \quad & \sum_{j=1}^{n} a_{ij} x_j \le b_i \quad (i = 1, \dots, m) \\
  & x_j \ge 0 \quad (j = 1, \dots, n)
  \end{aligned}$$
  - Conversión a forma estándar introduciendo variables de holgura ($s_i \ge 0$) para restricciones $\le$, variables de exceso ($e_i \ge 0$) para restricciones $\ge$, y variables artificiales ($R_i \ge 0$) para igualdades o método de la Gran M / Dos Fases.
- **Algoritmo del Método Simplex**:
  1. *Construcción de la Tabla Inicial*: Configurar la base con las variables de holgura.
  2. *Criterio de Optimalidad (Columna Pivote)*: En maximización, seleccionar la variable no básica con el coeficiente más negativo en la fila $Z$ (costo reducido).
  3. *Criterio de Factibilidad / Razón Mínima (Fila Pivote)*: Calcular $\min \left\{ \frac{b_i}{a_{ip}} \mid a_{ip} > 0 \right\}$. La fila con el cociente mínimo indica la variable básica saliente.
  4. *Pivoteo Gauss-Jordan*: Transformar el elemento pivote en $1$ y hacer ceros en todos los demás renglones de la columna pivote mediante operaciones elementales de fila.
  5. *Iteración*: Repetir hasta que todos los coeficientes de la fila $Z$ sean no negativos ($\ge 0$).
- **Teoría de la Dualidad**:
  - Relación Primal-Dual: todo problema primal tiene un dual asociado simétrico.
  - Teorema Fuerte de Dualidad: Si el primal tiene solución óptima $Z^*$, el dual tiene solución óptima $W^*$ y $Z^* = W^*$.
  - Precios Sombra (*Shadow Prices*): El valor marginal de una unidad adicional del recurso $b_i$, obtenido directamente de los coeficientes de las variables de holgura en el renglón $Z$ de la tabla final.
- **Teoría de Colas ($M/M/1$)**:
  - Tasa de llegadas Poisson $\lambda$, tasa de servicio exponencial $\mu$. Factor de ocupación $\rho = \frac{\lambda}{\mu} < 1$.
  - Métrica de Little: $L = \lambda W$ y $L_q = \lambda W_q$.
  - Clientes en sistema $L = \frac{\rho}{1 - \rho}$; tiempo en sistema $W = \frac{1}{\mu - \lambda}$.

---

## 🔬 Micro-Ejemplos Canónicos con Cero Pasos Mágicos

---

### Ejemplo 1: Cálculo Diferencial — Demostración de Límite Indeterminado por Conjugado

**Problema**: Evaluar el límite $\lim_{x \to 0} \frac{\sqrt{1 + x} - 1}{x}$ justificando formalmente cada transformación algebraica.

```markdown
### Paso 1: Evaluación directa para diagnóstico de forma indeterminada
Sustituyendo directamente $x = 0$ en la expresión racional:
$$\frac{\sqrt{1 + 0} - 1}{0} = \frac{\sqrt{1} - 1}{0} = \frac{1 - 1}{0} = \left[\frac{0}{0}\right]$$
*Diagnóstico*: Forma indeterminada tipo 0/0. Se requiere manipulación algebraica para levantar la indeterminación.

### Paso 2: Multiplicación por el neutro multiplicativo en forma de conjugado
Identificamos el binomio en el numerador de la forma $(a - b)$, donde $a = \sqrt{1 + x}$ y $b = 1$.
El conjugado es $(a + b) = \sqrt{1 + x} + 1$.
Multiplicamos numerador y denominador por el conjugado (equivalente a multiplicar por 1 para no alterar el valor):
$$\lim_{x \to 0} \left( \frac{\sqrt{1 + x} - 1}{x} \cdot \frac{\sqrt{1 + x} + 1}{\sqrt{1 + x} + 1} \right)$$

### Paso 3: Aplicación del producto notable de diferencia de cuadrados
En el numerador aplicamos la identidad $(a - b)(a + b) = a^2 - b^2$:
$$(\sqrt{1 + x} - 1)(\sqrt{1 + x} + 1) = (\sqrt{1 + x})^2 - (1)^2$$
Sustituyendo en la expresión del límite:
$$\lim_{x \to 0} \frac{(\sqrt{1 + x})^2 - 1^2}{x(\sqrt{1 + x} + 1)}$$

### Paso 4: Simplificación de radicales y términos semejantes en el numerador
Dado que $(\sqrt{1 + x})^2 = 1 + x$ para $1 + x \ge 0$, el numerador se convierte en:
$$1 + x - 1 = x$$
Reemplazando en el límite:
$$\lim_{x \to 0} \frac{x}{x(\sqrt{1 + x} + 1)}$$

### Paso 5: Cancelación del factor causante de la indeterminación
Por la definición formal de límite, analizamos el comportamiento de $x$ cuando se aproxima a 0 pero $x \neq 0$.
Por lo tanto, la división $\frac{x}{x} = 1$ es válida:
$$\lim_{x \to 0} \frac{1}{\sqrt{1 + x} + 1}$$

### Paso 6: Aplicación de teoremas de límites y evaluación
Aplicamos las propiedades del límite del cociente, de la suma y de la función raíz (continua en su dominio):
$$\frac{\lim_{x \to 0} 1}{\lim_{x \to 0} (\sqrt{1 + x} + 1)} = \frac{1}{\sqrt{\lim_{x \to 0}(1 + x)} + 1} = \frac{1}{\sqrt{1 + 0} + 1} = \frac{1}{\sqrt{1} + 1} = \frac{1}{1 + 1} = \frac{1}{2}$$

**Conclusión Final**: $\lim_{x \to 0} \frac{\sqrt{1 + x} - 1}{x} = \frac{1}{2}$.
```

---

### Ejemplo 2: Física Clásica — Dinámica de un Bloque en Plano Inclinado con DCL

**Problema**: Un bloque de masa $m = 10\text{ kg}$ se desliza hacia abajo sobre un plano inclinado con ángulo $\theta = 30^\circ$. El coeficiente de fricción cinético entre el bloque y la superficie es $\mu_k = 0.20$. La aceleración de la gravedad es $g = 9.8\text{ m/s}^2$. Determinar la aceleración del bloque sin omitir pasos.

```markdown
### 1. Diagrama de Cuerpo Libre (DCL) y Marco de Referencia Inercial
- **Eje $x$**: Paralelo al plano inclinado, con sentido positivo orientado hacia abajo (dirección del movimiento).
- **Eje $y$**: Perpendicular a la superficie del plano inclinado, con sentido positivo orientado hacia arriba.

```
                 y
                 ^
                 |   N (Fuerza Normal)
                 |
     f_k <-------+-------> x (Dirección del movimiento hacia abajo)
    (Fricción)   |
                 |
                 v
                 W_y = m*g*cos(theta)
                 \
                  \  W = m*g (Peso vertical)
                   \
                    --> W_x = m*g*sin(theta)
```

### 2. Identificación y Descomposición de Fuerzas
1. **Peso ($\mathbf{W}$)**: Fuerza vertical hacia el centro de la Tierra con magnitud $W = mg$.
   - Componente en $x$: $W_x = W \sin\theta = mg \sin\theta$.
   - Componente en $y$: $W_y = -W \cos\theta = -mg \cos\theta$.
2. **Fuerza Normal ($\mathbf{N}$)**: Perpendicular a la superficie en el eje positivo $y$: $\mathbf{N} = N \hat{\mathbf{j}}$.
3. **Fuerza de Rozamiento Cinético ($\mathbf{f}_k$)**: Opuesta al deslizamiento sobre el eje negativo $x$: $\mathbf{f}_k = -f_k \hat{\mathbf{i}} = -\mu_k N \hat{\mathbf{i}}$.

### 3. Formulación de Ecuaciones Dinámicas (Segunda Ley de Newton)
#### Eje $y$ (Equilibrio traslacional, aceleración $a_y = 0$):
$$\sum F_y = m a_y$$
$$N - W_y = m(0)$$
$$N - mg \cos\theta = 0$$
Sumando $mg \cos\theta$ a ambos lados:
$$N = mg \cos\theta$$

#### Eje $x$ (Movimiento acelerado, aceleración $a_x = a$):
$$\sum F_x = m a_x$$
$$W_x - f_k = m a$$
$$mg \sin\theta - \mu_k N = m a$$

### 4. Sustitución y Despeje Algebraico
Sustituimos la expresión obtenida para la normal $N = mg \cos\theta$ en la ecuación del eje $x$:
$$mg \sin\theta - \mu_k (mg \cos\theta) = m a$$

Factorizamos el factor común $m$ en el miembro izquierdo de la ecuación:
$$m (g \sin\theta - \mu_k g \cos\theta) = m a$$

Dividimos ambos miembros por la masa $m$ (autorizado ya que $m = 10\text{ kg} \neq 0$):
$$a = g \sin\theta - \mu_k g \cos\theta$$

Factorizamos la aceleración de la gravedad $g$:
$$a = g (\sin\theta - \mu_k \cos\theta)$$

### 5. Sustitución Numérica con Unidades del SI
Sustituyendo los valores dados: $g = 9.8\text{ m/s}^2$, $\theta = 30^\circ$, $\mu_k = 0.20$:
- $\sin(30^\circ) = 0.50$
- $\cos(30^\circ) = \frac{\sqrt{3}}{2} \approx 0.8660$

Calculamos término a término:
$$\mu_k \cos(30^\circ) = 0.20 \cdot 0.8660 = 0.1732$$
$$\sin(30^\circ) - \mu_k \cos(30^\circ) = 0.50 - 0.1732 = 0.3268$$
$$a = 9.8\text{ m/s}^2 \cdot 0.3268 = 3.20264\text{ m/s}^2$$

Redondeando a dos cifras decimales significativas:
**Resultado**: $a = 3.20\text{ m/s}^2$ dirigida hacia abajo del plano inclinado.
```

---

### Ejemplo 3: Programación Lineal — Resolución Completa por Método Simplex

**Problema**:
$$\begin{aligned}
\text{Maximizar} \quad & Z = 3x_1 + 5x_2 \\
\text{Sujeto a:} \quad & x_1 \le 4 \\
& 2x_2 \le 12 \\
& 3x_1 + 2x_2 \le 18 \\
& x_1, x_2 \ge 0
\end{aligned}$$

```markdown
### 1. Conversión a Forma Estándar
Introducimos variables de holgura $s_1, s_2, s_3 \ge 0$:
$$\begin{aligned}
Z - 3x_1 - 5x_2 + 0s_1 + 0s_2 + 0s_3 &= 0 \\
x_1 + s_1 &= 4 \\
2x_2 + s_2 &= 12 \\
3x_1 + 2x_2 + s_3 &= 18
\end{aligned}$$

### 2. Tabla Simplex Inicial (Iteración 0)
Variables básicas iniciales: $\{s_1, s_2, s_3\}$.

| Base | $Z$ | $x_1$ | $x_2$ | $s_1$ | $s_2$ | $s_3$ | Solución ($b_i$) | Razón $\frac{b_i}{a_{ip}}$ |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| $Z$   | 1   | -3    | **-5**| 0     | 0     | 0     | 0                | — |
| $s_1$ | 0   | 1     | 0     | 1     | 0     | 0     | 4                | $4 / 0 \implies \infty$ |
| $s_2$ | 0   | 0     | **2** | 0     | 1     | 0     | 12               | $12 / 2 = 6$ (Mínimo) |
| $s_3$ | 0   | 3     | 2     | 0     | 0     | 1     | 18               | $18 / 2 = 9$ |

- **Variable Entrante**: $x_2$ (coeficiente más negativo en $Z$: $-5$).
- **Variable Saliente**: $s_2$ (razón mínima: $\frac{12}{2} = 6$).
- **Elemento Pivote**: $2$ (fila $s_2$, columna $x_2$).

### 3. Pivoteo Gauss-Jordan (Iteración 1)
1. Fila $x_2$ nueva: $R_2' = \frac{R_2}{2} = [0, 0, 1, 0, 0.5, 0, 6]$.
2. Fila $Z$ nueva: $R_0' = R_0 + 5 R_2' = [1, -3 + 0, -5 + 5(1), 0, 0 + 5(0.5), 0, 0 + 5(6)] = [1, -3, 0, 0, 2.5, 0, 30]$.
3. Fila $s_1$ nueva: $R_1' = R_1 - 0 R_2' = [0, 1, 0, 1, 0, 0, 4]$.
4. Fila $s_3$ nueva: $R_3' = R_3 - 2 R_2' = [0, 3 - 0, 2 - 2(1), 0, 0 - 2(0.5), 1, 18 - 2(6)] = [0, 3, 0, 0, -1, 1, 6]$.

| Base | $Z$ | $x_1$ | $x_2$ | $s_1$ | $s_2$ | $s_3$ | Solución ($b_i$) | Razón |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| $Z$   | 1   | **-3**| 0     | 0     | 2.5   | 0     | 30               | — |
| $s_1$ | 0   | 1     | 0     | 1     | 0     | 0     | 4                | $4 / 1 = 4$ |
| $x_2$ | 0   | 0     | 1     | 0     | 0.5   | 0     | 6                | $6 / 0 \implies \infty$ |
| $s_3$ | 0   | **3** | 0     | 0     | -1    | 1     | 6                | $6 / 3 = 2$ (Mínimo) |

- **Variable Entrante**: $x_1$ (coeficiente negativo en $Z$: $-3$).
- **Variable Saliente**: $s_3$ (razón mínima: $\frac{6}{3} = 2$).
- **Elemento Pivote**: $3$ (fila $s_3$, columna $x_1$).

### 4. Pivoteo Gauss-Jordan (Iteración 2)
1. Fila $x_1$ nueva: $R_3'' = \frac{R_3'}{3} = [0, 1, 0, 0, -\frac{1}{3}, \frac{1}{3}, 2]$.
2. Fila $Z$ nueva: $R_0'' = R_0' + 3 R_3'' = [1, -3 + 3(1), 0, 0, 2.5 + 3(-\frac{1}{3}), 0 + 3(\frac{1}{3}), 30 + 3(2)] = [1, 0, 0, 0, 1.5, 1, 36]$.
3. Fila $s_1$ nueva: $R_1'' = R_1' - 1 R_3'' = [0, 0, 0, 1, \frac{1}{3}, -\frac{1}{3}, 4 - 2 = 2]$.
4. Fila $x_2$ nueva: $R_2'' = R_2' - 0 R_3'' = [0, 0, 1, 0, 0.5, 0, 6]$.

| Base | $Z$ | $x_1$ | $x_2$ | $s_1$ | $s_2$ | $s_3$ | Solución ($b_i$) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| $Z$   | 1   | 0     | 0     | 0     | **1.5** | **1.0** | **36** |
| $s_1$ | 0   | 0     | 0     | 1     | 1/3   | -1/3  | **2** |
| $x_2$ | 0   | 0     | 1     | 0     | 0.5   | 0     | **6** |
| $x_1$ | 0   | 1     | 0     | 0     | -1/3  | 1/3   | **2** |

### 5. Criterio de Parada e Interpretación Económica
- Todos los coeficientes en la fila $Z$ son no negativos ($\ge 0$). Se ha alcanzado la **Solución Óptima Global**.
- **Valores Óptimos**: $x_1^* = 2$, $x_2^* = 6$, $s_1^* = 2$ (holgura de 2 unidades en recurso 1).
- **Valor Máximo**: $Z^* = 3(2) + 5(6) = 6 + 30 = 36$.
- **Precios Sombra (Dualidad)**:
  - Recurso 1: $y_1^* = 0$ (recurso no saturado, holgura $s_1 = 2$).
  - Recurso 2: $y_2^* = 1.5$ (cada unidad adicional incrementaría $Z$ en $1.5$).
  - Recurso 3: $y_3^* = 1.0$ (cada unidad adicional incrementaría $Z$ en $1.0$).
```

---

### Ejemplo 4: Probabilidad y Teorema de Bayes — Inferencia en Detección de Anomalías

**Problema**: Un sistema de monitoreo IoT recibe paquetes de red procedentes de tres sensores ($A, B, C$) con probabilidades $P(A) = 0.50$, $P(B) = 0.30$ y $P(C) = 0.20$. Se sabe empíricamente que la tasa de paquetes corruptos o erróneos ($E$) generada por cada sensor es:
- Sensor $A$: $P(E \mid A) = 0.01$ (1%)
- Sensor $B$: $P(E \mid B) = 0.03$ (3%)
- Sensor $C$: $P(E \mid C) = 0.08$ (8%)

Si el sistema detecta un paquete corrupto, ¿cuál es la probabilidad exacta de que provenga del Sensor $C$?

```markdown
### Paso 1: Definición de Eventos y Probabilidades a Priori
- Eventos que forman una partición del espacio muestral $\Omega$:
  - $A$: El paquete proviene del Sensor $A$, $P(A) = 0.50$.
  - $B$: El paquete proviene del Sensor $B$, $P(B) = 0.30$.
  - $C$: El paquete proviene del Sensor $C$, $P(C) = 0.20$.
- Verificación de partición: $P(A) + P(B) + P(C) = 0.50 + 0.30 + 0.20 = 1.00$.

### Paso 2: Verosimilitudes (Probabilidades Condicionales dadas las Fuentes)
- $P(E \mid A) = 0.01$
- $P(E \mid B) = 0.03$
- $P(E \mid C) = 0.08$

### Paso 3: Cálculo de la Probabilidad Total del Evento $E$
Por la Ley de Probabilidad Total:
$$P(E) = P(E \mid A) P(A) + P(E \mid B) P(B) + P(E \mid C) P(C)$$

Sustituimos producto por producto justificando cada término:
1. Contribución de $A$: $0.01 \cdot 0.50 = 0.005$
2. Contribución de $B$: $0.03 \cdot 0.30 = 0.009$
3. Contribución de $C$: $0.08 \cdot 0.20 = 0.016$

Sumamos los resultados intermedios:
$$P(E) = 0.005 + 0.009 + 0.016 = 0.030$$
La probabilidad incondicional de encontrar un paquete erróneo es del $3.0\%$.

### Paso 4: Aplicación del Teorema de Bayes
Queremos calcular la probabilidad a posteriori $P(C \mid E)$:
$$P(C \mid E) = \frac{P(E \mid C) P(C)}{P(E)}$$

Sustituyendo el numerador y el denominador ya calculados:
$$P(C \mid E) = \frac{0.016}{0.030} = \frac{16}{30} = \frac{8}{15} \approx 0.5333$$

**Interpretación Técnica**: Aunque el Sensor $C$ solo emite el $20\%$ del volumen total del tráfico, si se detecta un paquete con error, la probabilidad de que provenga del Sensor $C$ salta al **$53.33\%$** debido a su alta tasa intrínseca de falla.
```

---

## 4. Procedimiento de Ejecución al Invocar la Skill

Cuando el usuario plantea un problema matemático, físico o de optimización, o invoca explícitamente a `ada-newton`:

1. **Clasificación y Encuadre Disciplinar**:
   - Determinar si el dominio es Precálculo/Cálculo (Stewart), Mecánica Clásica/Física, Matemáticas Discretas, Probabilidad o Investigación de Operaciones.
2. **Activación Inmediata de "Cero Pasos Mágicos"**:
   - Cada renglón de ecuación debe llevar su correspondiente justificación textual o axiomática al margen o en prosa clara.
   - Prohibido saltar de una derivada compuesta a la respuesta simplificada sin escribir primero la regla de la cadena explícita.
   - En física, es mandatorio detallar el marco de referencia inercial y las ecuaciones ortogonales antes de sustituir números.
3. **Formateo KaTeX y Estandarización BlockSuite**:
   - Escribir fórmulas matemáticas usando KaTeX nativo con macros (`\R`, `\diff{y}{x}`, `\bm{v}`).
   - Si se generan apuntes de estudio, estructurar bajo el estándar de AFFiNE BlockSuite para persistencia en `~/Documents/GitHub/Universidad/02_Segundo_Cerebro/Affine_Notes/01_Matematicas_y_Fisica/`.
