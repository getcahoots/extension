export default class DocumentScanner {

    findMatchingKeys(document, authorHints) {
        if (document == null) {
            throw new Error('document is null')
        }
        if (authorHints == null) {
            throw new Error('authorHints is null')
        }

        const foundKeys = [];
        for (let key in authorHints) {
            if (jQuery('form:contains("' + key + '")', document).length > 0) {
                break;
            }
            if (jQuery('body:contains("' + key + '")', document).length <= 0) {
                continue;
            }
            foundKeys.push(key);
        }
        return foundKeys;
    }
}