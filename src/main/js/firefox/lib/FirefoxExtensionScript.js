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
            var sdkSelf = require("sdk/self");
            var pageMod = require("sdk/page-mod");
            var ss = require("sdk/simple-storage");
            var tabs = require("sdk/tabs");
            var extension = require("./CahootsExtensionBundle");
            const {Cc, Ci} = require("chrome");
            var { setInterval } = require("sdk/timers");
            var { setTimeout } = require("sdk/timers");

            var CahootsStorage = extension.CahootsStorage;
            var ProviderMerger = extension.ProviderMerger;
            var StorageUpdater = extension.StorageUpdater;
            var config = extension.cahootsExtensionConfig;
            var configService = extension.configService();

            // get the storage element in platform specific way
            var browserStorageObject = ss.storage.cahoots = typeof ss.storage.cahoots == 'undefined' ? {} : ss.storage.cahoots;

            // create new CahootsStorageRepository from storage element
            var cahootsStorage = new CahootsStorage(browserStorageObject, new ProviderMerger(), configService);
            configService.setStorage(cahootsStorage);

            // create updater
            var xhr1 = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIXMLHttpRequest);
            var xhr2 = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIXMLHttpRequest);
            var xhr3 = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIXMLHttpRequest);
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
