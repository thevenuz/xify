chrome.commands.onCommand.addListener(command => {
  if (command == 'modify-link') {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: 'modify-link', data: tabs[0].url },
        response => {}
      );
    });
  }
});
