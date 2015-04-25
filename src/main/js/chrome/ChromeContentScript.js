/**
 * cahoots extension
 *
 * Copyright Cahoots.pw
 * MIT Licensed
 *
 */
(function () {
    'use strict';

    var chromeContentScript = function () {
        var CahootsRunner = cahoots.content.CahootsRunner;
        var CahootsUiFormatter = cahoots.content.CahootsUiFormatter;
        var contentConfig = cahoots.content.cahootsContentConfig;

        var debug = contentConfig.debug;
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
        var cahootsRunner = new CahootsRunner(handleFullDetails,handleAuthorHints, uiFormatter, contentConfig);
        cahootsRunner.run();
    };

    var bootstrapChromeContentScript = function () {
        jQuery(document).ready(
            chromeContentScript
        );
    };
    module.exports.chromeContentScript = chromeContentScript;
    module.exports.bootstrapChromeContentScript = bootstrapChromeContentScript;
}());
