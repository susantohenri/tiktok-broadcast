chrome.tabs.onActivated.addListener(async () => {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
    chrome.tabs.sendMessage(tab.id, {})
    return true
})