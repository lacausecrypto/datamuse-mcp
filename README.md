# datamuse-mcp

MCP server for the Datamuse API (word search, rhymes, synonyms, and more).

This project is open source, free to use, and licensed under MIT.

## Purpose

This server provides simple MCP tools to:

- find synonyms, antonyms, and rhymes;
- run autocomplete;
- fetch lexical details (definitions, POS, syllables, pronunciation, frequency);
- search by spelling pattern (`*`, `?`) or phonetic similarity.

## Requirements

- Node.js `>= 18`
- npm

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build & run

```bash
npm run build
npm start
```

## Manual JSON-RPC checks

```bash
# List tools
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node dist/index.js

# Call a tool
echo '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"find_synonyms","arguments":{"word":"happy"}}}' | node dist/index.js
```

## Claude Desktop configuration

Add this to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "datamuse": {
      "command": "node",
      "args": ["/absolute/path/to/datamuse-mcp/dist/index.js"]
    }
  }
}
```

## Exposed tools

- `find_synonyms`
- `find_antonyms`
- `find_rhymes`
- `find_similar_sounding`
- `find_by_pattern`
- `find_related_words`
- `find_adjectives_for_noun`
- `find_nouns_for_adjective`
- `get_word_info`
- `autocomplete`

## Security and limits

- The server runs over `stdio` (local usage recommended).
- Outbound requests go to `https://api.datamuse.com`.
- A local in-memory cache is used (5-minute TTL), with no disk persistence.
- Datamuse may enforce request limits/quotas.

## Publishing

For npm and MCP Registry deployment, see [PUBLISHING.md](./PUBLISHING.md).

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT — see [LICENSE](./LICENSE).
