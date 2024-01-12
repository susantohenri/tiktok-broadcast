function waitForMe(selector, cb) {
    if (0 < document.querySelectorAll(selector).length) cb()
    else setTimeout(() => {
        waitForMe(selector, cb)
    }, 500)
}

waitForMe(`[placeholder="Kirim pesan"]`, async () => {
    const { message } = data(`get`)
    document.querySelector(`[placeholder="Kirim pesan"]`).value = message

    const uname = jQuery(`.flex.items-center.text-body-m-medium`).text()
    data(`add-affiliate`, { sent_affiliates: [uname] })
    window.close()
})

function data(action, new_data) {
    const name = `tiktok-affiliate-broadcaster-message`
    const default_value = {
        message: ``,
        sent_affiliates: []
    }
    const stored = localStorage.getItem(name)
    let data = null !== stored ? JSON.parse(stored) : default_value

    switch (action) {
        case `get`:
            return data
                ; break
        case `set`:
            data = Object.assign({}, data, new_data)
            localStorage.setItem(name, JSON.stringify(data))
                ; break
        case `add-affiliate`:
            data.sent_affiliates = data.sent_affiliates.concat(new_data.sent_affiliates)
            localStorage.setItem(name, JSON.stringify(data))
                ; break
        case `reset`:
            localStorage.removeItem(name)
    }
}