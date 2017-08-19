export default class Messenger {

    constructor(chrome) {
        this.chrome = chrome;

    }

    findAuthorHints() {
        // return "foo"
        console.log('findAuthorHints enter')
        let promise = new Promise((resolve, reject) => {
            console.log('sending message: author hints')
            this.chrome.runtime.sendMessage({message: "getAuthorHints"}, function (response) {
                console.log('getting message response, resolving author hints: ', typeof response)
                // console.log(response)

                if (typeof response !== 'object') {
                    throw new Error('getAuthorHints reponse is not an object, aborting: ' + typeof response)
                }
                resolve(response)
            });
        });
        return promise
    }

    async findAuthorDetails(lookupId) {
        let a = await new Promise((resolve, reject) => {
            this.chrome.runtime.sendMessage({ message: "getFullDetails", cahootsID: lookupId}, function (response) {
                resolve(response)
            });
        });
        return a
    }
}