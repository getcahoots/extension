$(document).ready(function() {
	//$.each(author, function(key, value) {
	//	$("*").highlight(key, {caseSensitive: false, className: value });
	//});
	
	for (var key in author) {
		if (!author.hasOwnProperty(key)) {
			continue;
		}
		if ( $('body:contains("'+key+'")').length > 0 ) {
			$("*").highlight(key, {caseSensitive: false, className: author[key] });
		}
	}

	$('span[class*=CahootsID]').tooltipster({
		interactive: true,
		contentAsHTML: true,
		maxWidth: 320,
		animation: 'grow',
		content: 'Daten werden geladen…',
		delay: '200',
		speed: '200',
		timer: '400',
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