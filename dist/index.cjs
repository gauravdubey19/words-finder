'use strict';

var fs = require('fs');
var path = require('path');
var url = require('url');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
// src/index.ts
var __dirname$1 = path.dirname(url.fileURLToPath((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('index.cjs', document.baseURI).href))));
function loadWords(filename) {
  try {
    const filePath = path.join(__dirname$1, "..", filename);
    const content = fs.readFileSync(filePath, "utf-8");
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

exports.findWords = findWords;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map