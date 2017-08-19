import Messenger from './Messenger';
import ChromeMock from '../test/ChromeMock';




describe('Messenger.js', () => {
    it('should fetch author hints', async () => {
        let chromeMock = new ChromeMock();

        let messenger = new Messenger(chromeMock);
        let authorHints = await messenger.findAuthorHints();

        expect(authorHints).toBeDefined();
        expect(authorHints).toEqual({'Dieter Hammerlash': 'CahootsID_deadbeef'});
    });

    it('should fetch author details', async () => {
        let chromeMock = new ChromeMock();

        let messenger = new Messenger(chromeMock);
        let authorDetails = await messenger.findAuthorDetails('CahootsID_deadbeef');

        expect(authorDetails).toBeDefined();
        expect(authorDetails).not.toEqual({});
        expect(authorDetails.name).toEqual('Dieter Hammerlash');
        expect(authorDetails.id).toEqual('CahootsID_deadbeef');
        expect(authorDetails.info).toEqual('http://de.wikipedia.org/wiki/Dieter_Hammerlash');
    });
});