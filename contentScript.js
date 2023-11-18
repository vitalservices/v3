```javascript
let commentsData = {};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'SAVE_COMMENT') {
    saveComment(request.data);
  }
});

function saveComment(data) {
  let url = data.url;
  let comment = data.comment;

  if (!commentsData[url]) {
    commentsData[url] = [];
  }

  commentsData[url].push(comment);

  chrome.storage.sync.set({commentsData}, () => {
    console.log('Comment saved');
  });
}

chrome.storage.sync.get('commentsData', (data) => {
  if (chrome.runtime.lastError) {
    console.log('Failed to retrieve comments data');
    return;
  }

  commentsData = data.commentsData || {};
});
```