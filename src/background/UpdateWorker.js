import 'whatwg-fetch';

import StorageService from './StorageService';
import backgroundProperties from './backgroundProperties';

const UPDATE_INTERVAL = 10000 //backgroundProperties.updateInterval;

const API_ENDPOINT_PERSONS = backgroundProperties.apiEndpoint + '/persons';
const API_ENDPOINT_ORGANIZATIONS = backgroundProperties.apiEndpoint + '/organizations';



class UpdateWorker {

    startWatchingForUpdates() {
        const storageService = StorageService.getInstance();

        const lastFetchTimestamp = storageService.getLastUpdated();
        this.scheduleNextUpdate(lastFetchTimestamp + backgroundProperties.expiryDelta)

        // if (lastFetchTimestamp + backgroundProperties.expiryDelta <= Date.now()) {
        //     // want to do immediate update, wait a few seconds for browser to settle
        //     const gracePeriod = 10*1000;
        //     this.scheduleNextUpdate(gracePeriod)
        // } else {
        //     this.scheduleNextUpdate(lastFetchTimestamp + backgroundProperties.expiryDelta)
        // }
        //
        // const nextUpdateAbsoluteTimestamp = lastFetchTimestamp + backgroundProperties.expiryDelta;
        // const nextUpdateRelativeTime = nextUpdateAbsoluteTimestamp - Date.now()
        // if (nextUpdateRelativeTime <= 0) {
        //
        // } else {
        //     this.scheduleNextUpdate(nextUpdateRelativeTime)
        // }

    }

    scheduleNextUpdate(nextUpdateTimestamp) {
        if (nextUpdateTimestamp <= Date.now()) {
            this.updateCycle();
        }
        this.updateInterval = setTimeout(() => this.updateCycle(), nextUpdateTimestamp)
    }

    stopWatchingForUpdates() {
        clearInterval(this.updateInterval)
    }

    async updateCycle() {
        const {personsDataFetched, orgaDataFetched} = await this._fetchData(personsDataFetched, orgaDataFetched);
        const storageService = StorageService.getInstance();
        storageService.updateProviderData({persons: personsDataFetched, organizations: orgaDataFetched});
        // }
        console.log('-- update worker exit --')
    }


    async _fetchData(personsDataFetched, orgaDataFetched) {
        try {
            console.log('fetching')
            const personsDataRequest = await fetch(API_ENDPOINT_PERSONS);
            const orgaDataRequest = await fetch(API_ENDPOINT_ORGANIZATIONS);
            personsDataFetched = await personsDataRequest.json();
            orgaDataFetched = await orgaDataRequest.json();

            // personsDataMock = require('../test/persons.json.js')
            // orgaDataMock = require('../test/organizations.json')


            // console.log('orgaDataFetched', orgaDataFetched)
        } catch (e) {
            console.log('error while fetching', e)
        }
        console.log('fetched data')
        return {personsDataFetched, orgaDataFetched};
    }
}

export default UpdateWorker;