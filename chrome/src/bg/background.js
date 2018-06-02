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
    // expression for starts with numbers, followed by period and space
    let regex_exp = "^[0-9]*[.][\\s]";
    if (title.match(regex_exp)) {
        // remove leading number, period, space
        title = title.substr(title.indexOf('. ') + 2)
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
            prependTabPosition(tabs[i], Math.abs(activeIndex - i))
        }
    });
}

let prependTabPosition = (tab, position) => {
    let tabId = tab.id;
    let tabTitle = tab.title;
    let tabUrl = tab.url;

    // skip chrome pages
    if (isChromePage(tabUrl)) return;

    tabTitle = removePrependFromTitle(tabTitle);
    tabTitle = position + '. ' + tabTitle;  // prepend tab position
    executeTabTitleChange(tabId, tabTitle)
};

function removePrependAllTabs () {
    chrome.tabs.query({}, function (tabs) {
        for (let i = 0; i < tabs.length; i++) {
            removeTabPosition(tabs[i])
        }
    });
}

let removeTabPosition = (tab) => {
    let tabId = tab.id;
    let tabTitle = tab.title;
    let tabUrl = tab.url;

    // skip chrome pages
    if (isChromePage(tabUrl)) return;

    tabTitle = removePrependFromTitle(tabTitle);
    executeTabTitleChange(tabId, tabTitle)
};

function updateAllTabs() {
    let disableTabPosition = false;
    chrome.storage.sync.get(['disableTabPosition'], function (result) {
        disableTabPosition = result.disableTabPosition;
        if (disableTabPosition) return;

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
