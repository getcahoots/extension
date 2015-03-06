describe("CahootsStorage", function suite() {
    var mockPersons = [{
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
    }];

    var mockOrganizations = [
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

    var expectedAuthorHints = {
        'Jonas Bergmeier': 'a70ac98f6379aca6e45a602ece8d9c28',
        'Alexander Barnickel': '602ece8d9c28aca6e45a602ece8d9c28',
        'André König': 'ecb66435f42c7bb716b20b0d887d83a9'
    };

    var expectedPersonDetail = {
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