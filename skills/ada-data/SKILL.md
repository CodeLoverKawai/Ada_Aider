---
name: ada-data
description: Use when conducting exploratory data analysis (EDA), statistical hypothesis testing (t-test, ANOVA, p-values), multivariable regression, data cleaning, or scientific data visualization.
---
# ada-data (Data Science, Statistical Inference & Engineering Visualization)

## 1. Exploratory Data Analysis (EDA) Protocol
1. **Data Profiling & Hygiene**:
   - Check distribution skewness, kurtosis, and missingness patterns (MCAR, MAR, MNAR).
   - Detect outliers using Interquartile Range ($IQR = Q_3 - Q_1$, Outliers $< Q_1 - 1.5 \cdot IQR$ or $> Q_3 + 1.5 \cdot IQR$) or Z-Score ($|z| > 3$).
2. **Feature Engineering**:
   - Normalize continuous features via Min-Max Scaling $[0, 1]$ or Standardization ($\mu = 0, \sigma = 1$).
   - One-hot encode nominal categories; target-encode high-cardinality features.

## 2. Statistical Hypothesis Testing
| Scenario | Parametric Test | Non-Parametric Alternative | Null Hypothesis ($H_0$) |
| :--- | :--- | :--- | :--- |
| **2 Independent Groups** | Student's $t$-test / Welch's $t$-test | Mann-Whitney $U$ test | $\mu_1 = \mu_2$ |
| **2 Paired Groups** | Paired $t$-test | Wilcoxon signed-rank | $\mu_D = 0$ |
| **$\ge 3$ Groups** | One-way ANOVA | Kruskal-Wallis $H$ test | $\mu_1 = \mu_2 = \dots = \mu_k$ |
| **Categorical Association** | Pearson's $\chi^2$ Test | Fisher's Exact Test | Variables are independent |

- **Decision Rule**: Reject $H_0$ if $p\text{-value} < \alpha$ (standard threshold $\alpha = 0.05$).
- Always report effect size (Cohen's $d$, $\eta^2$) alongside $p$-values to verify practical significance.

## 3. Scientific Visualization Best Practices
- Avoid deceptive chart junk (no 3D pie charts, truncated axes without explicit indicators).
- Use perceptual color maps (`viridis`, `plasma`, `cividis`) that are colorblind-friendly.
- Always include clear axis labels with SI units, legends, and sample sizes ($N$).

## Checklist for Data Analysis

- [ ] Missing values and outliers documented with explicit imputation/trimming rationale.
- [ ] Parametric assumptions (normality via Shapiro-Wilk, homoscedasticity via Levene) tested before $t$-test/ANOVA.
- [ ] Effect sizes reported alongside statistical significance ($p$-values).
- [ ] Plots contain clear legends, unit labels, and high-contrast color palettes.
