'use strict'

var CahootsUiFormatter = function() {
    this.snippets = {
        reportErrorUrl : "mailto:mail@cahoots.pw?subject=Fehler",
        verifiedCaption: "Vom Autor verifizierte Verbindung",
        unknownRole: "Art der Verbindung unbekannt",
        cahoots_url: "http://www.cahoots.pw/",
        forum_url: "https://forum.cahoots.pw/"
    }
}


CahootsUiFormatter.prototype.createDetailsView = function(elem, data) {
    var snippets = this.snippets;

    var header = jQuery('<p>')
        .addClass("cahoots_top")
        .append(
            jQuery("<span>").addClass("person_name").text(data.name),
            jQuery("<a>", {'href': data.info,'target':'_blank'}).addClass("person_info").text("info")
        )

        .append(

        jQuery("<strong>")

        )

    var middleList = jQuery("<ul>", {id:'cahoots_list'});
    for (var i = 0; i < data.cahoots.length; i++) {


        var listItem = jQuery("<li>")
            .addClass("cahoots_item"+(data.cahoots[i].verified === true ? " verified" : ""));

        //console.log(data.cahoots[i])
        if(data.cahoots[i].provider === 'torial') {
            listItem.addClass('torial')
        }



        var organizationAnchor = jQuery("<a>", {target:"_blank",title:"Mehr Infos zu dieser Organisation",href:data.cahoots[i].info});

        organizationAnchor.append(data.cahoots[i].name);
        listItem.append(organizationAnchor);

        var sourceAnchor = jQuery("<a>", {target:"_blank","href":data.cahoots[i].source}).addClass("quelle").text(data.cahoots[i].provider === 'torial' ? 'torial' : 'Quelle')
        listItem.append(sourceAnchor);

        var roleCaption = jQuery("<span>"+(typeof data.cahoots[i].role == "undefined" ? snippets.unknownRole : data.cahoots[i].role)+"</span>").addClass("role")

        listItem.append(jQuery("<br>"));
        listItem.append(roleCaption);

        middleList.append(listItem)
    }

    var middleContent = jQuery("<section>").addClass("cahoots_middle")
        .append(middleList)

    var footer = jQuery("<section>").addClass("cahoots_footer")
        .append(jQuery("<a>",{'href':snippets.cahoots_url,target:"_blank"}).addClass("cahoots_logo"))
        .append(
            jQuery("<a>", {target:"_blank",href:snippets.forum_url}).addClass("cahoots_button").text("Forum"),
            jQuery("<a>", {target:"_blank",href:snippets.reportErrorUrl}).addClass("cahoots_button").text("Fehler melden")
        )

    var fullCahootsOverlayContent = jQuery("<div>").addClass("cahoots_popover")
        .append(header)
        .append(middleContent)
        .append(footer);
    return fullCahootsOverlayContent;
}



module.exports = CahootsUiFormatter