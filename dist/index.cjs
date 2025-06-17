"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  findWords: () => findWords
});
module.exports = __toCommonJS(index_exports);
var import_node_fs = require("fs");
var import_node_path = require("path");
function loadWords(filename) {
  try {
    const filePath = (0, import_node_path.join)(__dirname, "..", filename);
    const content = (0, import_node_fs.readFileSync)(filePath, "utf-8");
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  findWords
});
