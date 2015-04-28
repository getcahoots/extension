describe('FirefoxExtensionScript', function suite() {
    var firefoxMock;
    //var firefoxExtensionScript = require('firefox/lib/FirefoxExtensionScript');

    beforeEach(function () {
        firefoxMock = getFirefoxMock();
        originalFirefoxPort = window.self.port;
        window.self.port = firefoxMock.port;
    });

    afterEach(function() {
        window.self.port = originalFirefoxPort;
    })

    xit('should execute extension script', function test() {
        //firefoxExtensionScript.main();
    });
});