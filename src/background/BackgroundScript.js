import QueryService from './QueryService';
import UpdateWorker from './UpdateWorker';
import backgroundProperties from './backgroundProperties';

class BackgroundScript {

    initQueryService() {
        this.queryService = new QueryService();
    }

    /**
     * add handlers for contentScript messages
     */
    initChrome(chrome) {
        let queryService = this.queryService;
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            console.log('chrome.runtime.onMessage.addListener', arguments);
            if(request.message === 'getAuthorHints') {
                console.log('backgroundapp: author hints requested ');
                queryService.queryAuthorHints().then((authorHints) => {
                    console.log('backgroundapp sending author hints: ' + typeof authorHints)
                    sendResponse(authorHints)
                });

            } else if(request.message === 'getFullDetails') {
                const authorDetails = queryService.queryAuthorDetails(request.cahootsID);
                sendResponse(authorDetails)

            } else if (request.message === 'reportMatches') {
                const requestingTabId = sender.tab.id;
                const matchCount = request.matchCount;
                if(matchCount > 0) {
                    chrome.pageAction.show(requestingTabId);
                    let tabTitle = "";
                    if(matchCount === 1) {
                        tabTitle = backgroundProperties.pageActionTitleSingleHit;
                    } else {
                        tabTitle = backgroundProperties.pageActionTitleMultipleHits.replace(/COUNT/i, matchCount);
                    }
                    chrome.pageAction.setTitle({tabId: requestingTabId, title: tabTitle});
                } else {
                    chrome.pageAction.hide(requestingTabId);
                }
            }
        });
    }

    initUpdateWorker() {
        const updateWorker = new UpdateWorker();
        updateWorker.startWatchingForUpdates();
    }

}

export default BackgroundScript;