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

    QueryService.prototype.queryAuthorHints = function () {
        var persons = this.queryStorage.getPersons();

        if(!Array.isArray(persons)) {
            return {};
        }

        var authorMap = {};
        for (var i in persons.filter(function (p) {
                return Array.isArray(p.cahoots) && p.cahoots.length > 0}
        )) {
            authorMap[(persons[i].name)] = 'CahootsID_' + persons[i].id;
        }
        return authorMap;
    }

    QueryService.prototype.queryAuthorDetails = function (cahootsID) {
        var matchedPersons = this.queryStorage.getPersons().filter(function (elem) {
            return (elem.id == cahootsID);
        });

        if(Array.isArray(matchedPersons)) {
            if (matchedPersons.length === 0) {
                return {};
            }
            return this.mapAuthorDto(matchedPersons[0])
        }
        return {};
    };

    QueryService.prototype.mapAuthorDto = function mapAuthorDto(person) {
        var cahootsRefs = person.cahoots;
        var cahootsDto = [];
        for (var o in cahootsRefs) {
            var organization = this.findOrganizationByCahootsId(cahootsRefs[o].organization);
            var organizationDto = {
                id: organization.id,
                info: organization.info,
                name: organization.name,
                source: cahootsRefs[o].source,
                role: cahootsRefs[o].role,
                provider: organization.provider
            };
            if (cahootsRefs[o].verified === true) {
                organizationDto.verified = true;
            }
            cahootsDto.push(organizationDto)
        }

        var personDto = {
            name: person.name,
            info: person.info,
            id: person.id,
            provider: person.provider,
            cahoots: cahootsDto
        };
        if (this.debug) console.log(personDto);
        return personDto;
    };

    QueryService.prototype.findOrganizationByCahootsId = function (cahootsID) {
        var organization = this.queryStorage.getOrganizations().filter(function (e) {
            return e.id == cahootsID
        });
        return organization[0];
    };

    module.exports = QueryService;
}());