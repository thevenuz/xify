chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action == 'modify-link') {
    const clipboardData = request.data;
    updateLink(clipboardData);
  } else {
    console.log('Unknown action received.');
  }
});

/**
 * Regex to match twitter and x.com URLs.
 */
const FIX_TARGET = /twitter\.com|x\.com/g;

document.addEventListener('copy', e => {
  chrome.storage.sync.get('oncopyenabled', isOnCopyEnabled => {
    if (
      isOnCopyEnabled != null &&
      isOnCopyEnabled.oncopyenabled != undefined &&
      isOnCopyEnabled.oncopyenabled
    ) {
      target = window.getSelection().toString();

      // If target is empty, try to get the URL of the current page.
      if (!target) {
        target = document.location.href;
        if (target.match(FIX_TARGET)) {
          updateLink(target);
        }
      }
    }
  });
});

const updateLink = clipboardData => {
  var modifiedLink = clipboardData.replace(FIX_TARGET, 'vxtwitter.com');

  chrome.storage.sync.get('fxenabled', isFxEnabled => {
    if (
      isFxEnabled != null &&
      isFxEnabled.fxenabled != undefined &&
      isFxEnabled.fxenabled
    ) {
      modifiedLink = clipboardData.replace(FIX_TARGET, 'fxtwitter.com');
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
