waitForMe(`.bg-neutral-bg4.p-24`, () => {
    let input_row = `
        <br><br>
        <textarea id="message" rows="5" cols="100" style="border: 1px solid black; padding: 5px" placeholder="Tulis Pesan Disini"></textarea>
        <br>
        <button id="send_message" style="border: 1px solid black; padding: 5px">Kirim Pesan</button>
        <button id="reset_message" style="border: 1px solid black; padding: 5px">Reset Pengiriman Pesan</button>
        <br><br>
        <div id="sent_affiliates"></div>
    `
    jQuery(`.bg-neutral-bg4.p-24`).append(input_row)
    jQuery(`#send_message`).click(() => {
        data(`set`, { message: jQuery(`#message`).val() })
        sendMessage()
    })
    jQuery(`#reset_message`).click(() => {
        data(`reset`)
        showLastCondition()
    })
    showLastCondition()
})

chrome.runtime.onMessage.addListener((request) => {
    showLastCondition()
    sendMessage()
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

function waitForMe(selector, cb) {
    if (0 < document.querySelectorAll(selector).length) cb()
    else setTimeout(() => {
        waitForMe(selector, cb)
    }, 500)
}

function showLastCondition() {
    const { message, sent_affiliates } = data(`get`)
    jQuery(`#message`).val(message)
    jQuery(`#sent_affiliates`).html(`<b>Sudah Terkirim Kepada:</b> ` + sent_affiliates.join(`, `))
}

function sendMessage() {
    const { message, sent_affiliates } = data(`get`)
    if (`` !== message) jQuery(`div.arco-table-body table tr`).each(function () {
        const tr = jQuery(this)
        const uname = tr.find(`.text-body-m-medium.text-neutral-text1.text-overflow-single`).text()
        if (0 > sent_affiliates.indexOf(uname)) {
            tr.find(`.alliance-icon-Message`).parent().focus().click()
            return true
        }
    })
}