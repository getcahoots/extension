'use strict'

var CahootsStorage = cahoots.extension.CahootsStorage;
var cahootsStorage = new CahootsStorage(localStorage)

var StorageUpdater = cahoots.extension.StorageUpdater;
var updater = new StorageUpdater('https://api.cahoots.pw/v1');

var xhr1 = new XMLHttpRequest()
var xhr2 = new XMLHttpRequest()
updater.update(xhr1,xhr2, cahootsStorage,function(){

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