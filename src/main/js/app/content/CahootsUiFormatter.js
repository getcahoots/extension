'use strict'

var CahootsUiFormatter = function() {
    this.snippets = {
        contributeUrl: "http://cahoots-extension.github.io/index.html#contribute",
        reportErrorUrl : "mailto:mail@cahoots.pw?subject=Fehler",
        verifiedCaption: "Vom Autor verifizierte Verbindung",
        verifiedImageData : "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAOAAAADgCxW/H3AAABkUlEQVQoz32SP0hbURTGf+e+DBKMoCDSogasoKKmQYp/iCAE3eoTxyooSKeCThncXXXsUCld3BxNqYtERUUcpJBOpbYQBBGxigSDYt49DpL0pfo80x3O75z7ne8TfNW260bCIUkBLiqtAIgeAWuFoi7+HFzLl3ql9IjtjSYd43wRIcoTpUrOs95MNpHOlMHY3mjSccyGIMIzpah6nh3OJtIZadt1I2HH/AjaBPCmuos/N8dcFK9QJVfwbLcJhyT1HNRR1cKnzgXG60ZQVUSIhkOSMiBjgV9TZa55mjt7x9ezTeSfEtegvAoCByJxemtjrB5/49Se+yZKq/E3Jmp6eFf/FkcNapXZ5imuiwU+n6wipvJuoQefJK6q9Fe/ZqLJxa1PsnVxQHukhY+/V7jiGsEHih45L963vxRkSETYv/xO/ibPSMMgfbVx/t5eMv9rCevY/1UsP7JDrdJoGvgQnWT9bJudwqH/KGU7AgOgVkGohHwBMADZRDrjeXZYlVxZhpFHm0pQRVbBH3IZK9sUEPJ7Z0OvDDHwQ3kAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTQtMTAtMDNUMjM6Mzk6NDArMDI6MDB9Z2CiAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE0LTEwLTAzVDIzOjM5OjQwKzAyOjAwDDrYHgAAAABJRU5ErkJggg=="
    }
}


CahootsUiFormatter.prototype.createDetailsView = function(elem, data) {
    //var id = jQuery(elem).attr('class').replace(' tooltipstered', '');

    var snippets = this.snippets;

    var header = jQuery('<p>')
        .addClass("cahoots_top")
        .append("Für ")
        .append(
        jQuery("<strong>")
            .append(
            jQuery("<a>", {'href': data.info,'target':'_blank'}).addClass("name_info").text(data.name)
        )
    )
        .append(" wurden die folgenden Verbindungen gefunden:")

    var middleList = jQuery("<ul>", {id:'cahoots_list'});
    for (var i = 0; i < data.cahoots.length; i++) {
        var listItem = jQuery("<li>").addClass("cahoots_item");
        var organizationAnchor = jQuery("<a>", {target:"_blank",title:"Mehr Infos zu dieser Organisation",href:data.cahoots[i].info});

        if (data.cahoots[i].verified_info == "true") {
            organizationAnchor.append(jQuery("<img>", {
                src: snippets.verifiedImageData,
                title: snippets.verifiedCaption
            }))
        }
        organizationAnchor.append(data.cahoots[i].name);
        listItem.append(organizationAnchor);

        var sourceAnchor = jQuery("<a>", {target:"_blank","href":data.cahoots[i].source}).addClass("quelle").text("Quelle")
        listItem.append(sourceAnchor);

        middleList.append(listItem)
    }

    var middleContent = jQuery("<section>").addClass("cahoots_middle")
        .append(middleList)

    var footer = jQuery("<section>").addClass("cahoots_footer")
        .append(
        jQuery("<a>", {target:"_blank",href:snippets.contributeUrl})
            .append(jQuery("<button>").addClass("cahoots_button").text("Verbindung melden"))
    )
        .append(
        jQuery("<a>", {target:"_blank",href:snippets.reportErrorUrl})
            .append(jQuery("<button>").addClass("cahoots_button").text("Fehler melden"))
    )

    var fullCahootsOverlayContent = jQuery("<div>")
        .append(header)
        .append(middleContent)
        .append(footer);
    return fullCahootsOverlayContent;
}



module.exports = CahootsUiFormatter