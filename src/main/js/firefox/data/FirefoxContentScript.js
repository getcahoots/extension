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
            cahoots.content.debugMsg('content action');

            var highlightedElements = $(contentConfig.jumpSelector);
            var elemCount = highlightedElements.length;
            if (elemCount <= 0) {
                return;
            }
            var jumpToIndex = curJumpIndex == null ? 0 : (curJumpIndex + 1) % elemCount;
            cahoots.content.debugMsg(elemCount + ' elems present, jumping to #' + jumpToIndex);
            $('html, body').animate({
                scrollTop: $(highlightedElements[jumpToIndex]).offset().top
            }, 1000);
            curJumpIndex = jumpToIndex;
        });
    };

    var firefoxContentScript = function () {
        if (contentConfig.skipSubFrames) {
            try {
                var str1 = top.location.toString();
                var str2 = location;
                if(top.location.toString() != location.toString()) {
                    cahoots.content.debugMsg('--- skipping execution within subframe --- ' + top.location + ' -> ' + location);
                    return;
                }

                if(top.window.document !== document) {
                    cahoots.content.debugMsg('--- skipping execution in subframe --- ');
                    return;
                }
            } catch (e) {
                cahoots.content.debugMsg('--- skipping execution in foreign frame --- ');
                return;
            }
        }

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

