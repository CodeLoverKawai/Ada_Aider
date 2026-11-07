# Micro-Ejemplos Canónicos de Demostración & Código (ada-turing)

### Ejemplo 1: Invariante de Bucle y Búsqueda Binaria (PSeInt $\to$ Python 3 $\to$ Go)

#### 1. Formulación Matemática del Invariante
Sea un arreglo ordenado $A[0 \dots n-1]$ y un valor buscado $T$.
- **Invariante**: Al inicio de cada iteración del bucle, si el valor $T$ está presente en el arreglo original $A$, entonces se encuentra estrictamente dentro del subrango $A[\text{low} \dots \text{high}]$.
- **Inicialización**: $\text{low} = 0, \text{high} = n - 1$. El subrango abarca todo el arreglo $A[0 \dots n-1]$; el invariante se cumple trivialmente.
- **Mantenimiento**: En cada paso se calcula $\text{mid} = \text{low} + \lfloor\frac{\text{high} - \text{low}}{2}\rfloor$.
  - Si $A[\text{mid}] = T$, se halla el elemento.
  - Si $A[\text{mid}] < T$, dado que $A$ está ordenado, $\forall i \le \text{mid}, A[i] \le A[\text{mid}] < T$. Por ende, $T$ no puede residir en $A[\text{low} \dots \text{mid}]$. Establecer $\text{low} = \text{mid} + 1$ preserva el invariante.
  - Si $A[\text{mid}] > T$, análogamente $\forall i \ge \text{mid}, A[i] \ge A[\text{mid}] > T$. Establecer $\text{high} = \text{mid} - 1$ preserva el invariante.
- **Terminación**: El bucle finaliza cuando $\text{low} > \text{high}$ (subrango vacío) o cuando $A[\text{mid}] = T$. Si el rango es vacío, por el invariante $T$ no existe en $A$. Complejidad temporal: $T(n) = T(n/2) + \Theta(1) \implies \Theta(\log n)$. Espacio auxiliar: $\mathcal{O}(1)$.

#### 2. Transición Trilingüe de Código

##### A. Pseudocódigo PSeInt (Perfil Estricto Universitario)
```text
Algoritmo BusquedaBinaria
    Definir n, i, objetivo, low, high, mid, pos Como Entero;
    Dimension arr[10];
    arr[1] <- 2; arr[2] <- 5; arr[3] <- 8; arr[4] <- 12; arr[5] <- 16;
    arr[6] <- 23; arr[7] <- 38; arr[8] <- 45; arr[9] <- 56; arr[10] <- 72;
    objetivo <- 23;
    
    low <- 1;
    high <- 10;
    pos <- -1;
    
    Mientras low <= high Y pos = -1 Hacer
        mid <- trunc(low + (high - low) / 2);
        Si arr[mid] = objetivo Entonces
            pos <- mid;
        Sino
            Si arr[mid] < objetivo Entonces
                low <- mid + 1;
            Sino
                high <- mid - 1;
            FinSi
        FinSi
    FinMientras
    
    Si pos <> -1 Entonces
        Escribir "Elemento hallado en la posicion: ", pos;
    Sino
        Escribir "Elemento no encontrado en el arreglo.";
    FinSi
FinAlgoritmo
```

##### B. Python 3 (Idiomático & Type-Hinted)
```python
def binary_search(arr: list[int], target: int) -> int:
    """Ejecuta busqueda binaria iterativa sobre un arreglo ordenado.
    
    Complejidad Temporal: O(log n)
    Espacio Auxiliar: O(1)
    """
    low: int = 0
    high: int = len(arr) - 1

    while low <= high:
        # Previene desbordamiento de enteros presente en (low + high) // 2
        mid: int = low + (high - low) // 2
        mid_val: int = arr[mid]

        if mid_val == target:
            return mid
        elif mid_val < target:
            low = mid + 1
        else:
            high = mid - 1

    return -1
```

