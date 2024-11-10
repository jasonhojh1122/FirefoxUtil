
browser.pageAction.onClicked.addListener(OnClick);

let gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
gettingActiveTab.then((tabs) => {
    browser.pageAction.show(tabs[0].id);
});

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    browser.pageAction.show(tabId);
});

browser.tabs.onActivated.addListener((activeInfo) => {
    browser.pageAction.show(activeInfo.tabId);
});

function OnClick(tab, onClickData) {
    WriteToClipboard(tab.url);
}

async function WriteToClipboard(url) {
    for (let i = 0; i < 10; i++) {
        try {
            await navigator.clipboard.writeText(url);
            break;
        } catch (e) {
            await wait(100);
        }
    }
}