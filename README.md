# Ada Aider

**Ada-Aider** es un sistema agente unificado, modular y altamente eficiente en el uso de tokens para asistentes de codificación de Inteligencia Artificial (Google Antigravity, Claude Code, Cursor, Windsurf y agentes impulsados por Gemini/Claude). El nombre está inspirado en **Ada Lovelace**, la matemática británica considerada la primera programadora de la historia.

Fusiona la **disciplina procedimental estricta de Superpowers** (diseño paso a paso con hard-gates, planificación atómica, TDD, depuración basada en evidencia, subagentes aislados y verificación empírica sin especulaciones) con las **habilidades de dominio especializadas de Ada** (diseño UI/UX premium, bases de datos SQL, seguridad, MCP, telemetría y hardware) y una **arquitectura de ahorro de tokens** de alto rendimiento.

---

## 🌟 Características Principales

### 1. Motor Procedimental Integrado (Superpowers Core Engine)
- 🧠 **Diseño Bloqueado (`brainstorming`)**: Fases de diseño obligatorias antes de tocar código (`<HARD-GATE>`). Consultas de opción múltiple estructuradas (`ask_question`), propuestas de arquitectura y especificación técnica validada por el usuario.
- 📋 **Planificación Atómica y Ejecución (`writing-plans` / `executing-plans`)**: Desglose de tareas diminutas con listas de verificación Markdown (`IsArtifact: true`) y comandos de prueba exactos.
- 🤖 **Desarrollo Guiado por Subagentes (`subagent-driven-development`)**: Despliegue de subagentes dedicados (`invoke_subagent` con `self` o `research`) por cada tarea en contextos limpios, aislando la ventana de contexto del chat principal.
- 🧪 **Desarrollo Guiado por Pruebas (`test-driven-development`)**: Ciclo RED-GREEN-REFACTOR obligatorio. Escribir prueba -> ver fallar -> implementar -> ver pasar -> refactorizar.
- 🔍 **Depuración Basada en Evidencia (`systematic-debugging`)**: Prohíbe adivinar o colocar parches sintomáticos; exige un test reproductor del fallo antes de modificar el código fuente.
- 🧪 **Verificación Empírica (`verification-before-completion`)**: Prohíbe afirmaciones especulativas (*"debería funcionar"*). Exige ejecución de compiladores/tests en la terminal y reporte del `exit code 0`.

### 2. Habilidades Especializadas de Dominio (Ada Domain Skills)
- 🎨 **UI/UX Premium (`ada-taste`)**: Estética moderna con Google Fonts (Inter, Roboto, Outfit), paletas HSL, Glassmorphism, CSS dinámico (Grid/Flex, `:has()`, `:user-valid`), accesibilidad WCAG 2.2 AA y eliminación de placeholders mediante la herramienta `generate_image`.
- 🗄️ **Bases de Datos & SQL (`ada-db`)**: Normalización 3NF/Star Schema, diagramación ERD Mermaid, migraciones reversibles (UP/DOWN) y optimización con `EXPLAIN ANALYZE`.
- 🔒 **Seguridad y Permisos (`ada-security`)**: Auditoría automatizada de secretos con `grep_search`, sanitización de entradas contra inyecciones y manejo seguro de rutas (`ask_permission`).
- 🔌 **Model Context Protocol (`ada-mcp`)**: Integración con servidores MCP, descubrimiento de herramientas y rutas de fallback seguro a la terminal.
- ⚡ **Embebidos & Hardware (`ada-hardware`)**: Memoria estática en C/C++ (ESP-IDF, Zephyr), ISRs ultra-cortas y diseño Verilog/VHDL sintetizable con testbenches reproducibles (`verilator`/`iverilog`).
- 📊 **Observabilidad & Telemetría (`ada-telemetry`)**: Logs JSON estructurados con Trace IDs, instrumentación OpenTelemetry/Sentry y seguimiento de tokens/costo de llamadas LLM.

