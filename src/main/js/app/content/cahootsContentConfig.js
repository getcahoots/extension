/**
 * cahoots extension
 *
 * Copyright Cahoots.pw
 * MIT Licensed
 *
 */
(function () {
    var cahootsContentConfig = {
        tooltip: {
            interactive: true,
            animation: 'grow',
            delay: '120',
            speed: '210',
            timer: '440',
            autoClose: true,
            repositionOnScroll: true
        },
        snippets: {
            reportErrorUrl: 'mailto:mail@cahoots.pw?subject=Fehler',
            verifiedCaption: 'Vom Autor verifizierte Verbindung',
            unknownRole: 'Art der Verbindung unbekannt',
            cahoots_url: 'http://www.cahoots.pw/',
            forum_url: 'https://forum.cahoots.pw/',
            loading_text: 'Daten werden geladen…'
        },
        debug: false,
        tooltipsterSelector: 'span[class*=CahootsID]',
        jumpSelector: 'span[class*=CahootsID].tooltipstered',
        skipSubFrames: true
    };

    module.exports = cahootsContentConfig;
}());