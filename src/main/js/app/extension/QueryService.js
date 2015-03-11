'use strict';

function QueryService(queryStorage) {
    this.queryStorage = queryStorage;
    this.debug=true;
}

QueryService.prototype.findAuthorHints = function() {
    var persons = this.queryStorage.getPersons();
    var authorMap = {};
    for(var i in persons) {
        authorMap[(persons[i].name)] = "CahootsID_" + persons[i].id;
    }
    return authorMap;
}

QueryService.prototype.findAuthorDetails = function(cahootsID) {
    var person = this.queryStorage.getPersons().filter(function(elem){
        return (elem.id==cahootsID);
    })[0]

    var orgas = person.cahoots;
    var orgasNew = [];
    for(var o in orgas) {
        var orga = this.findOrganizationByCahootsId(orgas[o].organization);
        var orgaDto = {
            id: orga.id,
            info: orga.info,
            name: orga.name,
            source: orgas[o].source,
            role: orgas[o].role,
            verified: orgas[o].verified
        }
        orgasNew.push(orgaDto)
    }

    var result = {
        name: person.name,
        info: person.info,
        id:person.id,
        cahoots: orgasNew
    };
    if(this.debug) console.log(result)
    return result;
}

QueryService.prototype.findOrganizationByCahootsId = function(cahootsID) {
    var organization = this.queryStorage.getOrganizations().filter(function(e){return e.id==cahootsID});
    return organization[0];
}

module.exports =  QueryService