### 3. Habilidades de Ingeniería, Academia y Dinámicas de Equipo (Engineering Growth Suite)
- 🔬 **Investigación Científica y Técnica (`ada-research`)**: Formulación de hipótesis falsables ($H_0/H_1$), estado del arte en IEEE/ACM/arXiv, aislamiento de variables y plantillas `RESEARCH_PLAN.md`.
- 📊 **Desglose de Proyectos WBS (`ada-breakdown`)**: Desglose jerárquico de entregables en 4 niveles, análisis de ruta crítica (CPM/PERT) y matrices de riesgo técnico.
- ⚙️ **Pensamiento en Sistemas (`ada-engineer`)**: Dinámica de sistemas (bucles de realimentación), análisis de causa raíz (5 Whys, Ishikawa) y matrices formales de trade-offs de arquitectura.
- 💡 **Pedagogía de Primeros Principios (`ada-feynman`)**: Explicación conceptual multinivel (de analogía sin jerga a formalismo matemático y código) conectada al currículo de ingeniería.
- 📐 **Matemáticas Aplicadas (`ada-math`)**: Cálculo multivariable, álgebra lineal computacional (SVD, eigenvalores), métodos numéricos (RK4) y matemáticas discretas.
- 📝 **Preparación de Exámenes y Active Recall (`ada-study`)**: Simulador interactivo de exámenes graduados, rúbricas de corrección y flashcards atómicas tipo Anki.
- ⚡ **Estructuras de Datos y Algoritmos (`ada-algo`)**: Análisis asintótico riguroso ($O, \Omega, \Theta$), invariantes de bucle, algoritmos avanzados y preparación para competencias/entrevistas técnicas.
- 🏛️ **Diseño de Sistemas y C4 (`ada-arch`)**: Diagramas C4 (Contexto, Contenedor, Componente, Código), resiliencia distribuida y registros de decisión arquitectónica (`ADR-001.md`).
- 🚀 **Portafolio y Carrera Técnica (`ada-career`)**: Proyectos de ingeniería de impacto profundo con benchmarks, redacción de RFCs técnicos y estrategia de contribución a Open Source.
- 🤝 **Soft Skills y Trabajo en Equipo (`ada-collab`)**: Comunicación con stakeholders vía BLUF, cultura de code review sin ego (`[blocking]`, `[suggestion]`, `[nit]`), resolución de desacuerdos ("Disagree & Commit") y post-mortems sin culpa.
- 🐧 **Sistemas Operativos y Kernel (`ada-os`)**: Concurrencia de bajo nivel (mutex, atomics, lock-free CAS), memoria virtual/paginación, `epoll`/`io_uring` y diagnósticos con `gdb`/`strace`/`perf`.
- 📡 **Redes de Computadoras (`ada-net`)**: Protocolos TCP/IP, sockets BSD no bloqueantes, análisis con `tcpdump`, HTTP/2, HTTP/3 (QUIC), WebSockets y TLS 1.3.
- 🐳 **Contenedores y CI/CD (`ada-devops`)**: Dockerfiles multi-stage de mínima superficie, aislamiento cgroups/namespaces, pipelines GitHub Actions y hardening Linux.
- 🤖 **Inteligencia Artificial y ML (`ada-ai`)**: Matemáticas de redes neuronales (backpropagation, loss functions), arquitecturas Transformers (Self-Attention) e inferencia local ONNX.
- ⚙️ **Compiladores y Autómatas (`ada-compiler`)**: Jerarquía de Chomsky (DFA/NFA), gramáticas BNF/EBNF, parsers de descenso recursivo, ASTs, SSA IR y diseño de DSLs.
- ⚡ **Física y Simulación (`ada-physics`)**: Mecánica clásica, electromagnetismo (Maxwell), circuitos RLC, termodinámica e integración numérica simpléctica (Verlet).
- 📊 **Ciencia de Datos y Estadística (`ada-data`)**: Análisis exploratorio (EDA), pruebas de hipótesis ($t$-test, ANOVA, $p$-values), regresión multivariada y visualización científica.
- 💰 **Ingeniería Económica (`ada-econ`)**: Valor Presente Neto (VPN/NPV), Tasa Interna de Retorno (TIR/IRR), análisis TCO de nube vs On-Premises y viabilidad financiera.
- 🚢 **Portainer y Stacks Docker Compose (`ada-portainer`)**: Orquestación de stacks, resolución de permisos de volúmenes UID/GID, webhooks de auto-actualización, redes aisladas y hardening de Docker Socket.

