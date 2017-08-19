import 'whatwg-fetch';

import StorageService from './StorageService';
import backgroundProperties from './backgroundProperties';

const UPDATE_INTERVAL = 10000 //backgroundProperties.updateInterval;
const EXPIRY_DELTA = backgroundProperties.expiryDelta;

const API_ENDPOINT_PERSONS = backgroundProperties.apiEndpoint + '/persons';
const API_ENDPOINT_ORGANIZATIONS = backgroundProperties.apiEndpoint + '/organizations';


const getCurrentTimestamp = () => {
    return Math.floor(Date.now() / 1000);
};

class UpdateWorker {

    constructor(lastFetchTimestamp = 0) {
        this.lastFetchTimestamp = lastFetchTimestamp;
    }


    startWatchingForUpdates() {
        this.updateInterval = setInterval(() => this.updateCycle(), UPDATE_INTERVAL)
    }

    stopWatchingForUpdates() {
        clearInterval(this.updateInterval)
    }

    async updateCycle() {
        const storageService = StorageService.getInstance();
        const lastFetchTimestamp = storageService.getLastUpdated();
        console.log(`-- update worker enter (lastFetchTimestamp: ${lastFetchTimestamp}) --`)

        let personsDataFetched;
        let orgaDataFetched;
        let personsDataMock = null
        let orgaDataMock = null

        if (lastFetchTimestamp + EXPIRY_DELTA < getCurrentTimestamp()) {

            try {
                console.log('fetching')
                const personsDataRequest = await fetch(API_ENDPOINT_PERSONS);
                const orgaDataRequest = await fetch(API_ENDPOINT_ORGANIZATIONS);
                personsDataFetched = await personsDataRequest.json();
                orgaDataFetched = await orgaDataRequest.json();

                // personsDataMock = require('../test/persons.json.js')
                // orgaDataMock = require('../test/organizations.json')


                console.log('orgaDataFetched', orgaDataFetched)
            } catch (e) {
                console.log('error while fetching', e)
            }
            console.log('fetched data')

            try {
                console.log('putting')
                storageService.setData({persons: personsDataFetched, organizations: orgaDataFetched});
            } catch (e) {
                console.error('error while putting', e);
            }
        }
        console.log('-- update worker exit --')
    }

    setTargetStorage(cahootsStorage) {
        this.targetStorage = cahootsStorage;
    }
}

export default UpdateWorker;