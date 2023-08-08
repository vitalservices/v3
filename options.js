```javascript
let commentsData = {};
let searchResults = [];

// Load comments from storage
chrome.storage.sync.get('commentsData', function(data) {
  if (data.commentsData) {
    commentsData = data.commentsData;
  }
});

// Function to search a comment
function searchComment(query) {
  searchResults = [];
  const tokens = tokenizeText(query);
  for (let url in commentsData) {
    for (let comment of commentsData[url]) {
      const commentTokens = tokenizeText(comment.text);
      if (tokens.some(token => commentTokens.includes(token))) {
        searchResults.push(comment);
      }
    }
  }
  aiEnhanceSearch(searchResults);
}

// Event listener for search input
document.getElementById('searchInput').addEventListener('input', function(e) {
  searchComment(e.target.value);
});

// Function to display search results
function displaySearchResults() {
  const container = document.getElementById('searchResults');
  container.innerHTML = '';
  for (let result of searchResults) {
    const div = document.createElement('div');
    div.textContent = result.text;
    container.appendChild(div);
  }
}

// Event listener for search results changes
chrome.storage.onChanged.addListener(function(changes, areaName) {
  if (areaName === 'sync' && changes.searchResults) {
    searchResults = changes.searchResults.newValue;
    displaySearchResults();
  }
});
```