### 4. Ahorro de Tokens y Eficiencia de Contexto
- ⚡ **Arquitectura Lazy Loading (`GEMINI.md`)**: Carga dinámica de skills que reduce entre un **65% y 85% los Input Tokens** por turno de conversación.
- 🔕 **Directiva de Cero Duplicación**: Prohíbe re-imprimir bloques de código completos o re-sumarizar artifacts (`implementation_plan.md`, `walkthrough.md`) en la ventana de chat cuando ya fueron guardados en disco.
- ⛏️ **Compresión Conversacional (Caveman Mode)**: Modos de brevedad sin relleno conversacional (`lite`, `full`, `ultra`, `off`).

### 5. Automatización de Repositorios y Releases
- **Auto-Documentación (`ada-docs`)**: Sincroniza `README.md`, aplica alertas estructuradas de GitHub (`> [!NOTE]`, `> [!IMPORTANT]`) y antepone notas ordenadas en `CHANGELOG.md`.
- **Commits Convencionales (`ada-commit`)**: Mensajes bajo el estándar *Conventional Commits* (`feat`, `fix`, `docs`, `refactor`, `perf`, `chore`) limitados a ≤50 caracteres.
- **Motor de Lanzamiento (`ada-release` / `npm run release`)**: Bump semántico multideclarativo (`package.json`, `plugin.json`, `gemini-extension.json`, `installed_version.json`), verificación de test gate y etiquetado `git tag`.

---

## 📁 Estructura del Proyecto

