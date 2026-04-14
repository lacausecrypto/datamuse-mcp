# Contributing

Thanks for contributing.

## Quick start

```bash
npm install
npm run build
```

## Recommended workflow

1. Open an issue describing the change.
2. Submit a focused PR (small, testable, readable).
3. Add or update manual JSON-RPC checks when relevant.

## Contribution rules

- Keep TypeScript strict.
- Do not add dependencies without justification.
- Keep MCP handlers explicit and validated with `zod`.
- Preserve existing tool names unless a breaking change is explicitly approved.

## Checks before opening a PR

```bash
npm run build
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node dist/index.js
```

## Style

- Keep code simple and readable.
- Return clear error messages.
- Update documentation with code changes.
