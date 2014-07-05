$(document).ready(function() {
	$.each(author, function(key, value) {
		$("p").highlight(key, {caseSensitive: false, className: value });
	});

	$('span[class*=CahootsID]').tooltipster({
		interactive: true,
		contentAsHTML: true,
		maxWidth: 320,
		animation: 'fade',
		content: 'Loading...',
		delay: '300',
		speed: '300',
		timer: '450',
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