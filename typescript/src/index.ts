#!/usr/bin/env node

/**
 * Proxer Management MCP Server
 *
 * A thin adapter that exposes Proxer Dashboard operations as MCP tools.
 * Enables developers to manage issuers, passports, and gates directly from Claude.
 *
 * Usage:
 *   PROXER_API_KEY=sk_xxx npx proxer-mcp
 *   PROXER_API_KEY=uni_xxx npx proxer-mcp
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { ApiClient } from './api-client.js';
import { allTools, handleToolCall } from './tools/index.js';

// Configuration from environment
const PROXER_API_URL = process.env.PROXER_API_URL || 'https://proxer.dev';
const PROXER_API_KEY = process.env.PROXER_API_KEY;

async function main() {
  // Validate configuration
  if (!PROXER_API_KEY) {
    console.error('Error: PROXER_API_KEY environment variable is required');
    console.error('');
    console.error('Usage:');
    console.error('  PROXER_API_KEY=sk_xxx npx proxer-mcp');
    console.error('');
    console.error('Or for local development:');
    console.error('  PROXER_API_KEY=uni_xxx npx proxer-mcp');
    process.exit(1);
  }

  // Initialize API client
  const api = new ApiClient({
    baseUrl: PROXER_API_URL,
    apiKey: PROXER_API_KEY,
  });

  // Create MCP server
  const server = new Server(
    {
      name: 'proxer-manage',
      version: '1.1.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // Handle list_tools request
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools: allTools };
  });

  // Handle call_tool request
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
      const result = await handleToolCall(api, name, args || {});

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';

      return {
        content: [
          {
            type: 'text',
            text: `Error: ${message}`,
          },
        ],
        isError: true,
      };
    }
  });

  // Start server with stdio transport
  const transport = new StdioServerTransport();
  await server.connect(transport);

  // Log to stderr (stdout is reserved for MCP protocol)
  console.error(`Proxer Management MCP Server started`);
  console.error(`  API URL: ${PROXER_API_URL}`);
  console.error(`  API Key: ${PROXER_API_KEY.slice(0, 10)}...`);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
