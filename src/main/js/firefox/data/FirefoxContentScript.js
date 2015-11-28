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

    var handleFullDetails = function (lookupId, dataCallback) {
        self.port.once('gotFullDetails', function (data) {
            dataCallback(data);
        });
        self.port.emit('getFullDetails', lookupId);
    };

    var handleAuthorHints = function (dataCallback) {
        self.port.once('gotAuthorHints', function (authorHints) {
            dataCallback(authorHints);
        })
        self.port.emit('getAuthorHints');
    };

    var reportMatches = function (matchCount) {
        self.port.emit('reportMatches', matchCount, self);
    };

    var curJumpIndex = null;

    var installContentActionHandler = function () {
        self.port.on('contentAction', function () {
            console.log('content action');

            var highlightedElements = $(contentConfig.jumpSelector);
            var elemCount = highlightedElements.length;
            if (elemCount <= 0) {
                return;
            }
            var jumpToIndex = curJumpIndex == null ? 0 : (curJumpIndex + 1) % elemCount;
            console.log(elemCount + ' elems present, jumping to ' + jumpToIndex);
            $('html, body').animate({
                scrollTop: $(highlightedElements[jumpToIndex]).offset().top
            }, 1000);
            curJumpIndex = jumpToIndex;
        });
    };

    var firefoxContentScript = function () {

        var CahootsUiFormatter = cahoots.content.CahootsUiFormatter;
        var CahootsRunner = cahoots.content.CahootsRunner;

        installContentActionHandler();

        var uiFormatter = new CahootsUiFormatter();
        var cahootsRunner = new CahootsRunner(handleFullDetails, handleAuthorHints, reportMatches, uiFormatter, contentConfig);
        cahootsRunner.run();
    };

    var bootstrapFirefoxContentScript = function() {
        jQuery(document).ready(
            cahoots.firefox.content.firefoxContentScript
        );
    };

    module.exports.firefoxContentScript = firefoxContentScript;
    module.exports.bootstrapFirefoxContentScript = bootstrapFirefoxContentScript;
}());

