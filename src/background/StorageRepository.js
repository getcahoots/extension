export default class StorageRepository {

    constructor(bindLocalStorage = localStorage) {
        if ( typeof bindLocalStorage !== 'object') {
            throw Error('bindLocalStorage not an Object')
        }

        this.bindLocalStorage = bindLocalStorage;
    }

    setField(fieldName, data) {
        // console.log('setField', fieldName, data)
        if (typeof this.bindLocalStorage.setItem === 'function') {
            this.bindLocalStorage.setItem(fieldName, JSON.stringify(data));
        }
        this.bindLocalStorage[fieldName] = JSON.stringify(data);
    };

    getField(fieldName) {
        // console.log('getField', fieldName);
        let storedJson;

        if (typeof this.bindLocalStorage.setItem === 'function') {
            storedJson = this.bindLocalStorage.getItem(fieldName);
        } else {
            storedJson = this.bindLocalStorage[fieldName];
        }


        if (storedJson === undefined) {
            //console.log('getField', fieldName, 'is undefined');
            return undefined;
        }
        const parse = JSON.parse(storedJson);
        //console.log('parse <<' + typeof parse + '>> ', parse)

        return parse;
    };

    clearRepository() {
        //console.log('repository: clearing storage')
        this.bindLocalStorage.clear();
    }
}