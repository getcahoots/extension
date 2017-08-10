import cahootsExtensionConfig from './app/extension/cahootsExtensionConfig';
// import configService
import StorageUpdater from './app/extension/StorageUpdater';
import CahootsStorage from './app/extension/CahootsStorage';
import ProviderMerger from './app/extension/ProviderMerger';
// CahootsStorage
// ProviderMerger


var cahootsStorage = new CahootsStorage(window.localStorage, new ProviderMerger(), configService);
configService.setStorage(cahootsStorage);

var xhr1 = new XMLHttpRequest(), xhr2 = new XMLHttpRequest(), xhr3 = new XMLHttpRequest();

var updater = new StorageUpdater(cahootsStorage, configService);

var updateCylceFn = function () {
    updater.checkConfigUpdate(xhr1, function(e) {
        if(config.debug) {
            if(e instanceof Error) {
                console.log("config update problem");
            } else {
                console.log("config update success");
            }

        }
    });

    var dataUpdateTimeout = setTimeout(function () {
        updater.checkUpdate(xhr2, xhr3, function (e) {
            if(config.debug) {
                if(e instanceof Error) {
                    cahoots.extension.debugMsg('data update problem');
                } else {
                    cahoots.extension.debugMsg('data update success');
                }

            }
        });
    }, 10000);
};

updateCylceFn();
setInterval(function() {
    updateCylceFn();
}, config.updateInterval);

var QueryService = cahoots.extension.QueryService;
var queryService = new QueryService(cahootsStorage);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
    if(request.message == 'getAuthorHints') {
        var authorHints = queryService.queryAuthorHints();
        sendResponse(authorHints)
    } else if(request.message == 'getFullDetails') {
        var authorDetails = queryService.queryAuthorDetails(request.cahootsID);
        sendResponse(authorDetails)
    }
});


chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.tabs.sendMessage(tab.id, {message: 'contentAction'})

});


chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.message == 'reportMatches') {
        var tabId = sender.tab.id;
        var matchCount = request.matchCount;
        if(matchCount > 0) {
            chrome.pageAction.show(tabId);
            var tabTitle = "";
            if(matchCount == 1) {
                tabTitle = config.pageActionTitleSingleHit;
            } else {
                tabTitle = config.pageActionTitleMultipleHits.replace(/COUNT/i, matchCount);
            }
            chrome.pageAction.setTitle({tabId: tabId, title: tabTitle});
        } else {
            chrome.pageAction.hide(tabId);
        }

    }
});



if (config.showVersionUpdatePage) {
    var hasSeenIntroKey = 'hasSeenIntro-' + config.cahootsExtensionVersion;
    var releaseNotesPageUrl = configService.getReleaseNotesPageUrl();

    try {
        if (!window.localStorage.getItem(hasSeenIntroKey)) {
            window.localStorage.setItem(hasSeenIntroKey, 'yep');
            chrome.tabs.create({
                url: releaseNotesPageUrl
            });
        }
    } catch (ignore) {
        // empty
    }
}
