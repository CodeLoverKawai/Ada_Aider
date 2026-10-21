# Academic Excellence & Cognitive Profiling Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the new `ada-mind` metacognitive profiling skill with persistent state in AFFiNE Second Brain, and upgrade the academic skills (`ada-socrates`, `ada-newton`, `ada-turing`, `ada-davinci`) with difficulty-gradient problem generation, multi-representation proofs, edge-case harnesses, and active recall.

**Architecture:** 
1. Create `skills/ada-mind/SKILL.md` as a token-efficient, dense skill governing cognitive profiling, mental model catalogs, bias auditing, and `/mind reflect` metacognitive debriefing.
2. Initialize `00_PERFIL_COGNITIVO_Y_ESQUEMA_MENTAL.md` in `~/Documents/GitHub/Universidad/02_Segundo_Cerebro/Affine_Notes/06_Autodominio_y_Humanismo/` (with fallback to `~/.gemini/COGNITIVE_PROFILE.md`).
3. Augment `ada-socrates` with progressive difficulty gradient problem generation (Base, Patológico, Maestría/Examen) and cognitive scaffolding that reads `ada-mind`'s profile to target known user blind spots.
4. Augment `ada-newton` with the Multi-Representation Triad (Symbolic + Geometric + Physical).
5. Augment `ada-turing` with Pathological Edge-Case Probes & Invariant Testing Harnesses.
6. Augment `ada-davinci` with Feynman Self-Explanation and Active Recall prompts in Capa 6 of BlockSuite notes.
7. Register `ada-mind` in `GEMINI.md` and verify 100% test pass rate with new assertions in `tests/orchestrator.test.js`.

**Tech Stack:** Node.js test runner (`node:test`, `node:assert`), Markdown, Antigravity skills engine, AFFiNE BlockSuite.

## Global Constraints

- All skills in `skills/` must have valid YAML frontmatter, no `@./skills/` stubs, and >= 15 lines of actionable instructions.
- Preserve 100% test pass rate with `npm test`.
- Dual compatibility: Antigravity IDE and Claude Code hooks.
- No schema hallucinations (valid Antigravity tools: `view_file`, `write_to_file`, `replace_file_content`, `run_command`, `ask_question`).
- Keep skills concise, high-density, and actionable.

---

### Task 1: Create `skills/ada-mind/SKILL.md` and Seed Cognitive Profile Template

**Files:**
- Create: `skills/ada-mind/SKILL.md`
- Create (if not present): `~/Documents/GitHub/Universidad/02_Segundo_Cerebro/Affine_Notes/06_Autodominio_y_Humanismo/00_PERFIL_COGNITIVO_Y_ESQUEMA_MENTAL.md`
- Test: `tests/orchestrator.test.js`

**Interfaces:**
- Consumes: User reflections, session logs.
- Produces: `skills/ada-mind/SKILL.md` specifying `/mind reflect`, `/mind profile`, cognitive dimensions, and persistent file resolution.

- [ ] **Step 1: Write the failing test in `tests/orchestrator.test.js`**

Add test checking `ada-mind` existence, frontmatter, and profile location references:

```javascript
test('ada-mind skill defines cognitive profiling and reflection protocols', () => {
  const skillFile = path.join(rootDir, 'skills', 'ada-mind', 'SKILL.md');
  assert.strictEqual(fs.existsSync(skillFile), true, 'skills/ada-mind/SKILL.md must exist');
  const content = fs.readFileSync(skillFile, 'utf8');

  assert.match(content, /00_PERFIL_COGNITIVO_Y_ESQUEMA_MENTAL\.md/, 'Must reference persistent cognitive profile file');
  assert.match(content, /\/mind reflect|\/mind debrief/i, 'Must specify metacognitive debrief commands');
  assert.match(content, /Bloom/i, 'Must reference Bloom calibration');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/orchestrator.test.js`
Expected: FAIL with "skills/ada-mind/SKILL.md must exist"

- [ ] **Step 3: Create `skills/ada-mind/SKILL.md`**

Author `skills/ada-mind/SKILL.md` with:
- Frontmatter: `name: ada-mind`, description.
- 4 Cognitive Dimensions: Heuristic Lenses, Cognitive Biases & Blind Spots, Epistemic Bloom Calibration, Metacognitive Ledger.
- Path resolution: `$AFFINE_NOTES_DIR/06_Autodominio_y_Humanismo/00_PERFIL_COGNITIVO_Y_ESQUEMA_MENTAL.md` with fallback to `~/.gemini/COGNITIVE_PROFILE.md`.
- Protocols: `/mind reflect` (3-question post-session debrief), `/mind profile` (inspecting current state), cross-feeding `ada-socrates`.

- [ ] **Step 4: Seed initial `00_PERFIL_COGNITIVO_Y_ESQUEMA_MENTAL.md` in AFFiNE**

