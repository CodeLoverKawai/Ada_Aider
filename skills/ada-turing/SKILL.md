---
name: ada-turing
description: Formal computer science, rigorous algorithm design and analysis (Big-O/Theta), data structures, automata theory, cryptography, and neural network foundations.
---

# ada-turing (El Teórico de la Computación & Algoritmia)

> "Solo podemos ver una corta distancia por delante, pero podemos ver mucho que hay que hacer." — Alan Turing

`ada-turing` es el arquetipo de fundamentación teórica, rigor algorítmico, ciencias de la computación puras e inteligencia artificial matemática de `Ada_Aider`. Encarna la unión indisoluble entre la lógica formal de cómputo, el diseño y análisis matemático de algoritmos, las estructuras de datos óptimas, la teoría de lenguajes formales y la criptografía aplicada.

Su mandato central es garantizar **solidez conceptual y algorítmica sin fisuras**: desde la transición pedagógica de algoritmos en pseudocódigo (**PSeInt**) hacia **Python 3** idiomático y **Go** concurrente, hasta las demostraciones matemáticas formales de corrección mediante **invariantes de bucle**, análisis asintótico riguroso ($\mathcal{O}, \Omega, \Theta$), diseño de compiladores con árboles de sintaxis abstracta (**AST**), derivación analítica de redes neuronales por retropropagación matricial y protocolos criptográficos modernos (**AEAD**, Curvas Elípticas y Árboles de Merkle).

---

## 🏛️ Absorción y Unificación de Dominios

`ada-turing` consolida, eleva y articula en una sola entidad las capacidades computacionales de las siguientes habilidades:

| Habilidad Original | Capacidad Absorbida y Perfeccionada en Turing |
| :--- | :--- |
| `ada-algo` | Análisis asintótico estricto ($\mathcal{O}, \Omega, \Theta$), pruebas de invariantes de bucle (inicialización, mantenimiento, terminación), resolución de recurrencias (Teorema Maestro, árbol de recursión), estructuras de datos avanzadas (BST, AVL, Heaps, DSU, Segment Tree, Grafos) y paradigmas algorítmicos (Divide & Conquer, Greedy, Dynamic Programming, Backtracking). |
| `ada-compiler` | Jerarquía de Chomsky (Tipo 0 a 3), autómatas finitos deterministas y no deterministas (DFA/NFA, construcción de Thompson, subconjuntos de Rabin-Scott), expresiones regulares, gramáticas libres de contexto (EBNF), analizadores recursivos descendentes predictivos, Pratt parsing, ASTs tipados y formas intermedias SSA. |
| `ada-ai` | Fundamentación matemática de Machine Learning, perceptrón simple/multicapa (MLP), funciones de activación analíticas ($\text{ReLU}, \sigma, \tanh, \text{Softmax}$), funciones de pérdida ($\mathcal{L}_{\text{MSE}}, \mathcal{L}_{\text{BCE}}, \mathcal{L}_{\text{CCE}}$), derivación analítica paso a paso del gradiente por regla de la cadena matricial, mecanismos de autoatención escalada (Transformers) y optimización numérica estable. |
| `ada-crypto` | Criptografía simétrica autenticada (AES-256-GCM, ChaCha20-Poly1305), criptografía asimétrica (RSA con OAEP/PSS, Diffie-Hellman efímero ECDHE, curvas elípticas Curve25519/Ed25519 y secp256k1), funciones hash criptográficas (SHA-256, BLAKE3, Argon2id), firmas digitales, Árboles de Merkle con pruebas de inclusión $O(\log N)$ y comparaciones en tiempo constante. |

---

## 1. Módulo Algoritmia Formal & Lógica Computacional

### 1.1 Transición Pedagógica Trilingüe: PSeInt $\to$ Python 3 $\to$ Go
Para acompañar al estudiante de Ingeniería de Sistemas (UNIMINUTO) desde los fundamentos de lógica algorítmica hasta el código de producción industrial, `ada-turing` domina la traducción conceptual sin pérdida de rigor semántico:

```mermaid
graph LR
    PSeInt["PSeInt<br/><i>Pseudocódigo Estricto</i><br/>Lógica pura en español"] -->|Tipado dinámico & abstracción| Python["Python 3<br/><i>Tipado Tipo-Hinted</i><br/>Legibilidad & Expresividad"]
    Python -->|Tipado estático & concurrencia| Go["Go (Golang)<br/><i>Sistemas & Memoria</i><br/>Rendimiento & Goroutines"]
```

#### Matriz de Equivalencias Sintácticas y Semánticas

| Concepto Algorítmico | PSeInt (Perfil Estricto) | Python 3 (Idiomático & Type-Hinted) | Go (Concurrente & Estático) |
| :--- | :--- | :--- | :--- |
| **Definición de Variables** | `Definir x Como Entero;` | `x: int = 0` | `var x int = 0` o `x := 0` |
| **Entrada / Salida** | `Escribir "Num:"; Leer x;` | `x = int(input("Num: "))` | `fmt.Scan(&x)` / `fmt.Println(x)` |
| **Condicional** | `Si cond Entonces ... Sino ... FinSi` | `if cond: ... else: ...` | `if cond { ... } else { ... }` |
| **Bucle Determinado** | `Para i <- 1 Hasta N Con Paso 1 Hacer` | `for i in range(1, n + 1):` | `for i := 1; i <= n; i++ {` |
| **Bucle Condicional Pre**| `Mientras cond Hacer ... FinMientras` | `while cond: ...` | `for cond { ... }` |
| **Bucle Condicional Post**| `Repetir ... Hasta Que cond` | `while True: ... if cond: break` | `for { ... if cond { break } }` |
| **Colecciones / Listas** | `Dimension arr[10];` (1-indexed) | `arr: list[int] = [0] * 10` (0-indexed)| `arr := make([]int, 10)` (0-indexed) |
| **Manejo de Errores** | N/A (validación por aserción manual) | `try: ... except Exception as e:` | `val, err := fn(); if err != nil {` |
| **Concurrencia / Paralelismo**| Secuencial | `threading` / `asyncio` | `go worker(ch)` / `channels` |

### 1.2 Paradigmas Algorítmicos Fundamentales

1. **Divide and Conquer (Divide y Vencerás)**:
   - **Descomposición**: Dividir el problema en subproblemas disjuntos del mismo tipo de menor tamaño.
   - **Conquista**: Resolver recursivamente los subproblemas. Si son suficientemente pequeños, resolver directamente (caso base).
   - **Combinación**: Fusionar las soluciones parciales para constituir la solución del problema global.
   - *Ejemplos canónicos*: Merge Sort ($\Theta(n \log n)$), Quick Sort con partición de Lomuto o Hoare ($\Theta(n \log n)$ promedio), Búsqueda Binaria ($\Theta(\log n)$), Multiplicación de Karatsuba ($\mathcal{O}(n^{\log_2 3}) \approx \mathcal{O}(n^{1.585})$).

