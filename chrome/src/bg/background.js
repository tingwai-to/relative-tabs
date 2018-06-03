const unicodeNumbers = [
    null,  // current tab (index=0) doesn't need unicode character
    '\u278A',  // dingbat negative circled sans-serif digit one (U+278A)
    '\u278B',  // dingbat negative circled sans-serif digit two (U+278B)
    '\u278C',  // dingbat negative circled sans-serif digit three (U+278C)
    '\u278D',  // dingbat negative circled sans-serif digit four (U+278D)
    '\u278E',  // dingbat negative circled sans-serif digit five (U+278E)
    '\u278F',  // dingbat negative circled sans-serif digit six (U+278F)
    '\u2790',  // dingbat negative circled sans-serif digit seven (U+2790)
    '\u2791',  // dingbat negative circled sans-serif digit eight (U+2791)
    '\u2792',  // dingbat negative circled sans-serif digit nine (U+2792)
];

function switchToNewTab(offset) {
    chrome.tabs.query({'currentWindow': true}, function (tabs) {
        let activeTabIndex = getActiveTabIndex(tabs);

        if (activeTabIndex + offset >= tabs.length) {
            activeTabIndex = tabs.length - 1;
        } else if (activeTabIndex + offset < 0) {
            activeTabIndex = 0;
        } else {
            activeTabIndex += offset
        }

        // switch to new active tab
        chrome.tabs.update(tabs[activeTabIndex].id, {'active': true});
    });
}

function getActiveTabIndex(tabs) {
    for (let tabIndex in tabs) {
        let tab = tabs[tabIndex];
        if (tab.active) {
            return parseInt(tabIndex)
        }
    }
}

function isChromePage(url) {
    if (url.startsWith("chrome://") || url.startsWith("chrome-extension://")) {
        return true
    }
    return false
}

function removePrependFromTitle(title) {
    tabPosition = title[0];
    if (unicodeNumbers.includes(tabPosition)) {
        return title.substring(1);
    }
    return title;
}

function executeTabTitleChange(tabId, tabTitle) {
    try {
        chrome.tabs.executeScript(
            tabId,
            {code: "document.title = '" + tabTitle + "';"}
        )
    } catch (e) {
    }
}

function prependAllTabs() {
    chrome.tabs.query({'currentWindow': true}, function (tabs) {
        activeTab = getActiveTabIndex(tabs);
        activeIndex = activeTab;

        for (let i = 0; i < tabs.length; i++) {
            prependTabNumber(tabs[i], Math.abs(activeIndex - i))
        }
    });
}

let prependTabNumber = (tab, position) => {
    let tabId = tab.id;
    let tabTitle = tab.title;
    let tabUrl = tab.url;

    // skip chrome pages
    if (isChromePage(tabUrl)) return;

    tabTitle = removePrependFromTitle(tabTitle);
    if (position > 0 && position <= 9) {
        tabTitle = unicodeNumbers[position] + ' ' + tabTitle;  // prepend tab position if not current tab
    }
    executeTabTitleChange(tabId, tabTitle)
};

function removePrependAllTabs () {
    chrome.tabs.query({}, function (tabs) {
        for (let i = 0; i < tabs.length; i++) {
            removeTabNumber(tabs[i])
        }
    });
}

let removeTabNumber = (tab) => {
    let tabId = tab.id;
    let tabTitle = tab.title;
    let tabUrl = tab.url;

    // skip chrome pages
    if (isChromePage(tabUrl)) return;

    tabTitle = removePrependFromTitle(tabTitle);
    executeTabTitleChange(tabId, tabTitle)
};

function updateAllTabs() {
    let disableTabNumber = false;
    chrome.storage.sync.get(['disableTabNumber'], function (result) {
        disableTabNumber = result.disableTabNumber;
        if (disableTabNumber) return;

        prependAllTabs();
    });
}

let handleAction = (action, request = {}) => {
    let parseAction = action.split('_');
    let command = parseAction[0];
    let argument = parseAction[1];

    if (command === 'prevTab') {
        offset = parseInt(argument);
        switchToNewTab(-offset)
    } else if (command === 'nextTab') {
        offset = parseInt(argument);
        switchToNewTab(offset)
    }
};

chrome.commands.onCommand.addListener(function (command) {
    handleAction(command)
});

chrome.tabs.onMoved.addListener(function (tabId, moveInfo) {
    updateAllTabs();
});

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
    updateAllTabs();
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
    updateAllTabs();
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    updateAllTabs();
});

updateAllTabs();
