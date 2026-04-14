import { z } from "zod";

export const FindSynonymsSchema = z.object({
  word: z.string().min(1).max(100).describe("The word to find synonyms for"),
  max: z.number().int().min(1).max(50).default(10).describe("Maximum results"),
  topic: z.string().max(100).optional().describe("Topic to bias results"),
});

export const FindAntonymsSchema = z.object({
  word: z.string().min(1).max(100).describe("The word to find antonyms for"),
  max: z.number().int().min(1).max(50).default(10).describe("Maximum results"),
});

export const FindRhymesSchema = z.object({
  word: z.string().min(1).max(100).describe("The word to find rhymes for"),
  type: z.enum(["perfect", "near"]).default("perfect").describe("Rhyme type"),
  max: z.number().int().min(1).max(100).default(20).describe("Maximum results"),
});

export const FindSimilarSoundingSchema = z.object({
  text: z.string().min(1).max(200).describe("Text to match phonetically"),
  max: z.number().int().min(1).max(50).default(15).describe("Maximum results"),
});

export const FindByPatternSchema = z.object({
  pattern: z.string().min(1).max(100).describe("Pattern with wildcards (* or ?)"),
  meaning_hint: z.string().max(200).optional().describe("Meaning to filter by"),
  max: z.number().int().min(1).max(100).default(25).describe("Maximum results"),
});

export const FindRelatedWordsSchema = z.object({
  word: z.string().min(1).max(100).describe("The word to find related words for"),
  relation_type: z
    .enum(["meaning", "triggers", "broader", "narrower"])
    .default("meaning")
    .describe("Type of semantic relation"),
  topic: z.string().max(100).optional().describe("Topic to bias results"),
  max: z.number().int().min(1).max(50).default(15).describe("Maximum results"),
});

export const FindAdjectivesSchema = z.object({
  noun: z.string().min(1).max(100).describe("The noun to find adjectives for"),
  max: z.number().int().min(1).max(50).default(15).describe("Maximum results"),
});

export const FindNounsSchema = z.object({
  adjective: z.string().min(1).max(100).describe("The adjective to find nouns for"),
  max: z.number().int().min(1).max(50).default(15).describe("Maximum results"),
});

export const GetWordInfoSchema = z.object({
  word: z.string().min(1).max(100).describe("The word to get info about"),
});

export const AutocompleteSchema = z.object({
  prefix: z.string().min(1).max(100).describe("Partial word to complete"),
  max: z.number().int().min(1).max(25).default(10).describe("Maximum suggestions"),
});

// Type exports
export type FindSynonymsInput = z.infer<typeof FindSynonymsSchema>;
export type FindAntonymsInput = z.infer<typeof FindAntonymsSchema>;
export type FindRhymesInput = z.infer<typeof FindRhymesSchema>;
export type FindSimilarSoundingInput = z.infer<typeof FindSimilarSoundingSchema>;
export type FindByPatternInput = z.infer<typeof FindByPatternSchema>;
export type FindRelatedWordsInput = z.infer<typeof FindRelatedWordsSchema>;
export type FindAdjectivesInput = z.infer<typeof FindAdjectivesSchema>;
export type FindNounsInput = z.infer<typeof FindNounsSchema>;
export type GetWordInfoInput = z.infer<typeof GetWordInfoSchema>;
export type AutocompleteInput = z.infer<typeof AutocompleteSchema>;
