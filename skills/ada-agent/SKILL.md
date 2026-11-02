---
name: ada-agent
description: Master orchestrator skill enforcing Superpowers process discipline, mandatory skill invocation, Red Flags guardrails, TDD, empirical verification, and caveman communication.
---
# ada-agent (Master Orchestrator & Guardrails)

<SUBAGENT-STOP>
If you were dispatched as a subagent to execute a specific task, ignore this master skill.
</SUBAGENT-STOP>

<EXTREMELY-IMPORTANT>
If you think there is even a 1% chance a skill might apply to what you are doing, you ABSOLUTELY MUST invoke the skill.

IF A SKILL APPLIES TO YOUR TASK, YOU DO NOT HAVE A CHOICE. YOU MUST USE IT.

This is not negotiable. You cannot rationalize your way out of this.
</EXTREMELY-IMPORTANT>

## Core Rule & Skill Priority

**Invoke relevant or requested skills BEFORE any response or action** — including clarifying questions, exploring the codebase, or checking files.

- **Process Skills First**: `using-superpowers`, `brainstorming`, `writing-plans`, `executing-plans`, `subagent-driven-development`, `test-driven-development`, `systematic-debugging`, `verification-before-completion`.
- **Domain Skills Second**: `ada-taste`, `ada-db`, `ada-security`, `ada-hardware`, `ada-mcp`, `ada-telemetry`, `ada-docs`, `ada-release`.
- **Platform Synergies**: `generative_ui` (con `ada-taste`), `automation` (con `ada-proactive`), `google-antigravity-sdk` (con `ada-arch`), `modern-web-guidance` (con `ada-taste`), `firebase-*` (con `ada-db`).
- **Academic & Polymath Skills**: `ada-socrates`, `ada-davinci`, `ada-newton`, `ada-turing`, `ada-neumann`, `ada-signals`.

When starting work:
- "Let's build X" → `brainstorming` first, then `writing-plans`, then implementation skills.
- "Fix this bug" → `systematic-debugging` first, then domain skills.
- "Study / Exam / Proof" → `ada-socrates`, `ada-newton`, `ada-turing`, `ada-davinci`, `ada-neumann` or `ada-signals`.

## Red Flags (Anti-Rationalization Guardrails)

These thoughts mean STOP—you're rationalizing:

| Thought | Reality |
|---------|---------|
| "This is just a simple question" | Questions are tasks. Check for skills. |
| "I need more context first" | Skill check comes BEFORE clarifying questions. |
| "Let me explore the codebase first" | Skills tell you HOW to explore. Check first. |
| "I can check git/files quickly" | Files lack conversation context. Check for skills. |
| "Let me gather information first" | Skills tell you HOW to gather information. |
| "This doesn't need a formal skill" | If a skill exists, use it. |
| "I remember this skill" | Skills evolve. Read current version via `view_file`. |
| "This doesn't count as a task" | Action = task. Check for skills. |
| "The skill is overkill" | Simple things become complex. Use it. |
| "I'll just do this one thing first" | Check BEFORE doing anything. |
| "This feels productive" | Undisciplined action wastes time. Skills prevent this. |
| "I know what that means" | Knowing the concept ≠ using the skill. Invoke it. |

> [!NOTE] Permitted Read-Only Diagnostics & Audits
> Read-only codebase diagnostics, audits, or architecture inspections when answering meta-queries or inspecting system state are permitted without triggering procedural locks. Full process discipline (`brainstorming`, `writing-plans`, `test-driven-development`) activates as soon as active task execution, modification, or refactoring begins.

## Antigravity CLI Tool Mapping

On Google Antigravity / AGY, skills resolve to:

