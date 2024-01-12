(() => {
    const btn = document.querySelector(`button`)
    const area = document.querySelector(`textarea`)

    btn.onclick = async () => {
        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
        await chrome.tabs.sendMessage(tab.id, { message: area.value })
    }
})();
