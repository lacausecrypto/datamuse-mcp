import { DatamuseWord, WordResult, Definition, WordInfo } from "./types.js";

export function transformWords(raw: DatamuseWord[]): WordResult[] {
  return raw.map(transformWord);
}

export function transformWord(raw: DatamuseWord): WordResult {
  const result: WordResult = {
    word: raw.word,
    score: raw.score,
  };

  if (raw.numSyllables !== undefined) {
    result.syllables = raw.numSyllables;
  }

  if (raw.tags && raw.tags.length > 0) {
    const pos: string[] = [];

    for (const tag of raw.tags) {
      if (tag === "n") pos.push("noun");
      else if (tag === "v") pos.push("verb");
      else if (tag === "adj") pos.push("adjective");
      else if (tag === "adv") pos.push("adverb");
      else if (tag.startsWith("pron:")) {
        result.pronunciation = tag.slice(5);
      } else if (tag.startsWith("f:")) {
        result.frequency = parseFloat(tag.slice(2));
      }
    }

    if (pos.length > 0) {
      result.partOfSpeech = pos;
    }
  }

  if (raw.defs && raw.defs.length > 0) {
    result.definitions = raw.defs.map(parseDefinition);
  }

  return result;
}

export function transformWordInfo(raw: DatamuseWord[]): WordInfo | null {
  if (raw.length === 0) return null;

  const word = raw[0];
  const result = transformWord(word);

  return {
    word: result.word,
    definitions: result.definitions ?? [],
    partOfSpeech: result.partOfSpeech ?? [],
    syllables: result.syllables ?? 0,
    pronunciation: result.pronunciation ?? "",
    frequency: result.frequency ?? 0,
  };
}

function parseDefinition(def: string): Definition {
  const tabIndex = def.indexOf("\t");
  if (tabIndex === -1) {
    return { partOfSpeech: "unknown", text: def };
  }
  return {
    partOfSpeech: def.slice(0, tabIndex),
    text: def.slice(tabIndex + 1),
  };
}
