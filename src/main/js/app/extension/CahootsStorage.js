/**
 * cahoots extension
 *
 * Copyright Cahoots.pw
 * MIT Licensed
 *
 */
(function () {
    'use strict';

    var getCurrentTimestamp = function () {
        return Math.floor(Date.now() / 1000);
    };

    var CahootsStorage = function (storageObject, providerMerger, configService) {
        if (arguments.length < 2) {
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

    CahootsStorage.prototype.debug = function (logString) {
        try {
            if (this.configService.isDebug()) {
                console.log(logString);
            }
        } catch (ignore) {

        }
    };

    CahootsStorage.prototype._setStorageField = function (fieldName, data) {
        if (typeof this.storage.setItem === 'function') {
            this.storage.setItem(fieldName, JSON.stringify(data));
        }
        this.storage[fieldName] = JSON.stringify(data);
    };

    CahootsStorage.prototype._getStorageField = function (fieldName) {
        if (typeof this.storage.setItem === 'function') {
            return JSON.parse(this.storage.getItem(fieldName));
        }
        return JSON.parse(this.storage[fieldName]);
    };

    CahootsStorage.prototype._setPersons = function (data) {
        this._setStorageField('persons', data);
    };

    CahootsStorage.prototype._setOrganizations = function (data) {
        this._setStorageField('organizations', data);
    };

    CahootsStorage.prototype._setUpdated = function () {
        var currentTimestamp = getCurrentTimestamp();
        this._setStorageField('lastUpdated', currentTimestamp);
    };

    CahootsStorage.prototype.setData = function (data) {
        this._setPersons(this.providerMerger.flattenPersons(data.persons));
        this._setOrganizations(data.organizations);
        this._setUpdated();
    };

    CahootsStorage.prototype.isValidApiUrl = function (url) {
        if (typeof url !== 'string') {
            return false;
        }
        if (url.substring(0, 4) === 'http' && url.match(/cahoots/)) {
            return true;
        }
        return false;
    };

    CahootsStorage.prototype.setApiEndpointOverride = function (data) {
        if (!this.isValidApiUrl(data)) {
            throw new Error("given api url is invalid, ignoring");
        }
        this._setStorageField('apiEndpointOverride', data);
    };

    CahootsStorage.prototype.getApiEndpointOverride = function () {
        return this._getStorageField('apiEndpointOverride');
    };

    CahootsStorage.prototype.isExpired = function () {
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

    CahootsStorage.prototype.getPersons = function () {
        return this._getStorageField('persons');
    }

    CahootsStorage.prototype.getOrganizations = function () {
        return this._getStorageField('organizations');
    }

    CahootsStorage.prototype.getLastUpdated = function () {
        var rawValue = this._getStorageField('lastUpdated');
        var readValue = parseInt(JSON.parse(rawValue));

        if (typeof readValue == 'number') {
            if (isNaN(readValue)) {
                return null;
            }
            return readValue;
        }
        return null;
    };

    module.exports = CahootsStorage;
}());