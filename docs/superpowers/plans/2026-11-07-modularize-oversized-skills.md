# Modularize Oversized Skills Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modularize `skills/ada-neumann/SKILL.md` and `skills/ada-turing/SKILL.md` by moving large code examples into `references/examples.md`, reducing their line counts below 800, and lowering the size ratchet in `tests/skills-lint.test.js` from 1300 to 800 lines.

**Architecture:** Extraction pattern. The operative conceptual doctrine and checklist remain in `SKILL.md`. Canonical implementations and large code listings reside in `references/examples.md`. A strict automated test ratchet enforces `MAX_SKILL_LINES = 800`.

**Tech Stack:** Node.js, `node:test`, Markdown.

## Global Constraints
- Every `SKILL.md` must be $\le 800$ lines.
- No existing technical content (scripts, diagrams, formulas) may be discarded; all extracted examples must be preserved in `references/examples.md`.
- All tests must pass cleanly (`npm test`).
- Zero new runtime or dev dependencies.

---

### Task 1: Lower Size Ratchet & Require References Test (Failing Test)

**Files:**
- Modify: `tests/skills-lint.test.js`

- [ ] **Step 1: Update test with lower ratchet and references assertion**
In `tests/skills-lint.test.js`:
Change `const MAX_SKILL_LINES = 1300;` to `const MAX_SKILL_LINES = 800;`
Add test verifying modularized skills have `references/examples.md`:
```js
test('modularized skills carry references/examples.md', () => {
  for (const dir of ['ada-neumann', 'ada-turing']) {
    const refPath = path.join(skillsRoot, dir, 'references', 'examples.md');
    assert.ok(fs.existsSync(refPath), `${dir} must have references/examples.md`);
  }
});
```

- [ ] **Step 2: Run test to verify failure**
Run: `node --test tests/skills-lint.test.js`
Expected: FAIL (both `ada-neumann` and `ada-turing` exceed 800 lines, and `references/examples.md` does not yet exist).

- [ ] **Step 3: Commit the failing test update**
```bash
git add tests/skills-lint.test.js
git commit -m "test(skills): lower size ratchet to 800 lines and require references for neumann and turing"
```

---

### Task 2: Modularize `ada-neumann`

**Files:**
- Create: `skills/ada-neumann/references/examples.md`
- Modify: `skills/ada-neumann/SKILL.md`

- [ ] **Step 1: Extract Section 7 to `references/examples.md`**
Extract lines 685-1204 (Section 7 "Micro-Ejemplos Canónicos de Demostración & Código") into `skills/ada-neumann/references/examples.md` with appropriate markdown title.

- [ ] **Step 2: Update `skills/ada-neumann/SKILL.md`**
Replace Section 7 with a concise reference pointer:
```markdown
## 7. Micro-Ejemplos Canónicos de Demostración & Código

> [!NOTE] Referencias Extensas de Implementación
> Para consultar el código fuente completo, scripts de administración y arquitecturas de referencia, lee el archivo de soporte mediante `view_file`:
> - [references/examples.md](references/examples.md)

### Catálogo de Implementaciones Disponibles en Referencia:
1. **Servidor TCP Epoll No Bloqueante (Python con selectors)**: Manejo asíncrono POSIX y buffers delimitados.
2. **Gestor Automatizado de Snapshots Btrfs (Bash Profesional)**: Políticas de retención, atomicidad y scrubbing.
3. **Firmware IoT Telemetría MQTT (C++ ESP-IDF / FreeRTOS)**: Deep sleep, reconexión exponencial y QoS 1.
4. **Stack Docker Compose Seguro (Rootless & Redes Privadas)**: Orquestación declarativa con Portainer y healthchecks.
```

- [ ] **Step 3: Verify line count**
Run: `wc -l skills/ada-neumann/SKILL.md`
Expected: $\le 720$ lines (well under 800).

- [ ] **Step 4: Commit**
```bash
git add skills/ada-neumann/
git commit -m "refactor(skills): modularize ada-neumann extracting examples to references"
```

---

### Task 3: Modularize `ada-turing`

**Files:**
- Create: `skills/ada-turing/references/examples.md`
- Modify: `skills/ada-turing/SKILL.md`

- [ ] **Step 1: Extract Section 7 to `references/examples.md`**
Extract lines 521-998 (Section 7 "Micro-Ejemplos Canónicos de Demostración & Código" and PICT test design code blocks) into `skills/ada-turing/references/examples.md`.

- [ ] **Step 2: Update `skills/ada-turing/SKILL.md`**
Replace Section 7 with a concise reference pointer:
```markdown
## 7. Micro-Ejemplos Canónicos de Demostración & Código

> [!NOTE] Referencias Extensas de Implementación
> Para consultar las implementaciones algorítmicas completas, pruebas trilingües y modelos de compiladores, lee el archivo de soporte mediante `view_file`:
> - [references/examples.md](references/examples.md)

### Catálogo de Implementaciones Disponibles en Referencia:
1. **Invariante de Bucle y Búsqueda Binaria**: Demostración y transición pedagógica trilingüe (PSeInt $\to$ Python 3 $\to$ Go).
2. **Árbol Binario de Búsqueda (BST) Autobalanceado**: Inserciones, rotaciones y demostración asintótica.
3. **Parser de Descenso Recursivo con AST Tipado**: Análisis léxico y sintáctico para expresiones aritméticas.
4. **Diseño Combinatorio de Pruebas (PICT / Pairwise Testing)**: Matrices ortogonales y reducción exponencial de casos.
```

- [ ] **Step 3: Verify line count**
Run: `wc -l skills/ada-turing/SKILL.md`
Expected: $\le 650$ lines (well under 800).

- [ ] **Step 4: Commit**
```bash
git add skills/ada-turing/
git commit -m "refactor(skills): modularize ada-turing extracting examples to references"
```

---

### Task 4: Final Suite Verification & Documentation

**Files:**
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Run full test suite and coverage**
Run: `npm test && npm run test:coverage`
Expected: All tests pass, including the 800-line ratchet test.

- [ ] **Step 2: Update CHANGELOG.md**
Add note under `## [Unreleased]`:
`- **Modularized large skills**: Extracted extended code examples from ada-neumann and ada-turing into dedicated references/ directories, lowering the SKILL.md size ceiling to 800 lines.`

- [ ] **Step 3: Commit**
```bash
git add CHANGELOG.md
git commit -m "docs(changelog): record modularization of oversized skills"
```
