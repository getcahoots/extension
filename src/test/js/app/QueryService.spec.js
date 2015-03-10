'use strict'

describe('QueryService', function(){
    var expectedAuthorHints = MockFactory.set1.getHints();

    var inputPersons = MockFactory.set1.getPersons();

    describe('commonjs interfaces',function(){

        var QueryService = require('app/extension/QueryService');
        var CahootsStorage = require('app/extension/CahootsStorage');

        var storage = null;
        beforeEach(function(){
            storage = new CahootsStorage({});
            storage._setPersons(inputPersons)
        })
        it('should create', function() {

            var qs = new QueryService(storage)
            expect(qs).toBeDefined()
            //console.log(qs.findAuthorHints())
        })

        it('should find author hints', function() {

            var qs = new QueryService(storage)
            var ah = qs.findAuthorHints();
            expect(ah).toEqual(expectedAuthorHints);
        })
    })


})