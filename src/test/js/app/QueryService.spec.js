'use strict';

describe('QueryService', function () {


    var providerMerger;
    describe('commonjs interfaces', function () {

        var QueryService = require('app/extension/QueryService');
        var CahootsStorage = require('app/extension/CahootsStorage');
        var ProviderMerger = require('app/extension/ProviderMerger');

        var storage;


        beforeEach(function () {
            window.localStorage.clear();
            providerMerger = new ProviderMerger();
            storage = new CahootsStorage(window.localStorage, providerMerger);
        });

        it('should create', function () {
            var qs = new QueryService(storage);
            expect(qs).toBeDefined();
        });


        describe('tests on mocked storage', function suite() {
            var inputPersons, inputOrganizations, expectedAuthorHints;

            beforeEach(function () {
                expectedAuthorHints = MockFactory.set1.getHints();
                inputPersons = MockFactory.set1.getPersons();
                inputOrganizations = MockFactory.set1.getOrganizations();

                providerMerger = new ProviderMerger();
                window.localStorage.clear();
                storage = new CahootsStorage(window.localStorage, providerMerger);
                storage._setPersons(inputPersons);
                storage._setOrganizations(inputOrganizations);
            });

            it('should find author hints', function test() {
                var qs = new QueryService(storage);
                var authorHints = qs.queryAuthorHints();
                expect(authorHints).not.toEqual({});
                expect(authorHints).toEqual(expectedAuthorHints);
            });

            it('AC_30_1: should only serve queried entities with at least one cahoots entry', function test() {
                var qs = new QueryService(storage);
                var authorHints = qs.queryAuthorHints();
                expect(authorHints).toEqual(expectedAuthorHints);
            });

            it('should return author detail dto for existing author', function test() {
                var qs = new QueryService(storage);
                var authorDto = qs.queryAuthorDetails(MockFactory.set1.getPersons()[0].id);
                expect(authorDto).toBeDefined();
                expect(authorDto).not.toEqual({});
                expect(authorDto.name).toEqual(MockFactory.set1.getPersons()[0].name);
                expect(authorDto.id).toEqual(MockFactory.set1.getPersons()[0].id);
                expect(authorDto.info).toEqual(MockFactory.set1.getPersons()[0].info);
            });
        });

        describe('tests on empty storage', function suite() {
            var emptyStorage;

            beforeEach(function () {
                window.localStorage.clear();
                emptyStorage = new CahootsStorage(window.localStorage, providerMerger);
            });

            it('should return empty hints on empty storage without throwing error', function test() {
                var qs = new QueryService(emptyStorage);
                var ah = qs.queryAuthorHints();
                expect(ah).toEqual({});
            });

            xit('should return empty details on empty storage without throwing error', function test() {
                // TODO
            });
        });


        xit('should map a dto', function test() {
            // TODO
        });

    });
});
