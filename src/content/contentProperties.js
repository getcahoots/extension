const contentProperties = {
    tooltip: {
        interactive: true,
        animation: 'grow',
        delay: '220',
        speed: '210',
        timer: '440',
        autoClose: true
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

export default contentProperties;