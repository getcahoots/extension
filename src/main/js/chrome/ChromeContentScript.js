'use strict'

$(document).ready(function() {
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
});