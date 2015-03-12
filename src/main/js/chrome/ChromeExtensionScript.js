'use strict'

var debug = false;
if(debug) console.log("executing chrome extension script")

var CahootsStorage = cahoots.extension.CahootsStorage;
var cahootsStorage = new CahootsStorage(window.localStorage)

var StorageUpdater = cahoots.extension.StorageUpdater;
var updater = new StorageUpdater(cahootsStorage,'https://api.cahoots.pw/v1');

updater.checkUpdate(new XMLHttpRequest(),new XMLHttpRequest(),function(){

}); // runs async

var QueryService = cahoots.extension.QueryService;
var queryService = new QueryService(cahootsStorage);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
    if(request.message=="getAuthorHints") {
        var authorHints = queryService.findAuthorHints();
        sendResponse(authorHints)
    } else if(request.message=="getFullDetails") {
        var authorDetails = queryService.findAuthorDetails(request.cahootsID)
        sendResponse(authorDetails)
    }
})

if (!window.localStorage.getItem('hasSeenIntro')) {
    window.localStorage.setItem('hasSeenIntro', 'yep');
    chrome.tabs.create({
        url: 'https://getcahoots.github.io/extension/news/1.0.0.html'
    });
}
