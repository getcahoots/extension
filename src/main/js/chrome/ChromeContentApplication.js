(function () {
    'use strict';


    var chromeContentScript = function () {
        var CahootsRunner = cahoots.content.CahootsRunner;
        var CahootsUiFormatter = cahoots.content.CahootsUiFormatter;
        var ContentConfig = cahoots.content.ContentConfig;

        var debug = ContentConfig.debug;
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


        var uiFormatter = new CahootsUiFormatter();
        var cahootsRunner = new CahootsRunner(handleFullDetails,handleAuthorHints, uiFormatter, ContentConfig);
        cahootsRunner.run();
    };

    module.exports.chromeContentScript = chromeContentScript;
}());