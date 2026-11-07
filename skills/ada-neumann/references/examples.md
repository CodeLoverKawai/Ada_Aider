# Micro-Ejemplos Canónicos de Demostración & Código (ada-neumann)

### Ejemplo 1: Servidor Socket TCP Multihilo y No Bloqueante en Python con `selectors` (`epoll`)

Este servidor demuestra la multiplexación I/O en Linux basada en `selectors` (que utiliza la llamada `epoll` bajo el capó), gestión limpia de señales POSIX (`SIGINT`, `SIGTERM`), recepción no bloqueante con buffering delimitado por saltos de línea y manejo de clientes concurrentes:

```python
#!/usr/bin/env python3
"""Servidor TCP no bloqueante de alto rendimiento basado en selectores (epoll en Linux).

Cumple estandares POSIX: manejo de senales asincronas, buffers por descriptor
y control limpio de desconexiones.
"""

from __future__ import annotations

import logging
import os
import selectors
import signal
import socket
import sys
from types import FrameType

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] (PID %(process)d) %(message)s",
)


class TCPServerEpoll:
    def __init__(self, host: str = "0.0.0.0", port: int = 9000) -> None:
        self.host = host
        self.port = port
        self.selector = selectors.DefaultSelector()
        self.is_running = True
        self.client_buffers: dict[socket.socket, bytearray] = {}

    def start(self) -> None:
        # Configurar socket pasivo de escucha
        self.server_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server_sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self.server_sock.setblocking(False)
        self.server_sock.bind((self.host, self.port))
        self.server_sock.listen(128)

        # Registrar el socket del servidor para eventos de lectura (conexiones entrantes)
        self.selector.register(
            self.server_sock, selectors.EVENT_READ, data=self._accept_connection
        )
        logging.info(
            "Servidor escuchando en %s:%d (Selector: %s)",
            self.host,
            self.port,
            self.selector.__class__.__name__,
        )

        # Manejo de senales POSIX para apagado limpio (SIGINT / SIGTERM)
        signal.signal(signal.SIGINT, self._handle_signal)
        signal.signal(signal.SIGTERM, self._handle_signal)

        try:
            while self.is_running:
                # Esperar eventos con timeout de 1 segundo para chequear is_running
                events = self.selector.select(timeout=1.0)
                for key, mask in events:
                    callback = key.data
                    callback(key.fileobj, mask)
        finally:
            self._cleanup()

    def _handle_signal(self, signum: int, frame: FrameType | None) -> None:
        logging.info("Senal %d recibida. Iniciando parada ordenada...", signum)
        self.is_running = False

    def _accept_connection(self, sock: socket.socket, mask: int) -> None:
        conn, addr = sock.accept()
        conn.setblocking(False)
        self.client_buffers[conn] = bytearray()
        self.selector.register(conn, selectors.EVENT_READ, data=self._handle_client)
        logging.info("Nueva conexion aceptada desde %s:%d", addr[0], addr[1])

    def _handle_client(self, conn: socket.socket, mask: int) -> None:
        try:
            data = conn.recv(4096)
            if not data:
                # Conexion cerrada ordenadamente por el cliente
                self._disconnect_client(conn, "Cierre normal por el cliente")
                return

            buf = self.client_buffers[conn]
            buf.extend(data)

            # Procesar mensajes delimitados por salto de linea (\n)
            while b"\n" in buf:
                line, _, remaining = buf.partition(b"\n")
                buf.clear()
                buf.extend(remaining)

                msg = line.decode("utf-8", errors="replace").strip()
                logging.info("Mensaje recibido de FD %d: %s", conn.fileno(), msg)

                # Respuesta eco con confirmacion
                response = f"ACK: Recibido '{msg}'\n".encode("utf-8")
                conn.sendall(response)

        except (ConnectionResetError, BrokenPipeError) as e:
            self._disconnect_client(conn, f"Error de socket: {e}")

    def _disconnect_client(self, conn: socket.socket, reason: str) -> None:
        logging.info("Desconectando cliente FD %d. Causa: %s", conn.fileno(), reason)
        self.selector.unregister(conn)
        self.client_buffers.pop(conn, None)
        conn.close()

    def _cleanup(self) -> None:
        logging.info("Cerrando recursos y sockets activos...")
        for conn in list(self.client_buffers.keys()):
            self._disconnect_client(conn, "Apagado del servidor")
        self.selector.unregister(self.server_sock)
        self.server_sock.close()
        self.selector.close()
        logging.info("Servidor detenido completamente.")


if __name__ == "__main__":
    server = TCPServerEpoll(host="127.0.0.1", port=9000)
    server.start()
```

