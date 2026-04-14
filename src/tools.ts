import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const tools: Tool[] = [
  {
    name: "find_synonyms",
    description:
      "Find synonyms (words with similar meanings) for a given word. Uses WordNet and corpus data. Optionally bias results toward a specific topic.",
    inputSchema: {
      type: "object" as const,
      properties: {
        word: {
          type: "string",
          description: "The word to find synonyms for",
        },
        max: {
          type: "number",
          description: "Maximum number of results (1-50, default: 10)",
        },
        topic: {
          type: "string",
          description: "Optional topic to bias results (e.g., 'music', 'medical')",
        },
      },
      required: ["word"],
    },
  },
  {
    name: "find_antonyms",
    description: "Find antonyms (words with opposite meanings) for a given word using WordNet relationships.",
    inputSchema: {
      type: "object" as const,
      properties: {
        word: {
          type: "string",
          description: "The word to find antonyms for",
        },
        max: {
          type: "number",
          description: "Maximum number of results (1-50, default: 10)",
        },
      },
      required: ["word"],
    },
  },
  {
    name: "find_rhymes",
    description:
      "Find words that rhyme with a given word. Supports perfect rhymes and near-rhymes. Useful for poetry, songwriting, and creative writing.",
    inputSchema: {
      type: "object" as const,
      properties: {
        word: {
          type: "string",
          description: "The word to find rhymes for",
        },
        type: {
          type: "string",
          enum: ["perfect", "near"],
          description: "Type of rhyme: 'perfect' for exact rhymes, 'near' for approximate (default: perfect)",
        },
        max: {
          type: "number",
          description: "Maximum number of results (1-100, default: 20)",
        },
      },
      required: ["word"],
    },
  },
  {
    name: "find_similar_sounding",
    description:
      "Find words that sound similar to the input. Useful for spelling correction, finding homophones, creating puns, or phonetic matching.",
    inputSchema: {
      type: "object" as const,
      properties: {
        text: {
          type: "string",
          description: "The text to match phonetically (can be a misspelling)",
        },
        max: {
          type: "number",
          description: "Maximum number of results (1-50, default: 15)",
        },
      },
      required: ["text"],
    },
  },
  {
    name: "find_by_pattern",
    description:
      "Find words matching a spelling pattern with wildcards. Use '*' for any number of characters, '?' for exactly one character. Examples: 't??k' matches talk/tank/tick, 'un*able' matches unable/unforgettable.",
    inputSchema: {
      type: "object" as const,
      properties: {
        pattern: {
          type: "string",
          description: "Spelling pattern with wildcards (* or ?)",
        },
        meaning_hint: {
          type: "string",
          description: "Optional meaning to filter results",
        },
        max: {
          type: "number",
          description: "Maximum number of results (1-100, default: 25)",
        },
      },
      required: ["pattern"],
    },
  },
  {
    name: "find_related_words",
    description:
      "Find words semantically related to the input. Can find words by meaning similarity, statistical associations (triggers), or hierarchical relationships (hypernyms/hyponyms).",
    inputSchema: {
      type: "object" as const,
      properties: {
        word: {
          type: "string",
          description: "The word to find related words for",
        },
        relation_type: {
          type: "string",
          enum: ["meaning", "triggers", "broader", "narrower"],
          description:
            "Type of relation: 'meaning' for semantic similarity, 'triggers' for associations, 'broader' for hypernyms, 'narrower' for hyponyms (default: meaning)",
        },
        topic: {
          type: "string",
          description: "Optional topic to bias results",
        },
        max: {
          type: "number",
          description: "Maximum number of results (1-50, default: 15)",
        },
      },
      required: ["word"],
    },
  },
  {
    name: "find_adjectives_for_noun",
    description:
      "Find adjectives commonly used to describe a noun. Based on Google Books Ngrams data. Example: 'ocean' → deep, blue, vast, pacific.",
    inputSchema: {
      type: "object" as const,
      properties: {
        noun: {
          type: "string",
          description: "The noun to find adjectives for",
        },
        max: {
          type: "number",
          description: "Maximum number of results (1-50, default: 15)",
        },
      },
      required: ["noun"],
    },
  },
  {
    name: "find_nouns_for_adjective",
    description:
      "Find nouns commonly described by an adjective. Based on Google Books Ngrams data. Example: 'yellow' → sun, light, fever, pages.",
    inputSchema: {
      type: "object" as const,
      properties: {
        adjective: {
          type: "string",
          description: "The adjective to find nouns for",
        },
        max: {
          type: "number",
          description: "Maximum number of results (1-50, default: 15)",
        },
      },
      required: ["adjective"],
    },
  },
  {
    name: "get_word_info",
    description:
      "Get detailed information about a word including: definitions, part of speech, syllable count, pronunciation (IPA), and usage frequency.",
    inputSchema: {
      type: "object" as const,
      properties: {
        word: {
          type: "string",
          description: "The word to get information about",
        },
      },
      required: ["word"],
    },
  },
  {
    name: "autocomplete",
    description:
      "Get word suggestions for a partial input. Includes intelligent spelling correction and phonetic fallbacks when exact prefix matches aren't found.",
    inputSchema: {
      type: "object" as const,
      properties: {
        prefix: {
          type: "string",
          description: "The partial word to complete",
        },
        max: {
          type: "number",
          description: "Maximum number of suggestions (1-25, default: 10)",
        },
      },
      required: ["prefix"],
    },
  },
];
