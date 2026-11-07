# Diseño de Modularización de Skills Gigantes (`ada-neumann` & `ada-turing`)

**Fecha**: 2026-11-07  
**Estado**: Aprobado por el usuario  
**Meta**: Reducir el tamaño de `skills/ada-neumann/SKILL.md` y `skills/ada-turing/SKILL.md` por debajo de 800 líneas mediante extracción a `references/`, permitiendo lectura en una sola invocación de `view_file` y reduciendo el ratchet de prueba a 800 líneas.

---

## 1. Contexto & Problema

En Google Antigravity y Claude Code, la herramienta `view_file` devuelve un máximo de 800 líneas por llamada (o trunca el contenido).
- `skills/ada-neumann/SKILL.md` tiene **1.218 líneas** (~66 KB).
- `skills/ada-turing/SKILL.md` tiene **1.012 líneas** (~63 KB).

Cuando el agente invoca estas skills, solo lee los primeros dos tercios, perdiendo checklists críticos, ejemplos canónicos y directivas clave a menos que realice paginación manual.

---

## 2. Arquitectura de la Solución: Patrón `references/`

Cada skill mantendrá:
1. **`SKILL.md` (Núcleo Operativo, ≤700 líneas)**:
   - Frontmatter YAML (`name`, `description`).
   - Principios rectores, modelos conceptuales y fórmulas.
   - Directivas y guardrails innegociables.
   - Resumen de módulos teóricos.
   - Checklist de rigor técnico.
   - Enlace canónico a `references/examples.md` mediante `view_file`.

2. **`references/examples.md` (Catálogo de Código e Implementaciones)**:
   - Todo el contenido de la Sección 7 ("Micro-Ejemplos Canónicos de Demostración & Código"): scripts completos de Btrfs, servidores epoll con selectors, implementaciones trilingües (PSeInt $\to$ Python $\to$ Go), ASTs/parsers y matrices PICT.

---

## 3. Plan de Archivos Afectados

1. **`skills/ada-neumann/references/examples.md`**:
   - Extraer Sección 7 (líneas 685-1204 de `ada-neumann/SKILL.md`).
2. **`skills/ada-neumann/SKILL.md`**:
   - Reemplazar la Sección 7 por una sección compacta con tabla de contenido de ejemplos y puntero a `references/examples.md`.
   - Nuevo tamaño estimado: ~700 líneas.
3. **`skills/ada-turing/references/examples.md`**:
   - Extraer Sección 7 ("Micro-Ejemplos Canónicos de Demostración & Código") y ejemplos de prueba combinatoria PICT.
4. **`skills/ada-turing/SKILL.md`**:
   - Reemplazar la Sección 7 por tabla de ejemplos y puntero a `references/examples.md`.
   - Nuevo tamaño estimado: ~650 líneas.
5. **`tests/skills-lint.test.js`**:
   - Reducir `MAX_SKILL_LINES` de 1300 a **800**.
   - Añadir verificación de que `references/examples.md` existe para las skills modularizadas.

---

## 4. Criterios de Aceptación & Verificación

- Todos los `SKILL.md` del repositorio tienen $\le 800$ líneas.
- `MAX_SKILL_LINES = 800` en `tests/skills-lint.test.js`.
- Los 69+ tests automatizados continúan pasando al 100% (`npm test`).
- Cobertura de código y suite íntegra sin regresiones.
