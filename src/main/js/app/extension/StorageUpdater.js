/**
 * cahoots extension
 *
 * Copyright Cahoots.pw
 * MIT Licensed
 *
 */
class StorageUpdater {

    constructor(cahootsStorageInstance, configService) {
        if (arguments.length !== 2) {
            throw new Error('StorageUpdater() needs exactly 2 arguments');
        }

        this.configService = configService;

        this.storage = cahootsStorageInstance;
    };

    debug(logString) {
        if (this.configService.isDebug()) {
            console.log(logString);
        }
    };

    update(xhr1, xhr2, callback) {
        if (arguments.length !== 3) {
            throw new Error('StorageUpdater.update() needs exactly 3 arguments');
        }
        var that = this;
        var url = this.configService.getApiEndpoint();

        this.debug('starting update from api with endpoint url: ' + url);

        xhr1.open('GET', url + '/persons', true); // async


        xhr1.onload = function () {
            if (this.status < 200 || this.status >= 300) {
                callback(new Error("connection to the cahoots database service failed: " + this.status));
            }
            var personValues = JSON.parse(xhr1.response);

            xhr2.open('GET', url + '/organizations', true);
            xhr2.onload = function () {
                if (this.status < 200 || this.status >= 300) {
                    callback(new Error('connection to the cahoots database service failed'));
                }
                var orgaValues = JSON.parse(xhr2.response);

                that.storage.setData({persons: personValues, organizations: orgaValues});
                that.debug('data update complete');
                callback(personValues, orgaValues);
            };
            xhr2.send();
        };

        xhr1.send();
    };

    updateApiEndpointSetting(xhr, callback) {
        if (arguments.length !== 2) {
            throw new Error('StorageUpdater.updateApiEndpointSetting() needs exactly 2 arguments');
        }
        var receivedOverrideUrl;
        var that = this;
        var url = this.configService.getApiEndpointUpdateUrl();

        xhr.open('GET', url, true);

        this.debug('starting update for config from url: ' + url);

        xhr.onload = function () {
            if (this.status < 200 || this.status >= 300) {
                callback(new Error("connection to the cahoots config url failed"));
            }
            try {
                var receivedConfigData = JSON.parse(xhr.response);
                if (typeof receivedConfigData.apiUpdateOverrideUrl === 'string') {
                    receivedOverrideUrl = receivedConfigData.apiUpdateOverrideUrl;
                    that.debug('received api override url: ' + receivedOverrideUrl);
                    that.storage.setApiEndpointOverride(receivedOverrideUrl);
                    callback();
                } else {
                    that.debug('received garbage: ' + receivedOverrideUrl);
                    callback(new Error('received garbage: ' + receivedOverrideUrl));
                }
            } catch (e) {
                that.debug('could not update api endpoint url: ' + e);
                callback(new Error('could not update api endpoint url: ' + e));
            }
        };

        xhr.send();
    };

    checkUpdate(xhr1, xhr2, callback) {
        if (arguments.length !== 3) {
            throw new Error('StorageUpdater.checkUpdate() needs exactly 3 arguments');
        }

        if (this.storage.isExpired()) {
            this.debug("checkUpdate: starting update");
            this.update(xhr1, xhr2, callback);
        } else {
            this.debug("checkUpdate: no update needed");
        }
    };

    checkConfigUpdate(xhr, callback) {
        if (arguments.length !== 2) {
            throw new Error('StorageUpdater.checkConfigUpdate() needs exactly 2 arguments');
        }

        this.debug("checkConfigUpdate");
        this.updateApiEndpointSetting(xhr, callback);
    }
}

export default StorageUpdater;