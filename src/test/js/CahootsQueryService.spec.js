describe('CahootsQueryService', function(){
    var expectedAuthorHints = {'Jonas Bergmeier':'CahootsID_a70ac98f6379aca6e45a602ece8d9c28',
        'Alexander Barnickel':'CahootsID_602ece8d9c28aca6e45a602ece8d9c28',
        'André König':'CahootsID_ecb66435f42c7bb716b20b0d887d83a9'};

    var inputPersons = [{
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
    }];

    describe('commonjs interfaces',function(){
        var CahootsQueryService = require('CahootsQueryService');;
        var CahootsStorage = require('CahootsStorage');

        beforeEach(function(){
        })
        it('should create', function() {

            var qs = new CahootsQueryService("loL")
            //console.log(qs.findAuthorHints())
        })

        it('should find author hints', function() {
            var storage = new CahootsStorage({});
            storage.setPersons(inputPersons)
            var CahootsQueryService = require('CahootsQueryService');
            var qs = new CahootsQueryService(storage)
            var ah = qs.findAuthorHints();
            expect(ah).toEqual(expectedAuthorHints);
        })
    })


})