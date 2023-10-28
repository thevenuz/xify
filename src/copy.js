browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action == 'modify-link') {
    const clipboardData = request.data;

    const modifiedLink = clipboardData.replace('twitter', 'vxtwitter');

    navigator.clipboard.writeText(modifiedLink).then(
      () => {
        console.log('Modified twitter link successfully copied to clipboard.');
      },
      err => {
        console.log('Unable to modify the twitter link.', err);
      }
    );
  } else {
    console.log('Unknown action received.');
  }
});
