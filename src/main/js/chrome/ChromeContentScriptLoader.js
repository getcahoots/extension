(function () {
    'use strict';

    var bootstrapChromeContentScript = function () {
        jQuery(document).ready(
            cahoots.chrome.content
        );
    };
    module.exports = bootstrapChromeContentScript;
}());
