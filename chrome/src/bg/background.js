function selectTab(offset) {
    // grab all tabs in current window
    chrome.tabs.query({'currentWindow': true}, function (tabs) {
        activeTab = getActiveTabInfo(tabs);
        activeIndex = activeTab[0];
        activeId = activeTab[1];

        if (activeIndex + offset >= tabs.length) {
            activeIndex = tabs.length - 1;
        } else if (activeIndex + offset < 0) {
            activeIndex = 0;
        } else {
            activeIndex += offset
        }

        // switch to new active tab
        chrome.tabs.update(tabs[activeIndex].id, {'active': true});
    });
}

function getActiveTabInfo(tabs) {
    for (let tabIndex in tabs) {
        let tab = tabs[tabIndex];
        if (tab.active) {
            return [parseInt(tabIndex), tab.id]
        }
    }
}

let handleAction = (action, request = {}) => {
    parseAction = action.split('_');
    command = parseAction[0];
    argument = parseAction[1];

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
    if (tabUrl.startsWith("chrome://")) {
        return
    }

    // expression for starts with numbers, followed by period and space
    regex_exp = "^[0-9]*[.][\\s]";
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
