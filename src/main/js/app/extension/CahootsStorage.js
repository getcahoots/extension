var getCurrentTimestamp = function () {
    return Math.floor(Date.now() / 1000);
};

class CahootsStorage {

    /**
     * cahoots extension
     *
     * Copyright Cahoots.pw
     * MIT Licensed
     *
     */

    constructor(storageObject, providerMerger, configService) {
        if (arguments.length < 2) {
            throw new Error('CahootsStorage() needs at least 2 arguments');
        }

        this.configService = configService;
        this.providerMerger = providerMerger;

        if (storageObject === undefined) {
            throw new Error('no storage element passed');
        }

        if (typeof storageObject !== "object") {
            throw new Error('invalid storage element passed');
        }

        if (typeof providerMerger !== 'object') {
            throw new Error('invalid merger passed');
        }

        this.storage = storageObject;
    };

    debug(logString) {
        try {
            if (this.configService.isDebug()) {
                console.log(logString);
            }
        } catch (ignore) {

        }
    };

    _setStorageField(fieldName, data) {
        if (typeof this.storage.setItem === 'function') {
            this.storage.setItem(fieldName, JSON.stringify(data));
        }
        this.storage[fieldName] = JSON.stringify(data);
    };

    _getStorageField(fieldName) {
        var storedJson;
        if (typeof this.storage.setItem === 'function') {
            storedJson = this.storage.getItem(fieldName);
        } else {
            storedJson = this.storage[fieldName];
        }
        if (storedJson === undefined) {
            return undefined;
        }
        return JSON.parse(storedJson);
    };

    _setPersons(data) {
        this._setStorageField('persons', data);
    };

    _setOrganizations(data) {
        this._setStorageField('organizations', data);
    };

    _setUpdated() {
        var currentTimestamp = getCurrentTimestamp();
        this._setStorageField('lastUpdated', currentTimestamp);
    };

    setData(data) {
        this._setPersons(this.providerMerger.flattenPersons(data.persons));
        this._setOrganizations(data.organizations);
        this._setUpdated();
    };

    isValidApiUrl(url) {
        if (typeof url !== 'string') {
            return false;
        }
        if (url.substring(0, 4) === 'http' && url.match(/cahoots/)) {
            return true;
        }
        return false;
    };

    setApiEndpointOverride(data) {
        if (!this.isValidApiUrl(data)) {
            throw new Error("given api url is invalid, ignoring");
        }
        this._setStorageField('apiEndpointOverride', data);
    };

    getApiEndpointOverride() {
        return this._getStorageField('apiEndpointOverride');
    };

    isExpired() {
        try {
            var lastUpdate = this.getLastUpdated();
            var currentTimestamp = getCurrentTimestamp();

            if (lastUpdate == null || isNaN(lastUpdate)) {
                this.debug("detected database expired==" + true + ". no last date present");
                return true;
            }

            if (currentTimestamp - lastUpdate > this.configService.getExpiryDelta()) {
                this.debug("detected database expired==" + true + ", time delta is seconds: " + (currentTimestamp - lastUpdate));
                return true;
            }

            this.debug("detected database expired==" + false + ", delta is " + (currentTimestamp - lastUpdate));
            return false;
        } catch (ex) {
            this.debug("error while determining expiry: " + ex);
            return true;
        }
        this.debug("detected database expired==" + true);
        return true;
    }

    getPersons() {
        return this._getStorageField('persons');
    }

    getOrganizations() {
        return this._getStorageField('organizations');
    }

    getLastUpdated() {
        var rawValue = this._getStorageField('lastUpdated');
        if (rawValue === undefined) {
            return null;
        }

        var readValue = parseInt(JSON.parse(rawValue));

        if (typeof readValue == 'number') {
            if (isNaN(readValue)) {
                return null;
            }
            return readValue;
        }
        return null;
    };
}

export default CahootsStorage;