chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action == 'modify-link') {
    const clipboardData = request.data;
    updateLink(clipboardData);
  } else {
    console.log('Unknown action received.');
  }
});

document.addEventListener('copy', e => {
  currentLink = document.location.href;

  /* When the user visits the bookmarks page, and uses copy link button on a post, 
    extension gets the url of the bookmarks page isntead of the post.
    This is a temprary fix to get the url of the post instead.*/

  // TODO: Check more pages where this could be an issue.
  if (currentLink.includes('bookmarks')) {
    const postLink = e.target.innerHTML;
    const urlRegex = /^https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/g;
    if (postLink.match(urlRegex)) {
      currentLink = postLink;
    }
  }

  chrome.storage.sync.get('oncopyenabled', isOnCopyEnabled => {
    if (
      isOnCopyEnabled != null &&
      isOnCopyEnabled.oncopyenabled != undefined &&
      isOnCopyEnabled.oncopyenabled
    ) {
      updateLink(currentLink);
    }
  });
});

const updateLink = clipboardData => {
  var modifiedLink = clipboardData.replace(
    /twitter\.com|x\.com/g,
    'vxtwitter.com'
  );

  chrome.storage.sync.get('fxenabled', isFxEnabled => {
    if (
      isFxEnabled != null &&
      isFxEnabled.fxenabled != undefined &&
      isFxEnabled.fxenabled
    ) {
      modifiedLink = clipboardData.replace(
        /twitter\.com|x\.com/g,
        'fxtwitter.com'
      );
    }

    navigator.clipboard.writeText(modifiedLink).then(
      () => {
        console.log('Modified twitter link successfully copied to clipboard.');
      },
      err => {
        console.log('Unable to modify the twitter link.', err);
      }
    );
  });
};