##### C. Go (Concurrente & Tipado Estático)
```go
package main

import "fmt"

// BinarySearch localiza el índice de target en un slice ordenado.
// Complejidad Temporal: O(log n), Espacio: O(1).
func BinarySearch(arr []int, target int) int {
	low := 0
	high := len(arr) - 1

	for low <= high {
		mid := low + (high-low)/2
		if arr[mid] == target {
			return mid
		}
		if arr[mid] < target {
			low = mid + 1
		} else {
			high = mid - 1
		}
	}
	return -1
}

func main() {
	datos := []int{2, 5, 8, 12, 16, 23, 38, 45, 56, 72}
	idx := BinarySearch(datos, 23)
	fmt.Printf("Elemento hallado en indice: %d\n", idx)
}
```

---

### Ejemplo 2: Disjoint-Set Union (DSU) con Invariantes en Python 3

```python
class DisjointSetUnion:
    """Implementa DSU con Path Compression y Union by Rank.
    
    Invariantes:
    1. parent[i] apunta a un ancestro directo o a si mismo si es raiz.
    2. rank[root] representa una cota superior estricta sobre la altura del arbol.
    Complejidad por operacion: O(alpha(n)) amortizado.
    """
    def __init__(self, n: int) -> None:
        self.parent: list[int] = list(range(n))
        self.rank: list[int] = [0] * n
        self.num_components: int = n

    def find(self, i: int) -> int:
        """Encuentra la raiz del conjunto con Path Compression."""
        if self.parent[i] != i:
            self.parent[i] = self.find(self.parent[i])  # Compresion de camino
        return self.parent[i]

    def union(self, i: int, j: int) -> bool:
        """Une los conjuntos que contienen a i y j. Retorna True si eran disjuntos."""
        root_i: int = self.find(i)
        root_j: int = self.find(j)

        if root_i == root_j:
            return False  # Ya pertenecen al mismo conjunto (ciclo detectado)

        # Union por rango
        if self.rank[root_i] < self.rank[root_j]:
            self.parent[root_i] = root_j
        elif self.rank[root_i] > self.rank[root_j]:
            self.parent[root_j] = root_i
        else:
            self.parent[root_j] = root_i
            self.rank[root_i] += 1

        self.num_components -= 1
        return True
```

---

### Ejemplo 3: Analizador Léxico y Sintáctico con AST (Pratt / Descent)

