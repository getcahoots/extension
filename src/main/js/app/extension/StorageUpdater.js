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



    xhr1.onload = function(){
        //console.log(this);
        var personValues= JSON.parse(xhr1.response);
        //console.log("xhr1 onload with status " + this.status)
        if (this.status < 200 || this.status >= 300) {
            callback( new Error("connection to the cahoots database service failed"))
        }

        //console.log("xhr1 call success, got data: " + JSON.stringify(personValues));
        xhr2.open('GET', url+'/organizations', true); // async
        xhr2.onload = function(xmlEvent){
            //console.log("xhr2 onload with status " + this.status)
            if (this.status < 200 || this.status >= 300) {
                callback( new Error("connection to the cahoots database service failed"))
            }
            //console.log("xhr2 call success");
            var orgaValues = JSON.parse(xhr2.response);

            //if(debug) console.log("loaded through.")
            //that.setPersons(personValues)
            //that.setOrganizations(orgaValues)
            that.storage.setData({persons: personValues, organizations: orgaValues})
            if(debug) console.log("update complete")
            callback(personValues,orgaValues)
        }
        xhr2.send();
    };

    xhr1.send();

}

StorageUpdater.prototype.checkUpdate = function(xhr1, xhr2, callback) {
    if(this.storage.isExpired()) {
        if(this.debug) console.log("checkUpdate: starting update")
        this.update(xhr1, xhr2, callback)
    } else {
        if(this.debug) console.log("checkUpdate: no update needed")
    }
}


module.exports=StorageUpdater