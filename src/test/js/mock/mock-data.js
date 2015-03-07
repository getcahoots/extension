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
                name: 'Stefan Kornelius',
                info: 'http://de.wikipedia.org/wiki/Stefan_Kornelius'
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
                'Stefan Kornelius': 'CahootsID_c29bca5141c539897b9fb19fc071dd12475e86aa'
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
                        //id: 'f94423e4cf03cff7a4415f79986ee4dc60a5116b',
                        //created: '122331233',
                        //updated: '87123719',
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

        getStefan: function () {
            return {
                "name": "Stefan Kornelius",
                "info": "http://de.wikipedia.org/wiki/Stefan_Kornelius",
                "id": "c29bca5141c539897b9fb19fc071dd12475e86aa",
                "cahoots": [{
                    "id": "d8870d0a214850fa4a3e3442dd7f27fbd7bf5b90",
                    "info": "https://www.atlantik-bruecke.org/",
                    "name": "Atlantik-Brücke e.V.",
                    "source": "https://github.com/wuwi/cahoots/blob/master/misc/stefan_kornelius_mail.txt"
                }, {
                    "id": "30a45eaeae3f2aada0d92a9c9fa49d4fe1787a27",
                    "info": "https://dgap.org/de",
                    "name": "Deutsche Gesellschaft für Auswärtige Politik",
                    "source": "https://github.com/wuwi/cahoots/blob/master/misc/stefan_kornelius_mail.txt"
                }, {
                    "id": "666e96e1b6f04f8718333bef903e66b536a526f5",
                    "info": "http://de.wikipedia.org/wiki/Bundesakademie_f%C3%BCr_Sicherheitspolitik",
                    "name": "Bundesakademie für Sicherheitspolitik",
                    "source": "https://github.com/wuwi/cahoots/blob/master/misc/stefan_kornelius_mail.txt"
                }, {
                    "id": "23daf094b3eb17b829b6f53450827532652d0f36",
                    "info": "http://de.wikipedia.org/wiki/Deutsch-Russisches_Forum",
                    "name": "Deutsch-Russisches Forum",
                    "source": "https://github.com/wuwi/cahoots/blob/master/misc/stefan_kornelius_mail.txt"
                }, {
                    "id": "fbcc6b8f8b05fb1f6e5368fcb1794a9d8ec56be0",
                    "info": "http://de.wikipedia.org/wiki/K%C3%B6rber-Stiftung",
                    "name": "Körber-Stiftung",
                    "source": "https://web.archive.org/web/20140302133310/http://www.koerber-stiftung.de/koerberforum/gaeste/gaeste-details/gast/stefan-kornelius.html"
                }, {
                    "id": "810a5143c4e8ddbac2599ce51a38c6a02a8f903b",
                    "info": "http://www.aicgs.org/",
                    "name": "American Institute for Contemporary German Studies",
                    "source": "https://web.archive.org/web/20140914130152/http://www.message-online.com/archiv/message-1-2013/leseproben/die-naehe-zur-macht/"
                }, {
                    "id": "784f80f51783be55b9adf7574300aceabafc0b83",
                    "info": "http://www.deutscheatlantischegesellschaft.de/cms/front_content.php?idcat=73&lang=1",
                    "name": "Deutsche Atlantische Gesellschaft",
                    "source": "https://web.archive.org/web/20140914130152/http://www.message-online.com/archiv/message-1-2013/leseproben/die-naehe-zur-macht/"
                }, {
                    "id": "87f7024d1331f7ab67c4ea3c50c7eaf49441fcd7",
                    "info": "http://de.wikipedia.org/wiki/M%C3%BCnchner_Sicherheitskonferenz",
                    "name": "Münchner Sicherheitskonferenz",
                    "source": "https://web.archive.org/web/20140716065613/https://www.securityconference.de/de/veranstaltungen/munich-security-conference/msc-2014/teilnehmer/"
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

