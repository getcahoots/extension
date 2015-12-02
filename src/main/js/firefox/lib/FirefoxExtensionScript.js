/**
 * cahoots extension
 *
 * Copyright Cahoots.pw
 * MIT Licensed
 *
 */
(function () {
    'use strict';

    /** cahoots imports **/
    var extension = require("./CahootsExtensionBundle");
    var CahootsStorage = extension.CahootsStorage;
    var ProviderMerger = extension.ProviderMerger;
    var StorageUpdater = extension.StorageUpdater;
    var config = extension.cahootsExtensionConfig;
    var QueryService = extension.QueryService;

    /**
     * tracks state of window tabs and updates url bar button status
     *
     * @constructor
     */
    var FirefoxTabTracking = function (tabsRef, config) {
        this.config = config;

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
                console.log("adding untracked tab");
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
            console.log("trackTab " + tab.id + ": xul window is new, tracking...");
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
        this.tabMap.forEach(function(val, key) {
            if(val.xulWindow === trackingInfo.xulWindow) {
                windowRefCount++;
            }
        });
        if(windowRefCount === 0) {
            console.log("window got orphaned, remove refs");
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
        console.log ('trackWindow: tracking new window: ' + window);
        if(window == null) {
            console.log("trackWindow: skipping on undefined xulWindow");
            return;
        }
        var pageAction= new FirefoxPageAction(window, this.config, this);
        this.windowMap.set(window, pageAction);
    }

    FirefoxTabTracking.prototype.updateFromTabWorker = function (tab, matchCount, reportingTabWorker, optionalRecentWindow) {
        console.log('updateFromTabWorker/setTabTrackingInfo: ' + arguments);
        if (!this.tabMap.has(tab.id)) {
            console.log("!! updateFromTabWorker reporting for untracked tab");
            this.trackTab(tab, optionalRecentWindow);
        }

        console.log("updateFromTabWorker reporting for known tab");
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

        var dumpTab = function(trackingInfo) {
            console.log(" - [" + trackingInfo.tab.id + "] data:" + trackingInfo.data
                + ", xulWin:" + (trackingInfo.xulWindow != null)
                + ", wrk:" + (trackingInfo.worker!=null))
        }

        setInterval(function () {
            console.log(" ")

            var windowCount = 0;
            that.windowMap.forEach(function(pageAction, xulWindow) {
                console.log("window #" + windowCount);
                that.tabMap.forEach(function(tabTracking, tabId) {
                    if(tabTracking.xulWindow === xulWindow) {
                        dumpTab(tabTracking);
                    } else {
                        //console.log("skipping: ")
                    }
                });
                windowCount++;
            });
        }, 10000);
    };


    /**
     * FirefoxPageAction
     * stateful management of a
     * @constructor
     */
    var FirefoxPageAction = function (window, config, tabTracking) {
        var document = window.document,
            iconInactive='cdot_14px_grau.png';;

        var firefoxUrlbarIcons = document.getElementById('urlbar-icons')
        var toolbarButton = document.createElement('toolbarbutton');

        toolbarButton.setAttribute('id', 'cahootsToolbarButton');
        toolbarButton.setAttribute('image', require('sdk/self').data.url(iconInactive));
        toolbarButton.setAttribute('tooltiptext', config.pageActionTitleDefault);
        var that = this;


        toolbarButton.addEventListener('command', function () {
            that.sendContentActionMessage(that.state.worker);
        }, false);

        firefoxUrlbarIcons.appendChild(toolbarButton);

        this.toolbarButton = toolbarButton;
        this.config = config;
        console.log("page action created")
    };

    FirefoxPageAction.prototype.updatePageActionState = function (trackingInfo) {
        this.state = trackingInfo;
        this.draw();
    };

    FirefoxPageAction.prototype.draw = function () {
        var matchCount = this.state.data,
            iconActive='cdot_14px.png',
            iconInactive='cdot_14px_grau.png';

        if(matchCount === null) {
            this.toolbarButton.setAttribute('tooltiptext', config.pageActionTitleDefault);
            this.toolbarButton.setAttribute('image', require('sdk/self').data.url(iconInactive));
        } else if (matchCount > 0) {
            /** show the button **/
            var tabTitleCaption = '';
            if (matchCount === 1) {
                tabTitleCaption = this.config.pageActionTitleSingleHit;
            } else {
                tabTitleCaption = this.config.pageActionTitleMultipleHits.replace(/COUNT/i, matchCount);
            }

            this.toolbarButton.setAttribute('image', require('sdk/self').data.url(iconActive));
            this.toolbarButton.setAttribute('style', '');
            this.toolbarButton.setAttribute('tooltiptext', tabTitleCaption);
        } else {
            this.toolbarButton.setAttribute('tooltiptext', config.pageActionTitleNothingFound);
            this.toolbarButton.setAttribute('image', require('sdk/self').data.url(iconInactive));
        }
    };

    FirefoxPageAction.prototype.sendContentActionMessage = function (receivingWorker) {
        console.log("sendContentActionMessage")
        if (receivingWorker !== null) {
            /** send message to active tab worker **/
            receivingWorker.port.emit('contentAction');
        } else {
            console.log('sendContentActionMessage: cannot send \'contentAction\': tabWorker is null');
        }
    };


    var firefoxExtensionScript = function (options, callbacks) {

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
            var firefoxTabTracker = new FirefoxTabTracking(tabs, config);
            firefoxTabTracker.activateTraceLogging();

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
                        var tab = worker.tab;
                        console.log("new matches: " + matchCount + " for tab " + tab.id);
                        var recentXulWindow = require('sdk/window/utils').getMostRecentBrowserWindow();
                        firefoxTabTracker.updateFromTabWorker(tab, matchCount, worker, recentXulWindow);
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
