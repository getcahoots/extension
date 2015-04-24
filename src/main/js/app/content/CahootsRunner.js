'use strict';

function CahootsRunner(handleFullDetails, handleAuthorHints, uiFormatter, contentConfig) {
    this.handleAuthorHints = handleAuthorHints;
    this.handleFullDetails = handleFullDetails;
    this.uiFormatter = uiFormatter;
    this.config = contentConfig;
}

CahootsRunner.prototype.findMatchingKeys = function(authorHints) {
    var foundKeys = [];
    for (var key in authorHints) {
        if (jQuery('form:contains("' + key + '")').length > 0) {
            break;
        }
        if (jQuery('body:contains("' + key + '")').length <= 0) {
            continue;
        }
        foundKeys.push(key);
    }
    return foundKeys;
}


CahootsRunner.prototype.highlightGivenKeys = function(foundKeys, authorHints) {
    jQuery("body").highlight(foundKeys, {caseSensitive: false, className: authorHints});
}


CahootsRunner.prototype.tooltipsterize = function() {
    var that = this;

    //var tooltip = jQuery.extend({},)
    jQuery('span[class*=CahootsID]').tooltipster({
        contentAsHTML: false,
        content: jQuery('<span/>').text(that.config.snippets.loading_text),
        interactive: that.config.interactive,
        animation: that.config.animation,
        delay: that.config.delay,
        speed: that.config.speed,
        timer: that.config.timer,
        autoClose: that.config.autoClose,
        functionBefore: function(origin, continueTooltip) {
            var tooltipElement = this;
            continueTooltip();
            var id = jQuery(this).attr('class').replace(' tooltipstered','');
            var strippedId = id.split("_")[1];

            that.handleFullDetails(strippedId,function(data) {
                var fullCahootsOverlayContent = that.uiFormatter.createDetailsView(tooltipElement, data);
                origin.tooltipster('content', fullCahootsOverlayContent);
            })
        }
    });
}

CahootsRunner.prototype.run = function() {
    var debug = this.debug;

    var that = this;
    this.handleAuthorHints(function(authorHints){
        var foundKeys = that.findMatchingKeys(authorHints);
        if(debug) console.log("foundKeys:"+foundKeys)
        that.highlightGivenKeys(foundKeys, authorHints);
        that.tooltipsterize();
        if(debug) console.log("finished script cycle")
    })


}


module.exports = CahootsRunner
