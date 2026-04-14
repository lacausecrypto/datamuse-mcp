# Security Policy

## Supported versions

The active `1.x` branch is supported.

## Reporting a vulnerability

If you identify a vulnerability:

1. Do not publish a publicly exploitable PoC.
2. Open a minimal issue to request a private reporting channel.
3. Then share technical details, impact, and reproduction steps.

## Operational best practices

- Run the MCP server locally over stdio, not directly exposed to the internet.
- Keep Node.js and dependencies updated.
- Run the process with minimal OS/runtime privileges.

## Network surface

This server only contacts the Datamuse API (`https://api.datamuse.com`) for lexical queries.
