const backgroundProperties = {
    cahootsExtensionVersion: '${BUILD_CAHOOTS_VERSION}',

    /* expiry delta (ms) */
    expiryDelta: (60 * 60 * 24) * 1000, // for production

    apiEndpoint: 'https://cahoots.now.sh/v2',
    apiEndpointUpdateUrl: 'https://getcahoots.github.io/extension/config/extension.json',
    pageActionTitleSingleHit: 'Cahoots: Eine Verbindung gefunden',
    pageActionTitleMultipleHits: 'Cahoots: COUNT Verbindungen gefunden',
    pageActionTitleDefault: 'Cahoots: bereit',
    pageActionTitleNothingFound: 'Cahoots: nichts gefunden',
    icons: {
        smallActive: '${ICON_14}',
        smallInactive: '${ICON_14_GREY}'
    },
    enableFirefoxPageActionEmulation: false, // buggy, disable for now
    showVersionUpdatePage: false,
    debug: false,
    releaseNotesInfoUrl: 'https://getcahoots.github.io/extension/news/${BUILD_CAHOOTS_VERSION}.html'
};

export default backgroundProperties;