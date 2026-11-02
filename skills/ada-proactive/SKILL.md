---
name: ada-proactive
description: Use when executing background tasks, automating workspace updates, or running scheduled loops.
---

# ada-proactive (Background Loops & Proactive Automation)

<EXTREMELY-IMPORTANT>
Execute background tasks responsibly. Always define explicit termination conditions, timeouts, and resource guardrails.
</EXTREMELY-IMPORTANT>

## Core Capabilities

1. **Proactive Workspace Maintenance**:
   - Detect drift between code changes and workspace assets (documentation, architectural diagrams, database schemas).
   - Proactively synchronize living documentation and CHANGELOG entries when features land.

2. **Asynchronous Background Execution**:
   - Offload long-running builds, compilation jobs, or container deployments using async `run_command`.
   - Never block the interactive session on slow support tasks that can run concurrently.

3. **Scheduled Telemetry, Cron & Automations (`automation`)**:
   - Synergize with the native Antigravity `automation` skill when designing recurring background automations or cron jobs.
   - Utilize native `schedule` tool timers (`DurationSeconds` for one-shot) or standard 5-field cron expressions (`CronExpression: "*/5 * * * *"`, `MaxIterations`) for periodic health checks, build verification, or metric polling.
   - Never busy-wait or run background `sleep` processes; rely exclusively on `schedule` notifications and timer triggers.
   - Declare `IsDaemon: true` only for standing maintenance jobs that should outlive the task; keep `IsDaemon: false` for task-monitoring loops.

4. **Safety & Resource Constraints**:
   - Specify deterministic stop conditions, maximum iteration limits, and timeout boundaries for all background loops.
   - Terminate orphan or runaway tasks immediately using `manage_task` when work is done.

