function waitForMe(selector, cb) {
    if (0 < document.querySelectorAll(selector).length) cb()
    else setTimeout(() => {
        waitForMe(selector, cb)
    }, 500)
}

waitForMe(`[placeholder="Kirim pesan"]`, () => {
    const msg = localStorage.getItem(`tiktok-affiliate-broadcaster-message`)
    document.querySelector(`[placeholder="Kirim pesan"]`).value = msg
    window.close()
})