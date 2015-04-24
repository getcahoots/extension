'use strict';

var QueryService= require('./QueryService');
var CahootsStorage = require('./CahootsStorage');
var StorageUpdater = require('./StorageUpdater');
var ProviderMerger = require('./ProviderMerger');
var ExtensionConfig = require('./ExtensionConfig');

module.exports.QueryService = QueryService;
module.exports.CahootsStorage = CahootsStorage;
module.exports.StorageUpdater = StorageUpdater;
module.exports.ProviderMerger = ProviderMerger;
module.exports.cahootsExtensionConfig = ExtensionConfig;