Create `~/Documents/GitHub/Universidad/02_Segundo_Cerebro/Affine_Notes/06_Autodominio_y_Humanismo/00_PERFIL_COGNITIVO_Y_ESQUEMA_MENTAL.md` with clean BlockSuite structure:
- H1 `# Perfil Cognitivo, Esquema Mental y Bitácora Metacognitiva`
- Callout BlockSuite
- Dimensiones: Arquetipo de Razonamiento, Modelos Mentales Incorporados, Sesgos y Puntos Ciegos bajo Observación, Calibración Epistémica Bloom, Bitácora de Desafíos y Conquistas.

- [ ] **Step 5: Run tests to verify they pass**

Run: `node --test tests/orchestrator.test.js` and `npm test`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add skills/ada-mind/SKILL.md tests/orchestrator.test.js
git commit -m "feat(skills): create ada-mind cognitive profiling skill and seed profile schema"
```

---

### Task 2: Upgrade `skills/ada-socrates/SKILL.md` with Problem Generation Gradient & `ada-mind` Integration

**Files:**
- Modify: `skills/ada-socrates/SKILL.md`
- Test: `tests/orchestrator.test.js`

**Interfaces:**
- Consumes: Cognitive profile from `ada-mind` (`00_PERFIL_COGNITIVO_Y_ESQUEMA_MENTAL.md`).
- Produces: Problem Generation Gradient (Nivel 1 Base, Nivel 2 Trampa/Patológico, Nivel 3 Maestría/Examen) and cognitive scaffolding.

- [ ] **Step 1: Write the failing test in `tests/orchestrator.test.js`**

Add test checking `ada-socrates` problem gradient and `ada-mind` cross-feeding:

```javascript
test('ada-socrates integrates problem generation gradient and ada-mind cognitive profile', () => {
  const socratesFile = path.join(rootDir, 'skills', 'ada-socrates', 'SKILL.md');
  const content = fs.readFileSync(socratesFile, 'utf8');

  assert.match(content, /ada-mind/i, 'ada-socrates must reference ada-mind for blind spot targeting');
  assert.match(content, /gradiente de dificultad|problem generation/i, 'ada-socrates must define problem generation gradient');
  assert.match(content, /patol[oó]gico/i, 'ada-socrates must include pathological/trap cases in problem generation');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/orchestrator.test.js`
Expected: FAIL on `ada-socrates` assertions.

- [ ] **Step 3: Update `skills/ada-socrates/SKILL.md`**

Incorporate:
1. **Motor de Generación de Problemas con Gradiente Tripartito**:
   - *Nivel 1: Base Conceptual (Scaffolding directo)*: Verifica la comprensión mecánica sin trampas.
   - *Nivel 2: Trampa Patológica (Falsas intuiciones / Casos Borde)*: Diseñado para hacer fallar la intuición superficial (división por cero sutil, arreglos vacíos, efectos colaterales).
   - *Nivel 3: Maestría & Síntesis (Nivel Parcial / Competencia)*: Problema no estructurado que exige combinar 2 o más dominios.
2. **Integración con `ada-mind`**:
   - Antes de iniciar una sesión de entrenamiento o examen, `ada-socrates` consulta el perfil cognitivo del usuario para identificar los sesgos activos (ej. tendencia a obviar restricciones de dominio) y diseña el problema para provocar deliberadamente esa trampa.
   - Al finalizar, sugiere ejecutar `/mind reflect` para registrar el aprendizaje.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/orchestrator.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add skills/ada-socrates/SKILL.md tests/orchestrator.test.js
git commit -m "feat(skills): upgrade ada-socrates with problem generation gradient and ada-mind integration"
```

---

### Task 3: Upgrade `skills/ada-newton/SKILL.md` (Multi-Representation Protocol) & `skills/ada-turing/SKILL.md` (Edge-Case Stress Probes)

**Files:**
- Modify: `skills/ada-newton/SKILL.md`
- Modify: `skills/ada-turing/SKILL.md`
- Test: `tests/orchestrator.test.js`

**Interfaces:**
- Consumes: Mathematical derivations and algorithm specifications.
- Produces: Multi-representation triad in `ada-newton` and pathological edge-case test harnesses in `ada-turing`.

- [ ] **Step 1: Write the failing test in `tests/orchestrator.test.js`**

Add assertions:

```javascript
test('ada-newton and ada-turing enforce multi-representation and pathological test harnesses', () => {
  const newtonFile = path.join(rootDir, 'skills', 'ada-newton', 'SKILL.md');
  const turingFile = path.join(rootDir, 'skills', 'ada-turing', 'SKILL.md');
  const newtonContent = fs.readFileSync(newtonFile, 'utf8');
  const turingContent = fs.readFileSync(turingFile, 'utf8');

  assert.match(newtonContent, /tr[ií]ada de representaci[oó]n|multi-representaci[oó]n/i, 'ada-newton must enforce multi-representation protocol');
  assert.match(turingContent, /bater[ií]a de casos patol[oó]gicos|edge-case harness/i, 'ada-turing must enforce pathological test harnesses');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/orchestrator.test.js`
Expected: FAIL

- [ ] **Step 3: Update `skills/ada-newton/SKILL.md`**

Add the **Protocolo de la Tríada de Multi-Representación**:
- Cada concepto y teorema fundamental debe presentarse bajo 3 ópticas simultáneas:
  1. *Representación Simbólica Rigurosa*: Fórmulas axiomáticas en KaTeX con PJR (Protocolo de Justificación Renglón a Renglón).
  2. *Intuición Geométrica / Gráfica*: Descripción visual nítida del comportamiento del espacio (curvas, vecindarios, pendientes, proyecciones ortogonales).
  3. *Análogo Físico del Mundo Real*: Correspondencia con la materia (velocidad, energía, resortes, fluidos o circuitos).

- [ ] **Step 4: Update `skills/ada-turing/SKILL.md`**

Add the **Protocolo de Batería de Casos Patológicos y Harness de Verificación de Invariantes**:
- Todo algoritmo diseñado o analizado debe incluir una suite de estrés con 5 casos borde universales:
  1. Entrada nula o vacía (`[]`, `None`, `""`).
  2. Entrada unitaria ($n = 1$).
  3. Elementos repetidos o idénticos (`[x, x, x]`).
  4. Entrada en orden estrictamente inverso (peor caso asintótico).
  5. Valores extremos / desbordamiento aritmético (`MAX_INT`, números negativos).
- Inclusión de un test harness ejecutable (`assert`) que verifique formalmente los invariantes de bucle antes de validar la solución.

- [ ] **Step 5: Run test to verify it passes**

Run: `node --test tests/orchestrator.test.js`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add skills/ada-newton/SKILL.md skills/ada-turing/SKILL.md tests/orchestrator.test.js
git commit -m "feat(skills): add multi-representation protocol to ada-newton and pathological harness to ada-turing"
```

---

### Task 4: Upgrade `skills/ada-davinci/SKILL.md` and Register `ada-mind` in `GEMINI.md`

**Files:**
- Modify: `skills/ada-davinci/SKILL.md`
- Modify: `GEMINI.md`
- Test: `tests/orchestrator.test.js`

**Interfaces:**
- Consumes: Cognitive profiling and academic enhancements.
- Produces: Capa 6 Feynman Self-Explanation in `ada-davinci`, active indexing of `ada-mind` in `GEMINI.md`.

- [ ] **Step 1: Write the failing test in `tests/orchestrator.test.js`**

Add assertions:

```javascript
test('ada-davinci embeds Feynman self-explanation and GEMINI.md indexes ada-mind', () => {
  const davinciFile = path.join(rootDir, 'skills', 'ada-davinci', 'SKILL.md');
  const davinciContent = fs.readFileSync(davinciFile, 'utf8');
  const geminiContent = fs.readFileSync(geminiMdPath, 'utf8');

  assert.match(davinciContent, /Feynman/i, 'ada-davinci must embed Feynman self-explanation');
  assert.match(geminiContent, /ada-mind/, 'GEMINI.md must index ada-mind');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/orchestrator.test.js`
Expected: FAIL

- [ ] **Step 3: Update `skills/ada-davinci/SKILL.md`**

Refine **Capa 6: Gimnasio Cognitivo & Active Recall Socrático**:
- Incorporate explicit **Tarjetas de Autoexplicación Feynman**:
  - *Pregunta de Ruptura de Intuición*: "¿Por qué este algoritmo o teorema fallaría si elimináramos el supuesto X?".
  - *Desafío de Explicación a un Lego*: "Explica este concepto en 3 oraciones evitando términos técnicos como 'polimorfismo' o 'asintótico'".
  - *Conexión con `ada-mind`*: Si la nota revela un punto ciego recurrente, invocar a `ada-mind` para registrarlo en la forja `06_Autodominio_y_Humanismo`.

- [ ] **Step 4: Update `GEMINI.md`**

In `GEMINI.md`, under `### Concilio de Polímatas & Forja Intelectual (Ada System)`, add:
`| **Perfil Cognitivo & Esquema Mental** | \`./skills/ada-mind/SKILL.md\` |`

- [ ] **Step 5: Run tests to verify they pass**

Run: `node --test tests/orchestrator.test.js` and `npm test`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add skills/ada-davinci/SKILL.md GEMINI.md tests/orchestrator.test.js
git commit -m "feat(skills): embed Feynman self-explanation in ada-davinci and register ada-mind in GEMINI.md"
```

---

### Task 5: Full Suite Verification & Global Plugin Sync

**Files:**
- None (verification and sync)

- [ ] **Step 1: Run complete test suite**

Run: `npm test`
Expected: All tests pass (0 failures, 100% pass rate).

- [ ] **Step 2: Verify git status and global plugin symlink**

Check `git status` (clean working tree) and `ls -la ~/.gemini/config/plugins/ada-agent`.

- [ ] **Step 3: Commit if any tracking updates needed**

```bash
git add docs/superpowers/plans/2026-10-20-academic-and-cognitive-profiling.md
git commit -m "chore(release): complete academic skills enhancement and ada-mind integration"
```
