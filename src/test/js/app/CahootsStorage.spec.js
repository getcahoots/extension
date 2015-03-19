'use strict'

describe("CahootsStorage", function suite() {

    beforeEach(function() {
        window.localStorage.clear();
    })


    var getCurrentTimestamp = function(){
        var currentTimestamp = Math.floor(Date.now() / 1000);
        return currentTimestamp;
    }

    var getExpiryDelta = function() {
        return 60*60*24;
    }

    var mockPersons = MockFactory.set1.getPersons();

    var mockOrganizations = MockFactory.set1.getOrganizations();

    var expectedAuthorHints = MockFactory.set1.getHints();

    var expectedPersonDetail = MockFactory.set1.getPersonDetails(0);

    var CahootsStorage = require("app/extension/CahootsStorage");

    it('should create', function test() {
        var s = new CahootsStorage(window.localStorage);
        expect(s).toBeDefined();
    })


    it('should return initially given persons', function () {
        var s = new CahootsStorage(window.localStorage);
        s._setPersons(MockFactory.set1.getPersons())
        expect(s.getPersons()).toEqual(mockPersons);
    })

    it('should return initially given organizations', function () {
        var s = new CahootsStorage(window.localStorage);
        s._setOrganizations(mockOrganizations)
        expect(s.getOrganizations()).toEqual(mockOrganizations);
    })


    it('should decide expired when no timestamp is present',function test(){
        var s = new CahootsStorage(window.localStorage);
        expect(s.isExpired()).toBe(true);
    })

    it('should decide expired when timestamp is older than expiry delta',function test(){
        window.localStorage.setItem('lastUpdated',2);
        var s = new CahootsStorage(window.localStorage);
        expect(s.isExpired()).toBe(true);
    })

    it('should decide not expired when timestamp is younger than expiry delta',function test(){
        var currentTimestamp = getCurrentTimestamp();
        window.localStorage.setItem('lastUpdated',currentTimestamp);
        var s = new CahootsStorage(window.localStorage);
        expect(s.isExpired()).toBe(false);
    })


    it('should expire after expiry delta',function test(){
        var currentTimestamp = getCurrentTimestamp();
        var expiredTimestamp = currentTimestamp - getExpiryDelta() -1;
        window.localStorage.setItem('lastUpdated',expiredTimestamp);
        var s = new CahootsStorage(window.localStorage);
        expect(s.isExpired()).toBe(true);
    })


});