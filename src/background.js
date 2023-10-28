browser.commands.onCommand.addListener(command => {
  if (command == 'modify-link') {
    browser.tabs.query({ active: true, currentWindow: true }, tabs => {
      browser.tabs.sendMessage(
        tabs[0].id,
        { action: 'modify-link', data: tabs[0].url },
        response => {}
      );
    });
  }
});
