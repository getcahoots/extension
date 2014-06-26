$(document).ready(function() {
	$.each(author, function(key, value) {
		$("p").highlight(key, {caseSensitive: false, className: value });
	});


	$('span[class*=CahootsID]').tooltipster({
		interactive: true,
		contentAsHTML: true,
		content: 'Loading...',
		functionBefore: function(origin, continueTooltip) {
			continueTooltip();
			var id = $(this).attr('class').replace(' tooltipstered','');
			cahoots_generate(id, function(){
				origin.tooltipster('content', cahoots_content);
			});
		}
	});


	function cahoots_generate(id, callback) {
		$.getJSON(chrome.extension.getURL('db.json'), function(db) {
			cahoots_content = '<p>Für ';
			cahoots_content += db[id].name;
			cahoots_content += ' wurden die folgenden Einträge gefunden</p>';
			cahoots_content += '<section class="cahoots_middle"><ul id="cahoots_list">';
			$.each(db[id].cahoots, function(i,v){
            	cahoots_content += '<li class="cahoots_item"><a title="Mehr Infos zu dieser Organisation" href="';
            	cahoots_content += v.more_info;
            	cahoots_content += '">';
            	cahoots_content += v.name;
            	cahoots_content += '</a><a class="quelle" href="';
            	cahoots_content += v.src;
            	cahoots_content += '">Quelle</a></li>';
            });
	        cahoots_content += '</ul></section>';
	        cahoots_content += '<section class="cahoots_footer">';
	        cahoots_content += '<a href="http://jonasbergmeier.net/cahoots/contribute.html"><button class="cahoots_button">Informationen eintragen</button></a>';
	        cahoots_content += '<a href="http://jonasbergmeier.net/cahoots/XYZ.html"><button class="cahoots_button">Fehler melden</button></a>';
	        cahoots_content += '</section>';

	        return callback(cahoots_content);
		});
	}

});