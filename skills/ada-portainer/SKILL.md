---
name: ada-portainer
description: Use when managing Docker/Kubernetes stacks in Portainer, authoring Portainer-compatible Docker Compose stacks, configuring Portainer Edge Agents, webhooks, persistent volume permissions, or container access control.
---
# ada-portainer (Portainer & Docker Compose Stack Orchestration)

## 1. Production Stack Design Standards for Portainer
When authoring `docker-compose.yml` stacks for deployment via Portainer Web UI or Git Repository:

1. **Environment Variables & Defaults**:
   - Always declare fallback defaults for all environment variables: `${DATABASE_PORT:-5432}`, `${NODE_ENV:-production}`.
   - Separate secret environment variables into Portainer Stack Secrets / Environment variables rather than hardcoding in the YAML.
2. **Resource Quotas & Reliability**:
   - Declare `restart: unless-stopped` on all persistent daemons.
   - Enforce memory and CPU limits using Compose v3 `deploy.resources.limits` to prevent a single leaky container from crashing the host node.
3. **Network Isolation**:
   - Create isolated bridge networks (`driver: bridge`) for backend services (databases, Redis, internal workers).
   - Only map external host ports (`ports:`) on reverse proxies or public gateways. Connect backends through private networks.

```yaml
version: '3.8'

services:
  app:
    image: ${APP_IMAGE:-myorg/backend:latest}
    restart: unless-stopped
    environment:
      - DATABASE_URL=postgres://${POSTGRES_USER:-appuser}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB:-appdb}
    networks:
      - internal_net
      - proxy_net
    deploy:
      resources:
        limits:
          cpus: '1.5'
          memory: 1024M
    healthcheck:
      test: ["CMD-SHELL", "wget -qO- http://localhost:8080/health || exit 1"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s

  db:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-appuser}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:?Database password required}
      POSTGRES_DB: ${POSTGRES_DB:-appdb}
    volumes:
      - db_data:/var/lib/postgresql/data
    networks:
      - internal_net
    deploy:
      resources:
        limits:
          memory: 1536M

networks:
  internal_net:
    driver: bridge
  proxy_net:
    external: true

volumes:
  db_data:
    driver: local
```

## 2. Linux Volume Mounting & Permissions (UID / GID)
1. **Bind Mount Permission Fixes**:
   - When mounting host directories (`/opt/stacks/myapp/data:/data`), Linux permissions often cause `EACCES / Permission Denied`.
   - Explicitly specify `user: "1000:1000"` (or target host user UID/GID).
   - For LinuxServer.io based containers, configure `PUID=1000` and `PGID=1000` in the environment block.
2. **Named Volumes vs Host Bind Mounts**:
   - Prefer named volumes for database storage (`volumes: [db_data:/var/lib/postgresql/data]`) for optimal I/O throughput and Docker-managed permissions.
   - Use bind mounts only for configuration files (`./config.json:/etc/app/config.json:ro`) marked as read-only (`:ro`).

## 3. Continuous Deployment with Portainer Webhooks
1. **Webhook Auto-Update**:
   - Enable "Webhook" in the Portainer Stack settings to obtain a unique trigger URL (`http://<portainer>:9000/api/stacks/webhooks/<token>`).
2. **GitHub Actions Integration**:
   - Trigger the Portainer webhook after pushing new container images to Docker Hub or GitHub Packages (GHCR):
   ```yaml
   - name: Trigger Portainer Redeploy
     run: curl -X POST "${{ secrets.PORTAINER_WEBHOOK_URL }}"
   ```

## 4. Portainer Hardening & Docker Socket Safety
1. **Docker Socket Protection**:
   - NEVER expose `/var/run/docker.sock` to public networks or unprivileged containers without a proxy.
   - Use `docker-socket-proxy` (e.g. `tecnativa/docker-socket-proxy`) with read-only environment flags (`CONTAINERS=1`, `POST=0`) when connecting monitoring or dashboard agents.
2. **Portainer Edge Agent**:
   - Use Edge Agents (`portainer/agent:latest`) on remote servers with secure Edge ID tokens for centralized management without opening inbound firewall ports on edge nodes.

## Checklist for Portainer Stacks

- [ ] All sensitive credentials passed via Portainer Environment variables, not hardcoded.
- [ ] Memory limits (`deploy.resources.limits.memory`) configured on all services.
- [ ] Database containers placed on private internal networks without exposed host ports.
- [ ] Healthcheck probes defined for automated service recovery.
- [ ] Named volumes or read-only bind mounts configured with correct UID/GID permissions.
