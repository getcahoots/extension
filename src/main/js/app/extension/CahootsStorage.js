'use strict';

(function() {

    var CahootsStorage = function (storageObject) {
        this.debug = false;

        if (typeof storageObject == "undefined") {
            throw new Error('no storage element passed');
        }

        if (!typeof storageObject == "object") {
            throw new Error('invalid storage element passed');
        }

        this.storage = storageObject;
        this.expiryDelta = 60 * 60 * 24;
    }


    CahootsStorage.prototype._setPersons = function (data) {
        if (typeof this.storage.setItem == 'function') {
            this.storage.setItem('persons', JSON.stringify(data));
        } else {
            this.storage.persons = JSON.stringify(data);
        }
    }

    CahootsStorage.prototype._setOrganizations = function (data) {
        if (typeof this.storage.setItem == 'function') {
            this.storage.setItem('organizations', JSON.stringify(data));
        } else {
            this.storage.organizations = JSON.stringify(data);
        }
    }

    CahootsStorage.prototype._setUpdated = function () {
        var currentTimestamp = Math.floor(Date.now() / 1000)
        if (typeof this.storage.setItem == 'function') {
            this.storage.setItem('lastUpdated', currentTimestamp);
        } else {
            this.storage['lastUpdated'] = currentTimestamp;
        }
    }

    CahootsStorage.prototype.setData = function (data) {
        this._setPersons(data.persons)
        this._setOrganizations(data.organizations)
        this._setUpdated();
    }

    CahootsStorage.prototype.isExpired = function () {
        try {
            var lastUpdate = this.getLastUpdated();
            var currentTimestamp = Math.floor(Date.now() / 1000)

            if (lastUpdate == null || isNaN(lastUpdate)) {
                if (this.debug) console.log("detected database expired==" + true + ". no last date present");
                return true;
            }

            if (currentTimestamp - lastUpdate > this.expiryDelta) {
                if (this.debug) console.log("detected database expired==" + true + ", time delta is seconds: " + (currentTimestamp - lastUpdate));
                return true;
            }

            if (this.debug) console.log("detected database expired==" + false + ", delta is " + (currentTimestamp - lastUpdate));
            return false;
        } catch (ex) {
            console.log("error while determining expiry: " + ex)
            return true;
        }
        if (this.debug) console.log("detected database expired==" + true);
        return true;
    }

    CahootsStorage.prototype.getPersons = function () {
        if (typeof this.storage.setItem == 'function') {
            return JSON.parse(this.storage.getItem('persons'))
        } else {
            return JSON.parse(this.storage['persons'])
        }
    }

    CahootsStorage.prototype.getOrganizations = function () {
        if (typeof this.storage.setItem == 'function') {
            return JSON.parse(this.storage.getItem('organizations'))
        } else {
            return JSON.parse(this.storage['organizations'])
        }
    }

    CahootsStorage.prototype.getLastUpdated = function () {
        var rawValue = null;
        if (typeof this.storage.setItem == 'function') {
            rawValue = this.storage.getItem('lastUpdated')
        } else {
            rawValue = this.storage['lastUpdated']
        }
        var readValue = parseInt(JSON.parse(rawValue))

        if (typeof readValue == 'number') {
            if (isNaN(readValue)) {
                return null;
            }
            return readValue;
        }
        return null;
    }

    module.exports = CahootsStorage

})();