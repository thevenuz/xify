document.addEventListener('DOMContentLoaded', () => {
  var fxtwitterButton = document.getElementById('switch');
  var onCopyButton = document.getElementById('oncopy-switch');

  chrome.storage.sync.get('fxenabled', result => {
    if (result.fxenabled != null) {
      fxtwitterButton.checked = result.fxenabled;
    }
  });

  fxtwitterButton.addEventListener('click', () => {
    chrome.storage.sync.set({ fxenabled: fxtwitterButton.checked }, () => {
      console.log('fx enabled');
    });
  });

  chrome.storage.sync.get('oncopyenabled', result => {
    if (result.oncopyenabled != null) {
      onCopyButton.checked = result.oncopyenabled;
    }
  });

  onCopyButton.addEventListener('click', () => {
    chrome.storage.sync.set({ oncopyenabled: onCopyButton.checked }, () => {
      console.log('oncopy enabled');
    });
  });
});
