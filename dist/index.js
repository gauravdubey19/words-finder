import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// src/index.ts
var __dirname = dirname(fileURLToPath(import.meta.url));
function loadWords(filename) {
  try {
    const filePath = join(__dirname, "..", filename);
    const content = readFileSync(filePath, "utf-8");
    return content.split("\n").map((word) => word.trim().toLowerCase()).filter(Boolean);
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    return [];
  }
}
var allWords = [...loadWords("words.txt"), ...loadWords("words_alpha.txt")];
function findWords(letters, limit = 10, isOrdered = true) {
  if (!letters || !/^[a-z]+$/i.test(letters)) {
    throw new Error("Valid letters parameter is required");
  }
  letters = letters.toLowerCase();
  let matchingWords;
  if (isOrdered) {
    matchingWords = allWords.filter((word) => word.includes(letters));
  } else {
    const letterSet = new Set(letters);
    matchingWords = allWords.filter(
      (word) => Array.from(letterSet).every((letter) => word.includes(letter))
    );
  }
  return {
    words: matchingWords.slice(0, limit),
    totalMatchingWords: matchingWords.length,
    totalWordsScanned: allWords.length,
    ordered: isOrdered,
    input: letters
  };
}

export { findWords };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map