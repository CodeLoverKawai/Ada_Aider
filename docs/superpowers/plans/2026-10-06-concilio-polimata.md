# Plan de Implementación: Concilio Polímata y Forja Intelectual (Ada_Aider)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consolidar 33 habilidades fragmentadas en 5 arquetipos polímatas de élite (`ada-socrates`, `ada-davinci`, `ada-newton`, `ada-turing`, `ada-neumann`), actualizar el router maestro `GEMINI.md`, podar carpetas obsoletas y verificar la suite de tests.

**Architecture:** Transición modular limpia: creación de los 5 archivos `SKILL.md` estructurados con YAML frontmatter y guardrails pedagógicos estrictos; eliminación de las 33 carpetas redundantes; actualización del catálogo dinámico `GEMINI.md` y documentación; verificación empírica mediante `npm test`.

**Tech Stack:** Node.js (CommonJS, Test Runner nativo), Markdown (BlockSuite, KaTeX, Mermaid, YAML frontmatter), Bash.

## Global Constraints
- Cero dependencias externas npm (Vanilla Node.js 18+).
- Cero enlaces rotos en `GEMINI.md` y `README.md`.
- Todos los tests unitarios e integración existentes (25 tests) deben continuar pasando en verde con código de salida 0.

---

### Task 1: Crear `skills/ada-socrates/SKILL.md`

**Files:**
- Create: `skills/ada-socrates/SKILL.md`

- [ ] **Paso 1: Redactar especificación completa de `ada-socrates`**
  - YAML frontmatter con nombre y descripción.
  - 3 modos de intensidad: Mayéutica (por defecto), Simulador de Parcial (`/socrates exam`), Sparring Dialéctico (`/socrates sparring`).
  - Guardrails anti-sycophancy, epistemic calibration (Taxonomía de Bloom) y articulación Feynman obligatoria.
  - Cero respuestas directas o código regalado sin esfuerzo manual previo.

- [ ] **Paso 2: Guardar archivo y verificar formato YAML**
  - Comprobar que no haya errores de sintaxis y que las rutas sean consistentes.

---

### Task 2: Crear `skills/ada-davinci/SKILL.md`

**Files:**
- Create: `skills/ada-davinci/SKILL.md`

- [ ] **Paso 1: Redactar especificación completa de `ada-davinci`**
  - YAML frontmatter con nombre y descripción.
  - Absorbe: `ada-research`, `ada-breakdown`, `ada-thesis`, `ada-career`, `ada-collab`, `ada-ethics`, `ada-orthodox`, `ada-affinite-note`.
  - Módulos: BlockSuite para AFFiNE (KaTeX, Mermaid, Callouts), Normas APA 7ma Edición institucional (UNIMINUTO), Estructuración WBS de proyectos y Ética del software/humanismo.

- [ ] **Paso 2: Guardar archivo y verificar formato YAML**

---

### Task 3: Crear `skills/ada-newton/SKILL.md`

**Files:**
- Create: `skills/ada-newton/SKILL.md`

- [ ] **Paso 1: Redactar especificación completa de `ada-newton`**
  - YAML frontmatter con nombre y descripción.
  - Absorbe: `ada-math`, `ada-discrete`, `ada-prob`, `ada-or`, `ada-physics`.
  - Módulos: Ruta Stewart (Precálculo, Cálculo Diferencial, Integral, Multivariable), Regla de Cero Pasos Mágicos (justificación de propiedades algebraicas intermedias), Física Clásica (diagramas de cuerpo libre, dinámica, energía) y Optimización/Simplex.

- [ ] **Paso 2: Guardar archivo y verificar formato YAML**

---

### Task 4: Crear `skills/ada-turing/SKILL.md`

**Files:**
- Create: `skills/ada-turing/SKILL.md`

