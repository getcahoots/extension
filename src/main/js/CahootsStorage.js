var CahootsStorage = function(storageObject) {
    this.storage = storageObject;
}


CahootsStorage.prototype.setPersons = function (data) {
    this.storage.persons = data;
}

CahootsStorage.prototype.setOrganizations = function (data) {
    this.storage.organizations = data;
}

CahootsStorage.prototype.updateHints = function () {
    // TODO update hints
}

CahootsStorage.prototype.getPersons = function() {
    return this.storage.persons;
}

CahootsStorage.prototype.getOrganizations = function() {
    return this.storage.organizations;
}
module.exports=CahootsStorage