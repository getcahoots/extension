



MockFactory = {
    set1 : {
        getPersons: function () {
            return [{
                id: 'P-C-1', // cahoots / 1 verbindung
                name: 'Max Mustermann',
                info: 'http://www.example.org/p/max-mustermann',
                provider: "official",
                cahoots: [
                    {
                        "organization": "C-1",
                        "verified": true,
                        "source": "https://www.example.org/source/source-www1"
                    }
                ]
            }, {
                id: 'P-C-2', // cahoots / 2 verbindungen
                name: 'Jon Doe',
                info: 'http://example.org/p/jon-doe',
                provider: "official",
                cahoots: [
                    {
                        "organization": "C-2",
                        "source": "https://www.example.org/source/source-www1"
                    },
                    {
                        "organization": "C-3",
                        "source": "https://www.example.org/source/source-www2"
                    }
                ]
            }, {
                id: 'P-T-1', // torial / 1 verbindung
                name: 'Flash Gordon',
                info: 'http://www.example.org/p/flash-gordon',
                provider: "torial",
                cahoots: [
                    {
                        "organization": "T-1",
                        "verified": true,
                        "source": "https://www.example.org/source/source-www1"
                    }
                ]
            },{
                id: 'P-C-10', // torial und cahoots - cahoots - 1 verbindungen
                name: 'Julius Caesar',
                info: 'http://www.example.org/p/julius-caesar',
                provider: "official",
                cahoots: [
                    {
                        "organization": "C-1",
                        "verified": true,
                        "source": "https://www.example.org/source/source-www1"
                    }
                ]
            },{
                id: 'P-T-10', // torial und cahoots - torial - 1 verbindungen
                name: 'Julius Caesar',
                info: 'http://www.example.org/p/julius-caesar',
                provider: "torial",
                cahoots: [
                    {
                        "organization": "T-1",
                        "verified": true,
                        "source": "https://www.example.org/source/source-www1"
                    }
                ]
            }]
        },
        getOrganizations: function () {
            return [
                {
                    "name": "Organization C-1",
                    "info": "http://www.example.org/organization/official/a",
                    "id": "C-1",
                    "provider": "official"
                },
                {
                    "name": "Organization C-2",
                    "info": "http://www.example.org/organization/official/b",
                    "id": "C-2",
                    "provider": "official"
                },
                {
                    "name": "Organization C-3",
                    "info": "http://www.example.org/organization/official/c",
                    "id": "C-3",
                    "provider": "official"
                },
                {
                    "name": "Organization C-4",
                    "info": "http://www.example.org/organization/official/b",
                    "id": "C-4",
                    "provider": "official"
                },
                {
                    "name": "Organization C-5",
                    "info": "http://www.example.org/organization/official/c",
                    "id": "C-5",
                    "provider": "official"
                },


                {
                    "name": "Organization T-1",
                    "info": "http://www.example.org/organization/torial/d",
                    "id": "T-1",
                    "provider": "torial"
                },
                {
                    "name": "Organization T-2",
                    "info": "http://www.example.org/organization/torial/e",
                    "id": "T-2",
                    "provider": "torial"
                },
                {
                    "name": "Organization T-3",
                    "info": "http://www.example.org/organization/torial/f",
                    "id": "T-3",
                    "provider": "torial"
                }];
        },

        getHints: function () {
            return {
                'Jonas Bergmeier': 'CahootsID_f94423e4cf03cff7a4415f79986ee4dc60a5116b',
                'Alexander Barnickel': 'CahootsID_f94423e4cf03cff7a4415f79986ee4dc60a5116b',
                'André König': 'CahootsID_f94423e4cf03cff7a4415f79986ee4dc60a5116b',
                'Oliver Sommer': 'CahootsID_c29bca5141c539897b9fb19fc071dd12475e86aa'
            };
        },

        getPersonDetails: function (idx) {
            if (typeof idx == undefined || idx < 0) {
                throw new Error("get mocked person with index >=0")
            }
            switch (idx) {
                case 0:
                default:
                    return {
                        name: 'Jonas Bergmeier',
                        info: 'http://jonasbergmeier.net',
                        cahoots: [
                            {
                                info: 'https://cahoots.pw',
                                name: 'Cahoots Foundation',
                                source: 'https://cahoots.pw/mention_me_there',
                                role: 'Supporter',
                                verified: true
                            }
                        ]
                    };

            }
            ;
            throw new Error("no person found with mock person idx " + idx);
        },

        getDummyPerson: function () {
            return {
                "name": "Oliver Sommer",
                "info": "http://de.wikipedia.org/wiki/Blubb",
                "id": "c29bca5141c539897b9fb19fc071dd12475e86aa",
                "cahoots": [{
                    "id": "d8870d0a214850fa4a3e3442dd7f27fbd7bf5b90",
                    "info": "https://www.example.org/",
                    "name": "Example e.V.",
                    "source": "https://www.iana.org/domains/reserved"
                }]
            }
        }
    },

    getStorageObject: function () {
        return {
            persons: mock.getMockedPersons(),
            organizations: mock.getMockedOrganizations()
        }
    },

    getEmptyStorage: function () {
        var storage = new CahootsStorage({});
        return storage;
    },
    getDataStorage: function () {
        var storage = new CahootsStorage(mocks.getStorageObject());
        return storage;
    }
}



expectedMerge =
     [{
        id: 'P-C-1', // cahoots / 1 verbindung
        name: 'Max Mustermann',
        info: 'http://www.example.org/p/max-mustermann',
        provider: "official",
        cahoots: [
            {
                "organization": "C-1",
                "verified": true,
                "source": "https://www.example.org/source/source-www1"
            }
        ]
    }, {
        id: 'P-C-2', // cahoots / 2 verbindungen
        name: 'Jon Doe',
        info: 'http://example.org/p/jon-doe',
        provider: "official",
        cahoots: [
            {
                "organization": "C-2",
                "source": "https://www.example.org/source/source-www1"
            },
            {
                "organization": "C-3",
                "source": "https://www.example.org/source/source-www2"
            }
        ]
    }, {
        id: 'P-T-1', // torial / 1 verbindung
        name: 'Flash Gordon',
        info: 'http://www.example.org/p/flash-gordon',
        provider: "torial",
        cahoots: [
            {
                "organization": "T-1",
                "verified": true,
                "source": "https://www.example.org/source/source-www1"
            }
        ]
    },{
        id: 'P-C-10', // torial und cahoots - torial - 1 verbindungen
        name: 'Julius Caesar',
        info: 'http://www.example.org/p/julius-caesar',
        provider: "cahoots",
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
    }]
