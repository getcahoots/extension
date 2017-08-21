import ChromeMock from './ChromeMock';

it('chrome mock', () => {
    const chromeMock = new ChromeMock();

    expect(chromeMock.runtime).toBeDefined();
});