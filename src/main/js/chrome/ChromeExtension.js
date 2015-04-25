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
        if (config.debug) console.log("executing chrome extension script");

        var StorageUpdater = cahoots.extension.StorageUpdater;
        var CahootsStorage = cahoots.extension.CahootsStorage;
        var ProviderMerger = cahoots.extension.ProviderMerger;

        var cahootsStorage = new CahootsStorage(window.localStorage, new ProviderMerger(), config);
        var updater = new StorageUpdater(cahootsStorage,config.apiEndpoint);

        updater.checkUpdate(new XMLHttpRequest(),new XMLHttpRequest(),function(){

        }); // runs async

        var QueryService = cahoots.extension.QueryService;
        var queryService = new QueryService(cahootsStorage);

        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
            if(request.message=="getAuthorHints") {
                var authorHints = queryService.findAuthorHints();
                sendResponse(authorHints)
            } else if(request.message=="getFullDetails") {
                var authorDetails = queryService.findAuthorDetails(request.cahootsID)
                sendResponse(authorDetails)
            }
        })

        if (!window.localStorage.getItem('hasSeenIntro')) {
            window.localStorage.setItem('hasSeenIntro', 'yep');
            chrome.tabs.create({
                url: 'https://getcahoots.github.io/extension/news/1.0.0.html'
            });
        }

    };

    module.exports.chromeExtensionScript = chromeExtensionScript;
}());