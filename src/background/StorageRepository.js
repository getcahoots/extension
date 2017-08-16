class StorageRepository {

    constructor() {

    }

    setField(fieldName, data) {
        if (typeof this.storage.setItem === 'function') {
            this.storage.setItem(fieldName, JSON.stringify(data));
        }
        this.storage[fieldName] = JSON.stringify(data);
    };

    getField(fieldName) {
        var storedJson;
        if (typeof this.storage.setItem === 'function') {
            storedJson = this.storage.getItem(fieldName);
        } else {
            storedJson = this.storage[fieldName];
        }
        if (storedJson === undefined) {
            return undefined;
        }
        return JSON.parse(storedJson);
    };
}