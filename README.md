# Avatron MCP

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![MCP Compatible](https://img.shields.io/badge/MCP-compatible-green)](https://modelcontextprotocol.io)

MCP server for managing [Avatron](https://avatron.co) gates, catalogs, and passports via Claude Desktop, claude.ai, or any MCP client.

---

## TypeScript

[![npm version](https://img.shields.io/npm/v/avatron-mcp)](https://www.npmjs.com/package/avatron-mcp)

```bash
npx avatron-mcp
```

Add to your MCP client config:

```json
{
  "mcpServers": {
    "avatron": {
      "command": "npx",
      "args": ["avatron-mcp"],
      "env": {
        "AVATRON_API_KEY": "uni_live_xxxxxxxx"
      }
    }
  }
}
```

See [`typescript/README.md`](typescript/README.md) for full documentation.

---

## Python

[![PyPI version](https://img.shields.io/pypi/v/avatron-mcp)](https://pypi.org/project/avatron-mcp/)

```bash
pip install avatron-mcp
```

```python
from avatron import AvatronClient

client = AvatronClient(api_key="uni_live_xxxxxxxx")
gates = client.list_gates()
```

See [`python/README.md`](python/README.md) for full documentation.

---

## License

MIT — [Standard Logic Co.](https://standardlogic.ai)
