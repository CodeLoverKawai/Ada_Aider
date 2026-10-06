# Ada Aider

**Ada-Aider** es un sistema agente unificado, modular y de máxima eficiencia en el consumo de tokens diseñado para asistentes de codificación con Inteligencia Artificial (Google Antigravity, Claude Code, Cursor, Windsurf y agentes basados en Gemini / Claude). Su nombre rinde homenaje a **Ada Lovelace**, la matemática británica pionera reconocida universalmente como la primera programadora de computadoras de la historia.

El sistema fusiona la **disciplina procedimental estricta de Superpowers** (diseño paso a paso con hard-gates, planificación atómica, TDD riguroso, depuración basada en evidencia, subagentes aislados y verificación empírica) con las **habilidades de dominio e ingeniería avanzada de Ada** (diseño UI/UX premium, bases de datos SQL, seguridad y auditoría de secretos, MCP, telemetría, hardware/firmware), el **Concilio de Polímatas & Forja Intelectual** (entrenamiento cognitivo socrático de alta fricción, síntesis polímata humanista, física y cálculo Stewart sin pasos mágicos, ciencias de la computación puras e ingeniería de sistemas e infraestructura Linux) y una **arquitectura de ahorro de tokens** de alto rendimiento.

---

> [!IMPORTANT]
> **Filosofía Operativa Central**:
> Ada-Aider opera bajo la regla de **"Habilidades antes de la acción"**. Ante cualquier solicitud, el agente consulta su enrutador de habilidades (`GEMINI.md`), carga bajo demanda (*lazy loading*) el archivo de instrucciones correspondiente y ejecuta el flujo paso a paso sin suposiciones ni afirmaciones especulativas.

---

## 📑 Tabla de Contenidos

