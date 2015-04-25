/**
 * cahoots extension
 *
 * Copyright Cahoots.pw
 * MIT Licensed
 *
 */
(function () {
    'use strict';

    var firefoxContentScript = function () {

        var handleFullDetails = function (lookupId, dataCallback) {
            self.port.once('gotFullDetails', function (data) {
                dataCallback(data);
            });
            self.port.emit('getFullDetails', lookupId);
        }

        var handleAuthorHints = function (dataCallback) {
            self.port.once("gotAuthorHints", function (authorHints) {
                dataCallback(authorHints);
            })
            self.port.emit("getAuthorHints");
        }

        var CahootsUiFormatter = cahoots.content.CahootsUiFormatter;
        var CahootsRunner = cahoots.content.CahootsRunner;
        var contentConfig = cahoots.content.cahootsContentConfig;

        var uiFormatter = new CahootsUiFormatter();
        var cahootsRunner = new CahootsRunner(handleFullDetails, handleAuthorHints, uiFormatter, contentConfig);
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