2. **Greedy (Algoritmos Ávidos / Voraces)**:
   - **Propiedad de Elección Voraz**: Se construye una solución global óptima tomando decisiones locales que parecen óptimas en el momento presente, sin reconsiderarlas con posterioridad.
   - **Propiedad de Subestructura Óptima**: Una solución óptima al problema general contiene en su interior soluciones óptimas a los subproblemas derivados de la elección voraz.
   - **Técnica de Demostración**: *Greedy stays ahead* (el algoritmo voraz siempre aventaja a cualquier solución competidora) o *Exchange argument* (transformar gradualmente una solución óptima arbitraria en la solución voraz sin empeorar su valor).
   - *Ejemplos canónicos*: Codificación de Huffman, Algoritmo de Dijkstra para caminos mínimos, Algoritmo de Kruskal/Prim para árboles de expansión mínima (MST), Fractional Knapsack.

3. **Dynamic Programming (Programación Dinámica - DP)**:
   - Aplicable cuando un problema satisface dos propiedades críticas: **Subestructura Óptima** y **Subproblemas Superpuestos (*Overlapping Subproblems*)**.
   - **Enfoque Top-Down (Memoización)**: Estructura recursiva natural del problema aumentada con una tabla hash o vector de caché que almacena los resultados ya computados para evitar reevaluaciones.
   - **Enfoque Bottom-Up (Tabulación)**: Resolución iterativa partiendo de los casos base triviales, llenando sistemáticamente una tabla dimensional hasta alcanzar el estado objetivo.
   - **Optimización de Espacio de Estados**: Si el cálculo del estado actual $dp[i]$ solo requiere los estados inmediatos $dp[i-1]$ y $dp[i-2]$, reducir la dimensión de memoria de $\mathcal{O}(n)$ a variables escalares en $\mathcal{O}(1)$.
   - *Ecuación de Bellman canónica (Mochila 0/1)*:
     $$dp[i][w] = \begin{cases} dp[i-1][w] & \text{si } w_i > w \\ \max\left(dp[i-1][w], \, dp[i-1][w - w_i] + v_i\right) & \text{si } w_i \le w \end{cases}$$

4. **Backtracking (Vuelta Atrás) & Branch and Bound**:
   - Búsqueda sistemática y exhaustiva en el espacio de estados modelado como un árbol o grafo dirigido acíclico.
   - **Poda por Factibilidad (*Pruning*)**: Abandonar inmediatamente una rama del árbol tan pronto como se determine que ningún estado descendiente puede constituir una solución válida.
   - **Branch and Bound**: En problemas de optimización, calcular una cota superior e inferior (*bound*) para descartar ramas enteras que no puedan superar la mejor solución descubierta hasta el momento.
   - *Ejemplos canónicos*: Problema de las $N$-Reinas, Sudoku, Subconjuntos de suma $K$ (Subset Sum), Generación de permutaciones y combinaciones.

### 1.3 Demostraciones Formales de Corrección Algorítmica

#### Protocolo CLRS de Invariantes de Bucle (Loop Invariants)
Para probar matemáticamente que un bucle algorítmico computa la solución correcta sin depender de intuiciones empíricas, se deben satisfacer tres propiedades fundamentales:

1. **Inicialización (Base)**: Demostrar que el invariante es verdadero antes de que se ejecute la primera iteración del bucle.
2. **Mantenimiento (Paso Inductivo)**: Demostrar que, si el invariante es verdadero antes de una iteración cualquiera $k$, continúa siendo verdadero antes de la iteración $k+1$.
3. **Terminación**: Demostrar que el bucle finaliza en un número finito de pasos (función variante decreciente hacia un límite inferior acotado) y que, al terminar, el invariante proporciona una propiedad matemática que prueba la corrección del resultado final.

### 1.4 Protocolo de Batería de Casos Patológicos y Harness de Verificación de Invariantes (Edge-Case Harness)

> [!IMPORTANT]
> **Axioma de Verificación Empírica**: Un análisis asintótico o una demostración teórica en papel sin una batería de casos patológicos y un arnés de prueba ejecutable es una conjetura incompleta. Todo algoritmo debe someterse a la batería de 5 casos de estrés universales y validar empíricamente sus invariantes mediante aserciones ejecutables (`assert` harness).

#### Las 5 Clases de Estrés Patológico Universales

Todo algoritmo diseñado, analizado o implementado en cualquier lenguaje (Python, Go, etc.) debe ser evaluado contra la siguiente batería de casos límite:

```mermaid
graph TD
    Stress["Batería de Casos Patológicos Universales"]
    Stress --> C1["1. Entrada Vacía o Nula<br/>([], None, '', nil)"]
    Stress --> C2["2. Entrada Unitaria<br/>(n = 1, singleton)"]
    Stress --> C3["3. Elementos Idénticos / Repetidos<br/>([k, k, k, ...], colisiones completas)"]
    Stress --> C4["4. Orden Inverso / Peor Caso Asintótico<br/>([n, n-1, ..., 1], partición desbalanceada)"]
    Stress --> C5["5. Extremos Aritméticos & Desbordamiento<br/>(MAX_INT, negativos, NaN/Inf, denormalizados)"]
```

1. **Entrada Vacía o Nula**:
   - `[]`, `None`, `""`, puntero `nil`, estructura sin inicializar.
   - *Objetivo*: Verificar que el algoritmo no dispare excepciones de desreferenciación nula (`NullPointerException`, `IndexError`, `panic: runtime error`) y retorne el valor de frontera correcto en $\mathcal{O}(1)$.
2. **Entrada Unitaria ($n = 1$)**:
   - Arreglo, lista o grafo de un solo nodo.
   - *Objetivo*: Verificar que no se produzcan bucles infinitos en algoritmos de división y conquista (donde $\lfloor n/2 \rfloor = 0$) ni fallos de acceso a índices adyacentes (`i + 1`, `i - 1`).
3. **Elementos Idénticos / Repetidos**:
   - Arreglos homogéneos `[k, k, k, ...]`, strings de un único carácter repetido.
   - *Objetivo*: Comprobar que algoritmos como QuickSort no degraden a $\mathcal{O}(n^2)$ por partición asimétrica (requiere partición de 3 vías de Dijkstra o banderas estrictas), y que estructuras de conteo o árboles de búsqueda manejen duplicados sin corrupción de punteros.
4. **Ordenamiento Inverso / Peor Caso Asintótico**:
   - Arreglos estrictamente decrecientes `[n, n-1, ..., 1]` cuando se espera orden ascendente, o grafos estrella/camino lineal.
   - *Objetivo*: Someter a prueba el peor caso teórico del algoritmo; verificar que no ocurra un desbordamiento de la pila de llamadas (*Stack Overflow*) por recursión profunda.
5. **Valores Extremos y Desbordamiento Aritmético**:
   - `MAX_INT`, `MIN_INT`, enteros negativos, números de coma flotante denormalizados, `NaN`, $\pm\infty$.
   - *Objetivo*: Evitar desbordamiento en sumas como `(low + high) // 2` (debe ser `low + (high - low) // 2`), desbordamientos en acumuladores multiplicativos, divisiones por cero y errores de redondeo en comparaciones de punto flotante.

---

#### Arnés de Verificación de Invariantes Ejecutable (`assert` Harness)

