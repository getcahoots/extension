describe('FirefoxExtensionScript', function suite() {
    var firefoxMock;
    //var firefoxExtensionScript = require('firefox/lib/FirefoxExtensionScript');
    //var firefoxExtensionScript = require('FirefoxExtensionBundle');
    console.log(">>>")
    console.log( cahoots.firefox)
    for(var i in cahoots.firefox) {
        console.log(i)
    }
    console.log(">>>")
    var firefoxExtensionScript = cahoots.firefox.extension.firefoxExtensionScript;
    var cahootsBase = cahoots;

    //console.log("cahoots extension. " + cahoots.extension)
    beforeEach(function () {
        firefoxMock = getFirefoxMock();
        originalFirefoxPort = window.self.port;
        window.self.port = firefoxMock.port;


        var foo = require("sdk/self")
    });

    afterEach(function() {
        window.self.port = originalFirefoxPort;
    })

    it('should execute extension script', function test() {
        firefoxExtensionScript(cahootsBase);
    });
});