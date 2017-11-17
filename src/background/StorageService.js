import ProviderMerger from './ProviderMerger';
import StorageRepository from './StorageRepository';


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
            //console.log('creating StorageService')
            const repository = new StorageRepository();
            INSTANCE = new StorageService(repository);
        }
        return INSTANCE;
    }

    constructor(storageRepository) {
        // console.log(window.localStorage)
        this.storageRepository = storageRepository;
        
    };

    updateProviderData(data) {
        // console.log('setData', data)
        const providerMerger = new ProviderMerger();
        //console.log('merging')
        const dataFlat = providerMerger.flattenPersons(data.persons);
        //console.log('merging done')
        this._setPersons(dataFlat);
        this._setOrganizations(data.organizations);
        this._setUpdated();
    };

    findPersons() {
        return this.storageRepository.getField('persons');
    }

    findOrganizations() {
        return this.storageRepository.getField('organizations');
    }

    getLastUpdated() {
        const rawValue = this.storageRepository.getField('lastUpdated');
        if (rawValue === undefined) {
            return null;
        }

        const readValue = parseInt(JSON.parse(rawValue));

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
        const currentTimestamp = Date.now();
        this.storageRepository.setField('lastUpdated', currentTimestamp);
    };

    clearStorage() {
        this.storageRepository.clearRepository();
    }
}

export default StorageService;