# Ada Aider

**Ada-Aider** es un sistema de habilidades unificado, modular y altamente eficiente en el uso de tokens para asistentes de codificación de Inteligencia Artificial (como Claude Code, Cursor, Cline, Windsurf y Antigravity). El nombre está inspirado en **Ada Lovelace**, la matemática británica considerada la primera programadora de la historia. 

Fusiona la **disciplina operativa de Superpowers** (diseño, planificación ágil, TDD, depuración y verificación estricta) con la **comunicación ultra-abreviada de Caveman** (reducción de hasta un 75% en tokens de salida) sin perder precisión técnica.

---

## Características Principales

### 1. Ultra-Compresión de Respuestas (Chat Terse & Lazy Loading)
- Elimina palabras de relleno, artículos y saludos innecesarios en la conversación con el agente.
- Modos ajustables: `lite`, `full` (por defecto) y `ultra`.
- **Arquitectura Lazy Loading**: `GEMINI.md` actúa como un enrutador ultra-ligero que carga skills especializadas únicamente cuando se necesitan, reduciendo hasta un 65% los tokens de contexto inicial.
- **Regla de Claridad de Artefactos**: La compresión se suspende automáticamente al escribir o modificar planes de desarrollo (`implementation_plan.md`), listas de tareas (`task.md`), walkthroughs (`walkthrough.md`) y especificaciones técnicas.

### 2. 5 Guardrail Gates de Operación Obligatoria
- 🛡️ **Planning Gate (`ada-plan`)**: Bloquea ediciones de código en tareas no triviales hasta aprobar un `implementation_plan.md`.
- 🔍 **Evidence Debugging Gate (`ada-debug`)**: Exige logs de error reales y pruebas reproductoras antes de modificar código de producción.
- 👁️ **Anti-Hallucination Gate (`ada-agent`)**: Inspecciona firmas de métodos y esquemas antes de invocarlos.
- 🧪 **Verification Gate (`ada-verify`)**: Prohíbe afirmaciones especulativas ("debería funcionar"). Exige ejecución empírica de pruebas y reporte de `exit code`.
- 🤖 **Subagent Delegation Gate (`ada-agent`)**: Delega búsquedas masivas a subagentes de investigación (`research`) para proteger el contexto principal.

### 3. Automatización de Repositorios y Lanzamientos (Release Engine & Auto-Docs)
- **Descubrimiento Profundo de Proyectos (`ada-workflow`)**: Audita la pila tecnológica, motores de prueba y archivos de versión al entrar a un repositorio, generando `docs/specs/project-workflow.md`.
- **Documentación Viva (`ada-docs`)**: Sincroniza automáticamente `README.md` y actualiza `CHANGELOG.md` con los cambios realizados.
- **Motor de Releases Multi-Archivo (`ada-release` / `npm run release`)**: Incrementa versiones semánticas en todos los archivos de configuración (`package.json`, `plugin.json`, `gemini-extension.json`, `installed_version.json`), actualiza el CHANGELOG y crea etiquetas git (`vX.Y.Z`).

---

## Estructura del Proyecto

