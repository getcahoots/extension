/**
 * cahoots extension
 *
 * Copyright Cahoots.pw
 * MIT Licensed
 *
 */
(function () {
    'use strict';

    var chromeExtensionScript = function () {

        var config = cahoots.extension.cahootsExtensionConfig;
        var configService = cahoots.extension.configService();
        if (config.debug) console.log("executing chrome extension script");

        var StorageUpdater = cahoots.extension.StorageUpdater;
        var CahootsStorage = cahoots.extension.CahootsStorage;
        var ProviderMerger = cahoots.extension.ProviderMerger;


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
                            console.log("data update problem");
                        } else {
                            console.log("data update success");
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
        }
    };

    module.exports.chromeExtensionScript = chromeExtensionScript;
}());