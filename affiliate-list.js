chrome.runtime.onMessage.addListener((request) => {
    switch (request.sender) {
        case `popup`:
            data(`set`, { message: request.message })
        case `background`:
            const { sent_affiliates } = data(`get`)
            jQuery(`div.arco-table-body table tr`).each(function () {
                const tr = jQuery(this)
                const uname = tr.find(`.text-body-m-medium.text-neutral-text1.text-overflow-single`).text()
                if (0 > sent_affiliates.indexOf(uname)) {
                    tr.find(`.alliance-icon-Message`).parent().click()
                    return
                }
            })
    }
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
    }
}