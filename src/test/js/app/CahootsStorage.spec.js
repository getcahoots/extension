'use strict'

describe("CahootsStorage", function suite() {

    beforeEach(function() {
        window.localStorage.clear();
    })



    var mockPersons = MockFactory.set1.getPersons();

    var mockOrganizations = MockFactory.set1.getOrganizations();

    var expectedAuthorHints = MockFactory.set1.getHints();

    var expectedPersonDetail = MockFactory.set1.getPersonDetails(0);

    var CahootsStorage = require("app/extension/CahootsStorage");

    it('should create', function test() {
        var s = new CahootsStorage(window.localStorage);
        expect(s).toBeDefined();
    })

    //it('should return use local storage', function test() {
    //    if (window.localStorage) {
    //        console.log("Your Browser supports LocalStorage.");
    //        /// list all keys from object
    //        var keys = Object.keys(localStorage);
    //
    //        for(var i, key; key = keys[i]; i++) {
    //            console.log(key + "--------theiiiiiii");
    //            var z = localStorage.getItem(key);
    //            console.log(z + "--------you keep me satisfied");
    //        }
    //    } else {
    //        console.log("Your Browser does not support LocalStorage.");
    //    }
    //
    //})

    it('should return initially given persons', function () {
        var s = new CahootsStorage(window.localStorage);
        s._setPersons(MockFactory.set1.getPersons())
        //var s = new CahootsStorage(({persons: JSON.stringify(mockPersons)}));
        expect(s.getPersons()).toEqual(mockPersons);
    })

    //it('should return initially given organizations', function () {
    //    var s = new CahootsStorage({organizations: JSON.stringify(mockOrganizations)})
    //    expect(s.getOrganizations()).toEqual(mockOrganizations);
    //})


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
        var currentTimestamp = Math.floor(Date.now() / 1000)
        window.localStorage.setItem('lastUpdated',currentTimestamp);
        var read = window.localStorage.getItem('lastUpdated');
        //console.log(parseInt(read))
        var s = new CahootsStorage(window.localStorage);
        expect(s.isExpired()).toBe(false);
    })


});