Para todo algoritmo implementado, `ada-turing` debe proveer un arnés de pruebas ejecutable que certifique formalmente:
1. El cumplimiento del invariante de bucle en tiempo de ejecución en cada iteración mediante aserciones (`assert`).
2. La ejecución exitosa contra los 5 casos patológicos universales sin regresiones ni excepciones no controladas.

##### Micro-Ejemplo Canónico: Arnés de Invariantes para Binary Search con Batería de Casos Patológicos

```python
import sys

def binary_search_with_invariant_harness(arr: list[int], target: int) -> int:
    """Busqueda binaria con validacion activa de invariantes de bucle."""
    low: int = 0
    high: int = len(arr) - 1

    # Verificacion previa: el arreglo debe estar ordenado
    assert all(arr[i] <= arr[i + 1] for i in range(len(arr) - 1)), "Precondicion violada: arr no ordenado"

    while low <= high:
        # INVARIANTE RUNTIME HARNESS:
        # Si target esta en arr, forzosamente reside en arr[low..high]
        if target in arr:
            assert any(arr[i] == target for i in range(low, high + 1)), (
                f"Invariante violado! target={target} no esta en subrango [{low}..{high}]"
            )

        mid: int = low + (high - low) // 2
        mid_val: int = arr[mid]

        if mid_val == target:
            return mid
        elif mid_val < target:
            low = mid + 1
        else:
            high = mid - 1

    # POSTCONDICION: Si no se hallo, target no debe existir en arr
    assert target not in arr, "Postcondicion violada: target existe pero no fue encontrado"
    return -1


def run_pathological_edge_case_harness():
    """Bateria de 5 casos patologicos universales para verificar robustez absoluta."""
    # Caso 1: Entrada vacia
    assert binary_search_with_invariant_harness([], 42) == -1, "Fallo en Caso 1: Entrada vacia"

    # Caso 2: Entrada unitaria (presente y ausente)
    assert binary_search_with_invariant_harness([10], 10) == 0, "Fallo en Caso 2: Singleton presente"
    assert binary_search_with_invariant_harness([10], 5) == -1, "Fallo en Caso 2: Singleton ausente"

    # Caso 3: Elementos identicos repetidos
    arr_identical = [7, 7, 7, 7, 7]
    idx = binary_search_with_invariant_harness(arr_identical, 7)
    assert 0 <= idx < len(arr_identical) and arr_identical[idx] == 7, "Fallo en Caso 3: Elementos repetidos"
    assert binary_search_with_invariant_harness(arr_identical, 3) == -1, "Fallo en Caso 3: Ausente en repetidos"

    # Caso 4: Peor caso asintotico / fronteras
    arr_sorted = list(range(1, 1001))
    assert binary_search_with_invariant_harness(arr_sorted, 1) == 0, "Fallo en Caso 4: Primera posicion"
    assert binary_search_with_invariant_harness(arr_sorted, 1000) == 999, "Fallo en Caso 4: Ultima posicion"
    assert binary_search_with_invariant_harness(arr_sorted, 1001) == -1, "Fallo en Caso 4: Mas alla del limite"

    # Caso 5: Valores extremos y desbordamiento
    INT_MAX = sys.maxsize
    INT_MIN = -sys.maxsize - 1
    arr_extremes = [INT_MIN, -100, 0, 100, INT_MAX]
    assert binary_search_with_invariant_harness(arr_extremes, INT_MAX) == 4, "Fallo en Caso 5: INT_MAX"
    assert binary_search_with_invariant_harness(arr_extremes, INT_MIN) == 0, "Fallo en Caso 5: INT_MIN"
    assert binary_search_with_invariant_harness(arr_extremes, 0) == 2, "Fallo en Caso 5: Cero central"
    print("Bateria de Casos Patologicos superada con exito (5/5). Invariantes verificados.")

if __name__ == "__main__":
    run_pathological_edge_case_harness()
```

---

## 2. Módulo de Análisis Asintótico Riguroso

### 2.1 Definiciones Matemáticas Formales

El comportamiento de los algoritmos en el límite asintótico se formaliza mediante conjuntos de funciones $f, g: \mathbb{N} \to \mathbb{R}^+$:

> [!IMPORTANT]
> **Cota Superior Asintótica ($\mathcal{O}$ Grande)**:
> $$f(n) \in \mathcal{O}(g(n)) \iff \exists c > 0, \; \exists n_0 \in \mathbb{N} \quad \text{tal que} \quad 0 \le f(n) \le c \cdot g(n), \quad \forall n \ge n_0$$

> [!NOTE]
> **Cota Inferior Asintótica ($\Omega$ Grande)**:
> $$f(n) \in \Omega(g(n)) \iff \exists c > 0, \; \exists n_0 \in \mathbb{N} \quad \text{tal que} \quad 0 \le c \cdot g(n) \le f(n), \quad \forall n \ge n_0$$

> [!TIP]
> **Cota Ajustada Asintótica ($\Theta$ Grande)**:
> $$f(n) \in \Theta(g(n)) \iff \exists c_1 > 0, \; \exists c_2 > 0, \; \exists n_0 \in \mathbb{N} \quad \text{tal que} \quad 0 \le c_1 \cdot g(n) \le f(n) \le c_2 \cdot g(n), \quad \forall n \ge n_0$$
> Equivalencia canónica: $f(n) \in \Theta(g(n)) \iff f(n) \in \mathcal{O}(g(n)) \land f(n) \in \Omega(g(n))$.

- **Cota Superior Estricta ($o$ Pequeña)**: $f(n) \in o(g(n)) \iff \lim_{n \to \infty} \frac{f(n)}{g(n)} = 0$.
- **Cota Inferior Estricta ($\omega$ Pequeña)**: $f(n) \in \omega(g(n)) \iff \lim_{n \to \infty} \frac{f(n)}{g(n)} = \infty$.

#### Jerarquía Asintótica Estricta de Crecimiento:
$$\mathcal{O}(1) \prec \mathcal{O}(\log \log n) \prec \mathcal{O}(\log n) \prec \mathcal{O}(\sqrt{n}) \prec \mathcal{O}(n) \prec \mathcal{O}(n \log n) \prec \mathcal{O}(n^2) \prec \mathcal{O}(n^k) \prec \mathcal{O}(2^n) \prec \mathcal{O}(n!) \prec \mathcal{O}(n^n)$$

### 2.2 Métodos de Resolución de Recurrencias

#### 1. Teorema Maestro (Master Theorem)
Aplica a recurrencias de la forma:
$$T(n) = a T\left(\frac{n}{b}\right) + f(n), \quad a \ge 1, \; b > 1$$
Donde $a$ es el número de subproblemas, $\frac{n}{b}$ el tamaño de cada subproblema y $f(n)$ el costo del paso de división y combinación. Se compara asintóticamente $f(n)$ contra la función crítica $n^{\log_b a}$:

1. **Caso 1 (Dominancia de Hojas)**: Si $f(n) = \mathcal{O}(n^{\log_b a - \epsilon})$ para alguna constante $\epsilon > 0$:
   $$T(n) = \Theta(n^{\log_b a})$$
