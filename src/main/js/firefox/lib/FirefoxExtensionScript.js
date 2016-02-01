/**
 * cahoots extension
 *
 * Copyright Cahoots.pw
 * MIT Licensed
 *
 */
(function () {
    'use strict';

    var firefoxExtensionScript = function (cahoots) {
        cahoots.extension.debugMsg('entering firefoxExtensionScript (loading)')

        /** cahoots imports **/
        var extension = cahoots.extension;
        var config = extension.cahootsExtensionConfig;

        var CahootsStorage = extension.CahootsStorage;
        var ProviderMerger = extension.ProviderMerger;
        var StorageUpdater = extension.StorageUpdater;
        var config = extension.cahootsExtensionConfig;
        var QueryService = extension.QueryService;

        /**
         * tracks state of window tabs to support page action functionality
         *
         * @constructor
         */
        var FirefoxTabTracking = function (tabsRef) {
            this.tabMap = new Map();
            this.windowMap = new Map();

            var that = this,
                tabMap = this.tabMap;

            tabsRef.on('open', function (tab) {
                var window = require('sdk/window/utils').getMostRecentBrowserWindow();
                that.trackTab(tab, window);
            });

            tabsRef.on('close', function (tab) {
                that.unTrackTab(tab);
            });

            tabsRef.on('activate', function (tab) {
                if (!tabMap.has(tab.id)) {
                    cahoots.extension.debugMsg('adding untracked tab');
                    var xulWindow = require('sdk/window/utils').getMostRecentBrowserWindow();
                    that.trackTab(tab, xulWindow);
                }

                var trackingInfo = tabMap.get(tab.id);
                var pageAction = that.windowMap.get(trackingInfo.xulWindow);
                pageAction.updatePageActionState(trackingInfo);
            });
        };

        FirefoxTabTracking.prototype.trackTab = function (tab, window) {
            if (!this.hasWindowTracked(window)) {
                cahoots.extension.debugMsg("trackTab " + tab.id + ": xul window is new, tracking...");
                this.trackWindow(window);
            }

            var trackingInfo = {
                tab: tab,
                xulWindow: window,
                worker: null,
                data: null
            }

            this.tabMap.set(tab.id, trackingInfo);
        };

        FirefoxTabTracking.prototype.unTrackTab = function (tab) {
            var trackingInfo = this.tabMap.get(tab.id);
            this.tabMap.delete(tab.id);

            var windowRefCount = 0;
            this.tabMap.forEach(function (val, key) {
                if (val.xulWindow === trackingInfo.xulWindow) {
                    windowRefCount++;
                }
            });
            if (windowRefCount === 0) {
                cahoots.extension.debugMsg("window got orphaned, remove refs");
                this.windowMap.delete(trackingInfo.xulWindow);
            }
        }

        FirefoxTabTracking.prototype.hasWindowTracked = function (window) {
            if (this.windowMap.has(window)) {
                return true;
            }
            return false;
        };

        FirefoxTabTracking.prototype.trackWindow = function (window) {
            cahoots.extension.debugMsg ('trackWindow: tracking new window: ' + window);
            if (window == null) {
                cahoots.extension.debugMsg("trackWindow: skipping on undefined xulWindow");
                return;
            }
            var pageAction = new FirefoxPageAction(window, config, this);
            this.windowMap.set(window, pageAction);
        }

        FirefoxTabTracking.prototype.updateFromTabWorker = function (tab, matchCount, reportingTabWorker, optionalRecentWindow) {
            cahoots.extension.debugMsg('updateFromTabWorker/setTabTrackingInfo: ' + arguments);
            if (!this.tabMap.has(tab.id)) {
                cahoots.extension.debugMsg("!! updateFromTabWorker reporting for untracked tab");
                this.trackTab(tab, optionalRecentWindow);
            }

            cahoots.extension.debugMsg("updateFromTabWorker reporting for known tab");
            var trackingInfo = this.tabMap.get(tab.id);
            trackingInfo.data = matchCount
            trackingInfo.worker = reportingTabWorker;
            this.tabMap.set(tab.id, trackingInfo);

            // find page action
            var window = trackingInfo.xulWindow;
            var pageAction = this.windowMap.get(window);
            pageAction.updatePageActionState(trackingInfo)
        }


        FirefoxTabTracking.prototype.activateTraceLogging = function () {
            var { setInterval } = require("sdk/timers");
            var that = this;

            var dumpTab = function (trackingInfo) {
                cahoots.extension.debugMsg(" - [" + trackingInfo.tab.id + "] data:" + trackingInfo.data
                    + ", xulWin:" + (trackingInfo.xulWindow != null)
                    + ", wrk:" + (trackingInfo.worker != null))
            }

            setInterval(function () {
                cahoots.extension.debugMsg(" ")

                var windowCount = 0;
                that.windowMap.forEach(function (pageAction, xulWindow) {
                    cahoots.extension.debugMsg("window #" + windowCount);
                    that.tabMap.forEach(function (tabTracking, tabId) {
                        if (tabTracking.xulWindow === xulWindow) {
                            dumpTab(tabTracking);
                        }
                    });
                    windowCount++;
                });
            }, 10000);
        };


        /**
         * FirefoxPageAction
         * stateful management of a page action simulation
         * @constructor
         */
        var FirefoxPageAction = function (window, config, tabTracking) {
            var document = window.document;

            var firefoxUrlbarIcons = document.getElementById('urlbar-icons')
            var toolbarButton = document.createElement('toolbarbutton');

            toolbarButton.setAttribute('id', 'cahootsToolbarButton');
            toolbarButton.setAttribute('image', require('sdk/self').data.url(config.icons.smallInactive));
            toolbarButton.setAttribute('tooltiptext', config.pageActionTitleDefault);
            var that = this;
            toolbarButton.addEventListener('command', function () {
                that.sendContentActionMessage(that.state.worker);
            }, false);

            firefoxUrlbarIcons.appendChild(toolbarButton);

            this.toolbarButton = toolbarButton;
            cahoots.extension.debugMsg("page action created")
        };

        FirefoxPageAction.prototype.updatePageActionState = function (trackingInfo) {
            this.state = trackingInfo;
            this.draw();
        };

        FirefoxPageAction.prototype.draw = function () {
            var matchCount = this.state.data;

            if (matchCount === null) {
                this.toolbarButton.setAttribute('tooltiptext', config.pageActionTitleDefault);
                this.toolbarButton.setAttribute('image', require('sdk/self').data.url(config.icons.smallInactive));
            } else if (matchCount > 0) {
                /** show the button **/
                var tabTitleCaption = '';
                if (matchCount === 1) {
                    tabTitleCaption = config.pageActionTitleSingleHit;
                } else {
                    tabTitleCaption = config.pageActionTitleMultipleHits.replace(/COUNT/i, matchCount);
                }

                this.toolbarButton.setAttribute('image', require('sdk/self').data.url(config.icons.smallActive));
                this.toolbarButton.setAttribute('style', '');
                this.toolbarButton.setAttribute('tooltiptext', tabTitleCaption);
            } else {
                this.toolbarButton.setAttribute('tooltiptext', config.pageActionTitleNothingFound);
                this.toolbarButton.setAttribute('image', require('sdk/self').data.url(config.icons.smallInactive));
            }
        };

        FirefoxPageAction.prototype.sendContentActionMessage = function (receivingWorker) {
            cahoots.extension.debugMsg("sendContentActionMessage")
            if (receivingWorker !== null) {
                /** send message to active tab worker **/
                receivingWorker.port.emit('contentAction');
            } else {
                cahoots.extension.debugMsg('sendContentActionMessage: cannot send \'contentAction\': tabWorker is null');
            }
        };


        var firefoxExtensionMainScript = function (options, callbacks) {
            cahoots.extension.debugMsg("... booting extension in firefoxExtensionMainScript()")
            try {
                /** addon sdk imports **/
                var sdkSelf = require("sdk/self");
                var pageMod = require("sdk/page-mod");
                var ss = require("sdk/simple-storage");
                var tabs = require("sdk/tabs");

                const {Cc, Ci} = require("chrome");
                var { setInterval } = require("sdk/timers");
                var { setTimeout } = require("sdk/timers");

                /** cahoots imports **/
                var configService = extension.configService();

                /** prepare browser storage handling **/
                var browserStorageObject = ss.storage.cahoots = typeof ss.storage.cahoots == 'undefined' ? {} : ss.storage.cahoots;
                var cahootsStorage = new CahootsStorage(browserStorageObject, new ProviderMerger(), configService);
                configService.setStorage(cahootsStorage);

                /** observe state of windows and tabs to manage page action state **/

                var firefoxTabTracker = null;
                if (config.enableFirefoxPageActionEmulation) {
                    firefoxTabTracker = new FirefoxTabTracking(tabs, config);
                    firefoxTabTracker.activateTraceLogging();
                }


                /** prepare data updater **/
                var xhr1 = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIXMLHttpRequest);
                var xhr2 = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIXMLHttpRequest);
                var xhr3 = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIXMLHttpRequest);
                var updater = new StorageUpdater(cahootsStorage, configService);

                var updateCylceFn = function () {
                    updater.checkConfigUpdate(xhr1, function (e) {
                        if (config.debug) {
                            if (e instanceof Error) {
                                cahoots.extension.debugMsg("config update problem");
                            } else {
                                cahoots.extension.debugMsg("config update success");
                            }

                        }
                    });

                    var dataUpdateTimeout = setTimeout(function () {
                        updater.checkUpdate(xhr2, xhr3, function (e) {
                            if (config.debug) {
                                if (e instanceof Error) {
                                    cahoots.extension.debugMsg("data update problem");
                                } else {
                                    cahoots.extension.debugMsg("data update success");
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

                        if (config.enableFirefoxPageActionEmulation) {
                            worker.port.on("reportMatches", function (matchCount) {
                                var tab = worker.tab;
                                cahoots.extension.debugMsg("new matches: " + matchCount + " for tab " + tab.id);
                                var recentXulWindow = require('sdk/window/utils').getMostRecentBrowserWindow();
                                firefoxTabTracker.updateFromTabWorker(tab, matchCount, worker, recentXulWindow);
                            })
                        }
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
                cahoots.extension.debugMsg("unable to load cahoots extension: " + e.message)
            }
        };

        cahoots.extension.debugMsg("calling firefoxExtensionMainScript (executing)")
        firefoxExtensionMainScript();
    }

    module.exports.firefoxExtensionScript = firefoxExtensionScript;
}());
