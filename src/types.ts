// Datamuse API response types

export interface DatamuseWord {
  word: string;
  score: number;
  defs?: string[];
  numSyllables?: number;
  tags?: string[];
}

// Transformed output types

export interface WordResult {
  word: string;
  score: number;
  partOfSpeech?: string[];
  syllables?: number;
  definitions?: Definition[];
  pronunciation?: string;
  frequency?: number;
}

export interface Definition {
  partOfSpeech: string;
  text: string;
}

export interface WordInfo {
  word: string;
  definitions: Definition[];
  partOfSpeech: string[];
  syllables: number;
  pronunciation: string;
  frequency: number;
}
