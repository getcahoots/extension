'use strict'

var CahootsStorage = function(storageObject) {
    if(typeof storageObject == "undefined") {
        throw new Error('no storage element passed')
    }

    if(!typeof storageObject == "object") {
        throw new Error('invalid storage element passed')
    }

    this.storage = storageObject;
    this.expiryDelta = 60*60*24;
}


CahootsStorage.prototype._setPersons = function (data) {
    this.storage.persons = JSON.stringify(data);
}

CahootsStorage.prototype._setOrganizations = function (data) {
    this.storage.organizations = JSON.stringify(data);
}

CahootsStorage.prototype._setUpdated = function() {
    this.storage.lastUpdated = JSON.stringify(new Date().getMilliseconds / 1000)
}

CahootsStorage.prototype.setData = function (data) {
    //var personsBefore = this.getPersons();
    //var organizationsBefore = this.getOrganizations();
    this._setPersons(data.persons)
    this._setOrganizations(data.organizations)
    this._setUpdated();
}

CahootsStorage.prototype.isExpired = function() {
    try {
        var currentTimestamp = new Date().getMilliseconds() / 1000;
        var lastUpdate = JSON.parse(this.storage.lastUpdated);

        if (currentTimestamp - lastUpdate > this.expiryDelta) {
            return true;
        }
        return false;
    } catch(ex) {
        ;
    }
    return true;
}

CahootsStorage.prototype.getPersons = function() {
    return JSON.parse(this.storage.persons);
}

CahootsStorage.prototype.getOrganizations = function() {
    return JSON.parse(this.storage.organizations);
}


module.exports=CahootsStorage