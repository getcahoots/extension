/**
 * cahoots extension
 *
 * Copyright Cahoots.pw
 * MIT Licensed
 *
 */
(function () {
    'use strict';

    var firefoxExtensionScript = function (options, callbacks) {

        try {

            // 1. get the storage element in platform specific way
            var sdkSelf = require("sdk/self");
            var pageMod = require("sdk/page-mod");
            var ss = require("sdk/simple-storage");
            var tabs = require("sdk/tabs");
            var extension = require("./CahootsExtensionBundle");
            const {Cc, Ci} = require("chrome");
            var { setInterval } = require("sdk/timers");

            var browserStorageObject = ss.storage.cahoots = typeof ss.storage.cahoots == 'undefined' ? {} : ss.storage.cahoots;

            // 2. create new CahootsStorageRepository from storage element
            var CahootsStorage = extension.CahootsStorage;
            var ProviderMerger = extension.ProviderMerger;
            var config = extension.cahootsExtensionConfig;

            var cahootsStorage = new CahootsStorage(browserStorageObject, new ProviderMerger(), config);

            // 3. create updater

            var xhr1 = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIXMLHttpRequest);
            var xhr2 = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIXMLHttpRequest);

            var StorageUpdater = extension.StorageUpdater
            var updater = new StorageUpdater(cahootsStorage, config);



            setInterval(function(){
                updater.checkUpdate(xhr1, xhr2, function () {
                    if(config.debug) {
                        console.log("update cycle finished");
                    }
                });
            }, config.updateInterval)


            // 4. create query service with storage
            var QueryService = extension.QueryService
            var queryService = new QueryService(cahootsStorage);

            // 5. setup page worker with content script

            var data = sdkSelf.data;


            pageMod.PageMod({
                include: "*",
                contentScriptFile: [
                    data.url("jquery.js"),
                    data.url("jquery_highlight.js"),
                    data.url("jquery.tooltipster.js"),
                    data.url("CahootsContentBundle.js"),
                    data.url("FirefoxContentScriptBundle.js"),
                    data.url("FirefoxContentScriptLoader.js")
                ],
                contentStyleFile: [
                    data.url("style.css"),
                    data.url("cahoots-tooltipster.css")
                ],
                onAttach: function (worker) {
                    worker.port.on("getAuthorHints", function () {
                        var hints = queryService.findAuthorHints();
                        worker.port.emit('gotAuthorHints', hints);
                    })
                    worker.port.on("getFullDetails", function (cahootsId) {
                        var author = queryService.findAuthorDetails(cahootsId)
                        worker.port.emit("gotFullDetails", author);
                    })
                }
            });


            try {
                if (typeof browserStorageObject.hasSeenInto == 'undefined') {
                    tabs.open("https://getcahoots.github.io/extension/news/1.0.0.html");
                    browserStorageObject.hasSeenInto = 'yep';
                }
            } catch (ex) {

            }

        } catch (e) {
            console.log("unable to load cahoots extension: " + e.message)
        }
    };

    module.exports.main = firefoxExtensionScript;
}());