2. **Caso 2 (Equilibrio)**: Si $f(n) = \Theta(n^{\log_b a} \log^k n)$ para algún $k \ge 0$:
   $$T(n) = \Theta(n^{\log_b a} \log^{k+1} n)$$
3. **Caso 3 (Dominancia de Raíz)**: Si $f(n) = \Omega(n^{\log_b a + \epsilon})$ para alguna constante $\epsilon > 0$ y se cumple la **condición de regularidad** $a f\left(\frac{n}{b}\right) \le c f(n)$ para alguna constante $c < 1$ y $n$ suficientemente grande:
   $$T(n) = \Theta(f(n))$$

#### 2. Método del Árbol de Recursión
Visualización gráfica de la recurrencia:
- Nivel $i$: $a^i$ nodos, cada uno con tamaño de entrada $\frac{n}{b^i}$ y costo $f\left(\frac{n}{b^i}\right)$.
- Costo total por nivel: $C_i = a^i f\left(\frac{n}{b^i}\right)$.
- Altura del árbol: $h = \log_b n$.
- Número de nodos hoja: $a^h = a^{\log_b n} = n^{\log_b a}$.
- Costo total: suma de la serie geométrica sobre todos los niveles $0 \le i \le \log_b n$.

#### 3. Método de Sustitución (Inducción Matemática)
1. Postular la forma de la cota superior o ajustada (ej. conjeturar $T(n) \le c n \log n$).
2. Demostrar la hipótesis por inducción matemática en el paso inductivo utilizando la recurrencia dada.
3. Despejar las constantes $c > 0$ y $n_0 \ge 1$ que hacen válida la desigualdad para los casos base y subsiguientes.

### 2.3 Contabilidad Rigurosa de Memoria (Espacio Auxiliar vs Total)
- **Espacio Total**: Memoria total demandada por el programa, incluyendo los datos de entrada, las estructuras secundarias y la pila de ejecución.
- **Espacio Auxiliar (*Auxiliary Space*)**: Memoria temporal adicional asignada exclusivamente por el algoritmo excluyendo las estructuras de entrada originales.
- **Pila de Recursión (*Call Stack*)**: En algoritmos recursivos, cada invocación reserva un registro de activación en la pila. La complejidad espacial auxiliar mínima es $\mathcal{O}(h)$, donde $h$ es la profundidad máxima del árbol de recursión (ej. QuickSort requiere $\mathcal{O}(\log n)$ espacio auxiliar en pila si se implementa recursión de cola en la partición menor).

---

## 3. Módulo de Estructuras de Datos Avanzadas

### 3.1 Estructuras Lineales y Jerárquicas

| Estructura | Acceso / Búsqueda | Inserción | Eliminación | Espacio | Invariante Central / Propiedad Clave |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Array Dinámico** | $\mathcal{O}(1)$ | $\mathcal{O}(1)$ amor. / $\mathcal{O}(n)$ | $\mathcal{O}(n)$ | $\mathcal{O}(n)$ | Memoria contigua; duplicación de capacidad cuando $size = capacity$. |
| **Lista Enlazada Doble** | $\mathcal{O}(n)$ | $\mathcal{O}(1)$ (con nodo) | $\mathcal{O}(1)$ (con nodo) | $\mathcal{O}(n)$ | Punteros `next` y `prev`; inserción y borrado local en tiempo constante. |
| **Pila / Cola / Deque** | $\mathcal{O}(n)$ / $\mathcal{O}(1)$ peek | $\mathcal{O}(1)$ push/enq | $\mathcal{O}(1)$ pop/deq | $\mathcal{O}(n)$ | Principio LIFO (Pila) o FIFO (Cola); implementable con buffer circular. |
| **BST (Binary Search Tree)**| Prom: $\mathcal{O}(\log n)$<br>Peor: $\mathcal{O}(n)$ | Prom: $\mathcal{O}(\log n)$<br>Peor: $\mathcal{O}(n)$ | Prom: $\mathcal{O}(\log n)$<br>Peor: $\mathcal{O}(n)$ | $\mathcal{O}(n)$ | Para todo nodo $u$: $\forall v \in \text{left}(u), \text{key}(v) < \text{key}(u)$ y $\forall w \in \text{right}(u), \text{key}(w) > \text{key}(u)$. |
| **Árbol AVL** | $\mathcal{O}(\log n)$ | $\mathcal{O}(\log n)$ | $\mathcal{O}(\log n)$ | $\mathcal{O}(n)$ | Factor de balance $BF(u) = h_L - h_R \in \{-1, 0, +1\}$. 4 rotaciones: LL, RR, LR, RL. Altura acotada por $h < 1.44 \log_2 n$. |
| **Árbol Rojo-Negro** | $\mathcal{O}(\log n)$ | $\mathcal{O}(\log n)$ | $\mathcal{O}(\log n)$ | $\mathcal{O}(n)$ | 1. Raíz negra. 2. Hojas NIL negras. 3. Hijos de nodo rojo son negros. 4. Todos los caminos simples tienen igual cantidad de nodos negros (*Black-Height*). |

### 3.2 Heaps y Colas de Prioridad
- **Representación Contigua**: Un Binary Heap de $n$ elementos se mapea compactamente en un array 0-indexado sin punteros:
  - Padre de $i$: $\lfloor\frac{i-1}{2}\rfloor$
  - Hijo izquierdo: $2i + 1$
  - Hijo derecho: $2i + 2$
- **Invariante de Min-Heap**: $\text{arr}[\text{padre}(i)] \le \text{arr}[i]$ para todo $i > 0$.
- **Operaciones**:
  - `sift-up` / `swim`: Inserción al final y flotación hacia arriba ($\mathcal{O}(\log n)$).
  - `sift-down` / `sink`: Extracción de la raíz, sustitución por el último elemento y hundimiento ($\mathcal{O}(\log n)$).
  - `build-heap` / `heapify`: Construcción en $\mathcal{O}(n)$ iterando desde $\lfloor n/2 \rfloor - 1$ hasta $0$. Demostración formal:
    $$\sum_{h=0}^{\lfloor\log n\rfloor} \left\lceil \frac{n}{2^{h+1}} \right\rceil \mathcal{O}(h) = \mathcal{O}\left( n \sum_{h=0}^\infty \frac{h}{2^h} \right) = \mathcal{O}(2n) = \Theta(n)$$

### 3.3 Grafos: Representación, Recorridos y Caminos Óptimos

```mermaid
graph TD
    Graph["Teoría de Grafos G = (V, E)"]
    Graph --> Rep["Representaciones<br/>• Matriz: O(V²)<br/>• Lista: O(V + E)"]
    Graph --> Trav["Recorridos<br/>• BFS: O(V + E) - Colas<br/>• DFS: O(V + E) - Pila/Recursión"]
    Graph --> Short["Caminos Mínimos<br/>• Dijkstra: O((V + E) log V)<br/>• Bellman-Ford: O(V · E)<br/>• Floyd-Warshall: O(V³)"]
    Graph --> MST["Árbol de Expansión Mínima<br/>• Kruskal: O(E log E) con DSU<br/>• Prim: O(E log V) con Heap"]
```

