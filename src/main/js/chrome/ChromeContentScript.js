'use strict'

var chromeContentScript = function() {
    var debug = true;
    if(debug) console.log("executing chrome content script")

    var handleFullDetails = function(lookupId, dataCallback) {
        chrome.runtime.sendMessage({ message: "getFullDetails", cahootsID: lookupId}, function(response){
            dataCallback(response)
        });
    }

    var handleAuthorHints = function(dataCallback) {
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