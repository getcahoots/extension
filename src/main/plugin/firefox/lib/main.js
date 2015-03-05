console.log("entering addon script body area")
//console.log(this); // Sandbox
//console.log(self)

//var data = require("sdk/self").data;
var sdkSelf = require("sdk/self");
var data = sdkSelf.data;
var lib = sdkSelf.lib;


//var Request = require("sdk/request").Request;

//var defer  = require('sdk/core/promise');
//const { defer } = require('sdk/core/promise');
//var { setTimeout, clearTimeout } = require("sdk/timers");

//
//
//function delay(ms, value) {
//    let { promise, resolve } = defer();
//    setTimeout(resolve, ms, value);
//    return promise;
//}
//
//delay(5000, 'Hello world').then(console.log);
//console.log('Hello too')
// After 10ms => 'Helo world'


//myPageMod.on("*", function(e, data) {
//    console.log("pageMod event " + e + " was received");
//    console.log(data)
//});




exports.main = function(options, callbacks) {
    console.log("entering addon script main method for reason: " + options.loadReason)
    //console.log(this) // CommonJS Module



    //var CahootsApiRepository = require("./CahootsApiRepository.js");
    //var repoInstance = new CahootsApiRepository();

    // 1. get the storage element in platform specific way
    var ss = require("sdk/simple-storage");
    var browserStorageObject = ss.storage.cahoots =  typeof ss.storage.cahoots == 'undefined' ? {} : ss.storage.cahoots;
    //ss.storage.myArray = [1, 1, 2, 3, 5, 8, 13];
    //ss.storage.myBoolean = true;

    // 2. create new CahootsStorageRepository from storage element
    var CahootsStorage = require("./CahootsStorage")
    var cahootsStorage = new CahootsStorage(browserStorageObject)

    // 3. create updater
    //var XMLHttpRequest  = require('sdk/net/xhr');
    //var xhr = new XMLHttpRequest
    const {Cc, Ci} = require("chrome");
    var xhr1 = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIXMLHttpRequest);
    var xhr2 = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIXMLHttpRequest);

    var CahootsStorageGenericUpdater = require("./CahootsStorageGenericUpdater")
    var updater = new CahootsStorageGenericUpdater('https://api.cahoots.pw/v1');

    //    - checks if outdated or fresh and starts update
    updater.update(xhr1,xhr2, cahootsStorage,function(){

    }); // runs async

    // 3. create query service with storage
    var CahootsQueryService = require("CahootsQueryService");
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
                //data.url("CahootsApiRepository.js"),
                data.url("CahootsRunner.js"),
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

exports.dummy = function () {
    require("cahoots")
    require(data.url("cahoots-api-client.min.js"));
    require('cahoots-api-client');
    require("sdk/self/cahoots-api-client.min.js")
    require("resource://jid1-mq1gt2z5dspt9g-at-jetpack/cahoots/data/cahoots-api-client.min.js")
    require("resource://jid1-mq1gt2z5dspt9g-at-jetpack/cahoots/lib/cahoots-api-client.min.js")
    require(lib.url("cahoots-api-client.min.js"));
    require("./cahoots-api-client.min.js")
    require("./cahoots-api-client.js")
    require("./cahoots-api-client-old.min.js")
    require("person.js")
}

console.log("leaving addon script body area")