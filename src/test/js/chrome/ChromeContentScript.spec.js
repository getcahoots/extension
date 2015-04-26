describe('ChromeContentScript', function suite() {
    var f;
    var tabFixtureBasic = 'src/test/resources/html/browserTabFixture.html';
    var tabFixtureSubName = 'src/test/resources/html/subNameMatchingFixture.html';
    var originalChrome;

    var domDelay = 300;
    var cs = cahoots.chrome.content.chromeContentScript;

    beforeEach(function setUp() {
        originalChrome = chrome;
        chrome = getChromeMock();
    });

    afterEach(function tearDown() {
        chrome = originalChrome;
    });

    describe('basic fixture tests', function suite() {

        beforeEach(function () {
            f = jasmine.getFixtures();
            f.fixturesPath = 'base';
            f.load(tabFixtureBasic);
        });


        it('should demand authorHints', function () {
            spyOn(chrome.runtime, 'sendMessage');

            var CahootsUiFormatter = cahoots.chrome.content.CahootsUiFormatter;
            //var CahootsUiFormatter = require('CahootsUiFormatter');
            // inject content script
            cs()

            // fire dom ready
            var event = document.createEvent("HTMLEvents");
            event.initEvent("DOMContentLoaded", true, true);
            document.dispatchEvent(event)

            expect(chrome.runtime.sendMessage).toHaveBeenCalledWith({message: 'getAuthorHints'}, jasmine.any(Function))
        })


        it('should tooltipster', function () {
            // ensure element does not exist beforehand
            var notexistingElement = jQuery("span.CahootsID_c29bca5141c539897b9fb19fc071dd12475e86aa.tooltipstered");
            expect(typeof notexistingElement.get(0)).toBe('undefined')

            // inject content script
            cs()

            // fire dom ready
            var event = document.createEvent("HTMLEvents");
            event.initEvent("DOMContentLoaded", true, true);
            document.dispatchEvent(event)

            // check transformed element
            var expectedElement = jQuery('<span class="CahootsID_c29bca5141c539897b9fb19fc071dd12475e86aa tooltipstered">Oliver Sommer</span>');
            var transformed = jQuery("span.CahootsID_c29bca5141c539897b9fb19fc071dd12475e86aa.tooltipstered");
            expect(transformed.get(0).outerHTML).toBe(expectedElement.get(0).outerHTML);
        })

        it('should demand authorDetails', function (done) {
            spyOn(chrome.runtime, 'sendMessage').and.callThrough();

            // inject content script
            cs()

            // fire dom ready
            var event = document.createEvent("HTMLEvents");
            event.initEvent("DOMContentLoaded", true, true);
            document.dispatchEvent(event)

            expect(chrome.runtime.sendMessage).toHaveBeenCalledWith({message: 'getAuthorHints'},
                jasmine.any(Function)
            )

            chrome = getChromeMock();
            spyOn(chrome.runtime, 'sendMessage').and.callThrough();
            expect(jQuery('span.CahootsID_c29bca5141c539897b9fb19fc071dd12475e86aa.tooltipstered')).toBeDefined()

            var transformed = document.getElementsByClassName('CahootsID_c29bca5141c539897b9fb19fc071dd12475e86aa tooltipstered').item(0)
            var mouseoverEvent = document.createEvent("Events");
            mouseoverEvent.initEvent("mouseover", true, false);
            transformed.dispatchEvent(mouseoverEvent)

            setTimeout(function () {
                expect(chrome.runtime.sendMessage)
                    .toHaveBeenCalledWith({
                        message: 'getFullDetails',
                        'cahootsID': 'c29bca5141c539897b9fb19fc071dd12475e86aa'
                    }, jasmine.any(Function))
                done();
            }, domDelay)
        })


        it('should display cahoots popover on mouseover', function (done) {
            spyOn(chrome.runtime, 'sendMessage').and.callThrough();

            // inject content script
            cs()

            // fire dom ready
            var event = document.createEvent("HTMLEvents");
            event.initEvent("DOMContentLoaded", true, true);
            document.dispatchEvent(event)

            expect(chrome.runtime.sendMessage).toHaveBeenCalledWith({message: 'getAuthorHints'},
                jasmine.any(Function)
            )

            chrome = getChromeMock();
            spyOn(chrome.runtime, 'sendMessage').and.callThrough();
            expect(jQuery('span.CahootsID_c29bca5141c539897b9fb19fc071dd12475e86aa.tooltipstered')).toBeDefined()

            var transformed = document.getElementsByClassName('CahootsID_c29bca5141c539897b9fb19fc071dd12475e86aa tooltipstered').item(0)
            var mouseoverEvent = document.createEvent("Events");
            mouseoverEvent.initEvent("mouseover", true, false);
            transformed.dispatchEvent(mouseoverEvent)

            // test if popover is present
            var tooltipsterClassFound = jQuery(".tooltipster-base").hasClass('tooltipster-base')
            expect(tooltipsterClassFound).toBe(true);


            setTimeout(function () {
                expect(chrome.runtime.sendMessage)
                    .toHaveBeenCalledWith({
                        message: 'getFullDetails',
                        'cahootsID': 'c29bca5141c539897b9fb19fc071dd12475e86aa'
                    }, jasmine.any(Function))

                done();
            }, domDelay)

        })


        it('should hide cahoots popover on mouseout', function (done) {
            spyOn(chrome.runtime, 'sendMessage').and.callThrough();

            // inject content script
            cs()

            // fire dom ready
            var event = document.createEvent("HTMLEvents");
            event.initEvent("DOMContentLoaded", true, true);
            document.dispatchEvent(event)

            expect(chrome.runtime.sendMessage).toHaveBeenCalledWith({message: 'getAuthorHints'},
                jasmine.any(Function)
            )

            chrome = getChromeMock();
            spyOn(chrome.runtime, 'sendMessage').and.callThrough();

            expect(jQuery('span.CahootsID_c29bca5141c539897b9fb19fc071dd12475e86aa.tooltipstered')).toBeDefined()

            var transformed = document.getElementsByClassName('CahootsID_c29bca5141c539897b9fb19fc071dd12475e86aa tooltipstered').item(0)
            var mouseOverEvent = document.createEvent("Events");
            mouseOverEvent.initEvent("mouseover", true, false);
            transformed.dispatchEvent(mouseOverEvent)

            setTimeout(function () {
                expect(chrome.runtime.sendMessage)
                    .toHaveBeenCalledWith({
                        message: 'getFullDetails',
                        'cahootsID': 'c29bca5141c539897b9fb19fc071dd12475e86aa'
                    }, jasmine.any(Function))

                var mouseOutEvent = document.createEvent("Events");
                mouseOutEvent.initEvent("mouseout", true, false);
                transformed.dispatchEvent(mouseOutEvent)

                setTimeout(function () {
                    var elem = document.getElementsByClassName('tooltipster-base').item(0);
                    expect(elem).toBeNull()
                    done();
                },domDelay);
            }, domDelay)
        });
    });




    describe('subname matching', function suite() {
        beforeEach(function () {
            f = jasmine.getFixtures();
            f.fixturesPath = 'base';
            f.load(tabFixtureSubName);
        });

        it('should tooltipster only for exact name matches', function () {
            // ensure element does not exist beforehand
            //var notexistingElement = jQuery("span.CahootsID_c29bca5141c539897b9fb19fc071dd12475e86aa.tooltipstered");
            //expect(typeof notexistingElement.get(0)).toBe('undefined')

            // inject content script
            cs()

            // fire dom ready
            var event = document.createEvent("HTMLEvents");
            event.initEvent("DOMContentLoaded", true, true);
            document.dispatchEvent(event)

            $match = jQuery("span.CahootsID_c29bca5141c539897b9fb19fc071dd12475e86aa.tooltipstered");

            expect($match.length).toBe(5);


            // check transformed element
            var expectedElement = jQuery('<span class="CahootsID_c29bca5141c539897b9fb19fc071dd12475e86aa tooltipstered">Oliver Sommer</span>');
            var transformed = jQuery("span.CahootsID_c29bca5141c539897b9fb19fc071dd12475e86aa.tooltipstered");
            expect(transformed.get(0).outerHTML).toBe(expectedElement.get(0).outerHTML);
        });
    });

})