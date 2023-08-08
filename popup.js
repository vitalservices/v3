```javascript
let commentsData = {};
let searchResults = [];

document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get('commentsData', function(data) {
        commentsData = data.commentsData || {};
        displayComments();
    });
});

document.getElementById('searchInput').addEventListener('keyup', function(e) {
    let searchText = e.target.value;
    searchComment(searchText);
});

function displayComments() {
    let commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = '';
    for (let url in commentsData) {
        let commentItem = document.createElement('li');
        commentItem.textContent = `${url}: ${commentsData[url]}`;
        commentsList.appendChild(commentItem);
    }
}

function searchComment(searchText) {
    chrome.runtime.sendMessage({type: 'SEARCH_COMMENT', payload: searchText}, function(response) {
        searchResults = response;
        displaySearchResults();
    });
}

function displaySearchResults() {
    let searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.innerHTML = '';
    for (let result of searchResults) {
        let resultItem = document.createElement('li');
        resultItem.textContent = `${result.url}: ${result.comment}`;
        searchResultsContainer.appendChild(resultItem);
    }
}
```