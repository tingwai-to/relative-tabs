window.addEvent("domready", function () {
    new FancySettings.initWithManifest(function (settings) {
        settings.manifest.disableTabPosition.addEvent("action", function (checkboxValue) {
            chrome.storage.sync.set({'disableTabPosition': checkboxValue}, function () {});
            if (checkboxValue) {
                removePrependAllTabs();
            }
            else {
                updateAllTabs()
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('chrome_shortcuts').addEventListener('click', function () {
        chrome.tabs.create({url: 'chrome://extensions/shortcuts'});
    });
});