- [ ] **Paso 1: Redactar especificación completa de `ada-turing`**
  - YAML frontmatter con nombre y descripción.
  - Absorbe: `ada-algo`, `ada-ai`, `ada-crypto`, `ada-compiler`.
  - Módulos: Algoritmia formal (PSeInt, Python 3, Go), Análisis Asintótico riguroso ($\mathcal{O}, \Omega, \Theta$), Estructuras de Datos, Autómatas/Gramáticas, Redes Neuronales (perceptrones, retropropagación) y Criptografía.

- [ ] **Paso 2: Guardar archivo y verificar formato YAML**

---

### Task 5: Crear `skills/ada-neumann/SKILL.md`

**Files:**
- Create: `skills/ada-neumann/SKILL.md`

- [ ] **Paso 1: Redactar especificación completa de `ada-neumann`**
  - YAML frontmatter con nombre y descripción.
  - Absorbe: `ada-os`, `ada-net`, `ada-circuits`, `ada-distrib`, `ada-devops`, `ada-portainer`, `ada-iot`, `ada-hardware`, `ada-req`, `ada-qa`, `ada-hci`, `ada-engineer`, `ada-data`, `ada-econ`.
  - Módulos: Arquitectura de computadores (Von Neumann vs Harvard, ciclo de instrucción), Linux de bajo nivel en Arch/CachyOS (Btrfs, subvolúmenes, compresión Zstd, cgroups, syscalls), Redes y protocolos IoT (MQTT, TCP/IP, Tailscale), Docker Compose y Portainer.

- [ ] **Paso 2: Guardar archivo y verificar formato YAML**

---

### Task 6: Poda y Eliminación de las 33 Habilidades Obsoletas

**Files:**
- Delete:
  - `skills/ada-math/`
  - `skills/ada-discrete/`
  - `skills/ada-prob/`
  - `skills/ada-or/`
  - `skills/ada-algo/`
  - `skills/ada-os/`
  - `skills/ada-net/`
  - `skills/ada-compiler/`
  - `skills/ada-circuits/`
  - `skills/ada-distrib/`
  - `skills/ada-crypto/`
  - `skills/ada-engineer/`
  - `skills/ada-devops/`
  - `skills/ada-ai/`
  - `skills/ada-physics/`
  - `skills/ada-data/`
  - `skills/ada-econ/`
  - `skills/ada-portainer/`
  - `skills/ada-iot/`
  - `skills/ada-req/`
  - `skills/ada-qa/`
  - `skills/ada-hci/`
  - `skills/ada-research/`
  - `skills/ada-breakdown/`
  - `skills/ada-study/`
  - `skills/ada-feynman/`
  - `skills/ada-thesis/`
  - `skills/ada-career/`
  - `skills/ada-collab/`
  - `skills/ada-ethics/`
  - `skills/ada-orthodox/`
  - `skills/ada-affinite-note/`

- [ ] **Paso 1: Remover los directorios obsoletos de forma segura mediante comandos del sistema**
- [ ] **Paso 2: Verificar que solo permanezcan las 5 skills polímatas + Superpowers + puentes Ada**

---

### Task 7: Actualización de `GEMINI.md`, `README.md` y `CHANGELOG.md`

**Files:**
- Modify: `GEMINI.md`
- Modify: `README.md`
- Modify: `CHANGELOG.md`

- [ ] **Paso 1: Reemplazar el índice dinámico de `GEMINI.md` con el Concilio de Polímatas**
- [ ] **Paso 2: Actualizar `README.md` reflejando la nueva suite y el ahorro drástico de tokens**
- [ ] **Paso 3: Registrar la entrada en `CHANGELOG.md` bajo `[Unreleased]`**

---

### Task 8: Verificación Empírica y Commit de Integración

- [ ] **Paso 1: Ejecutar la suite de pruebas completa `npm test`**
  - Esperado: 25/25 tests pasando, 0 fallos, exit code 0.
- [ ] **Paso 2: Realizar commit convencional de la consolidación**
