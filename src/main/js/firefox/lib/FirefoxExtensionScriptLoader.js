/**
 * cahoots extension
 *
 * Copyright Cahoots.pw
 * MIT Licensed
 *
 */
(function () {
    'use strict';

    var cahootsExtensionBundle = require("CahootsExtensionBundle");
    var firefoxExtensionBundle = require("FirefoxExtensionBundle");

    var extensionScriptLoader = function () {
        cahootsExtensionBundle.debugMsg('executing loader')

        var cahoots = {
            extension: cahootsExtensionBundle
        }
        firefoxExtensionBundle.firefoxExtensionScript(cahoots);
    };

    module.exports.main = extensionScriptLoader;
}());
