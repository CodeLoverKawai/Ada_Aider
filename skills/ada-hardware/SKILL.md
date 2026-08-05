---
name: ada-hardware
description: Use when writing embedded C/C++ firmware (ESP-IDF, Zephyr, FreeRTOS), hardware description HDL files (Verilog, SystemVerilog, VHDL), or analyzing physical circuitry.
---
# ada-hardware (Embedded Firmware & RTL Engineering)

## Embedded Firmware Development (C / C++)

1. **Static Memory Allocation**:
   - Strictly avoid dynamic heap allocation (`malloc`, `new`) inside embedded runtime loops.
   - Use static buffer allocation to eliminate memory fragmentation and heap exhaustion crashes.
2. **Interrupt Service Routines (ISRs)**:
   - Keep ISR handlers ultra-minimal: clear interrupt flags, push events to a thread-safe queue (`xQueueSendFromISR`), and exit immediately.
   - NEVER call blocking I/O, `printf`, or long delay loops inside an ISR context.
3. **State Machine Modeling**:
   - Model communication protocols (UART, SPI, I2C, CAN, BLE) as explicit Finite State Machines (FSM) with explicit state variables and timeout handlers.

## Synthesizable RTL Design (Verilog / SystemVerilog)

1. **Synthesizable Code**:
   - Write clean, synthesizable Verilog/SystemVerilog targeting standard FPGA or ASIC synthesis tools.
   - Separate combinational logic (`always_comb` / `always @(*)`) from sequential logic (`always_ff @(posedge clk or negedge rst_n)`).
2. **Standard Bus Architectures**:
   - Align memory-mapped interfaces to standard bus protocols (AXI4-Lite, AHB-Lite, APB).
3. **Testbench Simulation & Verification**:
   - Accompany all hardware modules with self-checking testbenches.
   - Verify logic via open-source or standard simulators (`iverilog`, `verilator`, `ModelSim`) before synthesizing bitstreams.

## Checklist for Hardware / Firmware

- [ ] Zero dynamic memory allocation in runtime loop.
- [ ] ISR handlers ultra-short with thread-safe queue dispatching.
- [ ] FSM interfaces explicitly state-mapped with error/timeout states.
- [ ] Verilog/VHDL code passes linting and verilator/iverilog simulation.

