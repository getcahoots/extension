'use strict';

describe('CahootsUiFormatter', function suite () {
    var CahootsUiFormatter = require("CahootsUiFormatter").CahootsUiFormatter;

    var dataResponse = {"name":"Stefan Kornelius","info":"http://de.wikipedia.org/wiki/Stefan_Kornelius","id":"c29bca5141c539897b9fb19fc071dd12475e86aa","cahoots":[{"id":"d8870d0a214850fa4a3e3442dd7f27fbd7bf5b90","info":"https://www.atlantik-bruecke.org/","name":"Atlantik-Brücke e.V.","source":"https://github.com/wuwi/cahoots/blob/master/misc/stefan_kornelius_mail.txt"},{"id":"30a45eaeae3f2aada0d92a9c9fa49d4fe1787a27","info":"https://dgap.org/de","name":"Deutsche Gesellschaft für Auswärtige Politik","source":"https://github.com/wuwi/cahoots/blob/master/misc/stefan_kornelius_mail.txt"},{"id":"666e96e1b6f04f8718333bef903e66b536a526f5","info":"http://de.wikipedia.org/wiki/Bundesakademie_f%C3%BCr_Sicherheitspolitik","name":"Bundesakademie für Sicherheitspolitik","source":"https://github.com/wuwi/cahoots/blob/master/misc/stefan_kornelius_mail.txt"},{"id":"23daf094b3eb17b829b6f53450827532652d0f36","info":"http://de.wikipedia.org/wiki/Deutsch-Russisches_Forum","name":"Deutsch-Russisches Forum","source":"https://github.com/wuwi/cahoots/blob/master/misc/stefan_kornelius_mail.txt"},{"id":"fbcc6b8f8b05fb1f6e5368fcb1794a9d8ec56be0","info":"http://de.wikipedia.org/wiki/K%C3%B6rber-Stiftung","name":"Körber-Stiftung","source":"https://web.archive.org/web/20140302133310/http://www.koerber-stiftung.de/koerberforum/gaeste/gaeste-details/gast/stefan-kornelius.html"},{"id":"810a5143c4e8ddbac2599ce51a38c6a02a8f903b","info":"http://www.aicgs.org/","name":"American Institute for Contemporary German Studies","source":"https://web.archive.org/web/20140914130152/http://www.message-online.com/archiv/message-1-2013/leseproben/die-naehe-zur-macht/"},{"id":"784f80f51783be55b9adf7574300aceabafc0b83","info":"http://www.deutscheatlantischegesellschaft.de/cms/front_content.php?idcat=73&lang=1","name":"Deutsche Atlantische Gesellschaft","source":"https://web.archive.org/web/20140914130152/http://www.message-online.com/archiv/message-1-2013/leseproben/die-naehe-zur-macht/"},{"id":"87f7024d1331f7ab67c4ea3c50c7eaf49441fcd7","info":"http://de.wikipedia.org/wiki/M%C3%BCnchner_Sicherheitskonferenz","name":"Münchner Sicherheitskonferenz","source":"https://web.archive.org/web/20140716065613/https://www.securityconference.de/de/veranstaltungen/munich-security-conference/msc-2014/teilnehmer/"}]};
    var f;


    var uif = null;

    beforeEach(function() {
        //f = jasmine.getFixtures();
        //f.fixturesPath = 'base';

        uif = new CahootsUiFormatter();
    });

    //
    //describe('basic tests', function() {
    //
    //    beforeEach(function() {
    //        uif = new CahootsUiFormatter();
    //    });
    //})

    it('should call', function(){
        //var emptyHtmlUrl = 'src/test/html/empty.html'
        //f.load(authorsUrl);

        //var placeholder = jQuery("placeholder");
        //uif.createDetailsView(placeholder,dataResponse);
        var elem = new jQuery("<div></div>");
        var resultElem = uif.createDetailsView(elem, dataResponse);

        expect(resultElem).toBeDefined();
        //console.log(resultElem)
        //var page = require('webpage').create();

        //page.open(emptyHtmlUrl, function() {
        //    page.render('github.png');
        //    phantom.exit();
        //});
    })

    //it('should screenshot', function(){
    //    var emptyHtmlUrl = 'src/test/html/empty.html'
    //    //f.load(authorsUrl);
    //
    //    //var placeholder = jQuery("placeholder");
    //    //uif.createDetailsView(placeholder,dataResponse);
    //    var elem = new jQuery("<div></div>");
    //    var resultElem = uif.createDetailsView(elem, dataResponse);
    //
    //    expect(resultElem).toBeDefined();
    //    var page = require('webpage').create();
    //
    //    //page.open(emptyHtmlUrl, function() {
    //    //    page.render('github.png');
    //    //    phantom.exit();
    //    //});
    //})

//    it('access', function() {
//        var htmlContext = f.read(authorsUrl);
//        console.log(jQuery('br',htmlContext))
//    });




    /* it('should find authors keys from page', function() {
     cahootsRunner = new CahootsRunner(mockData());

     var foundKeys = cahootsRunner.findMatchingKeys(mockAuthors())
     expect(foundKeys).toEqual([ 'Jochen Bittner', 'Robert Leicht', 'Josef Joffe' ])
     })

     it('should highlight author occurrences in page', function() {

     cahootsRunner = new CahootsRunner(mockData());
     cahootsRunner.highlightGivenKeys([ 'Jochen Bittner', 'Robert Leicht', 'Josef Joffe' ]);
     //        console.log(document)

     })

     it('should attach tooltip to highlighted occurrences', function() {

     })
     */
});


