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


  					cahoots_content = '<p class="cahoots_top">Für <strong><a href="';
					cahoots_content += db[id].name_info;
					cahoots_content += '" target="_blank" class="name_info">';
					cahoots_content += db[id].name;
					cahoots_content += '</a></strong> wurden die folgenden Verbindungen gefunden:</p><section class="cahoots_middle"><ul id="cahoots_list">';
					for (var v in db[id].cahoots) {
						cahoots_content += '<li class="cahoots_item"><a target="_blank" title="Mehr Infos zu dieser Organisation" href="';
        				cahoots_content += db[id].cahoots[v].more_info;
        				cahoots_content += '">';
                if ( db[id].cahoots[v].verified_info ) {
                  cahoots_content += '<img src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAOAAAADgCxW/H3AAABkUlEQVQoz32SP0hbURTGf+e+DBKMoCDSogasoKKmQYp/iCAE3eoTxyooSKeCThncXXXsUCld3BxNqYtERUUcpJBOpbYQBBGxigSDYt49DpL0pfo80x3O75z7ne8TfNW260bCIUkBLiqtAIgeAWuFoi7+HFzLl3ql9IjtjSYd43wRIcoTpUrOs95MNpHOlMHY3mjSccyGIMIzpah6nh3OJtIZadt1I2HH/AjaBPCmuos/N8dcFK9QJVfwbLcJhyT1HNRR1cKnzgXG60ZQVUSIhkOSMiBjgV9TZa55mjt7x9ezTeSfEtegvAoCByJxemtjrB5/49Se+yZKq/E3Jmp6eFf/FkcNapXZ5imuiwU+n6wipvJuoQefJK6q9Fe/ZqLJxa1PsnVxQHukhY+/V7jiGsEHih45L963vxRkSETYv/xO/ibPSMMgfbVx/t5eMv9rCevY/1UsP7JDrdJoGvgQnWT9bJudwqH/KGU7AgOgVkGohHwBMADZRDrjeXZYlVxZhpFHm0pQRVbBH3IZK9sUEPJ7Z0OvDDHwQ3kAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTQtMTAtMDNUMjM6Mzk6NDArMDI6MDB9Z2CiAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE0LTEwLTAzVDIzOjM5OjQwKzAyOjAwDDrYHgAAAABJRU5ErkJggg==" title="Vom Autor verifizierte Verbindung">';
                } else {  }
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