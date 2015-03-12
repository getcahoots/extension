'use strict';

function CahootsRunner( handleFullDetails, handleAuthorHints, uiFormatter) {
    this.handleAuthorHints = handleAuthorHints;
    this.handleFullDetails = handleFullDetails;
    this.uiFormatter = uiFormatter;
    this.debug = false;
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

    jQuery('span[class*=CahootsID]').tooltipster({
        interactive: true,
        contentAsHTML: false,
        animation: 'grow',
        content: jQuery('<span>Daten werden geladen…</span>'),
        delay: '220',
        speed: '210',
        timer: '440',
        autoClose: true,
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
