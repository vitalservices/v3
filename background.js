```javascript
let commentsData = {};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ commentsData: {} });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'SAVE_COMMENT') {
    saveComment(request.data);
  } else if (request.message === 'SEARCH_COMMENT') {
    searchComment(request.data);
  }
});

function saveComment(data) {
  commentsData[data.url] = commentsData[data.url] || [];
  commentsData[data.url].push(data.comment);
  chrome.storage.local.set({ commentsData: commentsData });
}

function searchComment(query) {
  let searchResults = [];
  for (let url in commentsData) {
    let comments = commentsData[url];
    comments.forEach(comment => {
      let tokens = tokenizeText(comment);
      if (tokens.includes(query)) {
        searchResults.push({ url: url, comment: comment });
      }
    });
  }
  chrome.runtime.sendMessage({ message: 'SEARCH_RESULTS', data: searchResults });
}

function tokenizeText(text) {
  // This function will be implemented in tokenization.js
  // Here we just call it
  return [];
}
```