/**
 * cahoots extension
 *
 * Copyright Cahoots.pw
 * MIT Licensed
 *
 */
(function () {
    'use strict';

    function QueryService(queryStorage) {
        if (arguments.length !== 1) {
            throw new Error('QueryService() needs exactly 1 arguments');
        }
        this.queryStorage = queryStorage;
        this.debug = false;
    }

    QueryService.prototype.findAuthorHints = function () {
        var persons = this.queryStorage.getPersons();
        var authorMap = {};
        for (var i in persons) {
            authorMap[(persons[i].name)] = 'CahootsID_' + persons[i].id;
        }
        return authorMap;
    }

    QueryService.prototype.findAuthorDetails = function (cahootsID) {
        var person = this.queryStorage.getPersons().filter(function (elem) {
            return (elem.id == cahootsID);
        })[0]

        var orgas = person.cahoots;
        var orgasNew = [];
        for (var o in orgas) {
            var orga = this.findOrganizationByCahootsId(orgas[o].organization);
            var orgaDto = {
                id: orga.id,
                info: orga.info,
                name: orga.name,
                source: orgas[o].source,
                role: orgas[o].role,
                provider: orga.provider
            };
            if (orgas[o].verified === true) {
                orgaDto.verified = true;
            }
            orgasNew.push(orgaDto)
        }

        var result = {
            name: person.name,
            info: person.info,
            id: person.id,
            provider: person.provider,
            cahoots: orgasNew
        };
        if (this.debug) console.log(result);
        return result;
    };

    QueryService.prototype.findOrganizationByCahootsId = function (cahootsID) {
        var organization = this.queryStorage.getOrganizations().filter(function (e) {
            return e.id == cahootsID
        });
        return organization[0];
    };

    module.exports = QueryService;
}());