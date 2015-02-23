'use strict';

describe('CahootsRunner', function suite () {

    var cahootsRunner;
    var f;

    var authorsUrl = 'src/test/html/authors.html';

    beforeEach(function() {
        f = jasmine.getFixtures();
        f.fixturesPath = 'base';
        f.load(authorsUrl);
    });


    describe('basic tests', function() {

        beforeEach(function() {
            cahootsRunner = new CahootsRunner(mockData())
        });

        it('should create', function () {
            expect(cahootsRunner).toBeDefined();
        });

        it('should execute', function () {
            cahootsRunner.run();
        });
    })

//    it('access', function() {
//        var htmlContext = f.read(authorsUrl);
//        console.log(jQuery('br',htmlContext))
//    });


    it('should find authors keys from page', function() {
        cahootsRunner = new CahootsRunner(mockData());

        var foundKeys = cahootsRunner._findMatchingKeys(mockAuthors())
        expect(foundKeys).toEqual([ 'Jochen Bittner', 'Robert Leicht', 'Josef Joffe' ])
    })

    it('should highlight author occurrences in page', function() {

        cahootsRunner = new CahootsRunner(mockData());
        cahootsRunner._highlightGivenKeys([ 'Jochen Bittner', 'Robert Leicht', 'Josef Joffe' ]);
//        console.log(document)

    })

    it('should attach tooltip to highlighted occurrences', function() {

    })
});


