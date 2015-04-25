/**
 * cahoots extension
 *
 * Copyright Cahoots.pw
 * MIT Licensed
 *
 */
(function () {
    'use strict';

    var StorageUpdater = function (cahootsStorageInstance, url) {
        if(arguments.length!=2) {
            throw new Error('StorageUpdater() needs exactly 2 arguments');
        }

        this.debug = false;

        this.storage = cahootsStorageInstance;
        this.url = url;
    }

    StorageUpdater.prototype.update = function (xhr1, xhr2, callback) {
        if(arguments.length!=3) {
            throw new Error('StorageUpdater.update() needs exactly 3 arguments');
        }
        var that = this;
        var debug = this.debug;

        var url = this.url; //location relative to current webpage

        xhr1.open('GET', url + '/persons', true); // async


        xhr1.onload = function () {
            //console.log(this);
            var personValues = JSON.parse(xhr1.response);
            //console.log("xhr1 onload with status " + this.status)
            if (this.status < 200 || this.status >= 300) {
                callback(new Error("connection to the cahoots database service failed"))
            }

            //console.log("xhr1 call success, got data: " + JSON.stringify(personValues));
            xhr2.open('GET', url + '/organizations', true); // async
            xhr2.onload = function (xmlEvent) {
                //console.log("xhr2 onload with status " + this.status)
                if (this.status < 200 || this.status >= 300) {
                    callback(new Error("connection to the cahoots database service failed"))
                }
                //console.log("xhr2 call success");
                var orgaValues = JSON.parse(xhr2.response);

                //if(debug) console.log("loaded through.")
                //that.setPersons(personValues)
                //that.setOrganizations(orgaValues)
                that.storage.setData({persons: personValues, organizations: orgaValues})
                if (debug) console.log("update complete")
                callback(personValues, orgaValues)
            }
            xhr2.send();
        };

        xhr1.send();

    }

    StorageUpdater.prototype.checkUpdate = function (xhr1, xhr2, callback) {
        if(arguments.length!=3) {
            throw new Error('StorageUpdater.checkUpdate() needs exactly 3 arguments');
        }
        if (this.storage.isExpired()) {
            if (this.debug) console.log("checkUpdate: starting update")
            this.update(xhr1, xhr2, callback)
        } else {
            if (this.debug) console.log("checkUpdate: no update needed")
        }
    }


    module.exports = StorageUpdater;
}());