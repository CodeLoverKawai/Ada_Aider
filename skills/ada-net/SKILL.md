---
name: ada-net
description: Use when implementing network protocols, low-level socket programming, packet analysis (Wireshark/tcpdump), analyzing TCP/IP OSI layers, DNS, WebSockets, or TLS security.
---
# ada-net (Computer Networks, Protocols & Low-Level Socket Engineering)

## 1. Network Layer & Transport Protocol Invariants
1. **TCP vs UDP Engineering**:
   - **TCP**: Connection-oriented, ordered byte stream, flow control (sliding window), congestion control (BBR, Cubic). Guard against TCP head-of-line blocking.
   - **UDP**: Connectionless datagrams, minimal header overhead (8 bytes), zero handshake latency. Use for real-time media, gaming, or when implementing custom ARQ/QUIC protocols.
2. **Modern Web Protocols (HTTP/1.1 vs HTTP/2 vs HTTP/3)**:
   - **HTTP/1.1**: Persistent connections (`Keep-Alive`), pipelining limitations.
   - **HTTP/2**: Binary framing, stream multiplexing over a single TCP connection, header compression (HPACK).
   - **HTTP/3 (QUIC)**: UDP-based multiplexed transport with built-in TLS 1.3 encryption, eliminating TCP HOL blocking on packet loss.

## 2. Low-Level Socket Programming (BSD Sockets)
1. **Robust Socket Initialization Protocol**:
   - Set `SO_REUSEADDR` and `SO_REUSEPORT` to allow fast daemon restarts without `EADDRINUSE` errors.
   - Set socket to non-blocking mode (`O_NONBLOCK` via `fcntl`) before adding to event loops.
   - Always handle `EAGAIN` and `EWOULDBLOCK` on `read()` / `write()` loops.

```c
int opt = 1;
setsockopt(sockfd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));
int flags = fcntl(sockfd, F_GETFL, 0);
fcntl(sockfd, F_SETFL, flags | O_NONBLOCK);
```

## 3. Network Diagnostics & Packet Inspection
| Tool | Diagnostic Scenario | Canonical Command |
| :--- | :--- | :--- |
| **`tcpdump`** | Capture raw network traffic on interface | `tcpdump -i eth0 -nn -s0 -w capture.pcap port 8080` |
| **`ss` / `netstat`** | Inspect socket buffer queues and states | `ss -tulpn | grep LISTEN` / `ss -tiepm` |
| **`dig`** | Trace DNS resolution path & records | `dig +trace +nocmd example.com A` |
| **`iperf3`** | Measure maximum TCP/UDP network throughput | `iperf3 -c target_server -P 4` |

## 4. Security & Cryptographic Handshake (TLS 1.3)
- TLS 1.3 reduces handshake to 1-RTT (or 0-RTT resumption).
- Enforce forward secrecy via ephemeral Diffie-Hellman (`ECDHE`).
- Validate Certificate Chains and implement SNI (Server Name Indication) and ALPN (Application-Layer Protocol Negotiation).

## Checklist for Network Implementation

- [ ] Sockets configured as non-blocking with `SO_REUSEADDR`.
- [ ] `EAGAIN`/`EWOULDBLOCK` conditions handled without busy-waiting.
- [ ] MTU limits (1500 bytes standard, ~1420 over VPN/tunnels) respected to prevent IP fragmentation.
- [ ] TLS certificates validated with modern cipher suites and ALPN negotiation.
