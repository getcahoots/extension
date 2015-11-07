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
            var QueryService = extension.QueryService;
            var configService = extension.configService();

            var browserStorageObject = ss.storage.cahoots = typeof ss.storage.cahoots == 'undefined' ? {} : ss.storage.cahoots;
            var cahootsStorage = new CahootsStorage(browserStorageObject, new ProviderMerger(), configService);
            configService.setStorage(cahootsStorage);

            var xhr1 = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIXMLHttpRequest);
            var xhr2 = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIXMLHttpRequest);
            var xhr3 = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIXMLHttpRequest);
            var updater = new StorageUpdater(cahootsStorage, configService);

            /***********/

            var btnRef = null;


            var loadUrlbarButton = function(doc, urlBtnClick) {
                var urlBarIcons = doc.getElementById('urlbar-icons')
                var btn = doc.createElement('toolbarbutton');
                btn.setAttribute('id', 'my-id');
                btn.setAttribute('image', require('sdk/self').data.url('icon14_gray.png'));
                btn.addEventListener('command', urlBtnClick, false);
                btnRef = btn;
                urlBarIcons.appendChild(btn);
                return btn;
            }

            var doc = require('sdk/window/utils').getMostRecentBrowserWindow().document;

            var setButtonState = function(newButtonState) {
                if(newButtonState == true) {
                    btnRef.setAttribute('image', require('sdk/self').data.url('icon14.png'));
                } else {
                    btnRef.setAttribute('image', require('sdk/self').data.url('icon14_gray.png'));
                }
            }

            var workerRef = null;
            var onBtnClick = function(event) {
                if(workerRef !== null) {
                    workerRef.port.emit('contentAction');
                }

                //btnRef.setAttribute('image', require('sdk/self').data.url('icon16.png'));
            }

            var urlbarButton = loadUrlbarButton(doc, onBtnClick);


            /***********/

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


            var queryService = new QueryService(cahootsStorage);
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
                    workerRef = worker;
                    worker.port.on("getAuthorHints", function () {
                        var hints = queryService.queryAuthorHints();
                        worker.port.emit('gotAuthorHints', hints);
                    })
                    worker.port.on("getFullDetails", function (cahootsId) {
                        var author = queryService.queryAuthorDetails(cahootsId);
                        worker.port.emit("gotFullDetails", author);
                    })
                    worker.port.on("reportMatches", function (matchCount) {
                        setButtonState(matchCount > 0);
                    })
                }
            });

            try {
                var hasSeenIntroKey = 'hasSeenIntro-' + config.cahootsExtensionVersion;
                var releaseNotesPageUrl = configService.getReleaseNotesPageUrl();
                if (browserStorageObject[hasSeenIntroKey] === undefined) {
                    tabs.open(releaseNotesPageUrl);
                    browserStorageObject[hasSeenIntroKey] = 'yep';
                }
            } catch (ignore) {
            }

        } catch (e) {
            console.log("unable to load cahoots extension: " + e.message)
        }
    };

    module.exports.main = firefoxExtensionScript;
}());
