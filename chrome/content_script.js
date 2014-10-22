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
			cahootsGenerate(id, function(){
				origin.tooltipster('content', cahoots_content);
			});
		}
	});

 
	function cahootsGenerate(id, callback) {
		$.getJSON(chrome.extension.getURL('db.json'), function(db) {
			cahoots_content = '<p class="cahoots_top">Für <strong><a href="';
			cahoots_content += db[id].name_info;
			cahoots_content += '" target="_blank" class="name_info">';
			cahoots_content += db[id].name;
			cahoots_content += '</a></strong> wurden die folgenden Verbindungen gefunden:</p><section class="cahoots_middle"><ul id="cahoots_list">';
			$.each(db[id].cahoots, function(i,v){
				cahoots_content += '<li class="cahoots_item"><a target="_blank" title="Mehr Infos zu dieser Organisation" href="';
            	cahoots_content += v.more_info;
            	cahoots_content += '">';
            	if ( v.verified_info ) {
					cahoots_content += '<img src="https://raw.githubusercontent.com/wuwi/cahoots/master/misc/img/verified.png" title="Vom Autor verifizierte Verbindung">';
				} else {  }
            	cahoots_content += v.name;
            	cahoots_content += '</a><a target="_blank" class="quelle" href="';
            	cahoots_content += v.src;
            	cahoots_content += '">Quelle</a></li>';
            });
	        cahoots_content += '</ul></section><section class="cahoots_footer"><a target="_blank" href="http://cahoots-extension.github.io/index.html#contribute"><button class="cahoots_button">Verbindung melden</button></a><a target="_blank" href="mailto:mail@cahoots.pw?subject=Fehler"><button class="cahoots_button">Fehler melden</button></a></section>';
	        return callback(cahoots_content);
		});
	}

});