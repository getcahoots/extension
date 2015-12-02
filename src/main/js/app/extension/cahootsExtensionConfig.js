/**
 * cahoots extension
 *
 * Copyright Cahoots.pw
 * MIT Licensed
 *
 */
(function () {
    var cahootsExtensionConfig = {
        cahootsExtensionVersion: '1.1.5',

        /* expiry delta in seconds */
        expiryDelta: (60 * 60 * 24), // for production

        /* update interval in milliseconds */
        updateInterval: (60 * 60 * 24) * 1000,

        apiEndpoint: 'http://api-beta.cahoots.pw/v2',
        apiEndpointUpdateUrl: 'https://getcahoots.github.io/extension/config/extension.json',
        pageActionTitleSingleHit: 'Cahoots: Eine Verbindung gefunden',
        pageActionTitleMultipleHits: 'Cahoots: COUNT Verbindungen gefunden',
        pageActionTitleDefault: 'Cahoots: bereit',
        pageActionTitleNothingFound: 'Cahoots: nichts gefunden',
        icons: {
            smallActive: 'cdot_14px.png',
            smallInactive: 'cdot_14px_grau.png'
        },
        debug: true
    };

    var ConfigService = function (cahootsStorage) {
        if (arguments.length < 1) {
            throw new Error('ConfigService expects at least one argument');
        }
        this.storage = cahootsStorage;
    };

    ConfigService.prototype.getApiEndpoint = function () {
        var storageSetting = this.storage.getApiEndpointOverride();
        if (typeof storageSetting === 'string' && storageSetting.length > 10) {
            return storageSetting;
        }
        return cahootsExtensionConfig.apiEndpoint;
    };

    ConfigService.prototype.isDebug = function () {
        return cahootsExtensionConfig.debug;
    };

    ConfigService.prototype.getExpiryDelta = function () {
        return cahootsExtensionConfig.expiryDelta;
    };

    ConfigService.prototype.getApiEndpointUpdateUrl = function () {
        return cahootsExtensionConfig.apiEndpointUpdateUrl;
    };

    ConfigService.prototype.setStorage = function (storage) {
        this.storage = storage;
    };

    ConfigService.prototype.getReleaseNotesPageUrl = function () {
        return 'https://getcahoots.github.io/extension/news/' + cahootsExtensionConfig.cahootsExtensionVersion + '.html';
    };

    var configServiceInstance = null;

    module.exports.cahootsExtensionConfig = cahootsExtensionConfig;
    module.exports.configService = function getInstance(initialConfig) {
        if (configServiceInstance === null) {
            configServiceInstance = new ConfigService(initialConfig);
        }
        return configServiceInstance;
    };
}());
