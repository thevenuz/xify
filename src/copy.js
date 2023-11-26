chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action == 'modify-link') {
    const clipboardData = request.data;
    var modifiedLink = clipboardData.replace('twitter', 'vxtwitter');

    chrome.storage.sync.get('fxenabled', isFxEnabled => {
      console.log(isFxEnabled);
      if (
        isFxEnabled != null &&
        isFxEnabled.fxenabled != undefined &&
        isFxEnabled.fxenabled
      ) {
        modifiedLink = clipboardData.replace('twitter', 'fxtwitter');
      }

      navigator.clipboard.writeText(modifiedLink).then(
        () => {
          console.log(
            'Modified twitter link successfully copied to clipboard.'
          );
        },
        err => {
          console.log('Unable to modify the twitter link.', err);
        }
      );
    });
  } else {
    console.log('Unknown action received.');
  }
});
