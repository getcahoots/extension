'use strict'

exports.main = function(options, callbacks) {
    try {
        // 1. get the storage element in platform specific way
        var ss = require("sdk/simple-storage");
        var browserStorageObject = ss.storage.cahoots =  typeof ss.storage.cahoots == 'undefined' ? {} : ss.storage.cahoots;

        var extension = require("./CahootsExtensionBundle")
        // 2. create new CahootsStorageRepository from storage element
        var CahootsStorage = extension.CahootsStorage
        var cahootsStorage = new CahootsStorage(browserStorageObject)

        // 3. create updater
        const {Cc, Ci} = require("chrome");
        var xhr1 = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIXMLHttpRequest);
        var xhr2 = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIXMLHttpRequest);

        var StorageUpdater = extension.StorageUpdater
        var updater = new StorageUpdater('https://api.cahoots.pw/v1');

        updater.update(xhr1,xhr2, cahootsStorage,function(){

        }); // runs async

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
                data.url("FirefoxContentScript.js")
            ],
            contentStyleFile: [
                data.url("style.css"),
                data.url("cahoots-tooltipster.css")
            ],
            onAttach: function(worker) {
                worker.port.on("getAuthorHints",function() {
                    var hints = queryService.findAuthorHints();
                    worker.port.emit('gotAuthorHints', hints);
                })
                worker.port.on("getFullDetails",function(cahootsId) {
                    var author = queryService.findAuthorDetails(cahootsId)
                    worker.port.emit("gotFullDetails",author);
                })
            }
        });
    } catch(e) {
        console.log("unable to load cahoots extension: " + e.message)
    }
}
