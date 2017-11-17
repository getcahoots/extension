import '../test/localStorageMock';

import StorageService from './StorageService';
import QueryService from './QueryService';
import StorageRepository from './StorageRepository';

describe('QueryService', () => {
    describe('tests on empty storage', function suite() {
        let emptyStorageService;

        beforeEach(function () {
            // localStorageMock = localStorageMock();
            emptyStorageService = new StorageService(new StorageRepository())
        });

        it('should return empty hints on empty storage without throwing error', function test() {
            const qs = new QueryService(emptyStorageService);
            qs.queryAuthorHints().then((ah) => {
                expect(ah).toEqual({});
            });

        });

    });
});