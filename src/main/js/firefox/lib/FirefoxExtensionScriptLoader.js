/**
 * cahoots extension
 *
 * Copyright Cahoots.pw
 * MIT Licensed
 *
 */
(function () {
    'use strict';

    console.log("loading loader")
    /** cahoots imports **/



    var cahootsExtensionBundle = require("CahootsExtensionBundle");
    var firefoxExtensionBundle = require("FirefoxExtensionBundle");

    for(var i in firefoxExtensionBundle) {
        console.log(i)
    }
    var extensionScriptLoader = function () {
        console.log("executing loader")
        console.log("... arguments: " + JSON.stringify(arguments))
        console.log("... preparing cahoots ns")

        var cahoots = {
            extension: cahootsExtensionBundle
        }
        firefoxExtensionBundle.firefoxExtensionScript(cahoots);
    };

    module.exports.main = extensionScriptLoader;
    //module.exports.main = firefoxExtensionScript;
}());
