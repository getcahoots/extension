'use strict'

describe("StorageUpdater", function suite() {
    var apiEndpointUrl = 'test-api-endpoint';
    var apiEndpointUpdateUrl = 'dummy-config-endpoint-update-url';
    var apiEndpointUpdateReceivedSetting = 'http://cahoots-dummy-api-endpoint-received-url';

    var ProviderMerger = require('app/extension/ProviderMerger');
    var providerMerger =  new ProviderMerger();

    var configServiceMock = {
        //getExpiryDelta: function () {
        //    return 60 * 60 * 24;
        //},
        isDebug: function () { return false; },
        getApiEndpoint: function () { return apiEndpointUrl; },
        getApiEndpointUpdateUrl: function () { return apiEndpointUpdateUrl; }
    };


    beforeEach(function () {
        window.localStorage.clear();
    });


    var xhr1 = {
        open: function (method, url, async) {
            expect(method.toLowerCase()).toBe("get");
            expect(url).toBe(apiEndpointUrl + "/persons");
            expect(async).toBe(true);
        },

        onload: function () {
            throw new Error('onload should have been overwritten!');
        },
        send: function () {
            xhr1.response = JSON.stringify( MockFactory.set1.getPersons());
            xhr1.status = 200;
            xhr1.onload();
        }
    }

    var xhr2 = {
        open: function (method, url, async) {
            expect(method.toLowerCase()).toBe("get");
            expect(url).toBe(apiEndpointUrl + "/organizations");
            expect(async).toBe(true);
        },
        onload: function () {
            throw new Error('onload should have been overwritten!');
        },
        send: function () {
            xhr2.response = JSON.stringify( MockFactory.set1.getOrganizations());
            xhr2.status = 200;
            xhr2.onload();
        }
    };




    /*
    test cases to cover:
    - dns failure
    - api service down
    - ( no internet connectivity)
    - data in storage has expired
     */
    describe("normal operations", function () {
        it("should make cross domain call to api endpoint", function test(done) {

            var CahootsStorage = require("app/extension/CahootsStorage")
            var storage = new CahootsStorage(window.localStorage, providerMerger, configServiceMock);

            var StorageUpdater = require("app/extension/StorageUpdater");
            var updater = new StorageUpdater(storage, configServiceMock);

            updater.update(xhr1, xhr2, function (personValues, orgaValues) {
                done();
            });

        });

        it('should update api endpoint config from remote', function (done) {
            var mockXhr = {
                open: function (method, url, async) {
                    expect(method.toLowerCase()).toBe("get");
                    expect(url).toBe(apiEndpointUpdateUrl);
                    expect(async).toBe(true);
                },
                onload: function () {
                    throw new Error('onload should have been overwritten!');
                },
                send: function () {
                    mockXhr.response = JSON.stringify({apiUpdateOverrideUrl: apiEndpointUpdateReceivedSetting});
                    mockXhr.status = 200;
                    mockXhr.onload();
                }
            };

            var CahootsStorage = require("app/extension/CahootsStorage");
            var StorageUpdater = require("app/extension/StorageUpdater");

            var storage = new CahootsStorage(window.localStorage, providerMerger, configServiceMock);
            storage.setApiEndpointOverride('http://cahoots-foo-url');


            var updater = new StorageUpdater(storage, configServiceMock);

            updater.updateApiEndpointSetting(mockXhr, function () {
                expect(storage.getApiEndpointOverride()).toEqual(apiEndpointUpdateReceivedSetting);
                done();
            });
        });

        it('should not update api endpoint config in case of invalid url received', function (done) {
            var mockXhr = {
                open: function (method, url, async) {
                    expect(method.toLowerCase()).toBe("get");
                    expect(url).toBe(apiEndpointUpdateUrl);
                    expect(async).toBe(true);
                },
                onload: function () {
                    throw new Error('onload should have been overwritten!');
                },
                send: function () {
                    mockXhr.response = JSON.stringify({apiUpdateOverrideUrl: 'invalid url'});
                    mockXhr.status = 200;
                    mockXhr.onload();
                }
            };

            var CahootsStorage = require("app/extension/CahootsStorage")
            var storage = new CahootsStorage(window.localStorage, providerMerger, configServiceMock);

            storage.setApiEndpointOverride('http://cahoots-foo-url');

            var StorageUpdater = require("app/extension/StorageUpdater");
            var updater = new StorageUpdater(storage, configServiceMock);

            updater.updateApiEndpointSetting(mockXhr, function () {
                expect(storage.getApiEndpointOverride()).toEqual('http://cahoots-foo-url');
                done();
            });
        });

        it('should not update api endpoint config in case of connection error', function (done) {
            var mockXhr = {
                open: function (method, url, async) {
                    expect(method.toLowerCase()).toBe("get");
                    expect(url).toBe(apiEndpointUpdateUrl);
                    expect(async).toBe(true);
                },
                onload: function () {
                    throw new Error('onload should have been overwritten!');
                },
                send: function () {
                    mockXhr.response = JSON.stringify({apiUpdateOverrideUrl: 'invalid url'});
                    mockXhr.status = 400;
                    mockXhr.onload();
                }
            };

            var CahootsStorage = require("app/extension/CahootsStorage")
            var storage = new CahootsStorage(window.localStorage, providerMerger, configServiceMock);

            storage.setApiEndpointOverride('http://cahoots-foo-url');

            var StorageUpdater = require("app/extension/StorageUpdater");
            var updater = new StorageUpdater(storage, configServiceMock);

            updater.updateApiEndpointSetting(mockXhr, function (e) {
                expect(e instanceof Error).not.toBeFalsy();
                done();
            });
        });
    });
})