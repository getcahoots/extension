import StorageService from './StorageService';
import '../test/localStorageMock';
import TestDataPersons from '../test/persons.json'
import TestDataOrganizations from '../test/organizations.json'

describe('StorageService.js', () => {

    let storageService = null;
    beforeEach(()=> {
        console.log('----------------------')
        storageService = StorageService.getInstance()
    })

    it('should build storage service', () => {

        expect(storageService).toBeDefined();
    });

    test('should return initially given persons', function () {
        const mockPersons = TestDataPersons;
        storageService._setPersons(mockPersons)
        expect(storageService.findPersons()).toEqual(mockPersons);
    })

    test('should return initially given organizations', function () {
        const mockOrganizations = TestDataOrganizations;
        storageService._setOrganizations(mockOrganizations)
        expect(storageService.findOrganizations()).toEqual(mockOrganizations);
    })


    it('should accept setData call', () => {

        const mockPersons = TestDataPersons
        const mockOrganizations = TestDataOrganizations

        console.log(mockPersons);
        storageService.updateProviderData({
            persons: mockPersons,
            organizations: mockOrganizations,
            lastUpdated: 34
        })
        // console.log(persons);
        // expect(persons).toBeDefined();

    });

    it('should find persons after setData call', () => {

        const mockPersons = TestDataPersons
        const mockOrganizations = TestDataOrganizations

        storageService.updateProviderData({
            persons: mockPersons,
            organizations: mockOrganizations,
            lastUpdated: 34
        })
        // console.log(persons);
        // expect(persons).toBeDefined();

        storageService.findPerson

    });

    // xit('should query persons', () => {
    //     let storageService = new StorageService();
    //     const persons = storageService.getPersons();
    //     console.log(persons);
    //     expect(persons).toBeDefined();
    //
    //     const organizations = storageService.getOrganizations();
    // });
    //
    // xit('should query organizations', () => {
    //     let storageService = new StorageService();
    //     const organizations = storageService.getOrganizations();
    //     console.log(organizations);
    //     expect(organizations).toBeDefined();
    //
    // });
})
