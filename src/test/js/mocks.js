var mockedPersonValues = function() {
    return [{
            id: 'a70ac98f6379aca6e45a602ece8d9c28',
            name: 'Jonas Bergmeier',
            info: 'http://jonasbergmeier.net'
        },{
            id: '602ece8d9c28aca6e45a602ece8d9c28',
            name: 'Alexander Barnickel',
            info: 'http://alba.io'
        },{
            id: 'ecb66435f42c7bb716b20b0d887d83a9',
            name: 'André König',
            info: 'http://andrekoenig.info'
        }]
};


var mockedAuthorHints = function() {
    return {'Jonas Bergmeier':'a70ac98f6379aca6e45a602ece8d9c28',
        'Alexander Barnickel':'602ece8d9c28aca6e45a602ece8d9c28',
        'André König':'ecb66435f42c7bb716b20b0d887d83a9'};
}

var repositoryMock = function() {
   return new CahootsRepository(mockData());
}
var mockAuthors = function() {
    return ["Jochen Bittner","Robert Leicht", "Josef Joffe"];
}

var mockDataOld = function() {
    return {
        "CahootsID_0001": {
            "name": "Jochen Bittner",
            "name_info": "http://de.wikipedia.org/wiki/Jochen_Bittner",
            "cahoots": [
                {
                    "name": "Europa-Union (Referent)",
                    "more_info": "http://de.wikipedia.org/wiki/Europa-Union",
                    "src": "http://web.archive.org/web/20141002080207/http://www.eu-kiel.de/inhalt/veranst32013.htm"
                },
                {
                    "name": "Brussels Forum (Teilnehmer)",
                    "more_info": "http://brussels.gmfus.org/about-the-forum/about/",
                    "src": "http://www.gmfus.org/brusselsforum/2008/doc/BFParticipantList03.11REVISED.pdf"
                },
                {
                    "name": "Bertelsmann-Stiftung",
                    "more_info": "http://de.wikipedia.org/wiki/Bertelsmann-Stiftung",
                    "src": "http://de.wikipedia.org/wiki/Jochen_Bittner#Mitgliedschaften.2C_Teilnahme_an_Kongressen"
                },
                {
                    "name": "Körber-Stiftung (Gast)",
                    "more_info": "http://de.wikipedia.org/wiki/K%C3%B6rber-Stiftung",
                    "src": "http://web.archive.org/web/20140503040659/http://www.koerber-stiftung.de/koerberforum/programm/details/termin/europa-vermitteln.html"
                }
            ]
        },
        "CahootsID_0002": {
            "name": "Robert Leicht",
            "name_info": "http://de.wikipedia.org/wiki/Robert_Leicht_(Journalist)",
            "cahoots": [
                {
                    "name": "Atlantik-Brücke e.V. (Mitglied)",
                    "more_info": "http://de.wikipedia.org/wiki/Atlantik-Br%C3%BCcke",
                    "src": "http://web.archive.org/web/20140728192825/http://spiegelkabinett-blog.blogspot.de/2013/03/journalisten-der-atlantikbrucke-in.html"
                }
            ]
        },
        "CahootsID_0003": {
            "name": "Josef Joffe",
            "name_info": "http://de.wikipedia.org/wiki/Josef_Joffe",
            "cahoots": [
                {
                    "name": "Aspen Institut",
                    "more_info": "http://de.wikipedia.org/wiki/Aspen_Institut (Beiratsmitglied)",
                    "src": "http://web.archive.org/web/20140508062405/http://zeitreisen.zeit.de/interviews/begegnung-mit-josef-joffe"
                },
                {
                    "name": "American Institute for Contemporary German Studies (Mitglied)",
                    "more_info": "http://de.wikipedia.org/wiki/Aspen_Institut",
                    "src": "http://web.archive.org/web/20140726035059/http://www.aicgs.org/by-author/josef-joffe/"
                },
                {
                    "name": "Atlantik-Brücke e.V. (Trustee)",
                    "more_info": "http://de.wikipedia.org/wiki/Atlantik-Br%C3%BCcke",
                    "src": "http://web.archive.org/web/20140508062405/http://zeitreisen.zeit.de/interviews/begegnung-mit-josef-joffe"
                },
                {
                    "name": "Bilderberg-Konferenz (Teilnehmer)",
                    "more_info": "http://de.wikipedia.org/wiki/Bilderberg-Konferenz",
                    "src": "http://de.wikipedia.org/wiki/Liste_von_Teilnehmern_an_Bilderberg-Konferenzen"
                },
                {
                    "name": "American Academy in Berlin (Beiratsmitglied)",
                    "more_info": "http://de.wikipedia.org/wiki/American_Academy_in_Berlin",
                    "src": "http://web.archive.org/web/20140825161247/http://tec.fsi.stanford.edu/people/josef_joffe/"
                },
                {
                    "name": "Europe’s World (Autor)",
                    "more_info": "http://de.wikipedia.org/wiki/Friends_of_Europe",
                    "src": "http://web.archive.org/web/20140825160210/http://europesworld.org/author/josefjoffe/"
                },
                {
                    "name": "Goldman Sachs Foundation (Beiratsmitglied)",
                    "more_info": "http://de.wikipedia.org/wiki/Goldman_Sachs",
                    "src": "http://web.archive.org/web/20140825161247/http://tec.fsi.stanford.edu/people/josef_joffe/"
                },
                {
                    "name": "(Ehem.) Hypovereinsbank (Beiratsmitglied)",
                    "more_info": "http://de.wikipedia.org/wiki/Hypovereinsbank",
                    "src": "http://web.archive.org/web/20140825161247/http://tec.fsi.stanford.edu/people/josef_joffe/"
                },
                {
                    "name": "International Institute for Strategic Studies (Mitglied)",
                    "more_info": "http://de.wikipedia.org/wiki/International_Institute_for_Strategic_Studies",
                    "src": "http://web.archive.org/web/20140825161247/http://tec.fsi.stanford.edu/people/josef_joffe/"
                },
                {
                    "name": "Münchner Sicherheitskonferenz (Teilnehmer)",
                    "more_info": "http://de.wikipedia.org/wiki/M%C3%BCnchner_Sicherheitskonferenz",
                    "src": "http://web.archive.org/web/20140825161247/http://tec.fsi.stanford.edu/people/josef_joffe/"
                }
            ]
        }
    }
}