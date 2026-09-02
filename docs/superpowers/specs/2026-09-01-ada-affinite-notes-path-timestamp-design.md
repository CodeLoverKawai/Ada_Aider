# Design Spec: `ada-affinite-note` Path Resolution & Timestamp Naming

## 1. Context & Objective
The `ada-affinite-note` skill previously saved notes into `~/Documents/Affinite_Notes/<Categoria>/<nombre-en-kebab-case>.md`.
The user's active university notes repository is located at `~/Documents/GitHub/Universidad/Affinite_Notes/`.
This update aligns the default destination path with the active repository across different operating systems, adds configurable fallback logic, and standardizes note filenames to include a parenthetical date timestamp `(YYYY-MM-DD)`.

---

## 2. Multi-Platform Base Path Resolution
When generating notes, the skill resolves the target base directory in the following order of precedence:

1. **Custom Environment Variable**:
   - `$AFFINITE_NOTES_DIR` (if defined by the user in the environment).
2. **Standard University Repository Path**:
   - **Linux / macOS**: `~/Documents/GitHub/Universidad/Affinite_Notes/` (resolving `$HOME`)
   - **Windows**: `%USERPROFILE%\Documents\GitHub\Universidad\Affinite_Notes\`
3. **Fallback Path**:
   - `~/Documents/Affinite_Notes/` (if the GitHub repository is not found or inaccessible).

The category subdirectories are automatically ensured/created if they do not exist:
- `Matematicas/`
- `Ciencias_Fisica/`
- `Ingenieria_Software/`
- `Investigacion/`
- `General/`

---

## 3. Filename Convention with Date Timestamp
All generated `.md` note files must follow this standardized naming pattern:
```
<nombre-en-kebab-case> (YYYY-MM-DD).md
```

### Examples:
- `~/Documents/GitHub/Universidad/Affinite_Notes/Matematicas/diagonalizacion-valores-propios (2026-09-01).md`
- `~/Documents/GitHub/Universidad/Affinite_Notes/Ingenieria_Software/fundamentos-de-python-desde-cero (2026-09-01).md`
- `~/Documents/GitHub/Universidad/Affinite_Notes/Ciencias_Fisica/leyes-de-termodinamica (2026-09-01).md`

### Duplicate Handling:
- If a note with the exact name already exists on the same day and is not being updated intentionally, an incrementing index may be appended: `<nombre-en-kebab-case> (YYYY-MM-DD_2).md`.

---

## 4. Response Link Formatting
When outputting clickable links to the user in chat responses, use URL-encoded space `(file:///.../%20(YYYY-MM-DD).md)` or valid file URI markdown:
`[diagonalizacion-valores-propios (2026-09-01).md](file:///home/rousseau/Documents/GitHub/Universidad/Affinite_Notes/Matematicas/diagonalizacion-valores-propios%20(2026-09-01).md)`

---

## 5. Files to Update
1. `skills/ada-affinite-note/SKILL.md`
2. `~/.gemini/config/plugins/ada-agent/skills/ada-affinite-note/SKILL.md`
3. `README.md`
4. `~/.gemini/config/plugins/ada-agent/README.md`
