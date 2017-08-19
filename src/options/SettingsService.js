import React from 'react'
import StorageRepository from '../background/StorageRepository';

export default class SettingsService {

    constructor() {
        this.storageRepository = new StorageRepository();
    }

    updateSettings(config) {

        this.storageRepository.setField('settings', config);
            // optionShowUiElement: document.querySelector("#optionShowUiElement").checked,
            //     optionShowInfoPageOnVersionUpdate: document.querySelector("#optionShowInfoPageOnVersionUpdate").checked

        }

    findSettings() {
        return this.storageRepository.getField('settings');
    }

    findInfo() {
        const persons = this.storageRepository.getField('persons');
        const organizations = this.storageRepository.getField('organizations');
        const lastUpdated = this.storageRepository.getField('lastUpdated');

        const info = {
            personCount: persons.length,
            organizationCount: organizations.length,
            lastUpdated: lastUpdated
        }
        console.log(info)
        return info
    }
}