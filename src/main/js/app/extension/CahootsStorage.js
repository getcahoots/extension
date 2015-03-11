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
    this.debug=true;
}


CahootsStorage.prototype._setPersons = function (data) {
    this.storage.persons = JSON.stringify(data);
}

CahootsStorage.prototype._setOrganizations = function (data) {
    this.storage.organizations = JSON.stringify(data);
}

CahootsStorage.prototype._setUpdated = function() {
    var now = new Date();
    var currentTimestamp = now.getMilliseconds / 1000;
    this.storage.lastUpdated = JSON.stringify(currentTimestamp);
    if(this.debug) console.log("Database updated " + now);
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

        if (lastUpdate==null    ) {
            if(this.debug) console.log("detected database expired=="+true);
            return true;
        }

        if (currentTimestamp - lastUpdate > this.expiryDelta) {
            if(this.debug) console.log("detected database expired=="+true);
            return true;
        }
        if(this.debug) console.log("detected database expired=="+false);
        return false;
    } catch(ex) {
        ;
    }
    if(this.debug) console.log("detected database expired=="+true);
    return true;
}

CahootsStorage.prototype.getPersons = function() {
    return JSON.parse(this.storage.persons);
}

CahootsStorage.prototype.getOrganizations = function() {
    return JSON.parse(this.storage.organizations);
}


module.exports=CahootsStorage