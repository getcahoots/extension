'use strict'

describe("CahootsStorage", function suite() {

    var ProviderMerger = require('app/extension/ProviderMerger');
    function getCurrentTimestamp() {
        return Math.floor(Date.now() / 1000);
    }

    var config = {
            expiryDelta: 60 * 60 * 24,
            debug: false
        },
        providerMerger,
        localStorage = window.localStorage,
        mockPersons = MockFactory.set1.getPersons(),
        mockOrganizations = MockFactory.set1.getOrganizations(),
        expectedAuthorHints = MockFactory.set1.getHints(),
        expectedPersonDetail = MockFactory.set1.getPersonDetails(0),
        CahootsStorage = require("app/extension/CahootsStorage")

    beforeEach(function () {
        localStorage.clear();
        providerMerger = new ProviderMerger();
    });

    it('should create', function test() {
        var s = new CahootsStorage(localStorage, providerMerger, config);
        expect(s).toBeDefined();
    })



    it('should return initially given persons', function () {
        var s = new CahootsStorage(localStorage, providerMerger, config);
        s._setPersons(MockFactory.set1.getPersons())
        expect(s.getPersons()).toEqual(mockPersons);
    })

    it('should return initially given organizations', function () {
        var s = new CahootsStorage(localStorage, providerMerger, config);
        s._setOrganizations(mockOrganizations)
        expect(s.getOrganizations()).toEqual(mockOrganizations);
    })



    it('should decide expired when no timestamp is present', function test() {
        var s = new CahootsStorage(localStorage, providerMerger, config);
        expect(s.isExpired()).toBe(true);
    });

    it('should decide expired when timestamp is older than expiry delta', function test() {
        localStorage.setItem('lastUpdated', 2);
        var s = new CahootsStorage(localStorage, providerMerger, config);
        expect(s.isExpired()).toBe(true);
    });

    it('should decide not expired when timestamp is younger than expiry delta', function test() {
        var currentTimestamp = getCurrentTimestamp();
        localStorage.setItem('lastUpdated', currentTimestamp);
        var s = new CahootsStorage(localStorage, providerMerger, config);
        expect(s.isExpired()).toBe(false);
    });

    it('should expire after expiry delta', function test() {
        var currentTimestamp = getCurrentTimestamp();
        var expiredTimestamp = currentTimestamp - config.expiryDelta - 1;
        localStorage.setItem('lastUpdated', expiredTimestamp);
        var s = new CahootsStorage(localStorage, providerMerger, config);
        expect(s.isExpired()).toBe(true);
    });


    it('should update and merge from setData()', function test() {
        var s = new CahootsStorage(localStorage, providerMerger, config);
        expect(5).toBe(MockFactory.set1.getPersons().length);
        s.setData({
            persons: MockFactory.set1.getPersons(),
            organizations: MockFactory.set1.getOrganizations()
        });
        expect(4).toBe(s.getPersons().length);

    });

});