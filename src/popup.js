document.addEventListener('DOMContentLoaded', () => {
  var fxtwitterButton = document.getElementById('switch');

  browser.storage.sync.get('fxenabled', result => {
    if (result.fxenabled != null) {
      console.log('get fx enable');
      fxtwitterButton.checked = result.fxenabled;
    }
  });

  fxtwitterButton.addEventListener('click', () => {
    browser.storage.sync.set({ fxenabled: fxtwitterButton.checked }, () => {
      console.log('fx enabled');
    });
  });
});
