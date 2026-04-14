import { client } from "./client.js";
import { transformWords, transformWordInfo } from "./transform.js";
import {
  FindSynonymsSchema,
  FindAntonymsSchema,
  FindRhymesSchema,
  FindSimilarSoundingSchema,
  FindByPatternSchema,
  FindRelatedWordsSchema,
  FindAdjectivesSchema,
  FindNounsSchema,
  GetWordInfoSchema,
  AutocompleteSchema,
} from "./schemas.js";

// ============================================================================
// HANDLER: find_synonyms
// ============================================================================
export async function findSynonyms(args: unknown) {
  const input = FindSynonymsSchema.parse(args);

  const params: Record<string, string | number> = {
    rel_syn: input.word,
    max: input.max,
    md: "p",
  };

  if (input.topic) {
    params.topics = input.topic;
  }

  const results = await client.words(params);
  return transformWords(results);
}

// ============================================================================
// HANDLER: find_antonyms
// ============================================================================
export async function findAntonyms(args: unknown) {
  const input = FindAntonymsSchema.parse(args);

  const results = await client.words({
    rel_ant: input.word,
    max: input.max,
    md: "p",
  });

  return transformWords(results);
}

// ============================================================================
// HANDLER: find_rhymes
// ============================================================================
export async function findRhymes(args: unknown) {
  const input = FindRhymesSchema.parse(args);

  const params: Record<string, string | number> = {
    max: input.max,
    md: "s", // syllables
  };

  if (input.type === "perfect") {
    params.rel_rhy = input.word;
  } else {
    params.rel_nry = input.word;
  }

  const results = await client.words(params);
  return transformWords(results);
}

// ============================================================================
// HANDLER: find_similar_sounding
// ============================================================================
export async function findSimilarSounding(args: unknown) {
  const input = FindSimilarSoundingSchema.parse(args);

  const results = await client.words({
    sl: input.text,
    max: input.max,
    md: "r", // pronunciation
  });

  return transformWords(results);
}

// ============================================================================
// HANDLER: find_by_pattern
// ============================================================================
export async function findByPattern(args: unknown) {
  const input = FindByPatternSchema.parse(args);

  const params: Record<string, string | number> = {
    sp: input.pattern,
    max: input.max,
    md: "p",
  };

  if (input.meaning_hint) {
    params.ml = input.meaning_hint;
  }

  const results = await client.words(params);
  return transformWords(results);
}

// ============================================================================
// HANDLER: find_related_words
// ============================================================================
export async function findRelatedWords(args: unknown) {
  const input = FindRelatedWordsSchema.parse(args);

  const params: Record<string, string | number> = {
    max: input.max,
    md: "p",
  };

  // Map relation_type to API parameter
  switch (input.relation_type) {
    case "meaning":
      params.ml = input.word;
      break;
    case "triggers":
      params.rel_trg = input.word;
      break;
    case "broader":
      params.rel_spc = input.word;
      break;
    case "narrower":
      params.rel_gen = input.word;
      break;
  }

  if (input.topic) {
    params.topics = input.topic;
  }

  const results = await client.words(params);
  return transformWords(results);
}

// ============================================================================
// HANDLER: find_adjectives_for_noun
// ============================================================================
export async function findAdjectivesForNoun(args: unknown) {
  const input = FindAdjectivesSchema.parse(args);

  const results = await client.words({
    rel_jjb: input.noun,
    max: input.max,
    md: "f", // frequency
  });

  return transformWords(results);
}

// ============================================================================
// HANDLER: find_nouns_for_adjective
// ============================================================================
export async function findNounsForAdjective(args: unknown) {
  const input = FindNounsSchema.parse(args);

  const results = await client.words({
    rel_jja: input.adjective,
    max: input.max,
    md: "f", // frequency
  });

  return transformWords(results);
}

// ============================================================================
// HANDLER: get_word_info
// ============================================================================
export async function getWordInfo(args: unknown) {
  const input = GetWordInfoSchema.parse(args);

  const results = await client.words({
    sp: input.word,
    qe: "sp",
    md: "dpsrf",
    ipa: 1,
    max: 1,
  });

  const info = transformWordInfo(results);

  if (!info) {
    return { error: `No information found for "${input.word}"` };
  }

  return info;
}

// ============================================================================
// HANDLER: autocomplete
// ============================================================================
export async function autocomplete(args: unknown) {
  const input = AutocompleteSchema.parse(args);

  const results = await client.suggest({
    s: input.prefix,
    max: input.max,
  });

  return results.map((r) => ({ word: r.word, score: r.score }));
}

// ============================================================================
// TOOL ROUTER
// ============================================================================
const handlers: Record<string, (args: unknown) => Promise<unknown>> = {
  find_synonyms: findSynonyms,
  find_antonyms: findAntonyms,
  find_rhymes: findRhymes,
  find_similar_sounding: findSimilarSounding,
  find_by_pattern: findByPattern,
  find_related_words: findRelatedWords,
  find_adjectives_for_noun: findAdjectivesForNoun,
  find_nouns_for_adjective: findNounsForAdjective,
  get_word_info: getWordInfo,
  autocomplete: autocomplete,
};

export async function handleToolCall(name: string, args: unknown): Promise<unknown> {
  const handler = handlers[name];

  if (!handler) {
    throw new Error(`Unknown tool: ${name}`);
  }

  return handler(args);
}
