const chatIconSelector = `.alliance-icon-Message`

function waitForMe(selector, cb) {
    if (0 < document.querySelectorAll(selector).length) cb()
    else setTimeout(() => {
        waitForMe(selector, cb)
    }, 500)
}

chrome.runtime.onMessage.addListener(
    function (request) {
        localStorage.setItem(`tiktok-affiliate-broadcaster-message`, request.message)
        waitForMe(chatIconSelector, () => {
            document.querySelectorAll(chatIconSelector)[4].parentElement.click()
        })
    }
);