---

### Ejemplo 2: Script Automatizado de Gestión de Snapshots y Mantenimiento Btrfs (`btrfs-snapshot-mgr.sh`)

Script shell en Bash con manejo riguroso de errores (`set -euo pipefail`), verificación de subvolúmenes, creación atómica de snapshots de solo lectura y política de retención automática:

```bash
#!/usr/bin/env bash
# ==============================================================================
# btrfs-snapshot-mgr.sh
# Gestion profesional de snapshots transaccionales y mantenimiento en Btrfs
# ==============================================================================
set -euo pipefail

# --- CONFIGURACION ---
readonly BTRFS_ROOT="/"
readonly SNAPSHOT_DIR="/.snapshots"
readonly SUBVOL_NAME="@"
readonly RETENTION_COUNT=7
readonly TIMESTAMP=$(date +%Y%m%d_%H%M%S)
readonly SNAPSHOT_TAG="auto_${TIMESTAMP}"
readonly TARGET_PATH="${SNAPSHOT_DIR}/${SNAPSHOT_TAG}"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] [INFO] $*"
}

error() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] [ERROR] $*" >&2
}

# 1. Comprobacion de privilegios
if [[ $EUID -ne 0 ]]; then
    error "Este script debe ejecutarse con privilegios de root (sudo)."
    exit 1
fi

# 2. Verificacion del sistema de archivos Btrfs
log "Verificando que ${BTRFS_ROOT} reside en un sistema de archivos Btrfs..."
FS_TYPE=$(stat -f -c %T "${BTRFS_ROOT}")
if [[ "${FS_TYPE}" != "btrfs" ]]; then
    error "El sistema de archivos de ${BTRFS_ROOT} no es btrfs (detectado: ${FS_TYPE})."
    exit 1
fi

# Asegurar existencia del directorio de destino
mkdir -p "${SNAPSHOT_DIR}"

# 3. Creacion de snapshot atomico de solo lectura
log "Creando snapshot atomico de solo lectura en: ${TARGET_PATH}"
btrfs subvolume snapshot -r "${BTRFS_ROOT}" "${TARGET_PATH}"
log "Snapshot ${SNAPSHOT_TAG} creado exitosamente."

# 4. Politica de rotacion y retencion (conservar los ultimos N snapshots)
log "Aplicando politica de retencion (mantener ultimos ${RETENTION_COUNT} snapshots)..."
SNAPSHOTS_TOTAL=$(find "${SNAPSHOT_DIR}" -maxdepth 1 -mindepth 1 -name "auto_*" -type d | sort)
COUNT=$(echo "${SNAPSHOTS_TOTAL}" | grep -c "auto_" || true)

if [[ ${COUNT} -gt ${RETENTION_COUNT} ]]; then
    EXCESS=$((COUNT - RETENTION_COUNT))
    log "Se encontraron ${COUNT} snapshots (${EXCESS} en exceso). Purgando los mas antiguos..."
    echo "${SNAPSHOTS_TOTAL}" | head -n "${EXCESS}" | while read -r OLD_SNAP; do
        if [[ -n "${OLD_SNAP}" ]]; then
            log "Eliminando subvolumen antiguo: ${OLD_SNAP}"
            btrfs subvolume delete "${OLD_SNAP}"
        fi
    done
else
    log "Snapshots actuales: ${COUNT}/${RETENTION_COUNT}. No se requiere purga."
fi

# 5. Reporte de uso de espacio y deduplicacion
log "Estado actual del almacenamiento Btrfs:"
btrfs filesystem df -h "${BTRFS_ROOT}"
log "Gestion de snapshots completada con exito."
```

---

### Ejemplo 3: Stack Docker Compose de Producción Segura (Mosquitto MQTT + TSDB InfluxDB + Portainer)

Este manifiesto `docker-compose.yml` aplica todas las directivas de seguridad para homelab: ejecución no-root, redes de puente privadas aisladas, raíz de sistema de archivos inmutable (`read_only`), descarte total de capacidades del kernel y healthchecks declarativos:

