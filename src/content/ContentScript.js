import DocumentScanner from './DocumentScanner';

export default class ContentScript {

    constructor(messenger, documentScanner, highlighter, tooltipsterWrapper) {
        this.messenger = messenger;
        this.documentScanner = documentScanner;
        this.highlighter = highlighter;
        this.tooltipsterWrapper = tooltipsterWrapper;
    }


    runInTab(document) {
        // console.log('entered tab runner')

        //console.log('start query author hints')
        this.messenger.findAuthorHints().then(authorHints => {
            //console.log('resolved author hints', typeof authorHints)
            if (authorHints == null) {
                //console.log(authorHints)
                throw new Error('unable to retrieve authorHints from messenger, is null?!')
            }
            //console.log('authorHints received on content app:', authorHints)
            //console.log(`got authorHints, scanning...`)
            const matchingKeys = this.documentScanner.findMatchingKeys(document, authorHints);
            //console.log(`got ${matchingKeys.length} matchingKeys, highlighting...`)
            this.highlighter.highlightMatches(matchingKeys, authorHints, document);
            //console.log('tooltipster...')
            this.tooltipsterWrapper.applyTooltipsterHandler(document)
        })

        // console.log('exited tab runner')
    }


}