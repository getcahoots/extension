import QueryService from './QueryService';
import UpdateWorker from './UpdateWorker';


class BackgroundApp {

    initConfig() {

    }

    initQueryService() {
        this.queryService = new QueryService();
    }

    initChrome() {
        let queryService = this.queryService;
        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
            console.log('chrome.runtime.onMessage.addListener', arguments)
            if(request.message === 'getAuthorHints') {
                console.log('backgroundapp: author hints requested ')
                const authorHints = queryService.queryAuthorHints();
                console.log('backgroundapp sending author hints: ' + typeof authorHints)
                sendResponse(authorHints)
            } else if(request.message === 'getFullDetails') {
                var authorDetails = queryService.queryAuthorDetails(request.cahootsID);
                sendResponse(authorDetails)
            }
        });



        chrome.runtime.onMessage.addListener(function (request, sender) {
            console.log(arguments)
            if (request.message == 'reportMatches') {
                var tabId = sender.tab.id;
                var matchCount = request.matchCount;
                if(matchCount > 0) {
                    chrome.pageAction.show(tabId);
                    var tabTitle = "";
                    if(matchCount == 1) {
                        tabTitle = config.pageActionTitleSingleHit;
                    } else {
                        tabTitle = config.pageActionTitleMultipleHits.replace(/COUNT/i, matchCount);
                    }
                    chrome.pageAction.setTitle({tabId: tabId, title: tabTitle});
                } else {
                    chrome.pageAction.hide(tabId);
                }

            }
        });


    }

    initUpdateWorker() {
        const updateWorker = new UpdateWorker();
        updateWorker.startWatchingForUpdates();
    }

}



export default BackgroundApp;