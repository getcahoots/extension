$(document).ready(function() {

    var foundKeys = [];
    for (var key in author) {
        if (!author.hasOwnProperty(key)) {
            continue;
        }
        if ( $('form:contains("'+key+'")').length > 0 ) {
            break;
        }
        if ( $('body:contains("'+key+'")').length <= 0 ) {
            continue;
        }
        foundKeys.push(key);
    }

    $("body").highlight(foundKeys, {caseSensitive: false, className: author });


	$('span[class*=CahootsID]').tooltipster({
		interactive: true,
		contentAsHTML: true,
		maxWidth: 344,
		animation: 'grow',
		content: 'Daten werden geladen…',
		delay: '220',
		speed: '210',
		timer: '440',
		functionBefore: function(origin, continueTooltip) {
			continueTooltip();
			var id = $(this).attr('class').replace(' tooltipstered','');
			self.port.emit('gotID', id);
			self.port.on('gotContent', function(cahoots_content){
				origin.tooltipster('content', cahoots_content);
			});
		}
	});
});