```
Ada-Aider/
├── README.md                 # Documentación principal del proyecto
├── CHANGELOG.md              # Historial de cambios por versión
├── LICENSE                   # Licencia MIT
├── NOTICE.md                 # Créditos y atribuciones a proyectos originales (MIT)
├── gemini-extension.json     # Metadatos del plugin para Antigravity
├── GEMINI.md                 # Enrutador maestro y sitemap de carga bajo demanda
├── package.json              # Configuración, scripts de release y bindings
│
├── bin/
│   ├── install.js            # Instalador idempotente y seguro contra enlaces simbólicos (symlinks)
│   └── release.js            # CLI de release automatizado para bumps de versión y tagging git
│
├── skills/                   # Instrucciones comprimidas para el agente
│   ├── ada-agent/          # Orquestador maestro, micro-pensamiento y 5 guardrail gates
│   ├── ada-brainstorm/     # Fase creativa y preguntas de opción múltiple
│   ├── ada-plan/           # Formato de "Nano-Planes" eficientes en tokens
│   ├── ada-code/           # TDD y bucle RED-GREEN-REFACTOR
│   ├── ada-verify/         # Evidencia dura y comandos de prueba
│   ├── ada-docs/           # Documentación viva (Auto-README & CHANGELOG)
│   ├── ada-workflow/       # Descubrimiento profundo de proyectos y specs de flujo
│   ├── ada-commit/         # Generador de commits convencionales ultra-terse
│   ├── ada-review/         # Comentarios de revisión de código en una línea
│   ├── ada-debug/          # Depuración sistemática de 5 pasos basada en evidencias
│   ├── ada-taste/          # Pautas frontend y diseño anti-slop
│   ├── ada-security/       # Checklists de seguridad y verificación de rutas
│   ├── ada-mcp/            # Integración de servidores Model Context Protocol
│   ├── ada-mem/            # Compactación y gestión de memoria de contexto
│   ├── ada-telemetry/      # Monitoreo y trazabilidad de errores
│   ├── ada-release/        # Despliegues automatizados y motor de lanzamientos
│   ├── ada-db/             # Diseño de base de datos, optimización y migraciones
│   ├── ada-proactive/      # Tareas proactivas y monitoreo en segundo plano
│   └── ada-hardware/       # Desarrollo firmware y diseño RTL de hardware
│
├── src/
│   └── hooks/                # Integraciones nativas de Claude Code
│       ├── ada-config.js   # Manejo seguro de archivos de estado
│       ├── ada-stats.js    # Calculador de ahorro y parser de transcripts .jsonl
│       ├── ada-activate.js # SessionStart: activa el bootstrap y actualiza estadísticas
│       ├── ada-tracker.js  # UserPromptSubmit: intercepta comandos y suspende compresión
│       └── ada-statusline.sh # Script Bash para renderizar el badge [ADA:MODE] ⛏ SAVINGS
│
└── tests/                    # Suite de pruebas automatizadas con el test runner nativo de Node.js
```

---

## Guía de Instalación y Uso

### 1. Claude Code (CLI)
Desde la raíz del proyecto, ejecuta el instalador para configurar de forma segura tus hooks y la barra de estado en `~/.claude/settings.json`:

```bash
node bin/install.js
```

### 2. Google Antigravity
Copia la carpeta del proyecto a tu directorio de plugins globales de Antigravity (o crea un enlace simbólico):

```bash
mkdir -p ~/.gemini/config/plugins/
ln -s ~/Documents/GitHub/Ada_Aider ~/.gemini/config/plugins/ada-agent
```

### 3. Automatización de Releases
Para realizar un lanzamiento automatizado en cualquier proyecto configurado con `Ada_Aider`:

```bash
# Lanzamiento patch (ej: 1.3.0 -> 1.3.1)
npm run release -- patch

# Lanzamiento minor (ej: 1.3.0 -> 1.4.0)
npm run release -- minor

# Prueba en seco sin modificar archivos
npm run release -- --dry-run
```

---

## Comandos y Activación

### Comandos Slash (Chat de Claude Code / Antigravity)
- `/ada` o `/ada-agent` — Muestra el estado del agente y modo activo.
- `/ada [lite|full|ultra]` — Cambia el nivel de compresión.
- `/ada stats` — Muestra turnos, caracteres procesados y el ahorro acumulado de la sesión.
- `/ada off` — Desactiva por completo el modo abreviado.

### Frases de Activación en Lenguaje Natural
- **Activar**: *"talk like caveman"*, *"use ada-agent"*, *"activate ada-agent"*.
- **Desactivar**: *"normal mode"*, *"stop ada-agent"*, *"deactivate ada-agent"*.

---

## Licencia y Créditos
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
