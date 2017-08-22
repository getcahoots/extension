
import ProviderMerger from './ProviderMerger';
import StorageService from './StorageService';

describe('QueryService', () => {
    describe('tests on empty storage', function suite() {
        let emptyStorage;
        let localStorageMock;

        beforeEach(function () {
            localStorageMock = localStorageMock();
            emptyStorage = new StorageService()
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
});