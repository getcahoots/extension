'use strict'

describe("StorageUpdater", function suite() {
    var apiEndpointUrl ='https://api.cahoots.pw/v1';
    describe("normal operations", function () {
        it("should make cross domain call to api endpoint", function test(done) {
            var TestResponses = {
                getPersons: {
                    success: {
                        status: 200,
                        responseText: JSON.stringify(MockFactory.set1.getPersons())
                    }
                },
                getOrganizations: {
                    success: {
                        status: 200,
                        responseText: JSON.stringify(MockFactory.set1.getOrganizations())
                    }
                }
            };

            var xhr1 = {
                open: function(method,url,async){
                    expect(method.toLowerCase()).toBe("get")
                    expect(url).toBe(apiEndpointUrl+"/persons")
                    expect(async).toBe(true)
                },

                onload: function(){

                },
                send: function(){
                    xhr1.response = TestResponses.getPersons.success.responseText;
                    xhr1.onload()
                }
            }

            var xhr2 = {
                open: function(method,url,async){
                    expect(method.toLowerCase()).toBe("get")
                    expect(url).toBe(apiEndpointUrl+"/organizations")
                    expect(async).toBe(true)
                },

                onload: function(){

                },
                send: function(){
                    xhr2.response = TestResponses.getOrganizations.success.responseText;
                    xhr2.onload()
                }
            }
            //spyOn(XMLHttpRequest.prototype, 'open').and.callThrough();
            //spyOn(XMLHttpRequest.prototype, 'send').and.callThrough();

            var CahootsStorage = require("app/extension/CahootsStorage")
            var storage = new CahootsStorage({});

            //var xhr1 = new XMLHttpRequest();
            //xhr1.respondWith(TestResponses.getPersons.success);

            //var xhr2 = new XMLHttpRequest();
            //xhr2.respondWith(TestResponses.getOrganizations.success)

            var StorageUpdater = require("app/extension/StorageUpdater");
            var updater = new StorageUpdater(apiEndpointUrl);

            updater.update(xhr1, xhr2, storage, function (personValues, orgaValues) {
                //expect(XMLHttpRequest.prototype.open).toHaveBeenCalled();
                //expect(XMLHttpRequest.prototype.send).toHaveBeenCalled();
                //console.log(typeof data)
                //expect(personValues.length).toBe(62)
                //expect(orgaValues.length).toBe(62)
                done()
            });

        })
    })

})