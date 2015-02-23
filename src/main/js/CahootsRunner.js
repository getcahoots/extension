'use strict';

function CahootsRunner(cahootsData) {
    this.cahootsRepository = new CahootsRepository(cahootsData);
}


CahootsRunner.prototype._findMatchingKeys = function() {
    var foundKeys = [];
    for (var key in this.cahootsRepository.findAuthorNames()) {
        if (jQuery('form:contains("' + key + '")').length > 0) {
            break;
        }
        if (jQuery('body:contains("' + key + '")').length <= 0) {
            continue;
        }
        foundKeys.push(key);
    }
    return foundKeys;
}


CahootsRunner.prototype._highlightGivenKeys = function(foundKeys) {
    var authorNames = this.cahootsRepository.findAuthorNames();
    jQuery("body").highlight(foundKeys, {caseSensitive: false, className: authorNames});
}


CahootsRunner.prototype._tooltipsterize = function() {
    var that = this;
    jQuery('span[class*=CahootsID]').tooltipster({
        interactive: true,
        contentAsHTML: false,
        maxWidth: 344,
        animation: 'grow',
        content: jQuery('<span>Daten werden geladen…</span>'),
        delay: '220',
        speed: '210',
        timer: '440',
        functionBefore: function(origin, continueTooltip) {
            continueTooltip();
            var fullCahootsOverlayContent = that._createCahootsContent(this);
            origin.tooltipster('content', fullCahootsOverlayContent);
        }
    });
}


CahootsRunner.prototype._createCahootsContent = function(elem) {
    var id = jQuery(elem).attr('class').replace(' tooltipstered', '');
    var data = this.cahootsRepository.findAuthorByCahootsId(id);

    var header = jQuery('<p>')
        .addClass("cahoots_top")
        .append("Für ")
        .append(
        jQuery("<strong>")
            .append(
            jQuery("<a>", {'href': data.name_info,'target':'_blank'}).addClass("name_info").text(data.name)
        )
    )
        .append(" wurden die folgenden Verbindungen gefunden:")

    var middleList = jQuery("<ul>", {id:'cahoots_list'});
    for (var i = 0; i < data.cahoots.length; i++) {
        var listItem = jQuery("<li>").addClass("cahoots_item");
        var organizationAnchor = jQuery("<a>", {target:"_blank",title:"Mehr Infos zu dieser Organisation",href:data.cahoots[i].more_info});

        if (data.cahoots[i].verified_info == "true") {
            organizationAnchor.append(jQuery("<img>", {
                src: "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAOAAAADgCxW/H3AAABkUlEQVQoz32SP0hbURTGf+e+DBKMoCDSogasoKKmQYp/iCAE3eoTxyooSKeCThncXXXsUCld3BxNqYtERUUcpJBOpbYQBBGxigSDYt49DpL0pfo80x3O75z7ne8TfNW260bCIUkBLiqtAIgeAWuFoi7+HFzLl3ql9IjtjSYd43wRIcoTpUrOs95MNpHOlMHY3mjSccyGIMIzpah6nh3OJtIZadt1I2HH/AjaBPCmuos/N8dcFK9QJVfwbLcJhyT1HNRR1cKnzgXG60ZQVUSIhkOSMiBjgV9TZa55mjt7x9ezTeSfEtegvAoCByJxemtjrB5/49Se+yZKq/E3Jmp6eFf/FkcNapXZ5imuiwU+n6wipvJuoQefJK6q9Fe/ZqLJxa1PsnVxQHukhY+/V7jiGsEHih45L963vxRkSETYv/xO/ibPSMMgfbVx/t5eMv9rCevY/1UsP7JDrdJoGvgQnWT9bJudwqH/KGU7AgOgVkGohHwBMADZRDrjeXZYlVxZhpFHm0pQRVbBH3IZK9sUEPJ7Z0OvDDHwQ3kAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTQtMTAtMDNUMjM6Mzk6NDArMDI6MDB9Z2CiAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE0LTEwLTAzVDIzOjM5OjQwKzAyOjAwDDrYHgAAAABJRU5ErkJggg==",
                title: "Vom Autor verifizierte Verbindung"
            }))
        }
        organizationAnchor.append(data.cahoots[i].name);
        listItem.append(organizationAnchor);

        var sourceAnchor = jQuery("<a>", {target:"_blank","href":data.cahoots[i].src}).addClass("quelle").text("Quelle")
        listItem.append(sourceAnchor);

        middleList.append(listItem)
    }

    var middleContent = jQuery("<section>").addClass("cahoots_middle")
        .append(middleList)

    var footer = jQuery("<section>").addClass("cahoots_footer")
        .append(
        jQuery("<a>", {target:"_blank",href:"http://cahoots-extension.github.io/index.html#contribute"})
            .append(jQuery("<button>").addClass("cahoots_button").text("Verbindung melden"))
    )
        .append(
        jQuery("<a>", {target:"_blank",href:"mailto:mail@cahoots.pw?subject=Fehler"})
            .append(jQuery("<button>").addClass("cahoots_button").text("Fehler melden"))
    )

    var fullCahootsOverlayContent = jQuery("<div>")
        .append(header)
        .append(middleContent)
        .append(footer);
    return fullCahootsOverlayContent;
}

CahootsRunner.prototype.run = function() {
    var authors = this.cahootsRepository.findAuthorNames();
    var foundKeys = this._findMatchingKeys(authors);

    this._highlightGivenKeys(foundKeys);
    this._tooltipsterize();
}

