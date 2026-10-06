---
name: ada-security
description: Security auditing skill for secret scanning, AST static analysis (Semgrep/CodeQL), low-level memory/crypto hardening, and variant analysis.
---
# ada-security (Security Auditing & Hardening)

<EXTREMELY-IMPORTANT>
NEVER commit secrets, private keys, API tokens, or hardcoded passwords to git repositories. Security checks must be performed before completing any task.
</EXTREMELY-IMPORTANT>

## Core Security Guardrails

1. **Zero Secrets in Source Code**:
   - Store all credentials, API keys, tokens, and database passwords in `.env` files or secure secret managers.
   - Ensure `.env`, `.env.local`, and sensitive credential files are explicitly listed in `.gitignore`.
2. **Automated Secret Scan Directive**:
   - Before completing tasks or releasing code, run a secret audit using `grep_search` across the repository for common secret patterns:
     - `api[_-]?key`, `secret`, `password`, `bearer`, `private[_-]?key`, `BEGIN (RSA|OPENSSH|PRIVATE) KEY`.
3. **Path Safety & Traversal Prevention**:
   - Validate absolute file paths before viewing or editing. Prevent unauthorized directory traversal attacks (`../..`).
   - Note: Authorized local development plugin symlinks (such as `~/.gemini/config/plugins/ada-agent`) are permitted.
4. **Input Sanitization & Injection Prevention**:
   - Parameterize all SQL queries (never concatenate raw strings into SQL).
   - Sanitize all user inputs before executing shell commands or passing to dynamic eval functions.
5. **Dependency Hygiene**:
   - Audit dependencies using package manager vulnerability scanners (`npm audit`, `cargo audit`, `pip audit`).
   - Pin exact dependency versions to prevent supply-chain attacks.

---

## 3. Metodología Trail of Bits: Análisis de AST y Bajo Nivel

Inspirado en la ingeniería de seguridad de **Trail of Bits**, el análisis de vulnerabilidades debe superar las expresiones regulares superficiales y operar a nivel de **Árbol Sintáctico Abstracto (AST)** y bajo nivel.

### 3.1 Auditoría Estática con Semgrep
Al auditar código en Python, Go o C, identificar patrones sintácticos inseguros modelando reglas Semgrep:

```yaml
rules:
  - id: insecure-sql-or-command-format
    patterns:
      - pattern-either:
          - pattern: $DB.execute(f"..." + $VAR)
          - pattern: subprocess.Popen(f"... {$CMD} ...", shell=True)
          - pattern: exec($INPUT)
    message: "Inyección detectada en AST: formateo dinámico de comandos o SQL sin sanitizar."
    languages: [python, go]
    severity: ERROR
```

### 3.2 Vulnerabilidades de Bajo Nivel y Sistemas (C, Go, Rust)
1. **Condiciones de Carrera TOCTOU (Time-of-Check to Time-of-Use)**:
   - *Antipatrón*: Comprobar existencia con `access()` o `os.path.exists()` antes de crear o abrir un archivo.
   - *Corrección*: Emplear operaciones atómicas con flags del kernel: `open(path, O_CREAT | O_EXCL | O_RDWR, 0600)`.
2. **Eliminación de Almacén Muerto (Dead Store Elimination) & Zeroize**:
   - En C y C++, el optimizador del compilador (`-O2`, `-O3`) elimina rutinariamente llamadas a `memset(buffer, 0, len)` si el buffer no vuelve a leerse antes de ser liberado, dejando claves privadas expuestas en RAM.
   - *Corrección*: Usar `explicit_bzero()`, `memset_s()`, o punteros volátiles `volatile char *`.
3. **Comparación en Tiempo Constante (Anti-Timing Attacks)**:
   - La comparación estándar de cadenas o arreglos de bytes (`==`, `strcmp`, `memcmp`) termina anticipadamente en el primer byte diferente. Un atacante puede medir variaciones de nanosegundos para inferir hashes o tokens byte a byte.
   - *Corrección*: Utilizar funciones en tiempo constante garantizado como `hmac.compare_digest()` en Python, `subtle.ConstantTimeCompare()` en Go, o `CRYPTO_memcmp()` en OpenSSL.

### 3.3 Metodología de Análisis de Variantes (Variant Analysis)
**Regla de Oro de Trail of Bits**: *Nunca corrijas un bug de forma aislada.*
Cuando se descubra una vulnerabilidad en un componente:
1. Extraer la raíz estructural del fallo (ej. un endpoint que olvida verificar el token de sesión o una llamada a descompresión sin validar rutas relativas).
2. Construir una consulta de búsqueda en el AST o patrón `grep_search` generalizado.
3. Escanear **todo el repositorio** para identificar y neutralizar todas las variantes hermanas del mismo defecto antes de dar la tarea por concluida.

---

## Security Red Flags

| Thought | Reality |
|---|---|
| "I'll hardcode the API key for local testing" | STOP. Use an environment variable immediately. |
| "This string concatenation in SQL is safe because it's internal" | Always use parameterized queries. |
| "I can skip `.gitignore` check for now" | Check `.gitignore` before committing files containing secrets. |
| "I fixed the bug in this function, we're done" | Apply Variant Analysis: search the entire AST for the same pattern. |
| "A regular `memset` cleans the secret buffer" | Dead store elimination risk. Use `explicit_bzero` or safe memory zeroize. |

---

## Checklist for Security Audits

- [ ] Repository scanned with `grep_search` for hardcoded secrets or API keys.
- [ ] All sensitive keys loaded via `process.env` / environment variables.
- [ ] `.gitignore` contains `.env`, `*.pem`, `*.key`, and build artifacts.
- [ ] SQL queries parameterized (zero string concatenation).
- [ ] Dependencies audited for known CVEs.
- [ ] **AST & Low-Level Check**: Verificadas comparaciones criptográficas en tiempo constante y operaciones atómicas de archivos (anti-TOCTOU).
- [ ] **Variant Analysis**: Comprobado que no existan variantes del mismo defecto en otros módulos.


