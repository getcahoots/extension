/**
 * cahoots extension
 *
 * Copyright Cahoots.pw
 * MIT Licensed
 *
 */
(function () {
    'use strict';
    var contentConfig = cahoots.content.cahootsContentConfig;

    var chromeContentScript = function () {

        var CahootsRunner = cahoots.content.CahootsRunner;
        var CahootsUiFormatter = cahoots.content.CahootsUiFormatter;


        cahoots.content.debugMsg('executing chrome content script');

        var handleFullDetails = function(lookupId, dataCallback) {
            chrome.runtime.sendMessage({ message: "getFullDetails", cahootsID: lookupId}, function (response) {
                dataCallback(response);
            });
        }

        var handleAuthorHints = function(dataCallback) {
            chrome.runtime.sendMessage({ message: "getAuthorHints"}, function(response){
                dataCallback(response)
            });
        }

        var reportMatches = function (matchCount) {
            chrome.runtime.sendMessage({ message: 'reportMatches', matchCount: matchCount});
        };

        var curJumpIndex = null;

        var installContentActionHandler = function () {
            chrome.runtime.onMessage.addListener( function (request, sender, sendResponse) {
                if (request.message == 'contentAction') {
                    cahoots.content.debugMsg('content action');

                    var highlightedElements = $(contentConfig.jumpSelector);
                    var elemCount = highlightedElements.length;
                    if (elemCount <= 0) {
                        return;
                    }
                    var jumpToIndex = curJumpIndex == null ? 0 : (curJumpIndex + 1) % elemCount;
                    cahoots.content.debugMsg(elemCount + ' elems present, jumping to ' + jumpToIndex);
                    $('html, body').animate({
                        scrollTop: $(highlightedElements[jumpToIndex]).offset().top
                    }, 1000);
                    curJumpIndex = jumpToIndex;
                }
            });
        };


        installContentActionHandler();

        var uiFormatter = new CahootsUiFormatter();
        var cahootsRunner = new CahootsRunner(handleFullDetails,handleAuthorHints, reportMatches, uiFormatter, contentConfig);
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
