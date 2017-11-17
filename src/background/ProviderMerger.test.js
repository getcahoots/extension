import ProviderMerger from './ProviderMerger';

describe('ProviderMerger', () => {

    let providerMerger = new ProviderMerger();

    // it('should merge', () => {
    //     const providerMerger = new ProviderMerger();
    //     providerMerger.merge
    // });

    it('should be defined', function test () {
        expect(providerMerger).toBeDefined();
    });

    xit('should merge a simple entry', function test () {
        var givenC10 = MockFactory.set1.findPersons()[3];
        var givenT10 = MockFactory.set1.findPersons()[4];

        expect(givenC10.name).toEqual(givenT10.name);


        var unreduced = [givenC10,givenT10];
        var reduced = providerMerger.flattenPersons(unreduced);

        expect(givenC10.name).toEqual(reduced[0].name);
    });

    xit('should merge organizations', function test () {
        var givenC10 = MockFactory.set1.findPersons()[3];
        var givenT10 = MockFactory.set1.findPersons()[4];

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


    xit('should merge 5 persons to keep 4', function test() {
        var unreduced = MockFactory.set1.findPersons();
        expect(unreduced.length).toBe(7);

        var reduced = providerMerger.flattenPersons(unreduced);

        expect(reduced.length).toBe(4);
    });

    xit('should merge organizations', function test() {
        var givenC10 = MockFactory.set1.findPersons()[3];
        var givenT10 = MockFactory.set1.findPersons()[4];
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

    xit('AC_30_2: when merging entities: should omit entity with no relations', function test () {
        var givenC1 = MockFactory.set1.findPersons()[3];
        var givenT5 = MockFactory.set1.findPersons()[5];
        var givenC5 = MockFactory.set1.findPersons()[6];


        var unreduced = [givenC1,givenT5];
        var reduced1 = providerMerger.flattenPersons(unreduced);
        expect(reduced1.length).toBe(1);
        expect(givenC1.name).toEqual(reduced1[0].name);

        var reduced2 = providerMerger.flattenPersons([givenC1,givenT5]);
        expect(reduced2.length).toBe(1);
        expect(givenC1.name).toEqual(reduced2[0].name);

        var reduced3 = providerMerger.flattenPersons([givenC1,givenC5,givenT5]);
        expect(reduced3.length).toBe(1);
        expect(givenC1.name).toEqual(reduced2[0].name);
    });

});