```python
from dataclasses import dataclass
from typing import Literal

# --- 1. DEFINICION DEL AST (Abstract Syntax Tree) ---
@dataclass(frozen=True)
class ASTNode:
    pass

@dataclass(frozen=True)
class NumberNode(ASTNode):
    value: float

@dataclass(frozen=True)
class BinOpNode(ASTNode):
    left: ASTNode
    op: Literal['+', '-', '*', '/']
    right: ASTNode

# --- 2. ANALIZADOR LEXICO (Lexer) ---
@dataclass(frozen=True)
class Token:
    type: Literal['NUM', 'PLUS', 'MINUS', 'MUL', 'DIV', 'LPAREN', 'RPAREN', 'EOF']
    value: str

class Lexer:
    def __init__(self, text: str) -> None:
        self.text = text
        self.pos = 0

    def get_tokens(self) -> list[Token]:
        tokens: list[Token] = []
        while self.pos < len(self.text):
            ch = self.text[self.pos]
            if ch.isspace():
                self.pos += 1
            elif ch.isdigit() or ch == '.':
                start = self.pos
                while self.pos < len(self.text) and (self.text[self.pos].isdigit() or self.text[self.pos] == '.'):
                    self.pos += 1
                tokens.append(Token('NUM', self.text[start:self.pos]))
            elif ch == '+': tokens.append(Token('PLUS', '+')); self.pos += 1
            elif ch == '-': tokens.append(Token('MINUS', '-')); self.pos += 1
            elif ch == '*': tokens.append(Token('MUL', '*')); self.pos += 1
            elif ch == '/': tokens.append(Token('DIV', '/')); self.pos += 1
            elif ch == '(': tokens.append(Token('LPAREN', '(')); self.pos += 1
            elif ch == ')': tokens.append(Token('RPAREN', ')')); self.pos += 1
            else: raise ValueError(f"Caracter desconocido: {ch}")
        tokens.append(Token('EOF', ''))
        return tokens

# --- 3. ANALIZADOR SINTACTICO (Recursive Descent Parser) ---
class ExprParser:
    def __init__(self, tokens: list[Token]) -> None:
        self.tokens = tokens
        self.pos = 0

    def peek(self) -> Token:
        return self.tokens[self.pos]

    def consume(self, expected_type: str) -> Token:
        tok = self.peek()
        if tok.type != expected_type:
            raise SyntaxError(f"Se esperaba {expected_type}, se recibio {tok.type}")
        self.pos += 1
        return tok

    # Factor: NUM | '(' Expr ')'
    def parse_factor(self) -> ASTNode:
        tok = self.peek()
        if tok.type == 'NUM':
            self.consume('NUM')
            return NumberNode(float(tok.value))
        elif tok.type == 'LPAREN':
            self.consume('LPAREN')
            node = self.parse_expr()
            self.consume('RPAREN')
            return node
        raise SyntaxError(f"Token no valido en factor: {tok.type}")

    # Term: Factor (('*' | '/') Factor)*
    def parse_term(self) -> ASTNode:
        left = self.parse_factor()
        while self.peek().type in ('MUL', 'DIV'):
            op = self.consume(self.peek().type).value
            right = self.parse_factor()
            left = BinOpNode(left, op, right)
        return left

    # Expr: Term (('+' | '-') Term)*
    def parse_expr(self) -> ASTNode:
        left = self.parse_term()
        while self.peek().type in ('PLUS', 'MINUS'):
            op = self.consume(self.peek().type).value
            right = self.parse_term()
            left = BinOpNode(left, op, right)
        return left

def evaluate_ast(node: ASTNode) -> float:
    match node:
        case NumberNode(val): return val
        case BinOpNode(left, '+', right): return evaluate_ast(left) + evaluate_ast(right)
        case BinOpNode(left, '-', right): return evaluate_ast(left) - evaluate_ast(right)
        case BinOpNode(left, '*', right): return evaluate_ast(left) * evaluate_ast(right)
        case BinOpNode(left, '/', right): return evaluate_ast(left) / evaluate_ast(right)
```

---

### Ejemplo 4: MLP de 2 Capas con Retropropagación Analítica Pura en NumPy

```python
import numpy as np

class TwoLayerMLP:
    """Red Neuronal de 2 capas con activacion ReLU en oculta, Softmax en salida
    y funcion de perdida Categorical Cross-Entropy, resuelta mediante calculo analitico puro.
    """
    def __init__(self, input_dim: int, hidden_dim: int, num_classes: int, lr: float = 0.01) -> None:
        # Inicializacion He (Kaiming) para estabilidad numerica con ReLU
        self.W1 = np.random.randn(hidden_dim, input_dim) * np.sqrt(2.0 / input_dim)
        self.b1 = np.zeros((hidden_dim, 1))
        # Inicializacion Xavier / Glorot para Softmax
        self.W2 = np.random.randn(num_classes, hidden_dim) * np.sqrt(1.0 / hidden_dim)
        self.b2 = np.zeros((num_classes, 1))
        self.lr = lr

    def _relu(self, z: np.ndarray) -> np.ndarray:
        return np.maximum(0.0, z)

    def _relu_deriv(self, z: np.ndarray) -> np.ndarray:
        return (z > 0).astype(float)

    def _softmax(self, z: np.ndarray) -> np.ndarray:
        # Softmax numericamente estable restando maximo por columna
        shift_z = z - np.max(z, axis=0, keepdims=True)
        exp_z = np.exp(shift_z)
        return exp_z / np.sum(exp_z, axis=0, keepdims=True)

    def forward(self, X: np.ndarray) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
        """X tiene dimension (input_dim, batch_size)."""
        Z1 = np.dot(self.W1, X) + self.b1
        A1 = self._relu(Z1)
        Z2 = np.dot(self.W2, A1) + self.b2
        A2 = self._softmax(Z2)
        return Z1, A1, A2

    def train_step(self, X: np.ndarray, Y: np.ndarray) -> float:
        """Ejecuta un ciclo forward y backward analitico sin autograd magico.
        Y es una matriz one-hot de dimension (num_classes, batch_size).
        """
        batch_size = X.shape[1]
        Z1, A1, A2 = self.forward(X)

        # Calculo de perdida CCE con epsilon para evitar log(0)
        loss = -np.sum(Y * np.log(A2 + 1e-15)) / batch_size

        # --- RETROPROPAGACION ANALITICA ---
        # 1. Gradiente de salida: dL/dZ2 = (A2 - Y)
        dZ2 = (A2 - Y) / batch_size
        dW2 = np.dot(dZ2, A1.T)
        db2 = np.sum(dZ2, axis=1, keepdims=True)

        # 2. Gradiente a capa oculta: dL/dZ1 = (W2^T dZ2) * ReLU'(Z1)
        dA1 = np.dot(self.W2.T, dZ2)
        dZ1 = dA1 * self._relu_deriv(Z1)
        dW1 = np.dot(dZ1, X.T)
        db1 = np.sum(dZ1, axis=1, keepdims=True)

        # Actualizacion por descenso de gradiente
        self.W2 -= self.lr * dW2
        self.b2 -= self.lr * db2
        self.W1 -= self.lr * dW1
        self.b1 -= self.lr * db1

        return float(loss)
```