```yaml
version: "3.8"

networks:
  frontend_net:
    driver: bridge
  backend_isolated:
    driver: bridge
    internal: true # Red interna aislada sin acceso a internet

volumes:
  mosquitto_data:
    driver: local
  mosquitto_log:
    driver: local
  influxdb_data:
    driver: local
  portainer_data:
    driver: local

services:
  # ----------------------------------------------------------------------------
  # 1. BROKER MQTT: ECLIPSE MOSQUITTO
  # ----------------------------------------------------------------------------
  mosquitto:
    image: eclipse-mosquitto:2.0.18
    container_name: iot_mosquitto_broker
    restart: unless-stopped
    user: "1883:1883" # Usuario mosquitto no-root
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE
    read_only: true
    tmpfs:
      - /tmp:rw,noexec,nosuid,size=32m
    ports:
      - "1883:1883" # Puerto MQTT estandar expuesto a la red LAN
    volumes:
      - ./mosquitto/config/mosquitto.conf:/mosquitto/config/mosquitto.conf:ro
      - mosquitto_data:/mosquitto/data:rw
      - mosquitto_log:/mosquitto/log:rw
    networks:
      - frontend_net
      - backend_isolated
    deploy:
      resources:
        limits:
          cpus: "0.50"
          memory: 128M
    healthcheck:
      test: ["CMD-SHELL", "timeout 2 mosquitto_sub -t '$$SYS/#' -C 1 || exit 1"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s

  # ----------------------------------------------------------------------------
  # 2. BASE DE DATOS DE SERIES TEMPORALES: INFLUXDB V2
  # ----------------------------------------------------------------------------
  influxdb:
    image: influxdb:2.7.5-alpine
    container_name: iot_influxdb_tsdb
    restart: unless-stopped
    user: "1000:1000"
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    read_only: false # InfluxDB requiere almacenamiento en motor TSM
    ports:
      - "127.0.0.1:8086:8086" # Solo accesible via localhost o reverse proxy
    environment:
      - DOCKER_INFLUXDB_INIT_MODE=setup
      - DOCKER_INFLUXDB_INIT_USERNAME=telemetry_admin
      - DOCKER_INFLUXDB_INIT_PASSWORD=CambiarEstePasswordSeguro123!
      - DOCKER_INFLUXDB_INIT_ORG=ada_engineering
      - DOCKER_INFLUXDB_INIT_BUCKET=iot_telemetry
      - DOCKER_INFLUXDB_INIT_RETENTION=90d
    volumes:
      - influxdb_data:/var/lib/influxdb2:rw
    networks:
      - backend_isolated
    deploy:
      resources:
        limits:
          cpus: "1.00"
          memory: 1024M
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8086/health"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 15s

  # ----------------------------------------------------------------------------
  # 3. GESTION CENTRALIZADA: PORTAINER CE
  # ----------------------------------------------------------------------------
  portainer:
    image: portainer/portainer-ce:2.19.4-alpine
    container_name: homelab_portainer
    restart: unless-stopped
    security_opt:
      - no-new-privileges:true
    ports:
      - "127.0.0.1:9443:9443" # Panel web HTTPS accesible localmente o via Tailscale
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro # Socket Docker en solo lectura
      - portainer_data:/data:rw
    networks:
      - frontend_net
    deploy:
      resources:
        limits:
          cpus: "0.50"
          memory: 256M
```

---

### Ejemplo 4: Cliente IoT de Telemetría en Python con MQTT QoS 1, LWT y Backoff Exponencial

Implementación de cliente IoT con reconexión automática resiliente, Última Voluntad y Testamento (LWT), publicación periódica de métricas con QoS 1 y payload estructurado JSON:

