FirefoxMock = {};
FirefoxMock.registeredHandlers = {};
FirefoxMock.port = {
    once: function (msgName, callback) {
        console.log("once " + msgName)
        if (['gotAuthorHints', 'gotFullDetails'].indexOf(msgName) > -1) {
            FirefoxMock.registeredHandlers[msgName] = callback;
            if (!typeof callback == "function") {
                throw "callback is not a function"
            }
            console.log("registering " + msgName)
        } else {
            console.log("firefox mock ignoring once: " + msgName);
        }
    }
    ,
    emit: function (msgName, payload) {
        console.log("emit " + msgName + ", payload: " + payload)
        if (msgName == "getAuthorHints") {
            console.log(typeof FirefoxMock.registeredHandlers[msgName])
            FirefoxMock.registeredHandlers["gotAuthorHints"](MockFactory.set1.getHints())
        } else if (msgName == "getFullDetails") {
            if (payload == "c29bca5141c539897b9fb19fc071dd12475e86aa")
                FirefoxMock.registeredHandlers[msgName](MockFactory.set1.getStefan())
        } else {
            console.log("firefox mock ignoring emit: " + msgName + ", " + payload);
        }

    }
}

getFirefoxMock = function () {
    return FirefoxMock
}