---

### Ejemplo 5: Cifrado AEAD Autenticado (AES-256-GCM) y HMAC Seguro en Python

```python
import os
import hmac
import hashlib
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

def encrypt_aead_aes256_gcm(plaintext: bytes, key: bytes, associated_data: bytes = b"") -> tuple[bytes, bytes]:
    """Cifra datos empleando AES-256-GCM (AEAD).
    
    Invariantes:
    1. Key debe tener estrictamente 256 bits (32 bytes).
    2. Nonce debe ser generado con CSPRNG y jamas reutilizarse con la misma clave.
    Retorna (nonce, ciphertext_con_tag).
    """
    if len(key) != 32:
        raise ValueError("La clave para AES-256 debe tener exactamente 32 bytes.")

    aesgcm = AESGCM(key)
    # Generacion de Nonce de 96 bits (12 bytes) mediante CSPRNG
    nonce = os.urandom(12)
    # AESGCM cifra y anexa el tag de autenticacion de 16 bytes al final
    ciphertext_and_tag = aesgcm.encrypt(nonce, plaintext, associated_data)
    return nonce, ciphertext_and_tag

def decrypt_aead_aes256_gcm(nonce: bytes, ciphertext_and_tag: bytes, key: bytes, associated_data: bytes = b"") -> bytes:
    """Descifra y verifica la integridad del texto cifrado y datos asociados."""
    aesgcm = AESGCM(key)
    # Si el tag fue manipulado, lanza InvalidTag y aborta el descifrado
    return aesgcm.decrypt(nonce, ciphertext_and_tag, associated_data)

def verify_hmac_constant_time(key: bytes, message: bytes, expected_mac: bytes) -> bool:
    """Calcula y verifica un HMAC-SHA256 en tiempo constante para prevenir Timing Attacks."""
    computed_mac = hmac.new(key, message, hashlib.sha256).digest()
    # Comparacion en tiempo constante O(1) temporal independiente de similitud de bytes
    return hmac.compare_digest(computed_mac, expected_mac)
```

---

## 7. Módulo de Diseño Combinatorio de Pruebas (PICT / Pairwise Testing)

### 7.1 Fundamentación Matemática: Superación de la Explosión Combinatoria
En sistemas con $k$ variables de entrada donde cada variable adopta $v$ valores de prueba, la cobertura exhaustiva demanda $v^k$ casos de prueba, un crecimiento exponencial que satura los recursos computacionales y temporales.

