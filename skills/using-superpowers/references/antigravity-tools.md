# Antigravity CLI (`agy`) Tool & Skills Mapping

Skills speak in actions ("dispatch a subagent", "create a todo", "read a file"). On Google Antigravity (`agy`) these resolve to the tools and native skills below.

| Action skills request | Antigravity CLI equivalent |
|---|---|
| Dispatch a subagent (`Subagent (general-purpose):` template) | `invoke_subagent` with a built-in `TypeName` — `self` for full-capability work, `research` for read-only |
| Task tracking ("create a todo", "mark complete") | a **task artifact** — `write_to_file` with `ArtifactMetadata: { RequestFeedback: false, Summary: "...", UserFacing: true }` (see [Task tracking](#task-tracking)). **Not** `manage_task`, which manages background daemon processes. |
| Read file | `view_file` |
| Create file / artifact | `write_to_file` |
| Edit file | `replace_file_content` |
| Execute command | `run_command` |
| Ask user choices | `ask_question` |
| Scheduled loops & cron | `schedule` tool / `automation` skill |
| Interactive UI widgets | `generative_ui` skill (`<agent-embed src="file:///<path>/widget.html"></agent-embed>`) |

## Task tracking

Antigravity has **no dedicated todo tool** (`manage_task` manages background
processes — `list`/`kill`/`status`/`send_input` — it is *not* a checklist). When a
skill says to create a todo list or track tasks, maintain a **task artifact**: a
markdown checklist saved with `write_to_file` (`ArtifactMetadata: { RequestFeedback: false, Summary: "Task checklist", UserFacing: true }`),
edited with `replace_file_content` as you go.

At the start of any multi-step task, create the task artifact listing every step of
your plan. As you complete each step, edit the artifact to mark it done (`- [x]`).
If the plan changes, update the checklist. Keep it current — it is your source of
truth for what remains; once the conversation gets long, re-read it before starting
each step.

