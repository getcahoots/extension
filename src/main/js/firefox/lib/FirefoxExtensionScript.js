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
            /** addon sdk imports **/
            var sdkSelf = require("sdk/self");
            var pageMod = require("sdk/page-mod");
            var ss = require("sdk/simple-storage");
            var tabs = require("sdk/tabs");
            var extension = require("./CahootsExtensionBundle");
            const {Cc, Ci} = require("chrome");
            var { setInterval } = require("sdk/timers");
            var { setTimeout } = require("sdk/timers");

            /** cahoots imports **/
            var CahootsStorage = extension.CahootsStorage;
            var ProviderMerger = extension.ProviderMerger;
            var StorageUpdater = extension.StorageUpdater;
            var config = extension.cahootsExtensionConfig;
            var QueryService = extension.QueryService;
            var configService = extension.configService();

            /** prepare browser storage handling **/
            var browserStorageObject = ss.storage.cahoots = typeof ss.storage.cahoots == 'undefined' ? {} : ss.storage.cahoots;
            var cahootsStorage = new CahootsStorage(browserStorageObject, new ProviderMerger(), configService);
            configService.setStorage(cahootsStorage);




            /** prepare url bar button **/
            var urlBarButtonRef = null;
            var loadUrlbarButton = function(document, urlButtonClickEventHandler) {
                var urlBarIcons = document.getElementById('urlbar-icons')
                var btn = document.createElement('toolbarbutton');
                btn.setAttribute('id', 'cahootsToolbarButton');
                btn.setAttribute('image', require('sdk/self').data.url('icon14_gray.png'));
                btn.setAttribute('tooltiptext', "cahoots loaded");
                btn.addEventListener('command', urlButtonClickEventHandler, false);
                //urlBarButtonRef = btn;
                urlBarIcons.appendChild(btn);

                console.log("btn state: ");
                console.log(btn.state);
                return btn;
            }



            var updateUrlbarButtonState = function(buttonRef, matchCount) {
                var newButtonState = matchCount > 0;
                if(newButtonState == true) {
                    /** show the button **/
                    var tabTitleCaption = '';
                    if(matchCount == 1) {
                        tabTitleCaption = config.pageActionTitleSingleHit;
                    } else {
                        tabTitleCaption = config.pageActionTitleMultipleHits.replace(/COUNT/i, matchCount);
                    }

                    buttonRef.setAttribute('image', require('sdk/self').data.url('icon14.png'));
                    buttonRef.setAttribute('style', '');
                    buttonRef.setAttribute('tooltiptext', tabTitleCaption);
                } else {
                    buttonRef.setAttribute('style', 'display: none');
                    buttonRef.setAttribute('image', require('sdk/self').data.url('icon14_gray.png'));
                }
            }

            var lastWorkerRef = null;
            var handleUrlbarButtonClick = function(event) {
                if(lastWorkerRef !== null) {
                    lastWorkerRef.port.emit('contentAction');
                }
            }

            var doc = require('sdk/window/utils').getMostRecentBrowserWindow().document;
            urlBarButtonRef = loadUrlbarButton(doc, handleUrlbarButtonClick);


            /** observe state of windows tabs to update button state **/
            var tabMap = new Map();
            tabs.on('open', function(tab) {
                tabMap.set(tab.id, [0])
            });

            tabs.on('close', function(tab) {
                tabMap.delete(tab.id);
            });
            tabs.on('activate', function (tab) {
                console.log('active tab: '  + tab.id)
                if(!tabMap.has(tab.id)) {
                    console.log("EE tab id unknown to tabMap, adding:  " + tab.id)
                    tabMap.set(tab.id,[0])
                } else {
                    var tabState = tabMap.get(tab.id);
                    console.log("from tabMap: " + tabState[0] + " for #" + tab.id + ", worker: " + (tabState[1] != undefined))
                    updateUrlbarButtonState(urlBarButtonRef, tabState[0]);
                    lastWorkerRef = tabState[1]
                }
            });


            /** prepare updater **/
            var xhr1 = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIXMLHttpRequest);
            var xhr2 = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIXMLHttpRequest);
            var xhr3 = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIXMLHttpRequest);
            var updater = new StorageUpdater(cahootsStorage, configService);

            setInterval(function() {
                console.log("---[ begin dump ]---")
                console.log("tabs: " + tabs.length);
                console.log("tab map: " + tabMap.size)
                for(var t in tabs) {
                    console.log("#"+ t + ", " + tabs[t].id + ", " + tabMap.get(tabs[t].id))
                }
                console.log("---[ end dump ]---")
            }, 10000);

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


            /** set up query service **/
            var queryService = new QueryService(cahootsStorage);


            /** setup extensions page mod **/
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
                    lastWorkerRef = worker;
                    worker.port.on("getAuthorHints", function () {
                        var hints = queryService.queryAuthorHints();
                        worker.port.emit('gotAuthorHints', hints);
                    })
                    worker.port.on("getFullDetails", function (cahootsId) {
                        var author = queryService.queryAuthorDetails(cahootsId);
                        worker.port.emit("gotFullDetails", author);
                    })
                    worker.port.on("reportMatches", function (matchCount) {
                        updateUrlbarButtonState(urlBarButtonRef, matchCount);
                        var tab = worker.tab;
                        console.log("new matches: " + matchCount + " for tab " + tab.id);
                        tabMap.set(tab.id, [matchCount, worker]);
                    })
                }
            });

            /** open info page on first time run of this version **/
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
