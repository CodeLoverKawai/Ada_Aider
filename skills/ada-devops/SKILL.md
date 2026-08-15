---
name: ada-devops
description: Use when authoring Dockerfiles, configuring Linux namespaces/cgroups, creating CI/CD automation pipelines (GitHub Actions), setting up reverse proxies (Nginx/Caddy), or hardening Linux servers.
---
# ada-devops (Infrastructure, Containers, CI/CD & Linux Hardening)

## 1. Minimal Multi-Stage Dockerfile Standard
1. **Security & Footprint Optimization Rules**:
   - Use multi-stage builds to separate build toolchains from the final runtime image.
   - Run as a non-root user (`USER nonroot` or `USER 10001`).
   - Use minimal distroless or alpine base images.
   - Combine `RUN` commands and clean cache in the same layer.

```dockerfile
# Stage 1: Build & Compile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build && npm prune --production

# Stage 2: Minimal Distroless Production Runtime
FROM gcr.io/distroless/nodejs20-debian12
WORKDIR /app
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
USER 10001:10001
EXPOSE 8080
ENV NODE_ENV=production
CMD ["dist/index.js"]
```

## 2. Linux Container Fundamentals (cgroups & namespaces)
- **Namespaces**: Provide isolation (PID, Mount, Net, IPC, UTS, User).
- **cgroups (v2)**: Enforce resource quotas (`cpu.max`, `memory.max`, `io.weight`). Always specify CPU/Memory limits to prevent OOM kills from starving host systems.

## 3. GitHub Actions CI/CD Pipeline Blueprint
- Strict gate pipeline: Lint $\implies$ Unit Tests $\implies$ Integration Tests $\implies$ Security Scan $\implies$ Build Artifact.

```yaml
name: CI/CD Pipeline
on: [push, pull_request]
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm test
```

## 4. Production Reverse Proxy & TLS (Nginx / Caddy)
- Enforce modern security headers: `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`.
- Enable Gzip / Brotli compression and HTTP/2 multiplexing.

## Checklist for DevOps & Infra

- [ ] Docker image runs as non-root with read-only root filesystem where possible.
- [ ] Explicit memory and CPU limits defined in compose or container orchestrator.
- [ ] Secrets injected strictly via environment variables / secret managers (never baked into images).
- [ ] CI pipeline fails immediately on linting or test regressions.
