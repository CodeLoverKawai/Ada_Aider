# Design Spec: `ada-affinite-note` Skill for AFFiNITe

## Overview
A dedicated skill for the Ada system that structures, writes, and exports high-fidelity academic, mathematical, scientific, and technical study notes into Markdown files (`.md`) specifically optimized for 1-click import into AFFiNITe's BlockSuite workspace editor.

## Goal
Allow the user to say *"haz una nota para affinite sobre [tema]"* or *"crea una nota de affinite de [problema matemático / física / software / etc.]"*, and have the agent generate a complete, mathematically and pedagogically rigorous note saved directly to `~/Documents/Affinite_Notes/<Categoria>/<nombre_nota>.md`.

## Core Features & BlockSuite Compatibility

### 1. Document Structure & Block Elements
Every generated note follows a clean, highly readable BlockSuite-compatible hierarchy:
- **Title (H1)** & Date / Metadata Callout
- **Core Concept / Executive Summary Callout (`> [!NOTE]` / `> [!IMPORTANT]`)**
- **Theoretical Foundations (H2/H3)** with bold concepts and clear pedagogical explanations (Feynman Technique)
- **Math & Science Equations**:
  - Centered block LaTeX equations: `$$...$$`
  - Inline variables & expressions: `$x$`
- **Mermaid Diagrams**: Fenced code blocks (`mermaid`) for conceptual maps, workflows, state machines, and system architectures.
- **GFM Tables**: Clear comparison tables with aligned headers.
- **Code Blocks**: Syntax-highlighted code blocks (`python`, `rust`, `cpp`, `bash`, etc.) for algorithms or computational implementations.
- **Step-by-Step Solved Examples**: Concrete problems solved with intermediate algebraic / logical steps.
- **Active Recall & Practice Checklist**: Checklist items (`- [ ]`) for self-assessment and review.

### 2. File Organization & Storage
- Notes are automatically stored at:
  `~/Documents/Affinite_Notes/<Categoria>/<nombre_nota>.md`
- Path categories:
  - `Matematicas/` (Cálculo, Álgebra, Lógica, etc.)
  - `Ciencias_Fisica/` (Física, Mecánica, Termodinámica)
  - `Ingenieria_Software/` (Arquitectura, Sistemas, Algoritmos, DevOps)
  - `Investigacion/` (Papers, Metodología, Estado del Arte)
  - `General/` (Otros temas)
- Directory is automatically created if it doesn't exist.

### 3. Ada Agent & GEMINI.md Integration
- Skill file created at `skills/ada-affinite-note/SKILL.md`
- Synced to `~/.gemini/config/plugins/ada-agent/skills/ada-affinite-note/SKILL.md`
- Registered in `GEMINI.md` dynamic skill index under Specialized Domain Skills.

## Verification
- Unit test note generation for a mathematical topic (e.g. Eigenvalues & Eigenvectors / Diagonalization) and a technical topic (e.g. CRDT and Yjs Architecture).
- Validate Markdown syntax, LaTeX formatting, and ensure output directory path is generated cleanly.