```python
#!/usr/bin/env python3
"""Cliente IoT MQTT con QoS 1, Last Will and Testament (LWT) y reconexion resiliente.

Simula un nodo sensor embebido transmitiendo telemetria ambiental hacia el broker.
"""

from __future__ import annotations

import json
import logging
import random
import time
from typing import Any

import paho.mqtt.client as mqtt

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] [IoT-Node] %(message)s",
)

# Constantes de configuracion
BROKER_HOST = "127.0.0.1"
BROKER_PORT = 1883
NODE_ID = "esp32-node-lab01"
BASE_TOPIC = f"homelab/sensors/{NODE_ID}"
TOPIC_TELEMETRY = f"{BASE_TOPIC}/telemetry"
TOPIC_STATUS = f"{BASE_TOPIC}/status"


class ResilientIoTNode:
    def __init__(self, node_id: str = NODE_ID) -> None:
        self.node_id = node_id
        self.client = mqtt.Client(
            client_id=self.node_id,
            clean_session=False,  # Sesion persistente para garantizar QoS 1
            protocol=mqtt.MQTTv311,
        )

        # Configurar Last Will and Testament (LWT)
        # Si el cliente muere inesperadamente, el broker publicara este mensaje retenido
        lwt_payload = json.dumps(
            {"status": "offline", "node_id": self.node_id, "timestamp": time.time()}
        )
        self.client.will_set(
            TOPIC_STATUS, payload=lwt_payload, qos=1, retain=True
        )

        # Callbacks
        self.client.on_connect = self._on_connect
        self.client.on_disconnect = self._on_disconnect
        self.client.on_publish = self._on_publish

        self.is_connected = False
        self.packet_counter = 0

    def _on_connect(
        self, client: mqtt.Client, userdata: Any, flags: dict, rc: int
    ) -> None:
        if rc == 0:
            self.is_connected = True
            logging.info("Conectado exitosamente al broker MQTT.")
            # Publicar estado ONLINE retenido
            online_payload = json.dumps(
                {
                    "status": "online",
                    "node_id": self.node_id,
                    "boot_time": time.time(),
                }
            )
            self.client.publish(
                TOPIC_STATUS, payload=online_payload, qos=1, retain=True
            )
        else:
            logging.error(
                "Fallo en conexion al broker. Codigo de retorno: %d", rc
            )

    def _on_disconnect(
        self, client: mqtt.Client, userdata: Any, rc: int
    ) -> None:
        self.is_connected = False
        if rc != 0:
            logging.warning(
                "Desconexion inesperada del broker. Se activara reconexion automatica..."
            )

    def _on_publish(
        self, client: mqtt.Client, userdata: Any, mid: int
    ) -> None:
        logging.debug("Mensaje MQTT con Packet ID %d entregado (PUBACK recibido).", mid)

    def connect_with_backoff(self) -> None:
        backoff_seconds = 1.0
        max_backoff = 32.0

        while not self.is_connected:
            try:
                logging.info(
                    "Intentando conectar a %s:%d...", BROKER_HOST, BROKER_PORT
                )
                self.client.connect(BROKER_HOST, BROKER_PORT, keepalive=60)
                self.client.loop_start()
                # Esperar brevemente a que el callback de conexion confirme
                time.sleep(1.0)
                if self.is_connected:
                    break
            except Exception as exc:
                logging.warning(
                    "Error de conexion (%s). Reintentando en %.1fs...",
                    exc,
                    backoff_seconds,
                )
                time.sleep(backoff_seconds)
                backoff_seconds = min(backoff_seconds * 2, max_backoff)

    def read_simulated_sensors(self) -> dict[str, Any]:
        """Simula lectura fisica de sensores via I2C/ADC con fluctuacion gaussiana."""
        self.packet_counter += 1
        return {
            "seq": self.packet_counter,
            "timestamp": int(time.time()),
            "temperature_c": round(random.gauss(24.5, 0.8), 2),
            "humidity_pct": round(random.gauss(55.0, 2.5), 1),
            "vcc_mv": random.randint(3280, 3310),
            "rssi_dbm": random.randint(-68, -55),
        }

    def run_telemetry_loop(self, interval_seconds: float = 5.0) -> None:
        self.connect_with_backoff()
        logging.info("Iniciando bucle de transmision de telemetria...")

        try:
            while True:
                if self.is_connected:
                    sensor_data = self.read_simulated_sensors()
                    payload = json.dumps(sensor_data)

                    # Publicacion con QoS 1 (At least once)
                    msg_info = self.client.publish(
                        TOPIC_TELEMETRY, payload=payload, qos=1
                    )
                    logging.info(
                        "Publicado QoS 1 en '%s' (Seq %d, Temp: %.2f C)",
                        TOPIC_TELEMETRY,
                        sensor_data["seq"],
                        sensor_data["temperature_c"],
                    )
                else:
                    logging.warning(
                        "Conexion inactiva. Esperando restablecimiento..."
                    )

                time.sleep(interval_seconds)
        except KeyboardInterrupt:
            logging.info("Interrupcion manual detectada. Cerrando conexion...")
            # Enviar estado offline ordenado antes de desconectar
            offline_payload = json.dumps(
                {
                    "status": "graceful_shutdown",
                    "node_id": self.node_id,
                    "timestamp": time.time(),
                }
            )
            self.client.publish(
                TOPIC_STATUS, payload=offline_payload, qos=1, retain=True
            )
            time.sleep(0.5)
            self.client.loop_stop()
            self.client.disconnect()
            logging.info("Nodo detenido limpiamente.")


if __name__ == "__main__":
    node = ResilientIoTNode()
    node.run_telemetry_loop(interval_seconds=5.0)
```

