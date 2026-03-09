# Proxer MCP

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![MCP Compatible](https://img.shields.io/badge/MCP-compatible-green)](https://modelcontextprotocol.io)

MCP server for managing [Proxer](https://proxer.dev) gates, catalogs, and passports via Claude Desktop, claude.ai, or any MCP client.

---

## TypeScript

[![npm version](https://img.shields.io/npm/v/proxer-mcp)](https://www.npmjs.com/package/proxer-mcp)

```bash
npx proxer-mcp
```

Add to your MCP client config:

```json
{
  "mcpServers": {
    "proxer": {
      "command": "npx",
      "args": ["proxer-mcp"],
      "env": {
        "PROXER_API_KEY": "uni_live_xxxxxxxx"
      }
    }
  }
}
```

See [`typescript/README.md`](typescript/README.md) for full documentation.

---

## Python

[![PyPI version](https://img.shields.io/pypi/v/proxer-mcp)](https://pypi.org/project/proxer-mcp/)

```bash
pip install proxer-mcp
```

```python
from proxer import ProxerClient

client = ProxerClient(api_key="uni_live_xxxxxxxx")
gates = client.list_gates()
```

See [`python/README.md`](python/README.md) for full documentation.

---

## License

MIT — [Standard Logic Co.](https://standardlogic.ai)
