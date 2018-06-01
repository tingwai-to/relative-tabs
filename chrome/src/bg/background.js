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
    for (var tabIndex in tabs) {
        var tab = tabs[tabIndex];
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

chrome.commands.onCommand.addListener(function (command) {
    handleAction(command)
});
