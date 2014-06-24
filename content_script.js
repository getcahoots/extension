jQuery(document).ready(function($) {
	$.each(author, function(key, value) {
		$("p").highlight(key, {caseSensitive: false, className: value });
	});


	$('span[class*=CahootsID]').each(function() {
		var id = $(this).attr('class').replace(' tooltipstered','');
		console.log(id);

		$('span.'+id).tooltipster({
			animation: 'fade',
			delay: '60',
			maxWidth: 260,
			interactive: true,
			content: $('<p>Loading...</p>'),
			functionBefore: function(origin, continueTooltip) {
				continueTooltip();
				var cahoots_content;
				$.getJSON(chrome.extension.getURL('db.json'), function(db) {
					console.log(id);
					console.log(db[id]);
					cahoots_content = '<p>Für ';
					cahoots_content += db[id].name;
					cahoots_content += ' wurden die folgenden Einträge gefunden</p>';
					cahoots_content += '<ul id="cahoots_list"></ul>';
					$.each(db[id].cahoots, function(i,v){
		            	cahoots_content += '<li class="cahoot_item"><a title="Mehr Infos zu dieser Organisation" href="';
		            	cahoots_content += v.more_info;
		            	cahoots_content += '">';
		            	cahoots_content += v.name;
		            	cahoots_content += '</a><a class="quelle" href="';
		            	cahoots_content += v.src;
		            	cahoots_content += '">Quelle</a></li>';
		            });
		            console.log(cahoots_content);
		            origin.tooltipster('content', $('.tooltipster-content').html(cahoots_content));
				});
				
			}
		});
	});
});