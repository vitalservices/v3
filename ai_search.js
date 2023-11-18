```javascript
import * as tf from '@tensorflow/tfjs';
import { tokenizeText } from './tokenization.js';

let searchResults = [];

async function aiEnhanceSearch(query) {
  const model = await tf.loadLayersModel('model.json');
  const tokenizedQuery = tokenizeText(query);

  commentsData.forEach(comment => {
    const tokenizedComment = tokenizeText(comment.text);
    const inputTensor = tf.tensor2d([tokenizedQuery, tokenizedComment]);
    const similarity = model.predict(inputTensor).dataSync()[0];

    if (similarity > 0.8) {
      searchResults.push(comment);
    }
  });

  return searchResults;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'SEARCH_COMMENT') {
    aiEnhanceSearch(request.query).then(results => {
      sendResponse({ message: 'SEARCH_RESULTS', results });
    });
    return true;
  }
});
```