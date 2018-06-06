function updateAllWindows() {
    chrome.windows.getAll({}, function (windows) {
        for (let i = 0; i < windows.length; i++) {
            windowId = windows[i].id;
            updateAllTabs(windowId)
        }
    });
}

function updateAllTabs(windowId) {
    let disableTabNumber = false;
    chrome.storage.sync.get(['disableTabNumber', 'tabNumCharacterStyle'], function (result) {
        disableTabNumber = result.disableTabNumber;
        tabNumCharacterStyle = result.tabNumCharacterStyle;
        if (disableTabNumber) return;

        prependAllTabs(windowId, tabNumCharacterStyle);
    });
}

function prependAllTabs(windowId, characterStyle) {
    chrome.tabs.query({'windowId': windowId}, function (tabs) {
        activeIndex = getActiveTabIndex(tabs);

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
        tabTitle = allCharacterStyles[characterStyle][position] + ' ' + tabTitle;
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

function getActiveTabIndex(tabs) {
    for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].active) {
            return i
        }
    }
}

function isChromePage(url) {
    return url.startsWith("chrome://") || url.startsWith("chrome-extension://")
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

chrome.commands.onCommand.addListener(function (command) {
    handleAction(command)
});

chrome.tabs.onMoved.addListener(function (tabId, moveInfo) {
    updateAllTabs(moveInfo.windowId);
});

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
    updateAllTabs(removeInfo.windowId);
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
    updateAllTabs(activeInfo.windowId);
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    updateAllTabs(tab.windowId);
});

updateAllWindows();
