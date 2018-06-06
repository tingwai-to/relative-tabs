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

        settings.manifest.tabNumCharacterStyle.addEvent("action", function (radioValue) {
            chrome.storage.sync.set({'tabNumCharacterStyle': parseInt(radioValue)}, function () {});
            updateAllTabs()
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('chrome_shortcuts').addEventListener('click', function () {
        chrome.tabs.create({url: 'chrome://extensions/shortcuts'});
    });
});
