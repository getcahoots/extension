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
		contentAsHTML: false,
		maxWidth: 344,
		animation: 'grow',
		content: $('<span>Daten werden geladen…</span>'),
		delay: '220',
		speed: '210',
		timer: '440',
		functionBefore: function(origin, continueTooltip) {
			continueTooltip();
			var id = $(this).attr('class').replace(' tooltipstered','');
			self.port.emit('gotID', id);
			self.port.on('gotContent', function(data){


				var header = $('<p>')
				 .addClass("cahoots_top")
				 .append("Für ")
				 .append(
					 $("<strong>")
						 .append(
						 	$("<a>",{'href': data.name_info,'target':'_blank'}).addClass("name_info").text(data.name)
						 )
				 )
				.append(" wurden die folgenden Verbindungen gefunden:")

				var middleList = $("<ul>",{id:'cahoots_list'});
				for (var i=0; i<data.cahoots.length;i++) {
					var listItem = $("<li>").addClass("cahoots_item");
					var organizationAnchor = $("<a>",{target:"_blank",title:"Mehr Infos zu dieser Organisation",href:data.cahoots[i].more_info});

					if ( data.cahoots[i].verified_info=="true" ) {
						organizationAnchor.append($("<img>",{
							src: "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAOAAAADgCxW/H3AAABkUlEQVQoz32SP0hbURTGf+e+DBKMoCDSogasoKKmQYp/iCAE3eoTxyooSKeCThncXXXsUCld3BxNqYtERUUcpJBOpbYQBBGxigSDYt49DpL0pfo80x3O75z7ne8TfNW260bCIUkBLiqtAIgeAWuFoi7+HFzLl3ql9IjtjSYd43wRIcoTpUrOs95MNpHOlMHY3mjSccyGIMIzpah6nh3OJtIZadt1I2HH/AjaBPCmuos/N8dcFK9QJVfwbLcJhyT1HNRR1cKnzgXG60ZQVUSIhkOSMiBjgV9TZa55mjt7x9ezTeSfEtegvAoCByJxemtjrB5/49Se+yZKq/E3Jmp6eFf/FkcNapXZ5imuiwU+n6wipvJuoQefJK6q9Fe/ZqLJxa1PsnVxQHukhY+/V7jiGsEHih45L963vxRkSETYv/xO/ibPSMMgfbVx/t5eMv9rCevY/1UsP7JDrdJoGvgQnWT9bJudwqH/KGU7AgOgVkGohHwBMADZRDrjeXZYlVxZhpFHm0pQRVbBH3IZK9sUEPJ7Z0OvDDHwQ3kAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTQtMTAtMDNUMjM6Mzk6NDArMDI6MDB9Z2CiAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE0LTEwLTAzVDIzOjM5OjQwKzAyOjAwDDrYHgAAAABJRU5ErkJggg==",
							title: "Vom Autor verifizierte Verbindung"
						}))
					}
					organizationAnchor.append(data.cahoots[i].name);
					listItem.append(organizationAnchor);

					var sourceAnchor = $("<a>",{target:"_blank","href":data.cahoots[i].src}).addClass("quelle").text("Quelle")
					listItem.append(sourceAnchor);

					middleList.append(listItem)
				}

				var middleContent = $("<section>").addClass("cahoots_middle")
					.append(middleList)

				var footer = $("<section>").addClass("cahoots_footer")
					.append(
						$("<a>",{target:"_blank",href:"http://cahoots-extension.github.io/index.html#contribute"})
							.append($("<button>").addClass("cahoots_button").text("Verbindung melden"))
					)
					.append(
						$("<a>",{target:"_blank",href:"mailto:mail@cahoots.pw?subject=Fehler"})
							.append($("<button>").addClass("cahoots_button").text("Fehler melden"))
					)

				var fullCahootsOverlayContent = $("<div>")
					.append(header)
					.append(middleContent)
					.append(footer);

				origin.tooltipster('content', fullCahootsOverlayContent);
			});
		}
	});
});