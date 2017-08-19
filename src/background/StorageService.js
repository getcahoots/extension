import ProviderMerger from './ProviderMerger';
import StorageRepository from './StorageRepository';

var getCurrentTimestamp = function () {
    return Math.floor(Date.now() / 1000);
};

import backgroundProperties from './backgroundProperties';

let INSTANCE = null;

class StorageService {

    /**
     * cahoots extension
     *
     * Copyright Cahoots.pw
     * MIT Licensed
     *
     */

    static getInstance() {
        if (INSTANCE === null) {
            console.log('creating StorageService')
            const repository = new StorageRepository();
            INSTANCE = new StorageService(repository);
        }
        return INSTANCE;
    }

    constructor(storageRepository) {
        // console.log(window.localStorage)
        this.storageRepository = storageRepository;
        
    };





    setData(data) {
        // console.log('setData', data)
        const providerMerger = new ProviderMerger();
        console.log('merging')
        const dataFlat = providerMerger.flattenPersons(data.persons);
        console.log('merging done')
        this._setPersons(dataFlat);
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

    // setApiEndpointOverride(data) {
    //     if (!this.isValidApiUrl(data)) {
    //         throw new Error("given api url is invalid, ignoring");
    //     }
    //     this.storageRepository.setField('apiEndpointOverride', data);
    // };
    //
    // getApiEndpointOverride() {
    //     return this.storageRepository.getField('apiEndpointOverride');
    // };

    // isExpired() {
    //     try {
    //         var lastUpdate = this.getLastUpdated();
    //         var currentTimestamp = getCurrentTimestamp();
    //
    //         if (lastUpdate == null || isNaN(lastUpdate)) {
    //             this.debug("detected database expired==" + true + ". no last date present");
    //             return true;
    //         }
    //
    //         if (currentTimestamp - lastUpdate > backgroundProperties.expiryDelta) {
    //             this.debug("detected database expired==" + true + ", time delta is seconds: " + (currentTimestamp - lastUpdate));
    //             return true;
    //         }
    //
    //         this.debug("detected database expired==" + false + ", delta is " + (currentTimestamp - lastUpdate));
    //         return false;
    //     } catch (ex) {
    //         this.debug("error while determining expiry: " + ex);
    //         return true;
    //     }
    //     this.debug("detected database expired==" + true);
    //     return true;
    // }

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

    clearStorage() {
        this.storageRepository.clearRepository();
    }
}

export default StorageService;