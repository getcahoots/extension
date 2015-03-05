console.log("entering content script body")
$(document).ready(function() {
    console.log("entering content script dom ready area")

    var handleFullDetails = function(lookupId, dataCallback) {
        console.log("entering handleFullDetails()")
        chrome.runtime.sendMessage({ message: "getFullDetails", cahootsID: lookupId}, function(response){
            console.log("got response in getFullDetails: ")
            console.log(response)
            dataCallback(response)
        });
    }

    var handleAuthorHints = function(dataCallback) {
        console.log("entering handleAuthorHints()")
        chrome.runtime.sendMessage({ message: "getAuthorHints"}, function(response){
            console.log("got response in handleAuthorHints: ")
            console.log(response)
            dataCallback(response)
        });
    }

    var CahootsRunner = cahoots.runner;
    var cahootsRunner = new CahootsRunner(handleFullDetails,handleAuthorHints);
    cahootsRunner.run();
    console.log("leaving content script dom ready area")

});
console.log("leaving content script body")