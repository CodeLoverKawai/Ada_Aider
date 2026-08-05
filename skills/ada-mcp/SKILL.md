---
name: ada-mcp
description: Use when integrating, configuring, or invoking external Model Context Protocol (MCP) servers, tools, or resources.
---
# ada-mcp (Model Context Protocol Integration)

## MCP Integration Principles

1. **Tool & Resource Discovery**:
   - Prioritize MCP tools over raw shell scripts for structured tasks (e.g., database schema inspection, static code analysis, browser automation, issue tracking).
   - Before calling an MCP tool, verify its existence and arguments structure in the current session.
2. **Server Configuration (`mcp_config.json`)**:
   - Configure global MCP servers in `~/.gemini/config/mcp_config.json`.
   - Specify explicit environment variables and flags for each server (`env`, `args`, `command`).
3. **Graceful Fallback & Error Recovery**:
   - If an MCP tool call fails or times out, DO NOT abort the task.
   - Fall back gracefully to native workspace bash tools (`run_command`, `grep_search`, `view_file`) or inspect the server logs.

## Checklist for MCP Integration

- [ ] MCP server registered in configuration (`mcp_config.json`).
- [ ] Available tools and resources verified in session.
- [ ] Fallback paths defined if MCP server is offline or unreachable.

