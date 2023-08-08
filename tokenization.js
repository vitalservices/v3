```javascript
// tokenization.js

// List of common words to ignore
const stopWords = ["the", "a", "an", "in", "is", "it", "you", "are", "for", "from", "as", "with", "to", "of", "at", "on", "or", "that", "this", "and", "was", "for", "in", "it"];

/**
 * Tokenizes the given text.
 * @param {string} text - The text to tokenize.
 * @returns {Array} The tokens.
 */
function tokenizeText(text) {
    // Convert to lowercase
    text = text.toLowerCase();

    // Remove punctuation
    text = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");

    // Split into words
    let tokens = text.split(" ");

    // Remove stop words
    tokens = tokens.filter(token => !stopWords.includes(token));

    return tokens;
}
```