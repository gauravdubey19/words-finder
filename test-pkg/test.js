const { findWords } = require("words-finder");

try {
  console.log("\nTesting findWords function:");
  console.log("------------------------");

  // Test 1: Ordered search (default)
  console.log('\n1. Ordered search for "cat":');
  const orderedResult = findWords("cat");
  console.log("First 5 matching words:", orderedResult.words.slice(0, 5));
  console.log("Total matches:", orderedResult.totalMatchingWords);
  console.log("Ordered search:", orderedResult.ordered);

  // Test 2: Unordered search
  console.log('\n2. Unordered search for "cat":');
  const unorderedResult = findWords("cat", 10, false);
  console.log("First 5 matching words:", unorderedResult.words.slice(0, 5));
  console.log("Total matches:", unorderedResult.totalMatchingWords);
  console.log("Ordered search:", unorderedResult.ordered);

  console.log("\n✅ All tests completed successfully!");
} catch (error) {
  console.error("\n❌ Error:", error.message);
  console.error("Stack trace:", error.stack);
}
