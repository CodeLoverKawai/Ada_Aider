---
name: ada-telemetry
description: Use when setting up observability, instrumenting error monitoring, configuring structured logging, or tracking LLM token/cost telemetry.
---
# ada-telemetry (Observability & Telemetry Engineering)

## Observability & Logging Directives

1. **Structured JSON Logging**:
   - Avoid plain string prints (`console.log("error happened")`).
   - Use structured JSON logs with explicit timestamp, log level (`INFO`, `WARN`, `ERROR`), component name, and correlation/trace ID (`trace_id`).
2. **Zero Swallowed Exceptions**:
   - NEVER use empty `catch` blocks or swallow exceptions silently.
   - Always log the complete stack trace and contextual variables when an exception occurs.
3. **OpenTelemetry & APM Instrumentation**:
   - Instrument applications using OpenTelemetry standards or platform error monitors (Sentry, Datadog, Prometheus).
   - Trace HTTP requests and database queries across service boundaries.
4. **LLM Cost & Token Telemetry**:
   - Track LLM inference calls including input tokens, output tokens, model identifier, latency (ms), and estimated cost.

## Checklist for Telemetry

- [ ] Structured JSON logger configured with trace ID propagation.
- [ ] Error handling includes stack traces and context (zero empty catch blocks).
- [ ] Sentry / OpenTelemetry SDK initialized.
- [ ] Token usage, latency, and model metrics logged for AI/LLM calls.

