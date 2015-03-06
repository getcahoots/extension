'use strict'

var CahootsStorage = function(storageObject) {
    if(typeof storageObject == "undefined") {
        throw new Error('no storage element passed')
    }

    if(!typeof storageObject == "object") {
        throw new Error('invalid storage element passed')
    }

    this.storage = storageObject;
}


CahootsStorage.prototype.setPersons = function (data) {
    this.storage.persons = JSON.stringify(data);
}

CahootsStorage.prototype.setOrganizations = function (data) {
    this.storage.organizations = JSON.stringify(data);
}

CahootsStorage.prototype.updateHints = function () {
    // TODO update hints
}

CahootsStorage.prototype.getPersons = function() {
    return JSON.parse(this.storage.persons);
}

CahootsStorage.prototype.getOrganizations = function() {
    return JSON.parse(this.storage.organizations);
}
module.exports=CahootsStorage