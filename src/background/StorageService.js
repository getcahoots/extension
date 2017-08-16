import ProviderMerger from '../main/js/app/extension/ProviderMerger';

var getCurrentTimestamp = function () {
    return Math.floor(Date.now() / 1000);
};

import backgroundProperties from './backgroundProperties';

class StorageService {

    /**
     * cahoots extension
     *
     * Copyright Cahoots.pw
     * MIT Licensed
     *
     */

    static getInstance() {
        if (StorageService.INSTANCE === null) {
            StorageService.INSTANCE = new StorageService();
        }
        return StorageService.INSTANCE;
    }

    constructor() {
        this.storageRepository = new StorageRepository();
        
        this.providerMerger = new ProviderMerger();
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
        this.storageRepository.setField('apiEndpointOverride', data);
    };

    getApiEndpointOverride() {
        return this.storageRepository.getField('apiEndpointOverride');
    };

    isExpired() {
        try {
            var lastUpdate = this.getLastUpdated();
            var currentTimestamp = getCurrentTimestamp();

            if (lastUpdate == null || isNaN(lastUpdate)) {
                this.debug("detected database expired==" + true + ". no last date present");
                return true;
            }

            if (currentTimestamp - lastUpdate > backgroundProperties.expiryDelta) {
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
        return this.storageRepository.getField('persons');
    }

    getOrganizations() {
        return this.storageRepository.getField('organizations');
    }

    getLastUpdated() {
        var rawValue = this.storageRepository.getField('lastUpdated');
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

    _setPersons(data) {
        this.storageRepository.setField('persons', data);
    };

    _setOrganizations(data) {
        this.storageRepository.setField('organizations', data);
    };

    _setUpdated() {
        var currentTimestamp = getCurrentTimestamp();
        this.storageRepository.setField('lastUpdated', currentTimestamp);
    };
}

export default StorageService;