'use strict';

function CahootsApiRepository() {
    this.data = {
        persons: [],
        organizations: [],
        hintMap: {}
    };

    this.updateFromRemote();

}

CahootsApiRepository.prototype.updateFromRemote= function() {
    console.log("entering updateFromRemote")
    var that = this;

    var importData = function(persons, organizations) {
        console.log("entering importData()")
        that.data.persons = persons;
        that.data.organizations = organizations;
        that.initAuthors();
        console.log("leaving importData()")
    }

    var fetchApiData = function(callbackOnSuccess) {
        console.log("entering fetchApiData()")
        console.log("try to load cahoots-api-client")
        var cahootsServices = require("./cahoots-api-client.js");
        console.log("... success");
        console.log("try to resolve personService");
        var personService = cahootsServices('person');
        console.log("... success");
        var onFindAllPersons = function(err, persons) {
            console.log("persons callback rcvd");
            console.log(err);
            console.log(persons);


            var organizationService = cahootsServices('organization');

            function onFindAllOrgas (err, organizations) {
                console.log("organizations callback rcvd");
                if (err) {
                    return console.error(err);
                }

                console.log(organizations);
                importData(persons, organizations);
                console.log("fetchApiData() cycle complete")
            }

            organizationService.findAll(onFindAllOrgas);
        }

        console.log("calling findAll()")
        personService.findAll(onFindAllPersons);
        console.log("... success");
    }

    fetchApiData(importData)
}


CahootsApiRepository.prototype.initAuthors = function() {
    for(var i in this.data.persons) {
       this.data.hintMap[(this.data.persons[i].name)] = "CahootsID_" + this.data.persons[i].id;
    }
}



CahootsApiRepository.prototype.findAuthorNames = function() {
    return this.data.hintMap;
}

CahootsApiRepository.prototype.findOrganizationByCahootsId = function(cahootsId) {
    var organization = this.data.organizations.filter(function(e){return e.id==cahootsId});
    return organization[0];
}
CahootsApiRepository.prototype.findAuthorByCahootsId = function(cahootsId) {
    // TODO: create DTO with organizations
    var person = this.data.persons.filter(function(elem){
        return (elem.id==cahootsId);
    })[0]

    var orgas = person.cahoots;
    var orgasNew = [];
    for(var o in orgas) {
        var orga = this.findOrganizationByCahootsId(orgas[o].organization);
        var orgaDto = {
            id: orga.id,
            info: orga.info,
            name: orga.name,
            source: orgas[o].source
        }
        orgasNew.push(orgaDto)
    }
    //person.cahoots = orgasNew;
    return {
        name: person.name,
        info: person.info,
        id:person.id,
        cahoots: orgasNew
    };
    //return this.data[cahootsId];
}


CahootsApiRepository.prototype.getFullData = function() {
    return this.data;
}


module.exports = CahootsApiRepository;