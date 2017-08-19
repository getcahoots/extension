export default class ChromeMock {
    constructor() {
        this.init_runtime();
    }

    init_runtime() {
        this.runtime = {
            onMessage: {
                addListener: function () {
                }
            },
            sendMessage: function (obj, callback) {
                if (obj.message === "getAuthorHints") {
                    callback({'Dieter Hammerlash': 'CahootsID_deadbeef'});
                }

                if (obj.message === "getFullDetails") {
                    if (obj.cahootsID === "CahootsID_deadbeef") {
                        callback({
                            "name": "Dieter Hammerlash",
                            "info": "http://de.wikipedia.org/wiki/Dieter_Hammerlash",
                            "id": "CahootsID_deadbeef",
                            "cahoots": []
                        });
                    }

                }
            }
        }
    }

    init_pageAction() {
        this.pageAction =  {
            show: function () {
            },
            onClicked: {
                addListener: function () {
                }
            }
        }
    }

    init_tabs() {
        this.tabs = {
            create: function () {}
        }
    }

}