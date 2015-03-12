MockFactory = {
    set1 : {
        getPersons: function () {
            return [{
                id: 'f94423e4cf03cff7a4415f79986ee4dc60a5116b',
                name: 'Jonas Bergmeier',
                info: 'http://jonasbergmeier.net'
            }, {
                id: 'f94423e4cf03cff7a4415f79986ee4dc60a5116b',
                name: 'Alexander Barnickel',
                info: 'http://alba.io'
            }, {
                id: 'f94423e4cf03cff7a4415f79986ee4dc60a5116b',
                name: 'André König',
                info: 'http://andrekoenig.info'
            },{
                id: 'c29bca5141c539897b9fb19fc071dd12475e86aa',
                name: 'Oliver Sommer',
                info: 'http://de.wikipedia.org/wiki/Blubb'
            }]
        },
        getOrganizations: function () {
            return [
                {
                    id: 'f94423e4cf03cff7a4415f79986ee4dc60a5116b',
                    name: 'Cahoots Foundation',
                    info: 'https://cahoots.pw'
                },
                {
                    id: 'a42423e4f94423e4cf03cff7a4415f79986ee4dc',
                    name: 'Münchner Sicherheitskonferenz',
                    info: 'http://de.wikipedia.org/wiki/M%C3%BCnchner_Sicherheitskonferenz'
                },
                {
                    id: '16025162581bd47bb1b8acab725e42c16f75c840',
                    name: 'Valdai Discussion Club',
                    info: 'http://en.wikipedia.org/wiki/Valdai_International_Discussion_Club'
                }
            ];
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

