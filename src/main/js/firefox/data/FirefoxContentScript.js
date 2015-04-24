'use strict';

var firefoxContentScript = function() {

    var handleFullDetails = function(lookupId, dataCallback) {
        self.port.once('gotFullDetails', function(data){
            dataCallback(data);
        });
        self.port.emit('getFullDetails', lookupId);
    }

    var handleAuthorHints = function(dataCallback) {
        self.port.once("gotAuthorHints", function(authorHints) {
            dataCallback(authorHints);
        })
        self.port.emit("getAuthorHints");
    }

    var CahootsUiFormatter = cahoots.content.CahootsUiFormatter;
    var CahootsRunner = cahoots.content.CahootsRunner;
    var ContentConfig = cahoots.content.ContentConfig;
    
    var uiFormatter = new CahootsUiFormatter();
    var cahootsRunner = new CahootsRunner(handleFullDetails,handleAuthorHints,uiFormatter, ContentConfig);
    cahootsRunner.run();
};

module.exports = firefoxContentScript