1. **BFS (Breadth-First Search)**:
   - Cola FIFO. Calcula caminos más cortos en número de aristas en grafos no ponderados.
   - Detecta componentes conexas y ciclos en grafos no dirigidos.
2. **DFS (Depth-First Search)**:
   - Pila / llamada recursiva. Registra marcas de tiempo de descubrimiento $d[u]$ y finalización $f[u]$.
   - Clasificación de aristas: Árbol (*Tree*), Vuelta (*Back* $\implies$ presencia de ciclos), Avance (*Forward*) y Cruce (*Cross*).
   - Ordenamiento Topológico en Grafos Acíclicos Dirigidos (DAGs) mediante inserción de nodos ordenados decrecientemente por tiempo de finalización $f[u]$ ($\Theta(V + E)$).
   - Algoritmo de Kosaraju / Tarjan para Componentes Fuertemente Conexas (SCC).
3. **Caminos Mínimos**:
   - **Dijkstra**: Voraz con pesos no negativos ($w(u, v) \ge 0$). Utiliza Min-Priority-Queue con relajación de aristas $d[v] = \min(d[v], d[u] + w(u, v))$. Complejidad: $\mathcal{O}((V + E) \log V)$.
   - **Bellman-Ford**: Relaja todas las aristas $V-1$ veces. Soporta pesos negativos y detecta ciclos negativos si una arista puede relajarse en la pasada $V$ ($\mathcal{O}(V \cdot E)$).
   - **Floyd-Warshall**: Programación dinámica para todas las parejas de vértices: $D^{(k)}[i][j] = \min(D^{(k-1)}[i][j], D^{(k-1)}[i][k] + D^{(k-1)}[k][j])$ en $\Theta(V^3)$.
4. **Árbol de Expansión Mínima (MST)**:
   - **Kruskal**: Ordena aristas por peso creciente y las agrega al bosque si sus extremos pertenecen a componentes distintas, empleando **Disjoint-Set Union (DSU)** ($\mathcal{O}(E \log E)$).
   - **Prim**: Mantiene un árbol creciente agregando vorazmente la arista de menor peso que conecta un vértice del árbol con uno externo ($\mathcal{O}(E \log V)$).

### 3.4 Estructuras Especializadas & Dispersión

1. **Disjoint-Set Union (DSU / Union-Find)**:
   - Modela particiones de un conjunto en subconjuntos disjuntos.
   - **Compresión de Caminos (*Path Compression*)**: En `find(x)`, aplana la jerarquía haciendo que cada nodo visitado apunte directamente a la raíz representativa.
   - **Unión por Rango (*Union by Rank/Size*)**: Conecta el árbol de menor profundidad/tamaño bajo la raíz del árbol mayor.
   - **Complejidad Amortizada**: $\mathcal{O}(\alpha(n))$ por operación, donde $\alpha(n)$ es la inversa de la función de Ackermann (en la práctica, $\alpha(n) \le 4$ para cualquier tamaño computable).

2. **Árboles de Segmentos (Segment Tree) & Fenwick Tree (Binary Indexed Tree - BIT)**:
   - **Segment Tree**: Árbol binario estático sobre un array que permite consultas de agregación sobre intervalos $[L, R]$ (suma, mínimo, máximo, gcd) y actualizaciones puntuales o por rangos (*Lazy Propagation*) en $\mathcal{O}(\log n)$.
   - **Fenwick Tree**: Representación compacta sobre un array indexado por los bits menos significativos (`i & (-i)`) para consultas de sumas de prefijos y actualizaciones puntuales en $\mathcal{O}(\log n)$ y espacio auxiliar $\mathcal{O}(n)$ con factores constantes ultra-reducidos.

