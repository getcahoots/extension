/**
 * cahoots extension
 *
 * Copyright Cahoots.pw
 * MIT Licensed
 *
 */
(function () {
    var cahootsExtensionConfig = {
        /*
        expiry delta in seconds
         */
        //expiryDelta: (60 * 60 * 24), // for production
        expiryDelta: 10, // for testing


        /*
        update interval in milliseconds
         */
        updateInterval: 10 * 1000 + 5000,
        //updateInterval: (60 * 60 * 24) * 1000 + 10000,

        //apiEndpoint: 'https://api.cahoots.pw/v2'
        //apiEndpoint: 'http://api-beta.cahoots.pw/v2',
        apiEndpoint: 'http://api-beta.cahoots.pw/v1',
        debug: true
    };

    module.exports = cahootsExtensionConfig;
}());
