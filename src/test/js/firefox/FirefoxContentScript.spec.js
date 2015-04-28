describe('FirefoxContentScript', function suite() {
    var f;
    var tabFixture = 'src/test/resources/html/browserTabFixture.html';
    var originalFirefoxPort;

    var firefoxMock;
    var firefoxContentScript = cahoots.firefox.content.firefoxContentScript;

    beforeEach(function () {


        f = jasmine.getFixtures();
        f.fixturesPath = 'base';
        f.load(tabFixture);

        firefoxMock = getFirefoxMock()
        originalFirefoxPort = window.self.port;
        window.self.port = firefoxMock.port;

        //jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    });


    afterEach(function() {
        window.self.port = originalFirefoxPort;
    });


    it('should demand authorHints', function () {
        spyOn(window.self.port, 'once').and.callThrough();

        firefoxContentScript();

        expect(window.self.port.once).toHaveBeenCalledWith('gotAuthorHints', jasmine.any(Function));
    });
});