| Action requested by skill | Antigravity CLI tool |
|---|---|
| Read file | `view_file` |
| Create file / artifact | `write_to_file` |
| Edit file | `replace_file_content` |
| Execute command | `run_command` |
| Dispatch subagent | `invoke_subagent` (`TypeName`: `"self"` for full capability, `"research"` for read-only) |
| Task tracking | Markdown task artifact (`write_to_file` with `ArtifactMetadata: { RequestFeedback: false, Summary: "...", UserFacing: true }`). **Not** `manage_task`, which manages background daemon processes. |
| Ask user choices | `ask_question` |
| Scheduled loops & cron | `schedule` |

## Antigravity Native & Ecosystem Interoperability

When operating within Google Antigravity, Ada-Aider seamlessly synergizes with native skills and platform plugins:

1. **Interactive UI Artifacts (`generative_ui`)**:
   - For UI prototypes, design system demos, or rich data visualizations, produce self-contained HTML artifacts with Tailwind and embed via `<agent-embed src="file:///<artifact_path>/widget.html"></agent-embed>`.
2. **Modern Web Standards (`modern-web-guidance`)**:
   - Comply with official web standards for all frontend code (dialogs, popovers, container queries, Core Web Vitals).
3. **Autonomous Agents (`google-antigravity-sdk`)**:
   - When designing or building Python agent systems, leverage `google-antigravity` SDK architectures (`LocalAgentConfig`, `LiteRTAgentConfig`).
4. **Automations & Scheduled Tasks (`automation`)**:
   - Utilize native `schedule` tool for recurring background tasks and cron jobs in synergy with `ada-proactive`.
5. **Cloud Backend & Rules (`firebase-*`)**:
   - Automatically delegate Firestore security rules authoring to `firestore-rules-author` subagent.


## Mandatory Execution Pipeline

1. **Brainstorm (`brainstorming`)**: MANDATORY before plan mode. Ask 1 question at a time, present design sections, get user approval.
2. **Plan (`writing-plans`)**: MANDATORY for non-trivial work (>1 file edit, new feature, refactor). Write implementation plan artifact.
3. **Execute (`executing-plans` / `subagent-driven-development`)**: Batch tasks, dispatch subagents (`self`/`research`) or execute sequentially with todo tracking.
4. **TDD Code (`test-driven-development`)**: RED-GREEN-REFACTOR cycle. Write test first, watch it fail, write implementation, pass test, refactor.
5. **Debug (`systematic-debugging`)**: Root cause investigation -> failing reproducer test -> fix -> verify. Zero symptom masking.
6. **Empirical Verification (`verification-before-completion`)**: Run test suite/compiler. Report exact pass counts & exit codes. Zero speculative claims.
7. **Release & Commit (`ada-release`/`ada-commit`)**: Multi-file version bump, git tag, walkthrough, & commit.

## Token Efficiency & Context Protection Directives

1. **Zero Code Duplication in Chat**:
   - When creating or modifying files using `write_to_file` or `replace_file_content`, NEVER print full code blocks or file contents back in the chat response.
   - Provide ONLY a 1-sentence summary of what changed and a clickable markdown file link (`[filename](file:///path/to/file)`).
2. **Zero Artifact Re-Summarization**:
   - When creating or editing artifacts (`implementation_plan.md`, `walkthrough.md`, `task.md`, design specs), NEVER re-summarize or duplicate the artifact text in the chat response.
   - Point the user directly to the artifact link and highlight only open questions requiring user input.
3. **Subagent Delegation for Broad Searches**:
   - Whenever a task involves searching, grepping, or reading across >3 separate modules or directories, delegate to a `research` subagent via `invoke_subagent` (`TypeName: "research"`). Do not delegate for reading a small handful of known files in the same area.
   - This keeps large file read payloads out of the main context window, saving up to 85% of input tokens.

## Communication Protocol (Caveman Mode Option)
- Terse responses when executing. Eliminate filler, greetings, and pleasantries.
- Compression levels: `/ada-agent [lite|full|ultra|off]`.
- **Artifact Clarity Rule**: Suspend compression for `implementation_plan.md`, `walkthrough.md`, `task.md`, and design specs.


