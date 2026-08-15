---
name: ada-econ
description: Use when performing economic feasibility studies, calculating Net Present Value (NPV/VPN), Internal Rate of Return (IRR/TIR), payback periods, cloud infrastructure TCO, or financial decision analysis for engineering projects.
---
# ada-econ (Engineering Economics & Technical Financial Analysis)

## 1. Time Value of Money & Cash Flow Equivalence
1. **Discounting & Compounding Formulas**:
   - Single Payment Future Worth: $F = P(1 + i)^n$
   - Single Payment Present Worth: $P = F(1 + i)^{-n}$
   - Uniform Series Present Worth (Annuity):
     \[
     P = A \left[ \frac{(1 + i)^n - 1}{i(1 + i)^n} \right] = A (P/A, i, n)
     \]
   - Capital Recovery (Annualized Cost):
     \[
     A = P \left[ \frac{i(1 + i)^n}{(1 + i)^n - 1} \right] = P (A/P, i, n)
     \]

## 2. Project Evaluation & Capital Budgeting Methods
1. **Net Present Value (NPV / VPN)**:
   \[
   \text{NPV} = \sum_{t=0}^{n} \frac{R_t - C_t}{(1 + i)^t}
   \]
   - Decision Rule: If $\text{NPV} > 0$, the engineering investment yields returns exceeding the Minimum Attractive Rate of Return (MARR).
2. **Internal Rate of Return (IRR / TIR)**:
   - The discount rate $i^*$ where $\text{NPV}(i^*) = 0$.
   - Decision Rule: Accept if $\text{IRR} > \text{MARR}$.
3. **Discounted Payback Period**:
   - Number of years until cumulative discounted cash flows turn positive.

## 3. Cloud Infrastructure vs On-Premises TCO Analysis
Evaluate total engineering cost factors across a 3-5 year horizon:
| Cost Category | Cloud Model (AWS/GCP/Azure) | On-Premises / Colocation Model |
| :--- | :--- | :--- |
| **CapEx (Initial Capital)** | Zero | Server racks, switches, UPS, storage arrays |
| **OpEx (Ongoing Run)** | Monthly compute/storage/egress bills | Datacenter power, cooling, hardware replacement |
| **Engineering Headcount** | Lower platform maintenance overhead | Dedicated sysadmin and SRE maintenance staff |
| **Depreciation & Salvage** | Not applicable | Straight-line / MACRS asset depreciation |

## Checklist for Engineering Financial Reviews

- [ ] Discount rate (MARR) and inflation expectations explicitly declared.
- [ ] Tax implications, depreciation schedules (MACRS), and salvage values factored in.
- [ ] Sensitivity analysis conducted against $\pm 20\%$ variations in key cost drivers.
- [ ] Clear recommendation provided based on NPV, IRR, and payback criteria.