1. [Arquitectura General y Ahorro de Tokens](#-arquitectura-general-y-ahorro-de-tokens)
2. [Cómo se Ejecutan las Habilidades en Ada-Aider](#-cómo-se-ejecutan-las-habilidades-en-ada-aider)
   - [Mecanismo de Invocación y Lazy Loading](#1-mecanismo-de-invocación-y-lazy-loading)
   - [Mapeo de Herramientas CLI (Antigravity & Claude Code)](#2-mapeo-de-herramientas-cli-antigravity--claude-code)
   - [Aislamiento por Subagentes Dedicados](#3-aislamiento-por-subagentes-dedicados)
   - [Directivas de Eficiencia y Guardrails Anti-Relleno](#4-directivas-de-eficiencia-y-guardrails-anti-relleno)
3. [Catálogo Exhaustivo de Habilidades (38 Skills)](#-catálogo-exhaustivo-de-habilidades-38-skills)
   - [A. Habilidades de Proceso Central (Superpowers Engine - 14 Skills)](#a-habilidades-de-proceso-central-superpowers-engine---14-skills)
   - [B. Habilidades Puente y Enrutamiento Maestro (Ada Bridges - 8 Skills)](#b-habilidades-puente-y-enrutamiento-maestro-ada-bridges---8-skills)
   - [C. Habilidades de Dominio y Automatización (Ada System - 11 Skills)](#c-habilidades-de-dominio-y-automatización-ada-system---11-skills)
   - [D. Concilio de Polímatas & Forja Intelectual (Ada Polymath Council - 5 Skills)](#d-concilio-de-polímatas--forja-intelectual-ada-polymath-council---5-skills)
4. [Flujos de Trabajo Prácticos de Extremo a Extremo](#-flujos-de-trabajo-prácticos-de-extremo-a-extremo)
   - [Flujo 1: Desarrollo de Nueva Característica con TDD y Subagentes](#flujo-1-desarrollo-de-nueva-característica-con-tdd-y-subagentes)
   - [Flujo 2: Depuración Sistemática de un Error en Producción](#flujo-2-depuración-sistemática-de-un-error-en-producción)
   - [Flujo 3: Lanzamiento Automatizado y Semantic Versioning](#flujo-3-lanzamiento-automatizado-y-semantic-versioning)
5. [Estructura del Repositorio](#-estructura-del-repositorio)
6. [Instalación y Configuración](#-instalación-y-configuración)
7. [Comandos Slash y Modos de Compresión (Caveman Mode)](#-comandos-slash-y-modos-de-compresión-caveman-mode)
8. [Verificación y Pruebas Automatizadas](#-verificación-y-pruebas-automatizadas)
9. [Licencia y Créditos](#-licencia-y-créditos)

---

## ⚡ Arquitectura General y Ahorro de Tokens

En los entornos tradicionales de agentes de IA, todas las instrucciones de todas las herramientas y guías se inyectan en el prompt inicial del sistema, provocando:
- Consumo masivo de **Input Tokens** (15,000 - 40,000 tokens por turno).
- Degradación de la atención del modelo (*Lost in the Middle*).
- Mayor latencia de respuesta y costos elevados.

Ada-Aider resuelve esto mediante una **Arquitectura de Enrutamiento Dinámico con Carga Bajo Demanda (Lazy-Loading)**:

```
                  ┌──────────────────────────────────────────────┐
                  │          Petición del Usuario / CLI          │
                  └──────────────────────┬───────────────────────┘
                                         │
                                         ▼
                  ┌──────────────────────────────────────────────┐
                  │    GEMINI.md (Router Maestro Compacto)       │
                  │   ~49 líneas / Tabla de Despacho Dinámica    │
                  └──────────────────────┬───────────────────────┘
                                         │
                   Dispara la lectura bajo demanda (view_file)
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 ▼                                               ▼
┌─────────────────────────────────┐             ┌─────────────────────────────────┐
│ Habilidades de Proceso          │             │ Habilidades Especializadas      │
│ (brainstorming, writing-plans,  │             │ (ada-taste, ada-db, ada-mcp,    │
│  test-driven-development, etc.) │             │  ada-socrates, ada-turing, etc.)│
└─────────────────────────────────┘             └─────────────────────────────────┘
```

### Resultados de Eficiencia:
- **Reducción del 65% al 85% de tokens de entrada** en cada interacción.
- **Consolidación del Concilio Polímata**: Reducción radical del catálogo de 33 habilidades dispersas a los 5 Grandes Arquetipos Polímatas (`ada-socrates`, `ada-davinci`, `ada-newton`, `ada-turing`, `ada-neumann`), eliminando la degradación de atención (*Lost in the Middle*) y optimizando el contexto de entrada.
- **Cero código re-impreso en el chat**: Las ediciones se guardan directamente en archivos y en el chat solo se envía un enlace navegable `[archivo.ts](file:///...)`.
- **Cero resumen redundante de artefactos**: Los planes (`implementation_plan.md`) y walkthroughs (`walkthrough.md`) se persisten como artefactos nativos en disco sin duplicar su contenido en la conversación.

---

## 🛠️ Cómo se Ejecutan las Habilidades en Ada-Aider

### 1. Mecanismo de Invocación y Lazy Loading

Las habilidades no son scripts opacos ejecutados a ciegas; son **protocolos de ejecución estructurados** que guían el comportamiento del modelo de IA paso a paso:

1. **Detección de Intención**: El agente analiza la tarea actual frente a la tabla de enrutamiento en [GEMINI.md](GEMINI.md) o [skills/ada-agent/SKILL.md](skills/ada-agent/SKILL.md).
2. **Lectura Obligatoria de la Habilidad (`view_file`)**: Antes de emitir cualquier respuesta o tocar código, el agente lee el archivo `SKILL.md` de la habilidad respectiva.
3. **Anuncio de Ejecución**: El agente anuncia formalmente: `Using [nombre-skill] to [propósito]`.
4. **Ejecución Guiada por Tareas**: Si la habilidad define una lista de verificación (*checklist*), el agente crea tareas atómicas y las completa secuencialmente.
5. **Cierre y Verificación**: La habilidad culmina con evidencia empírica (ej. salida de pruebas con `exit code 0`) antes de declarar la tarea terminada.

### 2. Mapeo de Herramientas CLI (Antigravity & Claude Code)

Cada acción descrita en los protocolos de las habilidades se ejecuta utilizando las herramientas nativas del entorno:

| Acción Requerida por la Habilidad | Herramienta Antigravity | Herramienta Claude Code | Propósito |
| :--- | :--- | :--- | :--- |
| **Leer archivos o guías** | `view_file` | `View` / `Read` | Cargar código fuente o instrucciones `SKILL.md`. |
| **Crear nuevos archivos o artefactos** | `write_to_file` | `Write` | Generar módulos, planes (`implementation_plan.md`) o especificaciones. |
| **Modificar código existente** | `replace_file_content` / `multi_replace_file_content` | `Edit` | Ediciones atómicas quirúrgicas sin reescribir archivos enteros. |
| **Ejecutar comandos en terminal** | `run_command` | `Bash` | Ejecutar suites de pruebas (`npm test`, `pytest`), linters y compiladores. |
| **Búsqueda exacta de patrones / secretos** | `grep_search` | `Grep` | Localizar funciones, variables o auditar fugas de credenciales. |
| **Desplegar subagentes aislados** | `invoke_subagent` (`self` / `research`) | `Agent` | Delegar tareas en sub-contextos independientes. |
| **Formular preguntas interactivas** | `ask_question` | `AskUserQuestion` | Presentar menús de opciones múltiples para decisiones de diseño. |
| **Generar imágenes / activos UI** | `generate_image` | N/A | Crear mockups, logotipos e imágenes reales para interfaces. |

### 3. Aislamiento por Subagentes Dedicados

Para tareas complejas de múltiples pasos (como la ejecución de un plan de 10 tareas):
- El agente orquestador (`ada-agent` / `subagent-driven-development`) **no contamina** la ventana de chat principal.
- Por cada tarea, invoca un subagente dedicado con `invoke_subagent`:
  - **`TypeName: "research"`**: Subagente de solo lectura para explorar bases de código grandes y documentaciones.
  - **`TypeName: "self"`**: Subagente con capacidades completas de lectura, escritura y ejecución de comandos para implementar una tarea atómica con TDD.
- El subagente implementa la tarea, corre las pruebas, realiza el commit y reporta el resultado al agente principal, quien revisa el código antes de pasar a la siguiente tarea.

### 4. Directivas de Eficiencia y Guardrails Anti-Relleno

- **Prohibición de Texto de Relleno**: Sin saludos vacíos (*"¡Hola! Claro, con gusto te ayudo..."*).
- **Prohibición de Afirmaciones Especulativas**: Queda estrictamente prohibido decir *"debería funcionar"*, *"el cambio está listo"* o *"la prueba pasará"* sin haber ejecutado la prueba en terminal y verificado su código de salida.
- **Red Flags Anti-Racionalización**: Pensamientos como *"es un cambio muy simple, no necesito hacer pruebas"* o *"primero escribiré el código y luego el test"* disparan un alto inmediato en el flujo del agente.

---

## 📚 Catálogo Exhaustivo de Habilidades (38 Skills)

A continuación se detalla **cada una de las 38 habilidades del sistema**, especificando:
- **Propósito**: Qué problema resuelve y cuándo aplica.
- **Cómo se Ejecuta**: Flujo paso a paso, herramientas involucradas y comandos.
- **Entradas y Salidas**: Archivos leídos, artefactos generados y pruebas ejecutadas.
- **Ejemplo Canónico**: Ejemplo de invocación o código.

---

### A. Habilidades de Proceso Central (Superpowers Engine - 14 Skills)

#### 1. `using-superpowers`
- **Ubicación**: [skills/using-superpowers/SKILL.md](skills/using-superpowers/SKILL.md)
- **Propósito**: Regla maestra y guardián de entrada del sistema. Establece la obligación estricta de invocar habilidades relevantes *antes* de cualquier acción, exploración o respuesta.
- **Cómo se Ejecuta**:
  1. Se evalúa al inicio de cada turno.
  2. Si la tarea implica diseño, delega a `brainstorming`; si implica error, delega a `systematic-debugging`.
  3. Contiene la tabla de 12 *Red Flags* (trampas cognitivas donde el modelo intenta saltarse los procesos) para forzar la disciplina.
- **Salida**: Anuncio formal de la habilidad seleccionada y cambio de comportamiento.
- **Ejemplo**: *"Using using-superpowers to evaluate required workflows for user prompt."*

#### 2. `brainstorming`
- **Ubicación**: [skills/brainstorming/SKILL.md](skills/brainstorming/SKILL.md)
- **Propósito**: Descubrimiento colaborativo de requisitos y diseño arquitectónico antes de escribir código (`<HARD-GATE>`).
- **Cómo se Ejecuta**:
  1. Explora el contexto actual del repositorio (`view_file`, `list_dir`).
  2. Formula preguntas aclaratorias estructuradas **una a la vez** (usando `ask_question`).
  3. Propone 2-3 enfoques arquitectónicos con sus ventajas, desventajas y recomendación explícita.
  4. Presenta el diseño en secciones modulares y solicita aprobación del usuario tras cada sección.
  5. Escribe la especificación validada en `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`.
  6. Ejecuta una auto-revisión de la especificación (eliminando TODOs, ambigüedades y contradicciones).
  7. Invoca obligatoriamente `writing-plans` como estado terminal.
- **Salida**: Documento de especificación `docs/superpowers/specs/...-design.md` aprobado y commiteado.

#### 3. `writing-plans`
- **Ubicación**: [skills/writing-plans/SKILL.md](skills/writing-plans/SKILL.md)
- **Propósito**: Transformar una especificación de diseño aprobada en un plan de implementación detallado, compuesto por tareas atómicas e independientes (de 2 a 5 minutos cada una).
- **Cómo se Ejecuta**:
  1. Lee la especificación y define la estructura de archivos afectados.
  2. Desglosa la solución en tareas atómicas con granularidad TDD:
     - Paso 1: Escribir prueba que falla.
     - Paso 2: Ejecutar prueba y verificar que falla.
     - Paso 3: Escribir código mínimo para que pase.
     - Paso 4: Ejecutar prueba y verificar que pasa.
     - Paso 5: Commit atómico en Git.
  3. Define bloques explícitos de `Interfaces: Consumes / Produces` con firmas y tipos exactos (sin placeholders como "TODO" o "implementar luego").
  4. Guarda el plan en `docs/superpowers/plans/YYYY-MM-DD-<feature>.md` o en el artefacto `implementation_plan.md`.
  5. Ofrece al usuario elegir entre ejecución por subagentes (`subagent-driven-development`) o en línea (`executing-plans`).
- **Salida**: Archivo de plan ejecutable con tareas en formato de casillas de verificación `- [ ]`.

#### 4. `executing-plans`
- **Ubicación**: [skills/executing-plans/SKILL.md](skills/executing-plans/SKILL.md)
- **Propósito**: Ejecutar un plan de implementación en la sesión principal mediante lotes de tareas con puntos de control de revisión (*checkpoints*).
- **Cómo se Ejecuta**:
  1. Carga el plan de implementación desde el disco.
  2. Itera tarea por tarea: ejecuta los pasos TDD de la tarea actual.
  3. Ejecuta las pruebas correspondientes y verifica el resultado.
  4. Realiza el commit correspondiente y marca la tarea como completada (`- [x]`).
  5. Solicita retroalimentación del usuario en los puntos de control definidos.
- **Salida**: Código implementado y plan actualizado con tareas completadas.

#### 5. `subagent-driven-development`
- **Ubicación**: [skills/subagent-driven-development/SKILL.md](skills/subagent-driven-development/SKILL.md)
- **Propósito**: Implementar planes de desarrollo asignando cada tarea atómica a un subagente independiente con contexto limpio, realizando revisiones de dos etapas por cada tarea.
- **Cómo se Ejecuta**:
  1. El agente coordinador lee el plan de tareas.
  2. Para cada tarea:
     - Despacha un subagente `self` mediante `invoke_subagent` con la descripción exacta de la tarea, archivos a tocar e interfaces.
     - El subagente implementa la tarea siguiendo TDD (escribe test, falla, implementa, pasa test) y realiza el commit.
     - El coordinador despacha un subagente de revisión (`spec review` y `code review`) para auditar la calidad y apego a la especificación.
     - Si hay objeciones, el subagente corrige; si está aprobado, se avanza a la siguiente tarea.
- **Salida**: Código verificado, historial de commits limpio y ventana de chat principal con bajo uso de tokens.

#### 6. `test-driven-development`
- **Ubicación**: [skills/test-driven-development/SKILL.md](skills/test-driven-development/SKILL.md)
- **Propósito**: Garantizar la máxima calidad y cobertura del software obligando al ciclo estricto **RED-GREEN-REFACTOR**.
- **Cómo se Ejecuta**:
  1. **RED**: Escribir una prueba unitaria o de integración enfocada en el comportamiento deseado.
  2. **Verificar Fallo**: Ejecutar la suite de pruebas (`run_command`) y confirmar que falla exactamente por la razón esperada (ej. `AssertionError` o función no definida).
  3. **GREEN**: Escribir la mínima cantidad de código de producción necesario para que la prueba pase.
  4. **Verificar Éxito**: Ejecutar la prueba y confirmar salida exitosa (`exit code 0`).
  5. **REFACTOR**: Limpiar el código manteniendo todas las pruebas en verde.
- **Salida**: Código libre de regresiones respaldado por suites de pruebas automatizadas.

#### 7. `systematic-debugging`
- **Ubicación**: [skills/systematic-debugging/SKILL.md](skills/systematic-debugging/SKILL.md)
- **Propósito**: Resolver bugs, fallos de pruebas o comportamientos inesperados mediante un proceso de 5 fases basado en evidencia, erradicando los parches sintomáticos o conjeturas.
- **Cómo se Ejecuta**:
  1. **Reproducción Confiable**: Diseñar un caso de prueba mínimo que reproduzca el error de forma determinista.
  2. **Aislamiento de Causa Raíz**: Examinar logs, trazas de pila y cambios recientes para identificar el punto exacto de falla.
  3. **Creación de Test Reproductor**: Escribir una prueba automatizada que falle demostrando el bug.
  4. **Corrección Mínima de Causa Raíz**: Corregir el defecto fundamental (no tapar síntomas).
  5. **Verificación Empírica**: Correr toda la suite de pruebas para certificar que el bug se solucionó y no se introdujeron regresiones.
- **Salida**: Test de regresión agregado y corrección verificada.

#### 8. `verification-before-completion`
- **Ubicación**: [skills/verification-before-completion/SKILL.md](skills/verification-before-completion/SKILL.md)
- **Propósito**: Barrera de finalización obligatoria. Prohíbe declarar tareas como completadas sin evidencia empírica fresca de la terminal.
- **Cómo se Ejecuta**:
  1. Identifica los comandos de prueba/compilación del proyecto (`npm test`, `pytest`, `cargo test`, `go test`, `tsc --noEmit`).
  2. Ejecuta el comando en la terminal con `run_command`.
  3. Inspecciona la salida completa y el código de retorno.
  4. Solo si `exit code == 0`, reporta formalmente la finalización indicando el número exacto de pruebas aprobadas.
- **Salida**: Confirmación basada en evidencia con métricas reales de ejecución.

#### 9. `using-git-worktrees`
- **Ubicación**: [skills/using-git-worktrees/SKILL.md](skills/using-git-worktrees/SKILL.md)
- **Propósito**: Aislar desarrollos de nuevas características o experimentos en directorios y ramas independientes de Git sin alterar el directorio de trabajo principal.
- **Cómo se Ejecuta**:
  1. Verifica el estado del repositorio (`git status`).
  2. Crea un worktree aislado: `git worktree add -b feature/nueva-rama .worktrees/nueva-rama main`.
  3. Configura dependencias e inicializa el entorno dentro del worktree.
  4. Ejecuta el desarrollo dentro de dicho directorio aislado.
- **Salida**: Directorio de trabajo aislado y rama creada.

#### 10. `requesting-code-review`
- **Ubicación**: [skills/requesting-code-review/SKILL.md](skills/requesting-code-review/SKILL.md)
- **Propósito**: Estructurar solicitudes formales de revisión de código antes de integrar cambios en ramas principales o enviar Pull Requests.
- **Cómo se Ejecuta**:
  1. Ejecuta una auto-revisión previa del diff (`git diff main...HEAD`).
  2. Redacta el resumen de cambios, contexto de la decisión arquitectónica, evidencia de pruebas ejecutadas y evaluación de riesgos.
  3. Presenta la solicitud al revisor (humano o subagente especializado).
- **Salida**: Documento o mensaje estructurado de solicitud de revisión.

#### 11. `receiving-code-review`
- **Ubicación**: [skills/receiving-code-review/SKILL.md](skills/receiving-code-review/SKILL.md)
- **Propósito**: Procesar comentarios de revisión de código con rigor técnico, eliminando la condescendencia o la aceptación ciega de sugerencias defectuosas.
- **Cómo se Ejecuta**:
  1. Analiza cada comentario de revisión de forma individual.
  2. Verifica técnicamente la validez del comentario (comprobando código y pruebas).
  3. Si la sugerencia es correcta, aplica la corrección con TDD.
  4. Si la sugerencia introduce un error o contradicción, presenta cortésmente la evidencia técnica que lo justifica.
- **Salida**: Cambios corregidos o aclaraciones fundamentadas con datos y pruebas.

#### 12. `finishing-a-development-branch`
- **Ubicación**: [skills/finishing-a-development-branch/SKILL.md](skills/finishing-a-development-branch/SKILL.md)
- **Propósito**: Cerrar ordenadamente una rama de desarrollo tras completar todas las tareas y pruebas.
- **Cómo se Ejecuta**:
  1. Verifica que no existan cambios sin commitear y que todos los tests pasen (`exit code 0`).
  2. Determina el método de integración (Merge, Squash & Merge o Rebase).
  3. Ejecuta la integración o prepara el Pull Request.
  4. Elimina los worktrees temporales (`git worktree remove`) y limpia las ramas locales si corresponde.
- **Salida**: Rama integrada y entorno de trabajo limpio.

#### 13. `dispatching-parallel-agents`
- **Ubicación**: [skills/dispatching-parallel-agents/SKILL.md](skills/dispatching-parallel-agents/SKILL.md)
- **Propósito**: Ejecutar múltiples tareas independientes en paralelo cuando no existen dependencias de estado o bloqueos mutuos.
- **Cómo se Ejecuta**:
  1. Identifica las tareas completamente ortogonales del plan.
  2. Despacha múltiples llamadas simultáneas a `invoke_subagent`.
  3. Monitorea las notificaciones reactivas del sistema conforme cada subagente completa su tarea.
  4. Consolida y revisa los resultados de todos los subagentes.
- **Salida**: Ejecución concurrente acelerada de tareas independientes.

#### 14. `writing-skills`
- **Ubicación**: [skills/writing-skills/SKILL.md](skills/writing-skills/SKILL.md)
- **Propósito**: Meta-habilidad para diseñar, redactar, validar y desplegar nuevas habilidades dentro del ecosistema Ada-Aider siguiendo los estándares de YAML frontmatter y esquemas de ejecución.
- **Cómo se Ejecuta**:
  1. Define el nombre, descripción y disparadores de la nueva habilidad.
  2. Redacta el archivo `SKILL.md` con frontmatter estructurado, directivas claras, checklists y ejemplos canónicos.
  3. Añade la entrada correspondiente en el enrutador [GEMINI.md](GEMINI.md).
  4. Ejecuta pruebas de validación para certificar que el agente la cargue e interprete correctamente.
- **Salida**: Nueva habilidad lista para ser consumida bajo demanda.

---

### B. Habilidades Puente y Enrutamiento Maestro (Ada Bridges - 8 Skills)

#### 15. `ada-agent`
- **Ubicación**: [skills/ada-agent/SKILL.md](skills/ada-agent/SKILL.md)
- **Propósito**: Orquestador maestro del sistema Ada. Coordina los guardrails de proceso, el sistema de compresión conversacional (*Caveman Mode*), el mapeo de herramientas CLI de Antigravity/Claude Code y las directivas de protección de presupuesto de contexto.
- **Cómo se Ejecuta**:
  1. Se evalúa en la sesión activa y aplica los 5 pasos obligatorios: Brainstorm -> Plan -> Execute -> TDD -> Verify -> Release.
  2. Controla la compresión de texto en chat (`/ada [lite|full|ultra|off]`).
  3. Hace cumplir las reglas de "Cero duplicación de código en chat" y "Cero re-resumen de artefactos".
- **Salida**: Comportamiento disciplinado, eficiente y estructurado en todas las respuestas.

#### 16. `ada-brainstorm`
- **Ubicación**: [skills/ada-brainstorm/SKILL.md](skills/ada-brainstorm/SKILL.md)
- **Propósito**: Puente semántico que enruta las solicitudes de lluvia de ideas y diseño inicial directamente a `brainstorming`.
- **Cómo se Ejecuta**: Delega de forma transparente a [skills/brainstorming/SKILL.md](skills/brainstorming/SKILL.md).

#### 17. `ada-plan`
- **Ubicación**: [skills/ada-plan/SKILL.md](skills/ada-plan/SKILL.md)
- **Propósito**: Puente semántico que enruta la redacción y ejecución de planes atómicos a `writing-plans` y `executing-plans`.
- **Cómo se Ejecuta**: Delega de forma transparente a [skills/writing-plans/SKILL.md](skills/writing-plans/SKILL.md) y [skills/executing-plans/SKILL.md](skills/executing-plans/SKILL.md).

#### 18. `ada-code`
- **Ubicación**: [skills/ada-code/SKILL.md](skills/ada-code/SKILL.md)
- **Propósito**: Puente semántico para la fase de implementación de código, haciendo cumplir el ciclo de desarrollo guiado por pruebas (`test-driven-development`).
- **Cómo se Ejecuta**: Delega de forma transparente a [skills/test-driven-development/SKILL.md](skills/test-driven-development/SKILL.md).

#### 19. `ada-verify`
- **Ubicación**: [skills/ada-verify/SKILL.md](skills/ada-verify/SKILL.md)
- **Propósito**: Puente semántico hacia la verificación empírica obligatoria antes de declarar cualquier trabajo como finalizado (`verification-before-completion`).
- **Cómo se Ejecuta**: Delega de forma transparente a [skills/verification-before-completion/SKILL.md](skills/verification-before-completion/SKILL.md).

#### 20. `ada-debug`
- **Ubicación**: [skills/ada-debug/SKILL.md](skills/ada-debug/SKILL.md)
- **Propósito**: Puente semántico para la investigación metódica de fallos y errores hacia `systematic-debugging`.
- **Cómo se Ejecuta**: Delega de forma transparente a [skills/systematic-debugging/SKILL.md](skills/systematic-debugging/SKILL.md).

#### 21. `ada-review`
- **Ubicación**: [skills/ada-review/SKILL.md](skills/ada-review/SKILL.md)
- **Propósito**: Puente semántico para las revisiones de código, enrutando a `requesting-code-review` y `receiving-code-review`.
- **Cómo se Ejecuta**: Delega de forma transparente a los flujos de code review de Superpowers.

#### 22. `ada-workflow`
- **Ubicación**: [skills/ada-workflow/SKILL.md](skills/ada-workflow/SKILL.md)
- **Propósito**: Auditoría y descubrimiento profundo de proyectos recién abiertos o existentes. Analiza herramientas de construcción, manejadores de paquetes, frameworks de prueba, linters y scripts de despliegue.
- **Cómo se Ejecuta**:
  1. Examina archivos de configuración raíz (`package.json`, `Cargo.toml`, `pyproject.toml`, `go.mod`, `Makefile`, etc.).
  2. Detecta comandos estándar para: test, build, lint, dev y release.
  3. Genera una especificación de flujo de trabajo `project-workflow.md` para que todos los subagentes conozcan las herramientas exactas del repositorio.
- **Salida**: Archivo `project-workflow.md` documentando las herramientas y comandos del proyecto.

---

### C. Habilidades de Dominio y Automatización (Ada System - 11 Skills)

#### 23. `ada-taste`
- **Ubicación**: [skills/ada-taste/SKILL.md](skills/ada-taste/SKILL.md)
- **Propósito**: Directrices de diseño UI/UX frontend de nivel premium (*anti-slop*). Erradica interfaces genéricas, botones planos sin estados y diseños anticuados.
- **Cómo se Ejecuta**:
  1. Aplica paletas cromáticas ricas en HSL/HEX con modos oscuros refinados (ej. fondos `#0f172a`, acentos luminosos).
  2. Importa fuentes modernas de Google Fonts (Inter, Roboto, Outfit, Plus Jakarta Sans) en HTML/CSS.
  3. Implementa efectos visuales dinámicos: Glassmorphism (`backdrop-filter: blur(12px)`), sombras elevadas y microinteracciones suaves en `:hover`, `:focus-visible` y `:active`.
  4. Utiliza CSS moderno: CSS Grid, Flexbox, `:has()`, `:user-valid` y variables CSS en `:root`.
  5. **Regla de Cero Placeholders**: Prohíbe terminantemente URLs vacías o `via.placeholder.com`; invoca la herramienta `generate_image` para producir activos visuales reales.
- **Salida**: Interfaces modernas, atractivas y accesibles bajo WCAG 2.2 AA.

#### 24. `ada-db`
- **Ubicación**: [skills/ada-db/SKILL.md](skills/ada-db/SKILL.md)
- **Propósito**: Arquitectura de bases de datos, normalización de esquemas relacionales y optimización de consultas SQL.
- **Cómo se Ejecuta**:
  1. Diseña esquemas bajo Tercera Forma Normal (3NF) para OLTP o modelos dimensionales (Star/Snowflake) para OLAP.
  2. Modela entidades visualmente mediante diagramas Mermaid ERD.
  3. Exige que todas las migraciones sean reversibles con scripts simétricos `UP` (aplicar) y `DOWN` (revertir).
  4. Analiza consultas complejas con `EXPLAIN` o `EXPLAIN ANALYZE`, detectando escaneos secuenciales (`Seq Scan`) y agregando índices B-tree/GIN donde corresponda.
  5. Configura pools de conexiones, timeouts explícitos (`statement_timeout`) y transacciones seguras con `COMMIT` y `ROLLBACK`.
- **Salida**: Esquemas robustos, diagramas ERD y migraciones SQL probadas en ambas direcciones.

#### 25. `ada-security`
- **Ubicación**: [skills/ada-security/SKILL.md](skills/ada-security/SKILL.md)
- **Propósito**: Auditoría automatizada de seguridad, escaneo de secretos, sanitización de entradas y prevención de inyecciones.
- **Cómo se Ejecuta**:
  1. Ejecuta búsquedas con `grep_search` para patrones de secretos (`api_key`, `secret`, `password`, `bearer`, `BEGIN PRIVATE KEY`).
  2. Verifica que las claves sensibles se carguen mediante variables de entorno y que `.env*` esté incluido en `.gitignore`.
  3. Comprueba que todas las consultas SQL estén parametrizadas (prohibiendo concatenaciones de strings).
  4. Valida rutas de archivos para evitar vulnerabilidades de *Path Traversal* (`../..`).
  5. Audita dependencias mediante herramientas como `npm audit`, `cargo audit` o `pip audit`.
- **Salida**: Informe de seguridad limpio y mitigación de vulnerabilidades antes de cada commit o release.

#### 26. `ada-mcp`
- **Ubicación**: [skills/ada-mcp/SKILL.md](skills/ada-mcp/SKILL.md)
- **Propósito**: Integración, configuración y consumo de servidores bajo el estándar Model Context Protocol (MCP).
- **Cómo se Ejecuta**:
  1. Descubre herramientas y recursos provistos por servidores MCP registrados en `~/.gemini/config/mcp_config.json`.
  2. Prioriza herramientas estructuradas MCP frente a scripts de shell cuando están disponibles (inspección de bases de datos, navegación de navegadores, trazado de incidencias).
  3. Implementa rutas de degradación elegante (*fallback*) a herramientas nativas de terminal si el servidor MCP no responde o falla.
- **Salida**: Interacción fluida y segura con herramientas externas estandarizadas.

#### 27. `ada-hardware`
- **Ubicación**: [skills/ada-hardware/SKILL.md](skills/ada-hardware/SKILL.md)
- **Propósito**: Desarrollo de firmware embebido en C/C++ (ESP-IDF, Zephyr, FreeRTOS) y diseño RTL sintetizable en Verilog / SystemVerilog / VHDL.
- **Cómo se Ejecuta**:
  1. **Firmware C/C++**:
     - Prohíbe la asignación dinámica en bucles de tiempo de ejecución (`malloc`/`new`), forzando buffers estáticos.
     - Diseña rutinas de interrupción (ISRs) ultra-cortas que encolan eventos en colas seguras (`xQueueSendFromISR`) sin I/O bloqueante.
     - Modela protocolos de comunicación (UART, SPI, I2C, CAN, BLE) como Máquinas de Estados Finitos (FSM).
  2. **Diseño RTL**:
     - Separa lógica combinacional (`always_comb` / `always @(*)`) de lógica secuencial (`always_ff @(posedge clk)`).
     - Integra interfaces estándar de bus (AXI4-Lite, APB).
     - Ejecuta testbenches y simulaciones reproducibles con `iverilog` o `verilator`.
- **Salida**: Firmware robusto sin fragmentación de memoria y módulos RTL verificados por simulación.

#### 28. `ada-telemetry`
- **Ubicación**: [skills/ada-telemetry/SKILL.md](skills/ada-telemetry/SKILL.md)
- **Propósito**: Observabilidad, logging estructurado en formato JSON, instrumentación de errores con Sentry / OpenTelemetry y seguimiento del consumo de tokens y costos LLM.
- **Cómo se Ejecuta**:
  1. Configura loggers estructurados que emiten eventos en JSON con `timestamp`, `level` (INFO, WARN, ERROR), `component` y `trace_id`.
  2. Prohíbe terminantemente bloques `catch` vacíos o excepciones silenciadas.
  3. Instrumenta trazas distribuidas a través de servicios y llamadas a bases de datos.
  4. Registra métricas de inferencia de IA: tokens de entrada, tokens de salida, modelo y latencia en milisegundos.
- **Salida**: Trazabilidad completa y observabilidad lista para producción.

#### 29. `ada-mem`
- **Ubicación**: [skills/ada-mem/SKILL.md](skills/ada-mem/SKILL.md)
- **Propósito**: Gestión del presupuesto de la ventana de contexto, compactación de memoria conversacional y persistencia de resúmenes de sesión.
- **Cómo se Ejecuta**:
  1. Monitorea el volumen de tokens consumidos en la sesión activa.
  2. Genera resúmenes compactos de decisiones y avances alcanzados.
  3. Almacena notas de memoria en artefactos o configuraciones locales para reanudar sesiones futuras sin sobrecargar el contexto.
- **Salida**: Sesiones ágiles y preservación de decisiones clave entre reinicios.

#### 30. `ada-docs`
- **Ubicación**: [skills/ada-docs/SKILL.md](skills/ada-docs/SKILL.md)
- **Propósito**: Documentación viva y sincronización automática del archivo `README.md` y `CHANGELOG.md`.
- **Cómo se Ejecuta**:
  1. Sincroniza inmediatamente el `README.md` al agregar nuevos comandos, flags o habilidades.
  2. Utiliza bloques de alerta de GitHub Flavored Markdown (`> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`, `> [!CAUTION]`).
  3. Antepone entradas formateadas en `CHANGELOG.md` organizadas bajo encabezados estándar (🚀 Features, 🐛 Bug Fixes, ⚡ Performance, ⚠️ Breaking Changes).
- **Salida**: Documentación siempre actualizada y libre de obsolescencia.

#### 31. `ada-commit`
- **Ubicación**: [skills/ada-commit/SKILL.md](skills/ada-commit/SKILL.md)
- **Propósito**: Generar mensajes de commit estructurados bajo el estándar estricto de **Conventional Commits** (`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`).
- **Cómo se Ejecuta**:
  1. Inspecciona el diff staged con `git diff --cached`.
  2. Redacta el mensaje en modo imperativo presente ("add" en lugar de "added", "fix" en lugar de "fixed").
  3. Limita la primera línea (summary) a un máximo de **50 caracteres** y sin punto final.
  4. Prohíbe firmas automáticas de IA (*"Generated by AI"* o *"Co-authored-by: AI"*).
  5. Ejecuta `git commit -m "..."`.
- **Salida**: Historial de Git limpio, semántico y profesional.

#### 32. `ada-release`
- **Ubicación**: [skills/ada-release/SKILL.md](skills/ada-release/SKILL.md)
- **Propósito**: Motor de lanzamientos y versionado semántico automatizado con sincronización multi-archivo.
- **Cómo se Ejecuta**:
  1. **Test Gate**: Ejecuta la suite de pruebas completa (`npm test`); cancela el release si alguna prueba falla.
  2. **Verificación de Git**: Confirma que no existan cambios sucios (`git status --porcelain`).
  3. **Incremento SemVer**: Calcula el salto de versión (`patch`, `minor` o `major`).
  4. **Sincronización Multi-Archivo**: Actualiza simultáneamente el campo `version` en `package.json`, `plugin.json`, `gemini-extension.json` y `installed_version.json`.
  5. **Actualización de Changelog**: Antepone la sección en `CHANGELOG.md` con la fecha y cambios.
  6. **Commit & Tag**: Crea el commit `chore(release): vX.Y.Z` y la etiqueta anotada `git tag -a vX.Y.Z -m "Release vX.Y.Z"`.
- **Salida**: Nueva versión empaquetada, etiquetada y sincronizada. Comando CLI: `npm run release -- [patch|minor|major]`.

#### 33. `ada-proactive`
- **Ubicación**: [skills/ada-proactive/SKILL.md](skills/ada-proactive/SKILL.md)
- **Propósito**: Automatización de tareas proactivas en segundo plano, supervisión continua de la salud del espacio de trabajo y bucles periódicos de mantenimiento.
- **Cómo se Ejecuta**:
  1. Identifica oportunidades de mejora no intrusivas (archivos temporales obsoletos, dependencias desactualizadas, linters con advertencias).
  2. Ejecuta tareas en segundo plano sin interrumpir el flujo principal del usuario.
  3. Notifica hallazgos relevantes de forma no intrusiva.
- **Salida**: Mantenimiento preventivo continuo del repositorio.

---

### D. Concilio de Polímatas & Forja Intelectual (Ada Polymath Council - 5 Skills)

El **Concilio de Polímatas** es la consolidación y evolución arquitectónica de las 33 habilidades académicas previas en 5 Grandes Arquetipos de élite. Diseñado para erradicar la trampa de la fluidez pasiva (*passive fluency*) y el andamiaje vacío (*empty scaffolding*), transforma el asistente en una **forja cognitiva rigurosa** que exige pensamiento crítico, deducción desde primeros principios y maestría técnica integral.

#### 34. `ada-socrates` (El Forjador Intelectual & Gimnasio Cognitivo)
- **Ubicación**: [skills/ada-socrates/SKILL.md](skills/ada-socrates/SKILL.md)
- **Propósito**: Máxima fricción cognitiva productiva para erradicar la dependencia pasiva de la IA. Entrena el razonamiento autónomo, pensamiento crítico y resolución desde primeros principios en estudiantes e ingenieros.
- **Guardrails Cognitivos**:
  - **Friction First**: Cero soluciones masticadas o código regalado prematuramente; el entendimiento se construye peldaño a peldaño.
  - **Anti-Sycophancy**: Cero halagos vacíos o validación complaciente de errores lógicos y matemáticos.
  - **Calibración Epistemológica (Bloom)**: Audita el nivel cognitivo del usuario (Recordar $\to$ Comprender $\to$ Aplicar $\to$ Analizar $\to$ Evaluar $\to$ Crear) para romper la falsa ilusión de competencia.
  - **Articulación Feynman Obligatoria**: Exige al usuario explicar los conceptos con sus propias palabras antes de validar el razonamiento.
- **Modos de Intensidad y Comandos Slash**:
  1. **Modo Mayéutica Guiada (Por defecto)**: Regla de la **pregunta única estratégica** por turno, descomposición axiomática y analogías del mundo real.
  2. **Modo Simulador de Parcial (`/socrates exam`)**: Simulación rigurosa de exámenes universitarios reales (orientado al currículo UNIMINUTO: Precálculo Stewart, Algoritmia Python, Lógica). Plantea 1 problema formal con tiempo sugerido, **apagón pedagógico total** (cero pistas) y calificación cuantitativa estricta en escala 0.0 a 5.0 con desglose por rúbrica oficial (Rigor Formal 40%, Casos Borde 30%, Eficiencia 30%).
  3. **Modo Sparring Dialéctico (`/socrates sparring`)**: *Adversarial Red-Teaming* intelectual. Asume el rol de crítico y auditor implacable, cazando falacias lógicas, sesgos de confirmación y supuestos frágiles en ensayos, código o arquitecturas.
- **Salida**: Deducciones autónomas verificadas, informes de examen con calificación cuantitativa (0.0 a 5.0) y auditorías dialécticas exhaustivas.

#### 35. `ada-davinci` (El Polímata, Humanista e Investigador)
- **Ubicación**: [skills/ada-davinci/SKILL.md](skills/ada-davinci/SKILL.md)
- **Propósito**: Síntesis polímata integradora de ciencias de la computación, metodología científica, redacción académica de posgrado, planificación de proyectos y humanismo.
- **Absorbe**: `ada-research`, `ada-breakdown`, `ada-thesis`, `ada-career`, `ada-collab`, `ada-ethics`, `ada-orthodox`, `ada-affinite-note`.
- **Módulos Principales**:
  - **Motor BlockSuite para AFFiNE**: Generación de notas maestras en Markdown enriquecido con KaTeX (`$$...$$`), diagramas Mermaid, callouts GitHub y resolución automática en `$AFFINITE_NOTES_DIR`.
  - **Normas APA 7ma Edición (UNIMINUTO) e IEEE**: Estructuración reglamentaria de monografías, anteproyectos, citas parentéticas/narrativas y referencias bibliográficas estándar.
  - **Estructuración WBS & Ruta Crítica (CPM/PERT)**: Descomposición jerárquica de proyectos en 4 niveles, cálculo de holguras y matrices de riesgo cuantitativo.
  - **Portafolios Tier-1, RFCs & Open Source**: Especificaciones técnicas formales de solicitud de comentarios y proyectos de ingeniería de sistemas con benchmarks.
  - **Comunicación BLUF & Deontología**: Técnica *Bottom Line Up Front*, code reviews libres de ego (`[blocking]`, `[suggestion]`), post-mortems sin culpa, compatibilidad de licencias (GPLv3, MIT, Apache) y discernimiento patrístico/espiritual.
- **Salida**: Notas maestras BlockSuite (`.md`), documentos académicos normalizados en APA 7/IEEE, especificaciones WBS y dictámenes deontológicos.

#### 36. `ada-newton` (El Físico-Matemático & Ciencias Cuantitativas)
- **Ubicación**: [skills/ada-newton/SKILL.md](skills/ada-newton/SKILL.md)
- **Propósito**: Dominio axiomático de las matemáticas y la física sin atajos ni omisiones analíticas.
- **Absorbe**: `ada-math`, `ada-discrete`, `ada-prob`, `ada-or`, `ada-physics`.
- **Módulos Principales**:
  - **Currículo Stewart Completo**: Precálculo, funciones algebraicas/trascendentes, límites rigurosos ($\epsilon$-$\delta$), derivadas, integrales por sustitución/partes/fracciones parciales, cálculo multivariable y series de potencias.
  - **Regla de Oro de Cero Pasos Mágicos (*Zero Skipped Steps*)**: Prohibido omitir transformaciones intermedias; cada renglón debe justificar explícitamente el axioma, teorema o propiedad algebraica aplicada (PJR).
  - **Física Clásica con Diagramas de Cuerpo Libre (DCL)**: Cinemática, leyes de Newton, conservación de energía/momento, electromagnetismo, termodinámica y simulación numérica simpléctica con algoritmo de Verlet.
  - **Matemáticas Discretas**: Lógica proposicional y de predicados, inducción matemática débil y fuerte, teoría de conjuntos, combinatoria y grafos.
  - **Probabilidad & Procesos Estocásticos**: Axiomas de Kolmogorov, Teorema de Bayes, variables aleatorias continuas/discretas y cadenas de Markov.
  - **Investigación de Operaciones**: Programación lineal canónica/estándar, resolución de tablas Simplex paso a paso con pivoteo de Gauss-Jordan, dualidad y Teoría de Colas ($M/M/1$).
- **Salida**: Demostraciones analíticas completas sin pasos omitidos, simulaciones físicas simplécticas y tablas Simplex auditables.

#### 37. `ada-turing` (El Teórico de la Computación & Algoritmia)
- **Ubicación**: [skills/ada-turing/SKILL.md](skills/ada-turing/SKILL.md)
- **Propósito**: Fundamentación formal en ciencias de la computación teóricas, análisis algorítmico asintótico, teoría de lenguajes formales y criptografía.
- **Absorbe**: `ada-algo`, `ada-ai`, `ada-crypto`, `ada-compiler`.
- **Módulos Principales**:
  - **Transición Algorítmica Trilingüe**: Acompañamiento pedagógico continuo desde pseudocódigo estricto en **PSeInt** hacia **Python 3** idiomático/fuertemente tipado y **Go** de alto rendimiento concurrente.
  - **Análisis Asintótico Formal**: Demostraciones matemáticas rigurosas en $\mathcal{O}$, $\Omega$ y $\Theta$, Teorema Maestro y análisis de invariantes de bucle (Inicialización, Mantenimiento, Terminación).
  - **Estructuras de Datos Avanzadas**: Árboles autobalanceados (AVL, Red-Black), Heaps, DSU (Union-Find), Segment Trees, Grafos (Dijkstra, Tarjan) y programación dinámica.
  - **Autómatas & Teoría de Compiladores**: Jerarquía de Chomsky, autómatas finitos (DFA/NFA), gramáticas EBNF, parsers de descenso recursivo, ASTs tipados y representación SSA.
  - **Fundamentos Matemáticos de IA & Redes Neuronales**: Derivación analítica matricial de retropropagación (backpropagation), mecanismos de autoatención escalada (Transformers) y funciones de activación/pérdida analíticas.
  - **Criptografía Moderna Aplicada**: Cifrado simétrico autenticado (AES-256-GCM, ChaCha20-Poly1305), curvas elípticas (Curve25519, Ed25519), hashing (SHA-256, Argon2id) y Árboles de Merkle con pruebas $O(\log N)$.
- **Salida**: Algoritmos matemáticamente demostrados, especificaciones de gramáticas/compiladores y formulaciones criptográficas verificadas.

#### 38. `ada-neumann` (El Arquitecto de Sistemas, Linux & Hardware)
- **Ubicación**: [skills/ada-neumann/SKILL.md](skills/ada-neumann/SKILL.md)
- **Propósito**: Arquitectura física de computadores, ingeniería de sistemas operativos de bajo nivel (Linux Arch/CachyOS), redes de datos, Internet de las Cosas (IoT) e infraestructura en producción con contenedores.
- **Absorbe**: `ada-os`, `ada-net`, `ada-circuits`, `ada-distrib`, `ada-devops`, `ada-portainer`, `ada-iot`, `ada-hardware`, `ada-req`, `ada-qa`, `ada-hci`, `ada-engineer`, `ada-data`, `ada-econ`.
- **Módulos Principales**:
  - **Microarquitectura & Lógica Digital**: Modelo Von Neumann vs Harvard, ciclo Fetch-Decode-Execute, mapas de Karnaugh, Flip-Flops, Máquinas de Estados Finitos (FSM) y pipelining con hazards.
  - **Linux Avanzado & Kernel (Arch / CachyOS)**: Gestión de sistemas de archivos transaccionales Btrfs (subvolúmenes `@`, compresión Zstd, snapshots atómicos, scrubbing), aislamiento con namespaces y cgroups v2, y multiplexación de syscalls (`epoll`, `io_uring`).
  - **Redes & Telecomunicaciones**: Sockets BSD no bloqueantes, control de congestión TCP (BBR, CUBIC), captura y análisis de paquetes, TLS 1.3 y redes privadas overlay (WireGuard, Tailscale).
  - **Internet de las Cosas (IoT) & Telemetría**: Microcontroladores (ESP32, STM32), buses serie (I2C, SPI, UART), modos Deep Sleep y protocolo MQTT (Mosquitto, QoS 0/1/2, LWT) hacia bases de datos TSDB.
  - **Homelab & Contenedores de Producción**: Stacks declarativos seguros de Docker Compose (rootless, redes privadas, healthchecks), orquestación con Portainer y webhooks de despliegue continuo.
  - **Ingeniería de Software & Calidad**: Requisitos bajo FURPS+, historias INVEST, BPMN 2.0, pruebas de carga k6, complejidad ciclomática de McCabe y análisis económico TCO (Homelab vs Cloud).
- **Salida**: Stacks de Docker Compose reforzados, scripts de administración Linux Btrfs, especificaciones de firmware IoT y auditorías de arquitectura de sistemas.

---

## 🚀 Flujos de Trabajo Prácticos de Extremo a Extremo

### Flujo 1: Desarrollo de Nueva Característica con TDD y Subagentes

```mermaid
sequenceDiagram
    autonumber
    actor Usuario
    participant Orquestador as Ada-Agent
    participant Brainstorm as Brainstorming
    participant Plan as Writing-Plans
    participant Subagente as Subagent (Self)
    participant Verificador as Verification

    Usuario->>Orquestador: "Quiero agregar autenticación JWT con roles a mi API"
    Orquestador->>Brainstorm: Carga bajo demanda (SKILL.md)
    Brainstorm->>Usuario: Pregunta 1: "¿Qué almacén de usuarios y algoritmo de firma prefieres?" (ask_question)
    Usuario-->>Brainstorm: "PostgreSQL con bcrypt y HMAC-SHA256"
    Brainstorm->>Brainstorm: Propone diseño y redacta spec (YYYY-MM-DD-auth-design.md)
    Brainstorm->>Usuario: Presenta diseño para aprobación
    Usuario-->>Brainstorm: Aprobado
    Brainstorm->>Plan: Invoca writing-plans
    Plan->>Plan: Genera implementation_plan.md con tareas atómicas TDD
    Plan->>Orquestador: Pasa el control a subagent-driven-development
    
    loop Por cada tarea atómica del plan
        Orquestador->>Subagente: invoke_subagent(self, tarea N)
        Subagente->>Subagente: 1. Escribe prueba unitaria (RED)
        Subagente->>Subagente: 2. Implementa código mínimo (GREEN)
        Subagente->>Subagente: 3. Refactoriza y hace commit (ada-commit)
        Subagente-->>Orquestador: Tarea N completada con test exitoso
    end

    Orquestador->>Verificador: Ejecuta suite completa (npm test / pytest)
    Verificador-->>Orquestador: Exit code 0 (25/25 tests aprobados)
    Orquestador->>Usuario: Entrega completada con walkthrough.md y enlace a archivos
```

---

### Flujo 2: Depuración Sistemática de un Error en Producción

1. **Recepción del Error**: El usuario reporta: *"El endpoint `/orders` lanza error 500 cuando el carrito contiene más de 5 artículos"*.
2. **Invocación de `systematic-debugging`**: El agente lee [skills/systematic-debugging/SKILL.md](skills/systematic-debugging/SKILL.md).
3. **Paso 1: Reproducción**: Examina el stack trace con `view_file` y reproduce la llamada.
4. **Paso 2: Aislamiento de Causa Raíz**: Localiza una condición de carrera o un desbordamiento en la consulta SQL sin paginación (`ada-db`).
5. **Paso 3: Test Reproductor (RED)**: Escribe una prueba unitaria `tests/orders.test.js` que envía 6 artículos al carrito. Ejecuta `npm test` y verifica que falla con el error 500 exacto.
6. **Paso 4: Corrección de Causa Raíz (GREEN)**: Aplica la corrección quirúrgica en el controlador con `replace_file_content`.
7. **Paso 5: Verificación Empírica**: Corre toda la suite (`verification-before-completion`), valida `exit code 0`, crea el commit `fix(orders): handle batch sizing in checkout` (`ada-commit`) y presenta el resultado.

---

### Flujo 3: Lanzamiento Automatizado y Semantic Versioning

Cuando el repositorio está listo para un nuevo release:

```bash
# Para una corrección de bugs (ej. 1.4.0 -> 1.4.1)
npm run release -- patch

# Para nuevas funcionalidades retrocompatibles (ej. 1.4.0 -> 1.5.0)
npm run release -- minor

# Para cambios con incompatibilidad hacia atrás (ej. 1.4.0 -> 2.0.0)
npm run release -- major
```

**Qué ejecuta internamente el CLI de release (`bin/release.js` / `ada-release`):**
1. Ejecuta `npm test` y valida `exit code 0` (bloquea el release si algún test falla).
2. Verifica que `git status --porcelain` esté limpio.
3. Actualiza atómicamente la versión en `package.json`, `plugin.json`, `gemini-extension.json` e `installed_version.json`.
4. Invoca `ada-docs` para anteponer el bloque formateado en `CHANGELOG.md`.
5. Ejecuta `git commit -m "chore(release): vX.Y.Z"`.
6. Genera la etiqueta de Git: `git tag -a vX.Y.Z -m "Release vX.Y.Z"`.

---

## 📁 Estructura del Repositorio

```
Ada-Aider/
├── README.md                 # Documentación técnica maestra y catálogo exhaustivo
├── CHANGELOG.md              # Historial cronológico de cambios por versión
├── LICENSE                   # Licencia GPL v3 / MIT
├── NOTICE.md                 # Créditos y atribuciones a proyectos originales
├── gemini-extension.json     # Metadatos del plugin para Google Antigravity
├── GEMINI.md                 # Enrutador maestro e índice de carga bajo demanda (Lazy Loading)
├── package.json              # Configuración, scripts de release y test runner nativo
│
├── bin/
│   ├── install.js            # Instalador idempotente y seguro contra symlinks
│   └── release.js            # CLI de release automatizado para SemVer, changelog y tagging
│
├── skills/                   # Catálogo completo de las 38 habilidades
│   ├── using-superpowers/    # Regla maestra de invocación y tabla de 12 Red Flags
│   ├── brainstorming/        # Fase de diseño obligatorio y aprobación de spec (<HARD-GATE>)
│   ├── writing-plans/        # Redacción de planes atómicos con tareas TDD (2-5 min)
│   ├── executing-plans/      # Ejecución secuencial de planes y checklists
│   ├── subagent-driven-development/ # Orquestación de subagentes por tarea con TDD
│   ├── test-driven-development/    # Ciclo estricto RED-GREEN-REFACTOR
│   ├── systematic-debugging/       # Depuración de 5 pasos basada en evidencia
│   ├── verification-before-completion/ # Verificación empírica con exit code 0
│   ├── using-git-worktrees/        # Aislamiento de ramas con git worktrees
│   ├── requesting-code-review/     # Solicitud estructurada de revisión de código
│   ├── receiving-code-review/      # Recepción y aplicación rigurosa de code reviews
│   ├── finishing-a-development-branch/ # Finalización y limpieza de ramas de desarrollo
│   ├── dispatching-parallel-agents/  # Lanzamiento concurrente de subagentes independientes
│   ├── writing-skills/             # Meta-skill para diseñar y validar nuevas skills
│   ├── ada-agent/            # Orquestador maestro, micro-pensamiento y guardrails
│   ├── ada-brainstorm/       # Puente semántico hacia Superpowers brainstorming
│   ├── ada-plan/             # Puente semántico hacia writing-plans / executing-plans
│   ├── ada-code/             # Puente semántico hacia test-driven-development
│   ├── ada-verify/           # Puente semántico hacia verification-before-completion
│   ├── ada-debug/            # Puente semántico hacia systematic-debugging
│   ├── ada-review/           # Puente semántico hacia code review workflows
│   ├── ada-workflow/         # Descubrimiento de repositorios y spec project-workflow.md
│   ├── ada-taste/            # Pautas frontend UI/UX premium y anti-placeholders
│   ├── ada-db/               # Arquitectura SQL 3NF, diagramas ERD y EXPLAIN ANALYZE
│   ├── ada-security/         # Escaneo de secretos, seguridad de rutas y sanitización SQL
│   ├── ada-mcp/              # Integración y fallback de Model Context Protocol
│   ├── ada-hardware/         # C/C++ embebido estático, ISRs y RTL Verilog/VHDL
│   ├── ada-telemetry/        # Observabilidad, JSON logging con trace IDs y métricas LLM
│   ├── ada-mem/              # Gestión de presupuesto de contexto y resúmenes de sesión
│   ├── ada-docs/             # Documentación viva (Auto-README, alertas y CHANGELOG)
│   ├── ada-commit/           # Commits convencionales sin firmas automáticas de IA
│   ├── ada-release/          # Motor de lanzamientos y sincronización multi-archivo
│   ├── ada-proactive/        # Tareas proactivas y monitoreo en segundo plano
│   ├── ada-socrates/         # Forjador intelectual, mayéutica, simulador de parcial y sparring
│   ├── ada-davinci/          # Síntesis polímata, notas AFFiNE BlockSuite, APA 7, WBS y ética
│   ├── ada-newton/           # Rigor cuantitativo, cálculo Stewart, física clásica y cero pasos mágicos
│   ├── ada-turing/           # Ciencias de la computación teóricas, algoritmia formal, autómatas e IA
│   └── ada-neumann/          # Arquitectura de sistemas, Linux Btrfs/cgroups, redes, IoT y Docker
│
├── src/
│   └── hooks/                # Hooks nativos de integración para Claude Code y Antigravity
│       ├── ada-config.js     # Manejo seguro y atómico de archivos de configuración
│       ├── ada-stats.js      # Calculador de ahorro de tokens y parser de transcripts .jsonl
│       ├── ada-activate.js   # SessionStart: activa el bootstrap y actualiza estadísticas
│       ├── ada-tracker.js    # Intercepta comandos slash e inyecta compresión inteligente
│       └── ada-statusline.sh # Script Bash para renderizar la insignia [ADA:MODE] ⛏ SAVINGS
│
└── tests/                    # Suite de 25 pruebas unitarias e integrales con Node.js Test Runner
```

---

## 🛠️ Instalación y Configuración

### 1. Google Antigravity
Crea un enlace simbólico del repositorio en la ruta global de plugins de Antigravity:

```bash
mkdir -p ~/.gemini/config/plugins/
ln -s ~/Documents/GitHub/Ada_Aider ~/.gemini/config/plugins/ada-agent
```

### 2. Claude Code (CLI)
Ejecuta el instalador automatizado para registrar los hooks y la barra de estado en `~/.claude/settings.json`:

```bash
node bin/install.js
```

El instalador es completamente **idempotente**, no sobreescribe configuraciones existentes y preserva comentarios en formato JSONC.

---

## 🎮 Comandos Slash y Modos de Compresión (Caveman Mode)

Ada-Aider incluye un subsistema de compresión conversacional para minimizar el consumo de tokens en las respuestas del chat, manteniendo el máximo rigor técnico en los artefactos generados:

### Comandos Slash
- `/ada` o `/ada-agent`: Muestra el estado actual del agente, modo activo y estadísticas.
- `/ada lite`: Respuestas ágiles y concisas sin introducciones ni cortesías vacías.
- `/ada full`: Modo técnico directo y telegráfico para máxima velocidad.
- `/ada ultra`: Modo ultra-comprimido con máxima densidad de información por token.
- `/ada stats`: Muestra turnos analizados, caracteres procesados y el total de tokens ahorrados.
- `/ada off`: Desactiva la compresión y regresa al estilo conversacional estándar.
- `/socrates exam`: Activa el modo **Simulador de Parcial** en `ada-socrates` para evaluaciones universitarias con apagón pedagógico y calificación por rúbrica (0.0 a 5.0).
- `/socrates sparring`: Activa el modo **Sparring Dialéctico** en `ada-socrates` (*adversarial red-teaming*) para auditar críticamente código, ensayos o arquitecturas.

> [!NOTE]
> **Regla de Claridad en Artefactos**:
> La compresión conversacional se suspende automáticamente al generar o editar artefactos críticos (`implementation_plan.md`, `walkthrough.md`, `task.md` y especificaciones de diseño), garantizando que los documentos en disco mantengan el 100% de su detalle y claridad.

---

## 🧪 Verificación y Pruebas Automatizadas

El proyecto cuenta con una suite completa de pruebas unitarias y de integración ejecutada con el test runner nativo de Node.js:

```bash
npm test
```

Salida esperada:
```text
✔ ada-config getDefaultMode
✔ ada-config getFlagPath
✔ ada-config safeWriteFlag
✔ Hooks Integration (11 pruebas aprobadas)
✔ Installer & Verification (4 pruebas aprobadas)
✔ bumpSemver increments patch, minor, and major correctly
✔ updateJsonVersion updates json version field safely
✔ updateChangelog prepends version section without duplicating
✔ ada-stats calculateSavings
✔ ada-stats updateSavings
ℹ tests 25 | suites 0 | pass 25 | fail 0 | cancelled 0
```

---

## 📄 Licencia y Créditos

Este proyecto se distribuye bajo la licencia **GNU General Public License v3 (GPL v3)**.

Contiene conceptos, código y metodologías inspiradas y derivadas de los siguientes proyectos de código abierto bajo licencia MIT:
- **Superpowers** (Copyright (c) 2025 Jesse Vincent)
- **Caveman** (Copyright (c) 2026 Julius Brussee)
- **Taste-Skill** (Copyright (c) 2026 Leonxlnx)
- **Claude-Mem** (Copyright (c) 2026 thedotmack)
- **Sentry-Workflow** (Copyright (c) 2026 Getsentry)
- **Agent-Skills** (Copyright (c) 2026 Addy Osmani)
- **Harmonist** (Copyright (c) 2026 GammaLabTechnologies)

Consulte [NOTICE.md](NOTICE.md) para más detalles.
