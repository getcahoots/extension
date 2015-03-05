var CahootsStorage = function(storageObject) {
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
module.exports.CahootsStorage=CahootsStorage