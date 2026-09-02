---
name: ada-thesis
description: Use when structuring university graduation theses, drafting research monographs, formatting papers in IEEE or APA 7th edition, managing BibTeX/Zotero bibliographies, writing state-of-the-art literature reviews, or preparing defense presentations.
---

# ada-thesis (Metodología de Grado, Redacción Académica y Formato IEEE/APA)

## Overview
Proporciona estructura metodológica, redacción científica rigurosa y gestión de referencias para **Proyectos de Grado, Tesis Universitarias y Artículos de Investigación**.

Cubre las etapas del proyecto de grado (Planteamiento del Problema, Pregunta de Investigación, Objetivos Generales y Específicos según taxonomía de Bloom, Justificación, Marco Teórico, Estado del Arte sistemático según metodología PRISMA, Metodología experimental o de desarrollo de software según IEEE/ACM, Análisis de Resultados, Conclusiones y Trabajo Futuro), estándares de citación y estilo (**IEEE Transactions** para ingeniería y **APA 7ma edición**), gestión bibliográfica mediante **BibTeX** y Zotero, y estructuración de diapositivas de sustentación ante jurados académicos.

---

## When to Use
- Formulación del anteproyecto de grado: Delimitación del problema, árbol de problemas/objetivos y matriz de congruencia metodológica.
- Construcción de revisiones sistemáticas de literatura (RSL) con ecuaciones de búsqueda booleanas para bases de datos científicas (IEEE Xplore, ScienceDirect, Scopus, ACM Digital Library).
- Redacción de artículos científicos en LaTeX utilizando la plantilla oficial `IEEEtran.cls`.
- Gestión y depuración de archivos `.bib` (campos requeridos `author`, `title`, `booktitle`/`journal`, `year`, `doi`).
- Redacción de resúmenes estructurados (*Abstract*) con los 4 componentes esenciales (Contexto/Problema, Propuesta/Método, Resultados principales cuantitativos, Conclusión).
- Preparación de guiones de sustentación oral y respuestas a preguntas de jurados evaluadores.
- Generación de notas y avances de tesis para AFFiNE BlockSuite.

---

## 🏛️ Estructura Canónica de un Proyecto de Grado en Ingeniería

```mermaid
graph TD
    A[1. Introducción & Planteamiento del Problema] --> B[2. Estado del Arte & Marco Teórico]
    B --> C[3. Metodología de Ingeniería / Software]
    C --> D[4. Desarrollo, Arquitectura & Pruebas]
    D --> E[5. Análisis de Resultados & Discusión]
    E --> F[6. Conclusiones & Trabajo Futuro]
    F --> G[7. Referencias Bibliográficas BibTeX]
```

---

## ⚡ Taxonomía de Verbos de Bloom para Objetivos

| Nivel Cognitivo | Verbos Recomendados para Objetivos Específicos |
| :--- | :--- |
| **1. Conocimiento / Comprensión** | *Identificar, Clasificar, Describir, Caracterizar, Comparar.* |
| **2. Aplicación / Análisis** | *Implementar, Modelar, Analizar, Calcular, Descomponer, Simular.* |
| **3. Síntesis / Evaluación** | *Diseñar, Desarrollar, Formular, Validar, Evaluar, Optimizar.* |

> [!IMPORTANT]
> **Regla de Oro**: El Objetivo General debe responder al *¿Qué se va a hacer?*, *¿Cómo?* y *¿Para qué?*, alineado en infinitivo con el título del proyecto.

---

## 📖 Guía Exhaustiva de Normas APA (7ma Edición)

### 1. Citas en el Texto (Autor - Año)

| Tipo de Autor | Cita Parentética (entre paréntesis) | Cita Narrativa (en el texto) |
| :--- | :--- | :--- |
| **1 Autor** | `(Stewart, 2020)` | `Stewart (2020)` |
| **2 Autores** | `(Stewart & Watson, 2020)` | `Stewart y Watson (2020)` |
| **3 o más Autores** | `(Vaswani et al., 2017)` | `Vaswani et al. (2017)` *(desde la 1ra cita)* |
| **Autor Corporativo con Sigla** | 1ra: `(Instituto de Ingenieros Eléctricos y Electrónicos [IEEE], 2023)`<br>Siguientes: `(IEEE, 2023)` | 1ra: `Instituto de Ingenieros Eléctricos y Electrónicos (IEEE, 2023)`<br>Siguientes: `IEEE (2023)` |

### 2. Citas Textuales Directas
* **Cita Corta (< 40 palabras)**: Se incorpora en el párrafo entre comillas dobles, finalizando con la página:  
  *Ejemplo:* Según Tanenbaum (2014), "un sistema operativo es un programa que actúa como intermediario" (p. 25).
* **Cita en Bloque (≥ 40 palabras)**: Párrafo independiente sin comillas, con **sangría izquierda de 1.27 cm (0.5 pulgadas)** e interlineado doble:
  > En los sistemas distribuidos contemporáneos, la replicación de estados mediante algoritmos de consenso como Raft garantiza que la información permanezca consistente y disponible ante particiones de red transitorias, asegurando una experiencia transparente para el usuario final. (Ongaro & Ousterhout, 2014, p. 305)

