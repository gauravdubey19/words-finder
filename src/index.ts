import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Get the directory path for this module
const __dirname = dirname(fileURLToPath(import.meta.url));

// interface for the return value
export interface WordsFinderResult {
  words: string[];
  totalMatchingWords: number;
  totalWordsScanned: number;
  ordered: boolean;
  input: string;
}

// load word lists
function loadWords(filename: string): string[] {
  try {
    const filePath = join(__dirname, "..", filename);
    const content = readFileSync(filePath, "utf-8");
    return content
      .split("\n")
      .map((word: string) => word.trim().toLowerCase())
      .filter(Boolean);
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    return [];
  }
}

const allWords = [...loadWords("words.txt"), ...loadWords("words_alpha.txt")];

/**
 * Find words that contain specific letters
 * @param letters - The letters to search for in words
 * @param limit - Maximum number of words to return (defaults to 10)
 * @param isOrdered - If true, letters must appear in same order (defaults to true)
 * @throws {Error} If letters parameter is invalid
 * @returns Object containing matching words and statistics
 */
export function findWords(
  letters: string,
  limit: number = 10,
  isOrdered: boolean = true
): WordsFinderResult {
  // input validation
  if (!letters || !/^[a-z]+$/i.test(letters)) {
    throw new Error("Valid letters parameter is required");
  }

  // convert letters to lowercase for case-insensitive matching
  letters = letters.toLowerCase();

  let matchingWords: string[];

  if (isOrdered) {
    // ordered search (substring pattern match)
    matchingWords = allWords.filter((word) => word.includes(letters));
  } else {
    // unordered search (contains all letters in any order)
    const letterSet = new Set(letters);
    matchingWords = allWords.filter((word) =>
      Array.from(letterSet).every((letter) => word.includes(letter))
    );
  }

  return {
    words: matchingWords.slice(0, limit),
    totalMatchingWords: matchingWords.length,
    totalWordsScanned: allWords.length,
    ordered: isOrdered,
    input: letters,
  };
}
