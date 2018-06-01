function selectTab(offset) {
    chrome.tabs.query({'currentWindow': true}, function (tabs) {
        activeTab = getActiveTabInfo(tabs);
        activeIndex = parseInt(activeTab[0]);
        activeId = activeTab[1];
        console.log('index: ' + activeIndex, 'id: ' + activeId, 'offset: ' + offset);

        if (activeIndex + offset >= tabs.length) {
            activeIndex = tabs.length - 1;
            console.log('exceed length')
        } else if (activeIndex + offset < 0) {
            activeIndex = 0;
            console.log('less than 0')
        } else {
            activeIndex += offset
        }

        chrome.tabs.update(tabs[activeIndex].id, {'active': true});
    });
}

function getActiveTabInfo(tabs) {
    for (var tabIndex in tabs) {
        var tab = tabs[tabIndex];
        if (tab.active) {
            return [tabIndex, tab.id]
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
