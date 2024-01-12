const chatIconSelector = `.alliance-icon-Message`
waitForMe(chatIconSelector, () => {
    document.querySelectorAll(chatIconSelector)[4].parentElement.click()
})

function waitForMe(selector, cb) {
    if (0 < document.querySelectorAll(selector).length) cb()
    else setTimeout(() => {
        waitForMe(selector, cb)
    }, 500)
}