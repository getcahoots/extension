console.log("entering addon script body area")
//console.log(this); // Sandbox

var sdkSelf = require("sdk/self");
var data = sdkSelf.data;
var lib = sdkSelf.lib;


exports.main = function(options, callbacks) {
    console.log("entering addon script main method for reason: " + options.loadReason)
    //console.log(this) // CommonJS Module

    // 1. get the storage element in platform specific way
    var ss = require("sdk/simple-storage");
    var browserStorageObject = ss.storage.cahoots =  typeof ss.storage.cahoots == 'undefined' ? {} : ss.storage.cahoots;

    // 2. create new CahootsStorageRepository from storage element
    var CahootsStorage = require("./CahootsStorage").CahootsStorage
    var cahootsStorage = new CahootsStorage(browserStorageObject)

    // 3. create updater
    //var XMLHttpRequest  = require('sdk/net/xhr');
    //var xhr = new XMLHttpRequest
    const {Cc, Ci} = require("chrome");
    var xhr1 = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIXMLHttpRequest);
    var xhr2 = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIXMLHttpRequest);

    var CahootsStorageGenericUpdater = require("./CahootsStorageGenericUpdater").CahootsStorageGenericUpdater
    var updater = new CahootsStorageGenericUpdater('https://api.cahoots.pw/v1');

    //    - checks if outdated or fresh and starts update
    //var currentTimestamp = Date.now() / 1000 | 0;

    updater.update(xhr1,xhr2, cahootsStorage,function(){

    }); // runs async

    // 3. create query service with storage
    var CahootsQueryService = require("CahootsQueryService").CahootsQueryService;
    var queryService = new CahootsQueryService(cahootsStorage);

    // 4. setup page worker with content script and events
    try {

        var pageMod = require("sdk/page-mod");
        console.log("creating PageMod...")
        var myPageMod = pageMod.PageMod({
            include: "*",
            contentScriptFile: [
                data.url("jquery.js"),
                data.url("jquery_highlight.js"),
                data.url("jquery.tooltipster.js"),
                data.url("CahootsRunnerBundle.js"),
                data.url("CahootsUiFormatterBundle.js"),
                data.url("firefox_content_script.js")
            ],
            contentStyleFile: [
                data.url("style.css"),
                data.url("cahoots-tooltipster.css")
            ],
            onAttach: function(worker) {
                console.log("pageMod::onAttach")
                worker.port.on("getAuthorHints",function() {
                    console.log("pageWorker <-[getAuthorHints]-")
                    var hints = queryService.findAuthorHints();
                    worker.port.emit('gotAuthorHints', hints);
                    console.log("pageWorker -[gotAuthorHints]->")
                })
                worker.port.on("getFullDetails",function(cahootsId) {
                    var author = queryService.findAuthorDetails(cahootsId)
                    worker.port.emit("gotFullDetails",author);
                })
            }
        });
        console.log("... pageMod created.")

    } catch(e) {
        console.log("... caught error: " + e.message)
        console.log(e)
    }

    console.log("leaving addon script main method")
}

exports.onUnload = function() {
    console.log("entering addon script unload method")
    console.log("leaving addon script unload method")
}

console.log("leaving addon script body area")