Sin embargo, los estudios empíricos en ciencias de la computación (NIST, Kuhn et al.) demuestran que **entre el 70% y el 90% de los defectos en software se disparan por la interacción de a lo sumo 2 factores (pairwise interaction)**, y más del 95% por interacciones de 3 factores.

El diseño combinatorio con **PICT (Pairwise Independent Combinatorial Testing)** modela el espacio de entradas como una matriz ortogonal de cobertura $N$-way, garantizando que todo par posible de valores entre dos parámetros cualesquiera sea evaluado al menos una vez, reduciendo la suite de pruebas entre un 80% y un 90% respecto a la fuerza bruta.

### 7.2 Sintaxis Formal del Modelo PICT
Un modelo de pruebas combinatorias consta de tres componentes:

```text
# 1. Parámetros y Partición en Clases de Equivalencia
ParametroA: Valor1, Valor2, Valor3
ParametroB: Activo, Inactivo
ParametroC: Minimo, Nominal, Maximo, Invalido

# 2. Submodelos (Opcional, para combinatoria de orden superior en módulos críticos)
{ ParametroA, ParametroB } @ 2

# 3. Restricciones Condicionales de Negocio (Constraints)
IF [ParametroA] = "Valor1" THEN [ParametroB] = "Activo";
IF [ParametroC] = "Invalido" THEN [ParametroA] <> "Valor3";
```

### 7.3 Generador Algorítmico Pairwise en Python Puro (Zero Dependencies)
A continuación se presenta el motor de cobertura de pares de interacción para utilizar en entornos de desarrollo sin dependencias externas:

```python
import itertools
from typing import Dict, List, Set, Tuple

def generate_pairwise_tests(
    parameters: Dict[str, List[str]], 
    constraints: List[callable] = None
) -> List[Dict[str, str]]:
    """Genera una suite de pruebas con cobertura completa de pares (2-way).
    
    Aplica una heuristica voraz (Greedy) para cubrir todos los pares no satisfechos
    en el menor numero de casos de prueba posible.
    """
    param_names = list(parameters.keys())
    # 1. Construir el conjunto universal de todos los pares requeridos
    all_pairs: Set[Tuple[Tuple[str, str], Tuple[str, str]]] = set()
    for (p1, p2) in itertools.combinations(param_names, 2):
        for v1 in parameters[p1]:
            for v2 in parameters[p2]:
                all_pairs.add(((p1, v1), (p2, v2)))

    test_cases: List[Dict[str, str]] = []
    uncovered_pairs = set(all_pairs)

    while uncovered_pairs:
        # Seleccionar el par prioritario que aun no ha sido cubierto
        target_pair = next(iter(uncovered_pairs))
        (tp1, tv1), (tp2, tv2) = target_pair
        
        # Candidato inicial
        current_case = {tp1: tv1, tp2: tv2}
        
        # Asignar valores a los demas parametros maximizando pares cubiertos
        for p in param_names:
            if p in current_case:
                continue
            best_val = parameters[p][0]
            max_covered = -1
            for val in parameters[p]:
                # Evaluar restricciones si aplican
                tentative = dict(current_case)
                tentative[p] = val
                if constraints and not all(c(tentative) for c in constraints):
                    continue
                # Contar cuantos pares nuevos cubriria este valor
                covered_count = sum(
                    1 for existing_p, existing_v in current_case.items()
                    if ((existing_p, existing_v), (p, val)) in uncovered_pairs or
                       ((p, val), (existing_p, existing_v)) in uncovered_pairs
                )
                if covered_count > max_covered:
                    max_covered = covered_count
                    best_val = val
            current_case[p] = best_val

        # Verificar restricciones finales del caso generado
        if constraints and not all(c(current_case) for c in constraints):
            uncovered_pairs.remove(target_pair)
            continue

        test_cases.append(current_case)
        # Eliminar todos los pares que este caso cubre
        for (p1, p2) in itertools.combinations(param_names, 2):
            uncovered_pairs.discard(((p1, current_case[p1]), (p2, current_case[p2])))

    return test_cases
```

