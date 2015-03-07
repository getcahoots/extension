'use strict'

describe("CahootsStorage", function suite() {
    var mockPersons = MockFactory.set1.getPersons();

    var mockOrganizations = MockFactory.set1.getOrganizations();

    var expectedAuthorHints = MockFactory.set1.getHints();

    var expectedPersonDetail = MockFactory.set1.getPersonDetails(0);

    var CahootsStorage = require("app/extension/CahootsStorage");

    it('should create', function () {
        var s = new CahootsStorage({});
        expect(s).toBeDefined();
    })

    it('should return initially given persons', function () {
        var s = new CahootsStorage(({persons: JSON.stringify(mockPersons)}));
        expect(s.getPersons()).toEqual(mockPersons);
    })

    it('should return initially given organizations', function () {
        var s = new CahootsStorage({organizations: JSON.stringify(mockOrganizations)})
        expect(s.getOrganizations()).toEqual(mockOrganizations);
    })
});