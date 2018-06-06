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
    if (characterStylesConcat.includes(tabPosition)) {
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

function prependAllTabs(characterStyle) {
    chrome.tabs.query({'currentWindow': true}, function (tabs) {
        activeTab = getActiveTabIndex(tabs);
        activeIndex = activeTab;

        for (let i = 0; i < tabs.length; i++) {
            prependTabNumber(tabs[i], characterStyle, Math.abs(activeIndex - i))
        }
    });
}

let prependTabNumber = (tab, characterStyle, position) => {
    let tabId = tab.id;
    let tabTitle = tab.title;
    let tabUrl = tab.url;

    // skip chrome pages
    if (isChromePage(tabUrl)) return;

    tabTitle = removePrependFromTitle(tabTitle);
    if (position > 0 && position <= 9) {
        tabTitle = allCharacterStyles[characterStyle][position] + ' ' + tabTitle;  // prepend tab position if not current tab
    }
    executeTabTitleChange(tabId, tabTitle)
};

function removePrependAllTabs() {
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
    chrome.storage.sync.get(['disableTabNumber', 'tabNumCharacterStyle'], function (result) {
        disableTabNumber = result.disableTabNumber;
        tabNumCharacterStyle = result.tabNumCharacterStyle;
        if (disableTabNumber) return;

        prependAllTabs(tabNumCharacterStyle);
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