```
Ada-Aider/
├── README.md                 # Documentación principal del proyecto
├── CHANGELOG.md              # Historial de cambios por versión
├── LICENSE                   # Licencia GPL v3 / MIT
├── NOTICE.md                 # Créditos y atribuciones a proyectos originales
├── gemini-extension.json     # Metadatos del plugin para Antigravity
├── GEMINI.md                 # Enrutador maestro e índice dinámico de carga bajo demanda
├── package.json              # Configuración, scripts de release y test runner
│
├── bin/
│   ├── install.js            # Instalador seguro contra symlinks
│   └── release.js            # CLI de release automatizado para semver y tagging git
│
├── skills/                   # Habilidades procedimentales y de dominio
│   ├── using-superpowers/    # Regla maestra de invocación y tabla de Red Flags
│   ├── brainstorming/        # Fase de diseño obligatorio y aprobación de spec (<HARD-GATE>)
│   ├── writing-plans/        # Redacción de planes atómicos y tareas verificables
│   ├── executing-plans/      # Ejecución ordenada de planes y checklists
│   ├── subagent-driven-development/ # Orquestación de subagentes por tarea con TDD
│   ├── test-driven-development/    # Ciclo estricto RED-GREEN-REFACTOR
│   ├── systematic-debugging/       # Depuración de 5 pasos con test reproductor
│   ├── verification-before-completion/ # Verificación empírica con exit code 0
│   ├── using-git-worktrees/        # Aislamiento de ramas con git worktrees
│   ├── requesting-code-review/     # Solicitud estructurada de revisión de código
│   ├── receiving-code-review/      # Recepción y aplicación rigurosa de code reviews
│   ├── finishing-a-development-branch/ # Finalización y limpieza de ramas de desarrollo
│   ├── dispatching-parallel-agents/  # Lanzamiento paralelo de subagentes
│   ├── writing-skills/             # Meta-skill para crear y probar nuevas skills
│   ├── ada-agent/            # Orquestador maestro, micro-pensamiento y 5 guardrail gates
│   ├── ada-brainstorm/       # Puente hacia Superpowers brainstorming
│   ├── ada-plan/             # Puente hacia Superpowers writing-plans / executing-plans
│   ├── ada-code/             # Puente hacia Superpowers test-driven-development
│   ├── ada-verify/           # Puente hacia Superpowers verification-before-completion
│   ├── ada-debug/            # Puente hacia Superpowers systematic-debugging
│   ├── ada-review/           # Puente hacia Superpowers code review workflows
│   ├── ada-docs/             # Documentación viva (Auto-README & CHANGELOG)
│   ├── ada-workflow/         # Descubrimiento profundo de proyectos y specs de flujo
│   ├── ada-commit/           # Generador de commits convencionales ultra-terse
│   ├── ada-taste/            # Pautas frontend y diseño UI/UX anti-slop
│   ├── ada-security/         # Escaneo de secretos y verificación de seguridad
│   ├── ada-mcp/              # Integración de servidores Model Context Protocol
│   ├── ada-mem/              # Compactación y gestión de memoria de contexto
│   ├── ada-telemetry/        # Observabilidad, JSON logging y métricas LLM
│   ├── ada-release/          # Despliegues automatizados y motor de lanzamientos
│   ├── ada-db/               # Diseño de bases de datos 3NF, ERD Mermaid y EXPLAIN ANALYZE
│   ├── ada-proactive/        # Tareas proactivas y monitoreo en segundo plano
│   ├── ada-hardware/         # C/C++ embebido estático, ISRs y sintesis Verilog/VHDL
│   ├── ada-research/         # Metodología de investigación, hipótesis y estado del arte
│   ├── ada-breakdown/        # Desglose de proyectos WBS, dependencias y ruta crítica
│   ├── ada-engineer/         # Pensamiento en sistemas, RCA 5 Whys y trade-offs
│   ├── ada-feynman/          # Pedagogía de primeros principios multinivel y materias
│   ├── ada-math/             # Matemáticas aplicadas, cálculo, álgebra lineal y solvers
│   ├── ada-study/            # Active recall, generador de exámenes y flashcards
│   ├── ada-algo/             # Estructuras de datos, invariantes y análisis asintótico
│   ├── ada-arch/             # Diseño de sistemas, modelo C4 y plantillas ADR
│   ├── ada-career/           # Portafolio de ingeniería de impacto, RFCs y Open Source
│   ├── ada-collab/           # Soft skills, comunicación BLUF, code review y post-mortems
│   ├── ada-os/               # Sistemas operativos, concurrencia, memoria virtual y syscalls
│   ├── ada-net/              # Redes de computadoras, protocolos TCP/IP, sockets y TLS 1.3
│   ├── ada-devops/           # Contenedores multi-stage, CI/CD, cgroups y hardening Linux
│   ├── ada-ai/               # Machine learning, backprop, Transformers y optimización ONNX
│   ├── ada-compiler/         # Compiladores, teoría de autómatas, ASTs, SSA y DSLs
│   ├── ada-physics/          # Física clásica, electromagnetismo Maxwell y simulación Verlet
│   ├── ada-data/             # Ciencia de datos, EDA, estadística inferencial y tests de hipótesis
│   ├── ada-econ/             # Ingeniería económica, evaluación VPN/TIR y análisis TCO cloud
│   └── ada-portainer/        # Orquestación Portainer, stacks Compose, volúmenes y webhooks



│
├── src/
│   └── hooks/                # Integraciones nativas de Claude Code y Antigravity
│       ├── ada-config.js   # Manejo seguro de archivos de estado
│       ├── ada-stats.js    # Calculador de ahorro y parser de transcripts .jsonl
│       ├── ada-activate.js # SessionStart: activa el bootstrap y actualiza estadísticas
        ├── ada-tracker.js  # Intercepta comandos, inyecta ultra-compresión y suspende compresión
│       └── ada-statusline.sh # Script Bash para renderizar la insignia [ADA:MODE] ⛏ SAVINGS
│
└── tests/                    # Suite de pruebas automatizadas con el test runner nativo de Node.js
```

