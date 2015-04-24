'use strict';

/*
 * cahoots extension
 *
 * Copyright Cahoots.pw
 * MIT Licensed
 *
 */

/**
 * @author Oliver Sommer <oliver.sommer@posteo.de>
 *
 */
describe('extension/ProviderMerger', function suite () {
    var ProviderMerger = require('app/extension/ProviderMerger');

    var providerMerger;

    beforeEach(function () {
        providerMerger = new ProviderMerger();
    });

    it('should be defined', function test () {
        expect(providerMerger).toBeDefined();
    });

    it('should merge a simple entry', function test () {
        var givenC10 = MockFactory.set1.getPersons()[3];
        var givenT10 = MockFactory.set1.getPersons()[4];

        expect(givenC10.name).toEqual(givenT10.name);


        var unreduced = [givenC10,givenT10];
        var reduced = providerMerger.flattenPersons(unreduced);

        expect(givenC10.name).toEqual(reduced[0].name);
    });

    it('should merge organizations', function test () {
        var givenC10 = MockFactory.set1.getPersons()[3];
        var givenT10 = MockFactory.set1.getPersons()[4];

        var expectedCahoots = [
            {
                "organization": "C-1",
                "verified": true,
                "source": "https://www.example.org/source/source-www1"
            },
            {
                "organization": "T-1",
                "verified": true,
                "source": "https://www.example.org/source/source-www1"
            }
        ];

        var unreduced = [givenC10, givenT10];
        var reduced = providerMerger.flattenPersons(unreduced);

        expect(expectedCahoots).toEqual(reduced[0].cahoots);
    });


    it('should merge 5 persons to keep 4', function test () {
        var unreduced = MockFactory.set1.getPersons();
        expect(unreduced.length).toBe(5);

        var reduced = providerMerger.flattenPersons(unreduced);

        expect(reduced.length).toBe(4);
    });

    it('should merge organizations', function test () {
        var givenC10 = MockFactory.set1.getPersons()[3];
        var givenT10 = MockFactory.set1.getPersons()[4];
        var expected = {
            id: 'P-C-10', // torial und cahoots - cahoots - 1 verbindungen
            name: 'Julius Caesar',
            info: 'http://www.example.org/p/julius-caesar',
            provider: "official",
            cahoots: [
                {
                    "organization": "C-1",
                    "verified": true,
                    "source": "https://www.example.org/source/source-www1"
                },
                {
                    "organization": "T-1",
                    "verified": true,
                    "source": "https://www.example.org/source/source-www1"
                }
            ]
        };

        var unreduced = [givenC10,givenT10];
        var reduced = providerMerger.flattenPersons(unreduced);

        expect([expected]).toEqual(reduced);
    });
})