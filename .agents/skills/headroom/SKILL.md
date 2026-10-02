---
name: headroom
description: Use when the user wants to reduce token usage, configure context compression, run or connect to the Headroom proxy/MCP server, or manage prompt caching and cost tracking across AI agent sessions.
---

# Headroom: Context Compression & Proxy Layer

Headroom (`headroomlabs-ai/headroom`) is an open-source, local-first context compression layer for AI coding agents. It compresses tool outputs, logs, files, and RAG chunks before they reach the LLM, reducing input token usage by 20% to 95% while keeping answers identical through reversible content-cache retrieval (CCR).

## When to Use

Activate this skill when:
- The user asks how to reduce LLM token consumption or optimize context limits in agent workflows.
- The user wants to set up, start, or troubleshoot the Headroom local proxy or MCP server.
- The user is working with large tool outputs, compiler logs, test dumps, or big JSON payloads that flood the prompt.
- The user wants to track token and dollar savings across coding sessions using `headroom savings`.

---

## 1. Quick Installation

Headroom is distributed as a Python package with prebuilt Rust core wheels:

```bash
# Recommended: prebuilt wheel avoiding local Rust compilation
pip install --only-binary headroom-ai headroom-ai

# Or full feature set:
pip install "headroom-ai[all]"
```

Verify installation:
```bash
headroom --version
headroom doctor
```

---

## 2. Modes of Operation

### A. Local Proxy Mode (Universal)
Headroom runs a local HTTP proxy that intercepts OpenAI/Anthropic/LiteLLM API calls, compresses context dynamically, and forwards requests upstream:

```bash
# Start the proxy (default port 8787)
headroom proxy --port 8787
```

Direct agent or tool traffic to `http://localhost:8787/v1` by configuring the base URL or proxy environment variables:
```bash
export OPENAI_BASE_URL="http://localhost:8787/v1"
export ANTHROPIC_BASE_URL="http://localhost:8787"
```

### B. Agent Wrap Mode
Wraps an agent CLI process so traffic automatically routes through Headroom:

```bash
headroom wrap claude
# or
headroom wrap aider
```

### C. Model Context Protocol (MCP) Server
Headroom includes a native MCP server for agents supporting MCP:

```bash
headroom mcp
```

To configure in `mcp_config.json`:
```json
{
  "mcpServers": {
    "headroom": {
      "command": "headroom",
      "args": ["mcp"]
    }
  }
}
```

---

## 3. Key Commands & Diagnostics

| Command | Description |
| :--- | :--- |
| `headroom doctor` | Verifies local environment, ONNX runtime, TLS roots, and dependencies. |
| `headroom doctor --network` | Tests upstream certificate chains and corporate proxy configurations. |
| `headroom savings` | Displays cumulative token and dollar savings across sessions. |
| `headroom learn` | Mines failed sessions and generates localized correction rules. |
| `headroom init hook ensure` | Lightweight hook helper to check and start background daemon. |

---

## 4. Reversible Compression (CCR)

Headroom uses Content-Cache-Retrieval (CCR):
- Original large content (long command outputs, full files, stack traces) is hashed and stored in local cache.
- The prompt receives a compressed representation.
- If the model needs the exact unabridged byte content, Headroom seamlessly decompresses or supplies the cached slice upon demand.

---

## 5. Troubleshooting & Configuration

- **Telemetry**: An anonymous beacon is on by default. Disable via `export HEADROOM_BEACON=off` or `export DO_NOT_TRACK=1`.
- **TLS / Corporate Networks**: If corporate firewalls (Zscaler, Palo Alto) trigger SSL errors, run with `HEADROOM_TLS_STRICT=0` or set `HEADROOM_CA_BUNDLE=/path/to/root.pem`.
- **Offline / Air-Gapped Mode**: Pre-download models and set `export HF_HUB_OFFLINE=1`.
