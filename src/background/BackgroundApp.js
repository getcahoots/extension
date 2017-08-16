import QueryService from './QueryService';
import UpdateWorker from './UpdateWorker';


class BackgroundApp {

    initConfig() {

    }

    initQueryService() {
        this.queryService = new QueryService();
    }

    initChrome() {
        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
            if(request.message === 'getAuthorHints') {
                var authorHints = this.queryService.queryAuthorHints();
                sendResponse(authorHints)
            } else if(request.message === 'getFullDetails') {
                var authorDetails = this.queryService.queryAuthorDetails(request.cahootsID);
                sendResponse(authorDetails)
            }
        });



        chrome.runtime.onMessage.addListener(function (request, sender) {
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