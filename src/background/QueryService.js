import StorageService from './StorageService';

class QueryService {

    constructor() {
        this.storageService = StorageService.getInstance();
    }

    queryAuthorHints() {
        console.log('query author hints')

        return new Promise((resolve, reject) => {
            const persons = this.storageService.findPersons();
            if(!Array.isArray(persons)) {
                resolve({});
            }

            const authorMap = {};
            persons
                .filter((p) => Array.isArray(p.cahoots) && p.cahoots.length > 0)
                .forEach((p) => authorMap[(persons[i].name)] = 'CahootsID_' + persons[i].id)
            resolve (authorMap);
        })





        // for (let i in persons.filter(function (p) {
        //         return Array.isArray(p.cahoots) && p.cahoots.length > 0}
        // )) {
        //     authorMap[(persons[i].name)] = 'CahootsID_' + persons[i].id;
        // }
        // return authorMap;
    }

    queryAuthorDetails(cahootsID) {
        var matchedPersons = this.storageService.findPersons().filter(function (elem) {
            return (elem.id === cahootsID);
        });

        if(Array.isArray(matchedPersons)) {
            if (matchedPersons.length === 0) {
                return {};
            }
            return this.mapAuthorDto(matchedPersons[0])
        }
        return {};
    };

    mapAuthorDto(person) {
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

    findOrganizationByCahootsId (cahootsID) {
        var organization = this.storageService.findOrganizations().filter(function (e) {
            return e.id === cahootsID
        });
        return organization[0];
    };

}

export default QueryService;