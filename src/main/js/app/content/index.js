/**
 * cahoots extension
 *
 * Copyright Cahoots.pw
 * MIT Licensed
 *
 */
(function () {
    'use strict'

    var CahootsRunner = require('./CahootsRunner');
    var CahootsUiFormatter = require('./CahootsUiFormatter');
    var cahootsContentConfig = require('./cahootsContentConfig');

    module.exports.CahootsRunner = CahootsRunner;
    module.exports.CahootsUiFormatter = CahootsUiFormatter;
    module.exports.cahootsContentConfig = cahootsContentConfig;
}());