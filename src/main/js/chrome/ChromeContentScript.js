'use strict'

var chromeContentScript = function() {

    var handleFullDetails = function(lookupId, dataCallback) {
        console.log("handleFullDetails")
        chrome.runtime.sendMessage({ message: "getFullDetails", cahootsID: lookupId}, function(response){
            dataCallback(response)
        });
    }

    var handleAuthorHints = function(dataCallback) {
        console.log("handleAuthorHints")
        chrome.runtime.sendMessage({ message: "getAuthorHints"}, function(response){
            dataCallback(response)
        });
    }

    var CahootsRunner = cahoots.content.CahootsRunner;
    var CahootsUiFormatter = cahoots.content.CahootsUiFormatter;

    var uiFormatter = new CahootsUiFormatter();
    var cahootsRunner = new CahootsRunner(handleFullDetails,handleAuthorHints, uiFormatter);
    cahootsRunner.run();
};

module.exports = chromeContentScript