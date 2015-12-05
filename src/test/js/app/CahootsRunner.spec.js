'use strict';

describe('CahootsRunner', function suite () {
    var handleFullDetails = function (lookupId, dataCallback) {
        var data = {}
        dataCallback(data);
    }

    var handleAuthorHints = function (dataCallback) {
        var data = {}
        dataCallback(data);
    }

    var contentConfig = require('app/content/cahootsContentConfig');

    var CahootsRunner = require('app/content/CahootsRunner');
    var cahootsRunner;
    var f;

    var authorsUrl = 'src/test/resources/html/browserTabFixture.html';

    beforeEach(function() {
        f = jasmine.getFixtures();
        f.fixturesPath = 'base';
        f.load(authorsUrl);
    });


    describe('basic tests', function() {

        beforeEach(function() {
            var reportMatches2 = function(){};
            cahootsRunner = new CahootsRunner(handleFullDetails, handleAuthorHints, reportMatches2, undefined, contentConfig);
        });

        it('should create', function () {
            expect(cahootsRunner).toBeDefined();
        });

        it('should execute', function () {
            cahootsRunner.run();
        });
    })
});


