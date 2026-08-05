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

### 3. Ahorro de Tokens y Eficiencia de Contexto
- ⚡ **Arquitectura Lazy Loading (`GEMINI.md`)**: Carga dinámica de skills que reduce entre un **65% y 85% los Input Tokens** por turno de conversación.
- 🔕 **Directiva de Cero Duplicación**: Prohíbe re-imprimir bloques de código completos o re-sumarizar artifacts (`implementation_plan.md`, `walkthrough.md`) en la ventana de chat cuando ya fueron guardados en disco.
- ⛏️ **Compresión Conversacional (Caveman Mode)**: Modos de brevedad sin relleno conversacional (`lite`, `full`, `ultra`, `off`).

### 4. Automatización de Repositorios y Releases
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
│   └── ada-hardware/         # C/C++ embebido estático, ISRs y sintesis Verilog/VHDL
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

