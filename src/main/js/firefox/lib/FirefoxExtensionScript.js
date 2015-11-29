/**
 * cahoots extension
 *
 * Copyright Cahoots.pw
 * MIT Licensed
 *
 */
(function () {
    'use strict';

    /**
     * tracks state of window tabs and updates url bar button status
     *
     * @constructor
     */
    var FirefoxTabTracking = function (tabsRef) {
        this.clients = [];

        /**  **/
        this.tabMap = new Map();

        var tabMap = this.tabMap;
        tabsRef.on('open', function (tab) {
            tabMap.set(tab.id, [0]);
        });

        tabsRef.on('close', function (tab) {
            tabMap.delete(tab.id);
        });
        var that = this;
        tabsRef.on('activate', function (tab) {
            if (!tabMap.has(tab.id)) {
                tabMap.set(tab.id, [0]);
            } else {
                var tabState = tabMap.get(tab.id);

                //updateUrlbarButtonStateFn(tabState[0]);
                that.updateClients(tab.id, tabState[0], tabState[1]);
            }
        });
    };

    FirefoxTabTracking.prototype.setTabTrackingInfo = function (tabId, matchCount, reportingTabWorker) {
        if (this.tabMap.has(tabId)) {
            var registeredTabWorker = this.tabMap.get(tabId)[1];
            if (registeredTabWorker !== undefined) {
                if (registeredTabWorker !== reportingTabWorker ) {
                    console.log('seems to be a frame, skipping');
                    return;
                }
            }
        }
        this.tabMap.set(tabId, [matchCount, reportingTabWorker]);
        this.updateClients(tabId, matchCount, reportingTabWorker);
    };


    FirefoxTabTracking.prototype.addClient = function (client) {
        this.clients.push(client);
    };

    FirefoxTabTracking.prototype.updateClients = function (tabId, matchCount, reportingTabWorker) {
        for (var client in this.clients) {
            this.clients[client].updateTabStateInfos(tabId, matchCount, reportingTabWorker);
        }
    };

    FirefoxTabTracking.prototype.activateTraceLogging = function () {
        setInterval(function () {
            console.log("---[ begin dump ]---")
            console.log("tabs: " + this.tabs.length);
            console.log("tab map: " + this.tabMap.size)
            for (var t in this.tabs) {
                console.log("#" + t + ", " + this.tabs[t].id + ", " + this.tabMap.get(this.tabs[t].id))
            }
            console.log("---[ end dump ]---")
        }, 10000);
    };


    /**
     * FirefoxPageAction
     * @constructor
     */
    var FirefoxPageAction = function (document, config) {
        var firefoxUrlbarIcons = document.getElementById('urlbar-icons')
        var toolbarButton = document.createElement('toolbarbutton');

        toolbarButton.setAttribute('id', 'cahootsToolbarButton');
        toolbarButton.setAttribute('image', require('sdk/self').data.url('icon14_gray.png'));
        toolbarButton.setAttribute('tooltiptext', config.pageActionTitleDefault);
        var that = this;
        toolbarButton.addEventListener('command', function () {
            that.sendContentActionMessage();
        }, false);
        firefoxUrlbarIcons.appendChild(toolbarButton);
        this.toolbarButton = toolbarButton;

        this.activeTabWorker = null;
        this.config = config;
    };

    FirefoxPageAction.prototype.updateTabStateInfos = function (tabId, matchCount, reportingTabWorker) {
        var newButtonState = matchCount > 0;

        this.activeTabWorker = reportingTabWorker;
        if (newButtonState == true) {
            /** show the button **/
            var tabTitleCaption = '';
            if (matchCount == 1) {
                tabTitleCaption = this.config.pageActionTitleSingleHit;
            } else {
                tabTitleCaption = this.config.pageActionTitleMultipleHits.replace(/COUNT/i, matchCount);
            }

            this.toolbarButton.setAttribute('image', require('sdk/self').data.url('icon14.png'));
            this.toolbarButton.setAttribute('style', '');
            this.toolbarButton.setAttribute('tooltiptext', tabTitleCaption);
        } else {
            this.toolbarButton.setAttribute('style', 'display: none');
            this.toolbarButton.setAttribute('image', require('sdk/self').data.url('icon14_gray.png'));
        }
    };

    FirefoxPageAction.prototype.sendContentActionMessage = function () {
        if (this.activeTabWorker !== null) {
            /** send message to active tab worker **/
            this.activeTabWorker.port.emit('contentAction');
        } else {
            console.log('cannot send \'contentAction\': tabWorker is null');
        }
    }




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
            var doc = require('sdk/window/utils').getMostRecentBrowserWindow().document;
            var urlBarButton = new FirefoxPageAction(doc, config);
            /** observe state of windows tabs to update button state **/
            var firefoxTabTracker = new FirefoxTabTracking(tabs);
            /** update url bar button with state information **/
            firefoxTabTracker.addClient(urlBarButton);


            /** prepare data updater **/
            var xhr1 = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIXMLHttpRequest);
            var xhr2 = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIXMLHttpRequest);
            var xhr3 = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIXMLHttpRequest);
            var updater = new StorageUpdater(cahootsStorage, configService);

            var updateCylceFn = function () {
                updater.checkConfigUpdate(xhr1, function (e) {
                    if (config.debug) {
                        if (e instanceof Error) {
                            console.log("config update problem");
                        } else {
                            console.log("config update success");
                        }

                    }
                });

                var dataUpdateTimeout = setTimeout(function () {
                    updater.checkUpdate(xhr2, xhr3, function (e) {
                        if (config.debug) {
                            if (e instanceof Error) {
                                console.log("data update problem");
                            } else {
                                console.log("data update success");
                            }

                        }
                    });
                }, 10000);
            };

            updateCylceFn();
            setInterval(function () {
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
                    //currentTabWorker = worker;
                    worker.port.on("getAuthorHints", function () {
                        var hints = queryService.queryAuthorHints();
                        worker.port.emit('gotAuthorHints', hints);
                    })
                    worker.port.on("getFullDetails", function (cahootsId) {
                        var author = queryService.queryAuthorDetails(cahootsId);
                        worker.port.emit("gotFullDetails", author);
                    })
                    worker.port.on("reportMatches", function (matchCount) {
                        //updateUrlbarButtonState(urlBarButton, matchCount);
                        var tab = worker.tab;
                        console.log("new matches: " + matchCount + " for tab " + tab.id);
                        firefoxTabTracker.setTabTrackingInfo(tab.id, matchCount, worker);
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
