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


	console.log("after highlight")

	$('span[class*=CahootsID]').tooltipster({
		interactive: true,
		/*contentAsHTML: false,*/
		maxWidth: 344,
		animation: 'grow',
		content: $('<span>X Daten werden geladen…</span>'),
		delay: '220',
		speed: '210',
		timer: '440',
		functionBefore: function(origin, continueTooltip) {
			console.log("continue")
			continueTooltip();
			var id = $(this).attr('class').replace('tooltipstered','');
			self.port.emit('gotID', id);
			self.port.on('gotContent', function(cahoots_content){
				console.log("emitted")
				origin.tooltipster('content', $(cahoots_content));
			});
		}
	});
});