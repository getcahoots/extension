var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");
var Request = require("sdk/request").Request;

pageMod.PageMod({
	include: "*",
	contentScriptFile: [data.url("jquery-1.11.1.min.js"),
                        data.url("jquery_highlight.js"),
                        data.url("jquery.tooltipster.js"),
                        data.url("authors.js"),
                        data.url("content_script.js")],
    contentStyleFile: [data.url("style.css"),
  					   data.url("tooltipster.css")],
  	onAttach: function(worker) {
  		worker.port.on("gotID", function(id) {

  			Request ({
  				url: data.url('db.json'),
  				onComplete: function(response) {
  					var db = response.json;
  					cahoots_content = '<p class="cahoots_top">Für <strong>';
  					cahoots_content += db[id].name;
					cahoots_content += '</strong> wurden die folgenden Verbindungen gefunden:</p>';
					cahoots_content += '<section class="cahoots_middle"><ul id="cahoots_list">';
					// console.log(db[id].cahoots);
					for (var v in db[id].cahoots) {
						console.log(v);
						cahoots_content += '<li class="cahoots_item"><a target="_blank" title="Mehr Infos zu dieser Organisation" href="';
        				cahoots_content += db[id].cahoots[v].more_info;
        				cahoots_content += '">';
        				cahoots_content += db[id].cahoots[v].name;
        				cahoots_content += '</a><a target="_blank" class="quelle" href="';
        				cahoots_content += db[id].cahoots[v].src;
        				cahoots_content += '">Quelle</a></li>';
					}
					cahoots_content += '</ul></section>';
        			cahoots_content += '<section class="cahoots_footer">';

        			cahoots_content += '<a target="_blank" href="http://cahoots-extension.github.io/index.html#contribute"><button class="cahoots_button">Verbindung melden</button></a>';
        			cahoots_content += '<a target="_blank" href="mailto:mail@cahoots.pw?subject=Fehler"><button class="cahoots_button">Fehler melden</button></a>';

        			cahoots_content += '</section>';
 
  					worker.port.emit('gotContent', cahoots_content);
  				}
  			}).get();
  		});
  	}
}); 