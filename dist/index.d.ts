interface WordsFinderResult {
    words: string[];
    totalMatchingWords: number;
    totalWordsScanned: number;
    ordered: boolean;
    input: string;
}
/**
 * Find words that contain specific letters
 * @param letters - The letters to search for in words
 * @param limit - Maximum number of words to return (defaults to 10)
 * @param isOrdered - If true, letters must appear in same order (defaults to true)
 * @throws {Error} If letters parameter is invalid
 * @returns Object containing matching words and statistics
 */
declare function findWords(letters: string, limit?: number, isOrdered?: boolean): WordsFinderResult;

export { type WordsFinderResult, findWords };
