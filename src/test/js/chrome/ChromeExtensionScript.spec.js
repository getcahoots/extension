describe('ChromeExtensionScript', function suite() {
    var originalChrome;


    beforeEach(function () {
        originalChrome = chrome;
        chrome = getChromeMock();
    });


    afterEach(function() {
        chrome = originalChrome;
    });


    it('should be defined', function test(done) {
        var extensionScript = cahoots.chrome.extension;
        expect(extensionScript).toBeDefined();
        done();
    });

    it('should execute extension script', function test() {
        var extensionScript = cahoots.chrome.extension;
        extensionScript.chromeExtensionScript();
    });
})