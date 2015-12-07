/**
 * cahoots extension
 *
 * Copyright Cahoots.pw
 * MIT Licensed
 *
 */
(function () {
    'use strict';

    var QueryService = require('./QueryService');
    var CahootsStorage = require('./CahootsStorage');
    var StorageUpdater = require('./StorageUpdater');
    var ProviderMerger = require('./ProviderMerger');
    var cahootsExtensionConfig = require('./cahootsExtensionConfig');

    module.exports.QueryService = QueryService;
    module.exports.CahootsStorage = CahootsStorage;
    module.exports.StorageUpdater = StorageUpdater;
    module.exports.ProviderMerger = ProviderMerger;
    module.exports.cahootsExtensionConfig = cahootsExtensionConfig.cahootsExtensionConfig;
    module.exports.configService = cahootsExtensionConfig.configService;
    module.exports.debugMsg = function (msg) {
        if(cahootsExtensionConfig.cahootsExtensionConfig.debug === true) {
            console.log(msg);
        }
    };
}());