---

## 🛠️ Guía de Instalación y Uso

### 1. Google Antigravity
Crea un enlace simbólico de la carpeta del proyecto en la ruta de plugins globales de Antigravity:

```bash
mkdir -p ~/.gemini/config/plugins/
ln -s ~/Documents/GitHub/Ada_Aider ~/.gemini/config/plugins/ada-agent
```

### 2. Claude Code (CLI)
Desde la raíz del proyecto, ejecuta el instalador para configurar tus hooks y la barra de estado en `~/.claude/settings.json`:

```bash
node bin/install.js
```

---

## 💻 Cómo Usar Ada_Aider en un Proyecto Real

### Flujo Típico de Desarrollo

1. **Crear una nueva característica o proyecto:**
   Simplemente dile al asistente qué deseas construir:
   > *"Quiero agregar autenticación OAuth2 y roles de usuario a mi API"*
   
   *Ada_Aider invocará automáticamente `brainstorming`, explorará el contexto, te hará preguntas de opción múltiple con `ask_question`, presentará las opciones de arquitectura y redactará el documento de diseño (`design.md`) antes de tocar código.*

2. **Aprobar el plan e implementar:**
   Una vez aprobado el diseño, Ada_Aider pasará a `writing-plans` e iniciará la ejecución con `subagent-driven-development` y **TDD** (escribiendo primero las pruebas unitarias/de integración).

3. **Verificación y Entrega:**
   Ada_Aider ejecutará las pruebas en la terminal verificando el `exit code 0` (`verification-before-completion`), actualizará el `CHANGELOG.md` (`ada-docs`) y preparará el commit convencional (`ada-commit`).

### Automatización de Releases Multi-Archivo
Para realizar un lanzamiento automatizado con bump semántico y tagging en Git:

```bash
# Lanzamiento patch (ej: 1.4.0 -> 1.4.1)
npm run release -- patch

# Lanzamiento minor (ej: 1.4.0 -> 1.5.0)
npm run release -- minor

# Prueba en seco sin modificar archivos
npm run release -- --dry-run
```

---

## 🎮 Comandos y Modos de Compresión

### Comandos Slash (Chat de Antigravity / Claude Code)
- `/ada` o `/ada-agent` — Muestra el estado del agente y modo activo.
- `/ada [lite|full|ultra]` — Cambia el nivel de compresión de respuestas.
- `/ada stats` — Muestra turnos, caracteres procesados y ahorro acumulado de la sesión.
- `/ada off` — Desactiva el modo abreviado.

### Frases de Activación en Lenguaje Natural
- **Activar**: *"talk like caveman"*, *"use ada-agent"*, *"activate ada-agent"*.
- **Desactivar**: *"normal mode"*, *"stop ada-agent"*, *"deactivate ada-agent"*.

---

## 📄 Licencia y Créditos
Este proyecto se distribuye bajo la licencia **GNU General Public License v3 (GPL v3)**. 

Contiene porciones de código e instrucciones derivadas de los siguientes proyectos originales bajo licencia MIT:
- **Superpowers** (Copyright (c) 2025 Jesse Vincent)
- **Caveman** (Copyright (c) 2026 Julius Brussee)
- **Taste-Skill** (Copyright (c) 2026 Leonxlnx)
- **Claude-Mem** (Copyright (c) 2026 thedotmack)
- **Sentry-Workflow** (Copyright (c) 2026 Getsentry)
- **Agent-Skills** (Copyright (c) 2026 Addy Osmani)
- **Harmonist** (Copyright (c) 2026 GammaLabTechnologies)

Consulte [NOTICE.md](NOTICE.md) para más detalles.

