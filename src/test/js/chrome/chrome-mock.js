getChromeMock = function() {
    return {
        pageAction: {
            show: function () {
            },
            onClicked: {
                addListener: function () {
                }
            }
        },
        runtime: {
            onMessage: {
                addListener: function () {
                }
            },
            sendMessage: function (obj, callback) {
                if (obj.message == "getAuthorHints") {
                    callback({'Oliver Sommer': 'CahootsID_c29bca5141c539897b9fb19fc071dd12475e86aa'});
                }

                if (obj.message == "getFullDetails") {
                    if (obj.cahootsID == "c29bca5141c539897b9fb19fc071dd12475e86aa") {
                        callback({
                            "name": "Oliver Sommer",
                            "info": "http://de.wikipedia.org/wiki/Blubb",
                            "id": "c29bca5141c539897b9fb19fc071dd12475e86aa",
                            "cahoots": []
                        });
                    }

                }
            }
        }
    }
}