var MockFactory = {
    getMockedPersons: function () {
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
        }]
    },
    getMockedOrganizations: function() {
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

    getAuthorHints: function () {
        return {
            'Jonas Bergmeier': 'a70ac98f6379aca6e45a602ece8d9c28',
            'Alexander Barnickel': '602ece8d9c28aca6e45a602ece8d9c28',
            'André König': 'ecb66435f42c7bb716b20b0d887d83a9'
        };
    },

    getPersonDetails: function(idx) {
        if(typeof idx == undefined || idx <0) {
            throw new Error("get mocked person with index >=0")
        };
        switch(idx) {
            case 0:
            default: return {
                //id: 'f94423e4cf03cff7a4415f79986ee4dc60a5116b',
                //created: '122331233',
                //updated: '87123719',
                name: 'Jonas Bergmeier',
                info: 'http://jonasbergmeier.net',
                cahoots: [
                    {

                        info:'https://cahoots.pw',
                        name:'Cahoots Foundation',
                        source:'https://cahoots.pw/mention_me_there',
                        role:'Supporter',
                        verified: true
                    }
                ]
            };

        };
        throw new Error("no person found with mock person idx " + idx);
    },

    getStorageObject: function() {
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
    },
    getUiFormatter: function () {
        throw new Error("no implemented");
    },
    getUpdater: function () {
        throw new Error("no implemented");
    },
    getRunner: function () {
        throw new Error("no implemented");
    },
    getQueryService: function () {
        throw new Error("no implemented");
    }
}

