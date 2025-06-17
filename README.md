# words-finder

A powerful Node.js utility package that finds words containing specific letters, with support for both ordered and unordered matching. Uses an extensive word list combining both standard and extended English vocabularies.

## Features

- 🔍 Find words containing specific letters
- ⚡️ Fast pattern matching
- 📊 Detailed matching statistics
- 🎯 Ordered (sequential) or unordered (any position) matching
- ⚙️ Configurable result limit
- 💪 TypeScript support with full type definitions
- 📚 Extensive word dictionary

## Installation

```bash
npm install words-finder
```

## Usage

```typescript
import { findWords } from "words-finder";

// Find words containing 'cat' in order (default behavior)
const result = findWords("cat");
console.log(result);
/* Output:
{
  words: ["cat", "catch", "scatter", ...],
  totalMatchingWords: 42,
  totalWordsScanned: 370103,
  ordered: true,
  input: "cat"
}
*/

// Find words containing letters 'cat' in any order, limited to 5 results
const unorderedResult = findWords("cat", 5, false);
console.log(unorderedResult);
/* Output:
{
  words: ["cat", "act", "tac", "catch", "actor"],
  totalMatchingWords: 158,
  totalWordsScanned: 370103,
  ordered: false,
  input: "cat"
}
*/
```

## API Reference

### findWords(letters: string, limit?: number, isOrdered?: boolean): WordsFinderResult

#### Parameters

- `letters` (string, required)

  - The letters to search for in words
  - Must contain only letters a-z (case insensitive)
  - Will throw an error if empty or contains non-letter characters

- `limit` (number, optional)

  - Maximum number of words to return
  - Default: 10
  - Set to 0 for unlimited results

- `isOrdered` (boolean, optional)
  - If true, letters must appear in sequence (like a substring)
  - If false, letters can appear in any order
  - Default: true

#### Returns: WordsFinderResult

```typescript
interface WordsFinderResult {
  words: string[]; // Array of matching words (limited by limit parameter)
  totalMatchingWords: number; // Total matches found before limiting
  totalWordsScanned: number; // Total words in the dictionary
  ordered: boolean; // Whether the search was ordered
  input: string; // Original input letters
}
```

#### Errors

Throws an Error if:

- `letters` parameter is empty
- `letters` contains non-alphabetic characters

## Examples

```typescript
// Basic usage - find words containing 'ing' in order
const basic = findWords("ing");
// { words: ["ing", "ring", "sing", ...], totalMatchingWords: 3042, ... }

// Unordered search with custom limit
const scrambled = findWords("star", 3, false);
// { words: ["star", "arts", "rats"], totalMatchingWords: 97, ... }

// Find all matches (no limit)
const all = findWords("zen", 0, true);
// Returns all matching words with no limit

// Will throw an error
findWords("123"); // Error: "Valid letters parameter is required"
findWords(""); // Error: "Valid letters parameter is required"
```

## TypeScript Support

This package includes TypeScript type definitions. The main types are:

```typescript
import { findWords, WordsFinderResult } from "words-finder";
```

## License

ISC
