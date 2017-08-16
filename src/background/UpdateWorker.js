import StorageService from './StorageService';

const UPDATE_INTERVAL = 10000;
const API_ENDPOINT_PERSONS = 'dummy persons api endpoint';
const API_ENDPOINT_ORGANIZATIONS = 'dummy organiuation api endpoint';


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
        if (this.lastFetchTimestamp + UPDATE_INTERVAL > getCurrentTimestamp()) {
            try {
                const personsData = await fetch(API_ENDPOINT_PERSONS);
                const orgaData = await fetch(API_ENDPOINT_ORGANIZATIONS);
                StorageService.getInstance().setData({persons: personsData, organizations: orgaData});
            } catch (e) {
                console.error('update fetch failed');
            }
        }
    }

    setTargetStorage(cahootsStorage) {
        this.targetStorage = cahootsStorage;
    }
}

export default UpdateWorker;