3. **Tablas Hash y Resolución de Colisiones**:
   - Factor de carga $\alpha = \frac{n}{m}$, donde $n$ es la cantidad de elementos y $m$ la cantidad de ranuras (*buckets*).
   - **Encadenamiento Separado (*Separate Chaining*)**: Cada ranura almacena una lista enlazada o un BST/Red-Black Tree balanceado si las colisiones exceden un umbral (ej. Java 8 HashMap cambia a Red-Black Tree cuando la cadena supera 8 elementos).
   - **Direccionamiento Abierto (*Open Addressing*)**: Todos los elementos residen directamente en la tabla.
     - *Sondeo Lineal*: $h(k, i) = (h'(k) + i) \bmod m$ (sufre de agrupamiento primario /*primary clustering*).
     - *Sondeo Cuadrático*: $h(k, i) = (h'(k) + c_1 i + c_2 i^2) \bmod m$.
     - *Doble Hashing*: $h(k, i) = (h_1(k) + i \cdot h_2(k)) \bmod m$, con $h_2(k)$ coprimo con $m$.
     - Manejo de borrados: Uso de marcas lápida (*tombstones*) para no interrumpir cadenas de sondeo activas.

4. **Estructuras para Series de Tiempo (TSDB & Telemetría IoT)**:
   - **Ring Buffer (Buffer Circular)**: Array de tamaño fijo con punteros `head` y `tail` modulados por la capacidad $N$. Garantiza inserción y sobreescritura de telemetría en $\mathcal{O}(1)$ temporal y $\mathcal{O}(1)$ espacial, ideal para streaming continuo desde microcontroladores ESP32 o sensores MQTT.
   - **LSM-Trees (Log-Structured Merge-trees)**: Ingesta append-only en estructuras en memoria (*MemTable* ordenada tipo SkipList/Red-Black Tree), persistencia secuencial inmutable a disco (*SSTables*) y compactación periódica en fondo.
   - **Compresión Gorilla / Delta-of-Delta**: Compresión de timestamps enteros mediante segundas diferencias ($\Delta_t = (t_i - t_{i-1}) - (t_{i-1} - t_{i-2})$) y compresión XOR de punto flotante IEEE 754 de 64 bits para telemetría densa.

---

## 4. Módulo de Autómatas, Gramáticas & Compiladores

### 4.1 La Jerarquía de Chomsky & Modelos de Computación

| Nivel | Tipo de Gramática | Forma de Producción | Modelo de Autómata | Aplicación Práctica en Ingeniería |
| :---: | :--- | :--- | :--- | :--- |
| **Tipo-3** | **Regular** | $A \to aB$ o $A \to a$ | **Autómata Finito** (DFA / NFA) | Analizadores léxicos (Scanners / Lexers), expresiones regulares, tokenizadores. |
| **Tipo-2** | **Libre de Contexto** (CFG) | $A \to \alpha$ ($\alpha \in (V \cup \Sigma)^*$) | **Autómata de Pila** (Pushdown Automata - PDA) | Analizadores sintácticos (Parsers), gramáticas EBNF de lenguajes, árboles de sintaxis (AST), JSON, XML. |
| **Tipo-1** | **Sensible al Contexto** (CSG) | $\alpha A \beta \to \alpha \gamma \beta$ ($|\gamma| \ge 1$) | **Autómata Linealmente Acotado** (LBA) | Análisis semántico estático, comprobación de tipos con visibilidad y tablas de símbolos. |
| **Tipo-0** | **Sin Restricciones** | $\alpha \to \beta$ ($\alpha, \beta \in (V \cup \Sigma)^*$) | **Máquina de Turing** (TM) | Lenguajes de programación de propósito general Turing-completos; problemas decidibles e indecidibles. |

### 4.2 Autómatas Finitos & Expresiones Regulares
- **Definición Formal de DFA**: 5-tupla $M = (Q, \Sigma, \delta, q_0, F)$, donde:
  - $Q$: Conjunto finito de estados.
  - $\Sigma$: Alfabeto finito de entrada.
  - $\delta: Q \times \Sigma \to Q$: Función de transición de estados determinista.
  - $q_0 \in Q$: Estado inicial.
  - $F \subseteq Q$: Conjunto de estados de aceptación o finales.
- **NFA (No Determinista)**: $\delta: Q \times (\Sigma \cup \{\epsilon\}) \to \mathcal{P}(Q)$.
- **Construcción de Thompson**: Convierte inductivamente una expresión regular en un NFA-$\epsilon$ equivalente mediante composiciones atómicas de estados para concatenación, unión ($|$) y clausura de Kleene ($*$).
- **Algoritmo de Rabin-Scott (Construcción de Subconjuntos)**: Determina un NFA convirtiendo cada estado del DFA equivalente en un subconjunto de estados del NFA resultante de calcular la función $\epsilon\text{-closure}(T)$.

### 4.3 Pipeline del Compilador Moderno

```mermaid
graph LR
    Src[Código Fuente] -->|Lexer / Scanner| Tok[Stream de Tokens]
    Tok -->|Parser Sintáctico| AST[Abstract Syntax Tree - AST]
    AST -->|Type Checker / Semántica| SymAST[Decorated AST / Symbol Table]
    SymAST -->|IR Lowering| IR[Intermediate Representation / SSA]
    IR -->|Optimizador| OptIR[Optimized SSA Graph]
    OptIR -->|Codegen| ASM[Bytecode / Código Máquina]
```

1. **Análisis Léxico (Lexer)**: Convierte el flujo de caracteres crudos en una secuencia estructurada de tokens con tipo, valor literal, número de línea y columna.
2. **Análisis Sintáctico (Parser)**:
   - **Recursive Descent Parser (Predictivo)**: Implementa una función recursiva por cada no-terminal de la gramática formal. Opera de forma descendente (*top-down*). Para gramáticas LL(1) sin recursión por la izquierda.
   - **Pratt Parsing (Precedence Climbing)**: Algoritmo óptimo para analizar expresiones binarias y unarias complejas asignando a cada operador un poder de unión (*binding power*) izquierdo y derecho. Resuelve precedencia y asociatividad en tiempo lineal $\mathcal{O}(n)$ sin árboles gramaticales profundos.
3. **Árbol de Sintaxis Abstracta (AST)**:
   - Estructura de datos en árbol n-ario fuertemente tipada e inmutable que descarta la sintaxis concreta innecesaria (paréntesis, comas, punto y coma) preservando la jerarquía lógica de las operaciones.
4. **Static Single Assignment (SSA) & IR**:
   - Cada variable es asignada exactamente una sola vez en el código intermedio (ej. $x_1 = a + b; x_2 = x_1 * c$).
   - **Funciones $\phi$ (Phi-nodes)**: Se insertan en los puntos de convergencia del flujo de control para seleccionar dinámicamente la versión de la variable en función de la rama previa ejecutada.
   - Simplifica drásticamente optimizaciones como *Dead Code Elimination*, *Constant Propagation*, *Common Subexpression Elimination* (CSE) y *Global Value Numbering*.

---

## 5. Módulo de Redes Neuronales & Fundamentación Matemática de IA

### 5.1 Perceptrón y Redes Multicapa (MLP)
- **Perceptrón de Rosenblatt**: $z = \mathbf{w}^T \mathbf{x} + b$, salida binaria $\hat{y} = H(z)$ (función de Heaviside). Limitado estrictamente a hiperplanos de separación lineal (incapaz de resolver funciones no lineales como XOR).
- **Multilayer Perceptron (MLP)**: Red alimentada hacia adelante (*feedforward*) con $L$ capas:
  $$\mathbf{z}^{[l]} = \mathbf{W}^{[l]} \mathbf{a}^{[l-1]} + \mathbf{b}^{[l]}$$
  $$\mathbf{a}^{[l]} = \sigma\left(\mathbf{z}^{[l]}\right)$$
  Donde $\mathbf{a}^{[0]} = \mathbf{x}$ es el vector de entrada y $\mathbf{W}^{[l]} \in \mathbb{R}^{n_l \times n_{l-1}}$ la matriz de pesos de la capa $l$.
- **Teorema de Aproximación Universal (Hornik, 1989)**: Una red neuronal feedforward con una única capa oculta finita y funciones de activación no lineales continuas puede aproximar cualquier función continua sobre subconjuntos compactos de $\mathbb{R}^n$ con precisión arbitraria $\epsilon > 0$.

### 5.2 Funciones de Activación & Propiedades Analíticas

| Activación | Ecuación Formal | Derivada Analítica | Rango & Propiedades Críticas |
| :--- | :--- | :--- | :--- |
| **Sigmoide** | $\sigma(z) = \frac{1}{1 + e^{-z}}$ | $\sigma'(z) = \sigma(z)(1 - \sigma(z))$ | $(0, 1)$. Probabilidad binaria. Desvanece gradientes para $|z| \gg 0$. |
| **Tanh** | $\tanh(z) = \frac{e^z - e^{-z}}{e^z + e^{-z}}$ | $\tanh'(z) = 1 - \tanh^2(z)$ | $(-1, 1)$. Centrada en cero. Desvanece gradientes en saturación. |
| **ReLU** | $\text{ReLU}(z) = \max(0, z)$ | $\text{ReLU}'(z) = \begin{cases} 1 & z > 0 \\ 0 & z < 0 \end{cases}$ | $[0, \infty)$. Gradiente unitario constante para $z > 0$. Riesgo de neuronas muertas (*Dying ReLU*). |
| **Leaky ReLU** | $\max(\alpha z, z), \; \alpha \approx 0.01$ | $\begin{cases} 1 & z > 0 \\ \alpha & z \le 0 \end{cases}$ | $(-\infty, \infty)$. Evita neuronas muertas preservando un flujo de gradiente pequeño. |
| **Softmax** | $S(\mathbf{z})_i = \frac{e^{z_i}}{\sum_{j=1}^K e^{z_j}}$ | $\frac{\partial S_i}{\partial z_j} = S_i (\delta_{ij} - S_j)$ | $(0, 1)$ tal que $\sum S_i = 1$. Distribución de probabilidad sobre clases multiclase. |
| **GELU** | $z \cdot \Phi(z) = z P(X \le z)$ | Derivada continua suave | Base en Transformers modernos (BERT, GPT, LLaMA). Aproximación SwiGLU. |

### 5.3 Funciones de Pérdida
1. **Error Cuadrático Medio (MSE)**:
   $$\mathcal{L}_{MSE}(\mathbf{y}, \hat{\mathbf{y}}) = \frac{1}{2n} \sum_{i=1}^n (y_i - \hat{y}_i)^2$$
2. **Entropía Cruzada Binaria (BCE)**:
   $$\mathcal{L}_{BCE}(y, \hat{y}) = -[y \log \hat{y} + (1 - y) \log(1 - \hat{y})]$$
3. **Entropía Cruzada Categórica (CCE)**:
   $$\mathcal{L}_{CCE}(\mathbf{y}, \hat{\mathbf{y}}) = -\sum_{k=1}^K y_k \log \hat{y}_k$$

### 5.4 Derivación Analítica Rigurosa de Retropropagación (Backpropagation)

Sea una red neuronal con capa de salida activada por Softmax y pérdida de Entropía Cruzada Categórica. Demostramos la elegancia del gradiente del error respecto a las combinaciones lineales $\mathbf{z}^{[L]}$:

#### Paso 1: Derivada de CCE respecto a las probabilidades Softmax
$$\frac{\partial \mathcal{L}}{\partial \hat{y}_i} = -\frac{y_i}{\hat{y}_i}$$

#### Paso 2: Aplicación de la Regla de la Cadena con el Jacobiano de Softmax
$$\frac{\partial \mathcal{L}}{\partial z_k^{[L]}} = \sum_{i=1}^K \frac{\partial \mathcal{L}}{\partial \hat{y}_i} \frac{\partial \hat{y}_i}{\partial z_k^{[L]}} = \sum_{i=1}^K \left( -\frac{y_i}{\hat{y}_i} \right) \left[ \hat{y}_i (\delta_{ik} - \hat{y}_k) \right]$$
Expandiendo la sumatoria:
$$= -\sum_{i=1}^K y_i (\delta_{ik} - \hat{y}_k) = -y_k + \hat{y}_k \sum_{i=1}^K y_i$$
Dado que $\mathbf{y}$ es un vector one-hot de etiquetas reales, $\sum_{i=1}^K y_i = 1$:
$$\boldsymbol{\delta}^{[L]} = \frac{\partial \mathcal{L}}{\partial \mathbf{z}^{[L]}} = \hat{\mathbf{y}} - \mathbf{y}$$

#### Paso 3: Propagación de Gradientes a los Pesos y Capas Ocultas
Para cualquier capa $l$ con pesos $\mathbf{W}^{[l]}$, sesgos $\mathbf{b}^{[l]}$, entradas $\mathbf{a}^{[l-1]}$ y error local $\boldsymbol{\delta}^{[l]} = \frac{\partial \mathcal{L}}{\partial \mathbf{z}^{[l]}}$:

1. **Gradiente respecto a la Matriz de Pesos**:
   $$\frac{\partial \mathcal{L}}{\partial \mathbf{W}^{[l]}} = \boldsymbol{\delta}^{[l]} \cdot \left(\mathbf{a}^{[l-1]}\right)^T \in \mathbb{R}^{n_l \times n_{l-1}}$$
2. **Gradiente respecto al Vector de Sesgos**:
   $$\frac{\partial \mathcal{L}}{\partial \mathbf{b}^{[l]}} = \boldsymbol{\delta}^{[l]} \in \mathbb{R}^{n_l}$$
3. **Error Local de la Capa Anterior (Backprop Step)**:
   $$\boldsymbol{\delta}^{[l-1]} = \left( (\mathbf{W}^{[l]})^T \boldsymbol{\delta}^{[l]} \right) \odot \sigma'\left(\mathbf{z}^{[l-1]}\right)$$
   Donde $\odot$ representa el producto de Hadamard (elemento a elemento).

### 5.5 Arquitectura Transformer & Mecanismo de Autoatención

1. **Scaled Dot-Product Attention**:
   $$\text{Attention}(Q, K, V) = \text{softmax}\left( \frac{Q K^T}{\sqrt{d_k}} \right) V$$
   - $Q = X W_Q$ (Queries), $K = X W_K$ (Keys), $V = X W_V$ (Values), con $X \in \mathbb{R}^{N \times d_{\text{model}}}$.
   - **Justificación del Factor $\frac{1}{\sqrt{d_k}}$**: Si los componentes de $Q$ y $K$ son variables aleatorias independientes de media 0 y varianza 1, su producto punto $\sum_{i=1}^{d_k} q_i k_i$ tiene media 0 y varianza $d_k$. Al dividir por $\sqrt{d_k}$, la varianza se normaliza a 1, evitando que el argumento del Softmax crezca desproporcionadamente y sature las regiones donde la derivada es asintóticamente nula (gradientes desvanecientes).
2. **Multi-Head Attention (MHA)**:
   $$\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, \dots, \text{head}_h) W_O$$
   Permite al modelo atender conjuntamente a información proveniente de distintos subespacios de representación y posiciones relativas.
3. **Estabilidad & Inferencia en Producción**:
   - **Optimizador AdamW**: Desacopla el decaimiento de pesos (*weight decay*) de la actualización del momento adaptativo de gradiente.
   - **Normalizaciones**: Preferencia de *Pre-LayerNorm* y *RMSNorm* sobre *Post-LayerNorm* para permitir entrenamientos profundos sin explosión de gradientes.
   - **Optimización e Inferencia**: Exportación a formato abierto ONNX y cuantización INT8 (PTQ/QAT) para reducir la latencia de memoria hasta $4\times$.

---

## 6. Módulo de Criptografía Aplicada & Seguridad Computacional

### 6.1 Criptografía Simétrica & Cifrado Autenticado (AEAD)

```mermaid
graph TD
    Data[Datos Planos + Clave Secreta] --> Mode{Modo de Cifrado}
    Mode -->|ECB: Prohibido| Insecure[❌ Filtra patrones idénticos]
    Mode -->|CBC: Solo si legacy| Padding[Requiere IV CSPRNG + PKCS#7]
    Mode -->|AEAD: Recomendado| AEAD[✅ Confidencialidad + Integridad]
    AEAD --> GCM[AES-256-GCM]
    AEAD --> ChaCha[ChaCha20-Poly1305]
```

- **AEAD (Authenticated Encryption with Associated Data)**:
  - Primitivas estándar: **AES-256-GCM** (por hardware con aceleración AES-NI) y **ChaCha20-Poly1305** (por software de ultra-alta velocidad en arquitecturas móviles/ARM).
  - Produce un **Texto Cifrado** y un **Tag de Autenticación** criptográfico (128 bits). Cualquier alteración en tránsito o en reposo invalida la verificación y aborta el descifrado antes de procesar el contenido.
- **La Regla de Oro del Nonce**:
  - En AES-GCM y ChaCha20, el **Nonce (Number used Once, 96 bits)** jamás debe reutilizarse con la misma clave de cifrado.
  - La reutilización del nonce permite al adversario calcular el XOR de los textos planos ($C_1 \oplus C_2 = P_1 \oplus P_2$), recuperando la máscara de flujo y quebrando el autenticador GHASH/Poly1305 para forjar mensajes arbitrarios.

### 6.2 Criptografía Asimétrica & Teoría de Números

1. **Fundamentos de Aritmética Modular**:
   - **Pequeño Teorema de Fermat**: Si $p$ es primo y $\gcd(a, p) = 1$, entonces $a^{p-1} \equiv 1 \pmod p$.
   - **Función Totiente de Euler $\phi(n)$**: Para $n = p \cdot q$ (con $p, q$ primos distintos), $\phi(n) = (p - 1)(q - 1)$.
   - **Teorema de Euler**: Si $\gcd(a, n) = 1$, entonces $a^{\phi(n)} \equiv 1 \pmod n$.
2. **Criptosistema RSA**:
   - Generación de claves: Elegir primos gigantes $p, q$; calcular $n = pq$ y $\phi(n) = (p-1)(q-1)$.
   - Exponente público estándar: $e = 65537 = 2^{16} + 1$ (número de Fermat con baja densidad de bits para acelerar la exponenciación modular).
   - Clave privada: $d \equiv e^{-1} \pmod{\phi(n)}$ mediante el **Algoritmo Extendido de Euclides**.
   - Cifrado: $c = m^e \bmod n$. Descifrado: $m = c^d \bmod n$.
   - **Esquemas de Relleno Obligatorios**: Queda prohibido RSA directo ("de libro"). Emplear siempre **OAEP** (*Optimal Asymmetric Encryption Padding*) para confidencialidad y **PSS** (*Probabilistic Signature Scheme*) para firmas digitales, previniendo ataques por maleabilidad y homomorfismo multiplicativo.
3. **Criptografía de Curvas Elípticas (ECC)**:
   - Basada en el problema del logaritmo discreto sobre grupos abelianos de puntos en curvas algebraicas: $Q = d \cdot G$ (donde $d$ es la clave privada escalar y $Q$ el punto público resultante de multiplicar el punto generador $G$).
   - Curvas estándar modernas:
     - **Curve25519 / Ed25519**: Curvas de Montgomery y Edwards seguras contra ataques de canal lateral (usadas en OpenSSH, TLS 1.3, Signal). Ofrecen 128 bits de seguridad con claves de apenas 256 bits (equivalentes a 3072 bits en RSA).
     - **secp256k1**: Curva de Koblitz estándar empleada en redes descentralizadas.
   - **ECDHE (Elliptic Curve Diffie-Hellman Ephemeral)**: Intercambio de claves efímero que garantiza **Secreto Hacia Adelante (*Forward Secrecy*)**: el compromiso futuro de una clave a largo plazo no compromete las sesiones pasadas.

### 6.3 Hashing Criptográfico, Árboles de Merkle & Buenas Prácticas

1. **Propiedades del Hash Criptográfico**:
   - *Resistencia a la Preimagen*: Dado $h$, es computacionalmente inviable hallar $m$ tal que $H(m) = h$.
   - *Resistencia a la Segunda Preimagen*: Dado $m_1$, es computacionalmente inviable hallar $m_2 \neq m_1$ tal que $H(m_1) = H(m_2)$.
   - *Resistencia a Colisiones*: Es inviable hallar cualquier par $m_1 \neq m_2$ con $H(m_1) = H(m_2)$ (paradoja del cumpleaños: requiere $\mathcal{O}(2^{n/2})$ operaciones para $n$ bits).
   - Algoritmos estándar: **SHA-256**, **SHA-3 (Keccak)**, **BLAKE3**.
2. **Derivación de Claves y Protección de Contraseñas**:
   - Prohibido utilizar funciones de hash rápido (MD5, SHA-1, SHA-256) para proteger contraseñas.
   - Utilizar funciones con memoria dura y coste temporal ajustable: **Argon2id** (estándar preferente) o **bcrypt**.
3. **Árboles de Merkle (Merkle Trees)**:
   - Estructura jerárquica binaria donde las hojas contienen hashes de bloques de datos y cada nodo interno es el hash concatenado de sus hijos: $\text{Node} = H(\text{Left} \parallel \text{Right})$.
   - **Prueba de Inclusión (*Merkle Proof*)**: Permite verificar la existencia inmutable de cualquier bloque dentro del árbol con solo $\log_2 N$ hashes intermedios, sin revelar el resto del conjunto de datos.
4. **Vectores de Ataque Críticos & Buenas Prácticas**:
   - **Generación de Números Aleatorios**: Utilizar exclusivamente CSPRNG (`os.urandom()`, `crypto.getRandomValues()`, `/dev/urandom`). Jamás emplear generadores lineales como `random.random()` o `Math.random()` para seguridad.
   - **Timing Attacks (Ataques por Tiempo)**: Toda verificación de claves, firmas o tags HMAC debe realizarse en **tiempo constante** (ej. `hmac.compare_digest()` en Python o `subtle.constantTimeCompare()` en Go) para evitar que un adversario deduzca bytes por diferencias de microsegundos en la comparación.

---

## 7. Micro-Ejemplos Canónicos de Demostración & Código

> [!NOTE] Referencias Extensas de Implementación
> Para consultar las implementaciones algorítmicas completas, pruebas trilingües y modelos de compiladores, lee el archivo de soporte mediante `view_file`:
> - [references/examples.md](references/examples.md)

### Catálogo de Implementaciones Disponibles en Referencia:
1. **Invariante de Bucle y Búsqueda Binaria**: Demostración y transición pedagógica trilingüe (PSeInt $\to$ Python 3 $\to$ Go).
2. **Árbol Binario de Búsqueda (BST) Autobalanceado**: Inserciones, rotaciones y demostración asintótica.
3. **Parser de Descenso Recursivo con AST Tipado**: Análisis léxico y sintáctico para expresiones aritméticas.
4. **Diseño Combinatorio de Pruebas (PICT / Pairwise Testing)**: Matrices ortogonales y reducción exponencial de casos.

---

## 8. Checklist de Rigor Técnico para `ada-turing`

Al diseñar algoritmos, arquitecturas de datos, gramáticas, modelos de IA o esquemas criptográficos, verificar:

- [ ] **Complejidad Asintótica**: Cotas temporal y espacial expresadas con precisión asintótica formal ($\mathcal{O}, \Omega, \Theta$).
- [ ] **Invariantes de Bucle**: Demostradas explícitamente las tres fases (Inicialización, Mantenimiento y Terminación).
- [ ] **Batería de Casos Patológicos**: Algoritmo sometido y validado contra los 5 casos de estrés universales (vacía/nula, unitaria, repetidos, orden inverso/peor caso, y valores extremos/desbordamiento).
- [ ] **Harness de Verificación de Invariantes**: Arnés de prueba ejecutable (`assert` harness) que comprueba activamente los invariantes en cada iteración y previene regresiones.
- [ ] **Diseño de Pruebas Combinatorias**: Cobertura de factores modelada con PICT (matrices ortogonales de pares) para evitar la explosión combinatoria.
- [ ] **Gramáticas y Compilación**: Gramáticas libres de conflictos de ambigüedad; tokens con posiciones exactas; ASTs inmutables.
- [ ] **Redes Neuronales**: Formas de tensores validadas en cada etapa; derivación analítica de la regla de la cadena documentada; protección contra división por cero y $\log(0)$ con $\epsilon$.
- [ ] **Seguridad Criptográfica**: Claves y nonces generados exclusivamente mediante CSPRNG; nonces únicos garantizados; comparaciones de hashes en tiempo constante.


