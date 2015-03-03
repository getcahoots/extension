console.log("entering addon script body area")
console.log(this); // Sandbox
//console.log(self)

//var data = require("sdk/self").data;
var sdkSelf = require("sdk/self");
var data = sdkSelf.data;
var lib = sdkSelf.lib;

var pageMod = require("sdk/page-mod");
var Request = require("sdk/request").Request;

var defer  = require('sdk/core/promise');

var ss = require("sdk/simple-storage");
//ss.storage.myArray = [1, 1, 2, 3, 5, 8, 13];
//ss.storage.myBoolean = true;





//myPageMod.on("*", function(e, data) {
//    console.log("pageMod event " + e + " was received");
//    console.log(data)
//});




exports.main = function(options, callbacks) {
    console.log("entering addon script main method for reason: " + options.loadReason)
    console.log(this) // CommonJS Module
    //console.log(options)
    //console.log(callbacks)
    var cahootsApiStorage = require('./CahootsApiRepository')
    var setupWorker = function() {



    }

    try {
        var CahootsApiRepository = require("./CahootsApiRepository.js");
        var repoInstance = new CahootsApiRepository();
        repoInstance.updateFromRemote();

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
                    var hints = repoInstance.findAuthorNames();
                    worker.port.emit('gotAuthorHints', hints);
                    console.log("pageWorker -[gotAuthorHints]->")
                })
                worker.port.on("getFullDetails",function(cahootsId) {
                    var author = repoInstance.findAuthorByCahootsId(cahootsId)
                    worker.port.emit("gotFullDetails",author);
                })
            }
        });


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