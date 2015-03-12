'use strict'

var CahootsStorage = function (storageObject) {
    this.debug = true;

    if (typeof storageObject == "undefined") {
        throw new Error('no storage element passed')
    }

    if (!typeof storageObject == "object") {
        throw new Error('invalid storage element passed')
    }

    //if (this.debug) {
    //    console.log("created storage from storage object with content:")
    //    console.log(storageObject)
    //}
    this.storage = storageObject;
    this.expiryDelta = 60 * 60 * 24 * 1000;

    //if (typeof this.getLastUpdated() == 'undefined') {
    //    if (this.debug) console.log("storage is new")
    //} else {
    //    if (this.debug) console.log("storage last update: " + this.storage.lastUpdated)
    //}
}


CahootsStorage.prototype._setPersons = function (data) {
    if(typeof this.storage.setItem == 'function') {
        this.storage.setItem('persons', JSON.stringify(data));
    } else {
        this.storage.persons = JSON.stringify(data);
    }
}

CahootsStorage.prototype._setOrganizations = function (data) {
    if(typeof this.storage.setItem == 'function') {
        this.storage.setItem('organizations', JSON.stringify(data));
    } else {
        this.storage.organizations = JSON.stringify(data);
    }
}

CahootsStorage.prototype._setUpdated = function () {
    var currentTimestamp = Math.floor(Date.now() / 1000)
    //this.storage.setItem('lastUpdated', JSON.stringify(currentTimestamp));
    if(typeof this.storage.setItem == 'function') {
        this.storage.setItem('lastUpdated', currentTimestamp);
    } else {
        this.storage['lastUpdated']= currentTimestamp;
    }
    //if (this.debug) console.log("Database updated " + currentTimestamp );

    //// re-reading written field
    //try {
    //    var readField = this.getLastUpdated();
    //    console.log("read newly written date field: " + readField + " of type " + typeof(readField))
    //    //if (readField != currentTimestamp) {
    //    //    console.log("!! fields differ")
    //    //}
    //} catch (ex) {
    //    console.log("failed to write database: " + ex)
    //}
}

CahootsStorage.prototype.setData = function (data) {
    //var personsBefore = this.getPersons();
    //var organizationsBefore = this.getOrganizations();
    this._setPersons(data.persons)
    this._setOrganizations(data.organizations)
    this._setUpdated();
}

CahootsStorage.prototype.isExpired = function () {

    try {
        var lastUpdate = this.getLastUpdated();

        if (this.debug) console.log("try to gather last update timestamp from property " + lastUpdate)


        var currentTimestamp = Math.floor(Date.now() / 1000)

        if (lastUpdate == null || isNaN(lastUpdate) ) {
            if (this.debug) console.log("detected database expired==" + true + ". no last date present");
            return true;
        } else {
            console.log("neither null nor NaN but " + lastUpdate)
        }

        if (currentTimestamp - lastUpdate > this.expiryDelta) {
            if (this.debug) console.log("detected database expired==" + true + ", time delta is seconds: " + (currentTimestamp - lastUpdate));
            return true;
        }
        if (this.debug) console.log("detected database expired==" + false + ", delta is " + (currentTimestamp - lastUpdate));
        return false;
    } catch (ex) {
        console.log("error while determining expiry: " +ex)
        return true;
    }
    if (this.debug) console.log("detected database expired==" + true);
    return true;
}

CahootsStorage.prototype.getPersons = function () {
    if(typeof this.storage.setItem == 'function') {
        return JSON.parse(this.storage.getItem('persons'))
    } else {
        return JSON.parse(this.storage['persons'])
    }
    //return JSON.parse(this.storage.persons);
}

CahootsStorage.prototype.getOrganizations = function () {
    if(typeof this.storage.setItem == 'function') {
        return JSON.parse(this.storage.getItem('organizations'))
    } else {
        return JSON.parse(this.storage['organizations'])
    }
    //return JSON.parse(this.storage.organizations);
}

CahootsStorage.prototype.getLastUpdated = function () {
    var rawValue =null;
    if(typeof this.storage.setItem == 'function'){
        rawValue = this.storage.getItem('lastUpdated')
    } else {
        rawValue = this.storage['lastUpdated']
    }
    var readValue =  parseInt(JSON.parse(rawValue))


    if(typeof readValue == 'number') {
        if(isNaN(readValue)) {
            return null;
        }
        return readValue;
    }
    return null;


    //return JSON.parse(this.storage.organizations);
}

module.exports = CahootsStorage