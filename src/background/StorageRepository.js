export default class StorageRepository {

    constructor() {
        if ( typeof localStorage !== 'object') {
            throw Error('window.localStorage not an Object')
        }

        // this.storage = localStorage;
    }

    setField(fieldName, data) {
        // console.log('setField', fieldName, data)
        if (typeof localStorage.setItem === 'function') {
            localStorage.setItem(fieldName, JSON.stringify(data));
        }
        localStorage[fieldName] = JSON.stringify(data);
    };

    getField(fieldName) {
        // console.log('getField', fieldName);
        let storedJson;

        if (typeof localStorage.setItem === 'function') {
            storedJson = localStorage.getItem(fieldName);
        } else {
            storedJson = localStorage[fieldName];
        }


        if (storedJson === undefined) {
            console.log('getField', fieldName, 'is undefined');
            return undefined;
        }
        const parse = JSON.parse(storedJson);
        console.log('parse <<' + typeof parse + '>> ', parse)

        return parse;
    };

    clearRepository() {
        console.log('repository: clearing storage')
        localStorage.clear();
    }
}