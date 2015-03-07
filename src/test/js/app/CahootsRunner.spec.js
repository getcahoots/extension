'use strict';

describe('CahootsRunner', function suite () {
    var handleFullDetails = function(lookupId, dataCallback) {
        var data = {}
        dataCallback(data);
    }

    var handleAuthorHints = function(dataCallback) {
        var data = {}
        dataCallback(data);
    }



    var CahootsRunner = require("app/content/CahootsRunner");
    var cahootsRunner;
    var f;

    var authorsUrl = 'src/test/resources/html/authors.html';

    beforeEach(function() {
        f = jasmine.getFixtures();
        f.fixturesPath = 'base';
        f.load(authorsUrl);
    });


    describe('basic tests', function() {

        beforeEach(function() {
            cahootsRunner = new CahootsRunner(handleFullDetails, handleAuthorHints)
        });

        it('should create', function () {
            expect(cahootsRunner).toBeDefined();
        });

        it('should execute', function (done) {
            cahootsRunner.run();
            done()
        });
    })
});


