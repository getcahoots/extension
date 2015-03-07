'use strict';

describe('CahootsUiFormatter', function suite () {
    var CahootsUiFormatter = require("app/content/CahootsUiFormatter");

    var dataResponse = MockFactory.getStefan();

    var uif = null;

    beforeEach(function() {
        uif = new CahootsUiFormatter();
    });

    it('should call', function(){
        var elem = new jQuery("<div></div>");
        var resultElem = uif.createDetailsView(elem, dataResponse);

        expect(resultElem).toBeDefined();
        expect(resultElem.hasClass("cahoots_popover")).toBe(true)
    })
});


