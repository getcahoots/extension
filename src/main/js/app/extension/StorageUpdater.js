'use strict'

var StorageUpdater = function(cahootsStorageInstance, url) {
    this.debug = true;

    this.storage = cahootsStorageInstance;
    this.url = url; // 'https://api.cahoots.pw/v1'
}

// TODO: send custom http header
StorageUpdater.prototype.update = function(xhr1, xhr2, callback) {
    var that = this;
    // TODO better error handling
    var debug = this.debug;

    var url = this.url; //location relative to current webpage

    xhr1.open('GET', url+'/persons', true); // async


    xhr1.onload = function(xmlEvent, two, three){
        var personValues= JSON.parse(xhr1.response);

        xhr2.open('GET', url+'/organizations', true); // async
        xhr2.onload = function(xmlEvent){
            var orgaValues = JSON.parse(xhr2.response);

            if(debug) console.log("loaded through.")
            //that.setPersons(personValues)
            //that.setOrganizations(orgaValues)
            that.storage.setData({persons: personValues, organizations: orgaValues})
            if(debug) console.log("loaded through -> callback")
            callback(personValues,orgaValues)
        }
        xhr2.send();
    };

    xhr1.send();

}

StorageUpdater.prototype.checkUpdate = function(xhr1, xhr2, callback) {
    if(this.storage.isExpired()) {
        this.update(xhr1, xhr2, callback)
    }
}


module.exports=StorageUpdater