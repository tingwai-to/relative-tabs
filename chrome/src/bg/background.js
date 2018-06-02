function selectTab(offset) {
    // grab all tabs in current window
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

let handleAction = (action, request = {}) => {
    let parseAction = action.split('_');
    let command = parseAction[0];
    let argument = parseAction[1];

    if (command === 'prevTab') {
        offset = parseInt(argument);
        selectTab(-offset)
    } else if (command === 'nextTab') {
        offset = parseInt(argument);
        selectTab(offset)
    }
};

let prependTabPosition = (tab, number) => {
    let tabId = tab.id;
    let tabTitle = tab.title;
    let tabUrl = tab.url;

    // skip chrome pages
    if (tabUrl.startsWith("chrome://") || tabUrl.startsWith("chrome-extension://")) {
        return
    }

    // expression for starts with numbers, followed by period and space
    let regex_exp = "^[0-9]*[.][\\s]";
    if (tabTitle.match(regex_exp)) {
        // remove leading number, period, space
        tabTitle = tabTitle.substr(tabTitle.indexOf('. ') + 2)
    }

    // prepend tab position
    tabTitle = number + '. ' + tabTitle;

    // modify tab title
    try {
        chrome.tabs.executeScript(
            tabId,
            {code: "document.title = '" + tabTitle + "';"}
        )
    } catch (e) {
    }
};

function updateAllTabs() {
    chrome.tabs.query({'currentWindow': true}, function (tabs) {
        activeTab = getActiveTabInfo(tabs);
        activeIndex = activeTab[0];

        for (let i = 0; i < tabs.length; i++) {
            prependTabPosition(tabs[i], Math.abs(activeIndex - i))
        }
    });
}

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
