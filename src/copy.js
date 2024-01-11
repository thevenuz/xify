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
  var modifiedLink = clipboardData.replace('twitter', 'vxtwitter');

  chrome.storage.sync.get('fxenabled', isFxEnabled => {
    if (
      isFxEnabled != null &&
      isFxEnabled.fxenabled != undefined &&
      isFxEnabled.fxenabled
    ) {
      modifiedLink = clipboardData.replace('twitter', 'fxtwitter');
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