### 3. Estructura de Referencias Bibliográficas APA 7
* **Libro**:  
  `Apellido, N. (Año). Título del libro en cursiva (N° ed.). Editorial. https://doi.org/...`  
  *Ejemplo:* Stewart, J., Clegg, D., & Watson, S. (2020). *Calculus: Early Transcendentals* (9th ed.). Cengage Learning.
* **Artículo de Revista Científica (Journal)**:  
  `Apellido, N., & Apellido, N. (Año). Título del artículo. Nombre de la Revista en Cursiva, volumen(número), páginas. https://doi.org/...`  
  *Ejemplo:* Vaswani, A., Shazeer, N., & Parmar, N. (2017). Attention is all you need. *Advances in Neural Information Processing Systems*, 30, 5998–6008.
* **Tesis o Disertación**:  
  `Apellido, N. (Año). Título de la tesis en cursiva [Tesis de pregrado/maestría/doctorado, Nombre de la Universidad]. Repositorio Institucional. URL`
* **Software o Repositorio de Código**:  
  `Apellido, N. o Entidad. (Año). Título del software en cursiva (Versión X.X) [Software / Código fuente]. Nombre del Host. URL`

### 4. Jerarquía de Títulos APA 7 (5 Niveles)
1. **Nivel 1**: **Encabezado Centrado en Negrita, Mayúsculas y Minúsculas**
2. **Nivel 2**: **Alineado a la Izquierda en Negrita, Mayúsculas y Minúsculas**
3. **Nivel 3**: ***Alineado a la Izquierda en Negrita Cursiva, Mayúsculas y Minúsculas***
4. **Nivel 4**: &nbsp;&nbsp;&nbsp;&nbsp;**Con sangría (1.27 cm), Negrita, con punto final.** El texto comienza en la misma línea.
5. **Nivel 5**: &nbsp;&nbsp;&nbsp;&nbsp;***Con sangría (1.27 cm), Negrita Cursiva, con punto final.*** El texto comienza en la misma línea.

### 5. Formato de Tablas y Figuras en APA 7
* **Número**: `Tabla 1` o `Figura 1` en **Negrita** arriba del elemento.
* **Título**: En *Cursiva*, línea siguiente, descripción breve y precisa.
* **Contenido**: Solo líneas horizontales en el encabezado y al final de la tabla (sin líneas verticales).
* **Nota al pie**: `Nota.` en *Cursiva*, explicando abreviaturas, fuentes y nivel de significancia estadística ($*p < .05$).

---

## 📝 Formato IEEE Transactions (Para Artículos y Papers de Ingeniería)

### Ejemplo de Entrada BibTeX Válida (IEEE / LaTeX)

```bibtex
@article{stewart2020calculus,
  author    = {James Stewart and Daniel Clegg and Saleem Watson},
  title     = {Calculus: Early Transcendentals},
  journal   = {Cengage Learning},
  edition   = {9th},
  year      = {2020},
  isbn      = {978-1337613927}
}

@inproceedings{vaswani2017attention,
  author    = {Ashish Vaswani and Noam Shazeer and Niki Parmar and Jakob Uszkoreit},
  title     = {Attention Is All You Need},
  booktitle = {Advances in Neural Information Processing Systems (NeurIPS)},
  volume    = {30},
  pages     = {5998--6008},
  year      = {2017}
}
```

---

## 📝 Plantilla para Avances de Tesis en AFFiNE

Al generar apuntes para `~/Documents/GitHub/Universidad/Affinite_Notes/Investigacion/<tema> (YYYY-MM-DD).md`:

```markdown
# [Capítulo / Avance de Proyecto de Grado] (YYYY-MM-DD)
> 📅 **Fecha**: YYYY-MM-DD | 🏷️ **Tags**: #tesis #grado #ieee #metodologia #[subtema]

> [!NOTE]
> **Resumen del Capítulo**: Propósito del entregable y contribución a los objetivos específicos del proyecto.

## 1. Planteamiento & Pregunta de Investigación
- **Pregunta Central**: ¿De qué manera la arquitectura X optimiza el rendimiento Y en entornos Z?
- **Hipótesis de Trabajo**: La implementación de X reducirá la latencia en al menos un 25% frente a Y.

## 2. Metodología & Desarrollo
- **Fases Metodológicas**:
  1. Fase 1: Levantamiento y revisión del estado del arte (Scopus / IEEE).
  2. Fase 2: Diseño de la arquitectura y modelado matemático.
  3. Fase 3: Pruebas experimentales y validación estadística.

## 3. Conclusiones Parciales & Referencias Clave
- Cita IEEE: [1] J. Stewart et al., *Calculus*, 2020.

## 4. Checklist de Avance de Tesis
- [ ] ¿Los objetivos específicos son medibles y alcanzables?
- [ ] ¿Todas las figuras y tablas cuentan con numeración y fuente explícita?
```
