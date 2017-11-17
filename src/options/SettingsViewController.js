import StorageService from '../background/StorageService';
import SettingsService from './SettingsService';
// import * as React from 'react';


export default class SettingsViewController {

    constructor() {
        this.settingsService = new SettingsService();
    }

    populateOptionsPage(document) {
        //console.log('populateOptionsPage')
        document.addEventListener("DOMContentLoaded", () => this.restoreOptions());
        document.querySelector('button[name=applyConfig]').addEventListener("click", (e) => this.applyConfig(e));
        document.querySelector('button[name=clearStorage]').addEventListener("click", (e) => this.clearStorage(e));
        document.querySelector('button[name=restoreOptions]').addEventListener("click", (e) => {
            e.preventDefault();
            this.restoreOptions()
        });


        this.populateInfo(document);
    }

    populateInfo(document) {
        const info = this.settingsService.findInfo();
        const querySelector = document.querySelector('.infoSpace');
        //console.log('querySelector', querySelector)


        const string = `items: ${info.personCount}/${info.organizationCount}, lastUpdated: ${new Date(info.lastUpdated*1000)}`
        querySelector.textContent = string;

    }

    clearStorage(e) {
        e.preventDefault();
        //console.log('clear storage')
        const storageService = StorageService.getInstance();
        storageService.clearStorage();
    }

    applyConfig(e) {
        //console.log('apply config')

        let config = {
            optionShowUiElement: document.querySelector("#optionShowUiElement").checked,
            optionShowInfoPageOnVersionUpdate: document.querySelector("#optionShowInfoPageOnVersionUpdate").checked
        }

        this.settingsService.updateSettings(config);
        //console.log(config)
    }

    restoreOptions() {
        const settings = this.settingsService.findSettings();
        this._setCurrentChoice(settings)
        //console.log('restored options')
    }

    _setCurrentChoice(result) {
        document.querySelector("#optionShowUiElement").checked = result.optionShowUiElement || false;
        document.querySelector("#optionShowInfoPageOnVersionUpdate").checked = result.optionShowInfoPageOnVersionUpdate || false;
    }
}