window.addEvent("domready", function () {
    new FancySettings.initWithManifest(function (settings) {
        settings.manifest.disableTabNumber.addEvent("action", function (checkboxValue) {
            chrome.storage.sync.set({'disableTabNumber': checkboxValue}, function () {});
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
