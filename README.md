# datamuse-mcp

[![npm version](https://img.shields.io/npm/v/datamuse-mcp?style=flat&logo=npm)](https://www.npmjs.com/package/datamuse-mcp)
[![npm downloads](https://img.shields.io/npm/dt/datamuse-mcp?style=flat&logo=npm)](https://www.npmjs.com/package/datamuse-mcp)
[![license](https://img.shields.io/npm/l/datamuse-mcp?style=flat)](./LICENSE)
[![node](https://img.shields.io/node/v/datamuse-mcp?style=flat&logo=node.js)](https://www.npmjs.com/package/datamuse-mcp)
[![github release](https://img.shields.io/github/v/release/lacausecrypto/datamuse-mcp?style=flat&logo=github)](https://github.com/lacausecrypto/datamuse-mcp/releases)
[![publish workflow](https://img.shields.io/github/actions/workflow/status/lacausecrypto/datamuse-mcp/publish.yml?style=flat&logo=githubactions&label=publish)](https://github.com/lacausecrypto/datamuse-mcp/actions/workflows/publish.yml)

MCP server for the Datamuse API (word search, rhymes, synonyms, and more).

This project is open source, free to use, and licensed under MIT.

## About

`datamuse-mcp` is a local stdio MCP server that wraps Datamuse endpoints into validated MCP tools.
It is designed for practical word-finding use cases in assistants and clients that support MCP.

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

## More tool examples

```json
{ "tool": "find_antonyms", "arguments": { "word": "happy", "max": 10 } }
{ "tool": "find_rhymes", "arguments": { "word": "love", "type": "perfect", "max": 20 } }
{ "tool": "find_similar_sounding", "arguments": { "text": "definately", "max": 15 } }
{ "tool": "find_by_pattern", "arguments": { "pattern": "s??r?", "meaning_hint": "celestial", "max": 25 } }
{ "tool": "find_related_words", "arguments": { "word": "music", "relation_type": "triggers", "max": 15 } }
{ "tool": "get_word_info", "arguments": { "word": "serendipity" } }
{ "tool": "autocomplete", "arguments": { "prefix": "astro", "max": 10 } }
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
