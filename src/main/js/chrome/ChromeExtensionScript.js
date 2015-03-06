console.log("entering event page body")
//console.log(cahoots)
var CahootsStorage = cahoots.extension.CahootsStorage;
var cahootsStorage = new CahootsStorage(localStorage)

var CahootsStorageGenericUpdater = cahoots.extension.CahootsStorageGenericUpdater;
var updater = new CahootsStorageGenericUpdater('https://api.cahoots.pw/v1');

//console.log(cahoots.eventbundle);

var xhr1 = new XMLHttpRequest()
var xhr2 = new XMLHttpRequest()
updater.update(xhr1,xhr2, cahootsStorage,function(){
    console.log("run through update on event page")
}); // runs async

// 3. create query service with storage
var CahootsQueryService = cahoots.extension.CahootsQueryService;
var queryService = new CahootsQueryService(cahootsStorage);

// 4. wire events

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
    console.log("event page received: " + request.message +" from " + sender)
    console.log(request)
    console.log(sender)
    if(request.message=="getAuthorHints") {
        console.log("fetching author hints from query service")
        var authorHints = queryService.findAuthorHints();
        console.log("sending author hints response: ")
        console.log(authorHints)
        sendResponse(authorHints)
    } else if(request.message=="getFullDetails") {
        var authorDetails = queryService.findAuthorDetails(request.cahootsID)
        sendResponse(authorDetails)
    } else {
        console.log("ignoring event message " + request.message)
    }
})

console.log("leaving event page body")