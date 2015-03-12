FirefoxMock = {};
FirefoxMock.registeredHandlers = {};
FirefoxMock.port = {
    once: function (msgName, callback) {
        //console.log("once " + msgName)
        if (['gotAuthorHints', 'gotFullDetails'].indexOf(msgName) > -1) {
            FirefoxMock.registeredHandlers[msgName] = callback;
            if (!typeof callback == "function") {
                throw "callback is not a function"
            }
        } else {
        }
    }
    ,
    emit: function (msgName, payload) {
        if (msgName == "getAuthorHints") {
            FirefoxMock.registeredHandlers["gotAuthorHints"](MockFactory.set1.getHints())
        } else if (msgName == "getFullDetails") {
            if (payload == "c29bca5141c539897b9fb19fc071dd12475e86aa")
                FirefoxMock.registeredHandlers[msgName](MockFactory.set1.getDummyPerson())
        } else {
        }
    }
}

getFirefoxMock = function () {
    return FirefoxMock
}