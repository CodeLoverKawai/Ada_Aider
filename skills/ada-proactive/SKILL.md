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

3. **Scheduled Telemetry & Monitoring**:
   - Utilize `schedule` timers or cron expressions for periodic health checks, build verification, or metric polling.
   - Avoid infinite busy-wait polling loops; rely on event notifications and timer triggers.

4. **Safety & Resource Constraints**:
   - Specify deterministic stop conditions, maximum iteration limits, and timeout boundaries for all background loops.
   - Terminate orphan or runaway tasks immediately using `manage_task` when work is done.
