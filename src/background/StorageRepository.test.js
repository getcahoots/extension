import StorageRepository from './StorageRepository';
import localStorageMock from '../test/localStorageMock';

it('should instantiate', () => {
    const storageRepository = new StorageRepository()
})
it('should set a field', () => {
    const storageRepository = new StorageRepository()
    storageRepository.setField('foo', 'bar');
})

it('should read a field', () => {
    const storageRepository = new StorageRepository()
    const field = storageRepository.getField('foo');
    expect(field).toEqual('bar')
})