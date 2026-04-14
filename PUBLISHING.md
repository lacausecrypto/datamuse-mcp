# Publishing Guide (npm + MCP Registry)

This guide covers release preparation and publication to npm and the MCP Registry.

## 1. Set your identity fields

Before publishing, update placeholders in:

- `package.json`
- `server.json`

Replace `YOUR_GITHUB_USERNAME` everywhere with your actual GitHub username.

## 2. Keep versions aligned

Set the same version in all of these fields:

- `package.json` → `version`
- `server.json` → top-level `version`
- `server.json` → `packages[0].version`

## 3. Run release checks

```bash
npm install
npm run release:check
```

`release:check` validates:

- npm package metadata consistency;
- MCP metadata consistency (`mcpName`, `server.json` name/version/package);
- build output and npm package contents.

## 4. Publish to npm

```bash
npm login
npm publish --access public
```

## 5. Publish to MCP Registry

Install `mcp-publisher`:

```bash
curl -L "https://github.com/modelcontextprotocol/registry/releases/latest/download/mcp-publisher_$(uname -s | tr '[:upper:]' '[:lower:]')_$(uname -m | sed 's/x86_64/amd64/;s/aarch64/arm64/').tar.gz" | tar xz mcp-publisher
sudo mv mcp-publisher /usr/local/bin/
```

Authenticate and publish:

```bash
mcp-publisher login github
mcp-publisher publish
```

## 6. Verify

```bash
curl "https://registry.modelcontextprotocol.io/v0.1/servers?search=io.github.YOUR_GITHUB_USERNAME/datamuse-mcp"
```

If your release is visible in search results, publication is complete.

## CI/CD option

A GitHub Actions workflow is provided at:

- `.github/workflows/publish.yml`

It triggers on `v*` tags and publishes to npm then MCP Registry.
