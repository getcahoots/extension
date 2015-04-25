(function () {
    'use strict';

    console.log("defining ff extension");
    var firefoxExtensionScript = function (options, callbacks) {
        console.log("running ff extension");

        try {

            // 1. get the storage element in platform specific way
            var ss = require("sdk/simple-storage");
            var browserStorageObject = ss.storage.cahoots = typeof ss.storage.cahoots == 'undefined' ? {} : ss.storage.cahoots;

            var config = cahoots.extension.cahootsExtensionConfig;
            //var config = require("../../app/extension/ExtensionConfig")

            //var CahootsStorage = require("../../app/CahootsStorage")
            //var extension = require("../../app/extension");
            var extension = cahoots.extension;
            //var config = extension.cahootsExtensionConfig;

            // 2. create new CahootsStorageRepository from storage element
            var CahootsStorage = extension.CahootsStorage
            var cahootsStorage = new CahootsStorage(browserStorageObject, extension.mergePersons, config)

            // 3. create updater
            //var Cc, Ci;
            const {Cc, Ci} = require("chrome");
            //Cc = Ci = require("chrome");
            var xhr1 = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIXMLHttpRequest);
            var xhr2 = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIXMLHttpRequest);

            var StorageUpdater = extension.StorageUpdater
            var updater = new StorageUpdater(cahootsStorage, config.apiEndpoint);

            updater.checkUpdate(xhr1, xhr2, function () {

            });

            // 4. create query service with storage
            var QueryService = extension.QueryService
            var queryService = new QueryService(cahootsStorage);

            // 5. setup page worker with content script
            var sdkSelf = require("sdk/self");
            var data = sdkSelf.data;

            var pageMod = require("sdk/page-mod");
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
                    var tabs = require("sdk/tabs");
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
    //exports.main = firefoxExtensionScript;

}());

//exports.main = function() {
//    console.log("lol")
//}