describe('Chrome Content Script', function suite() {
    var f;
    //var chrome;
    var tabFixture = 'src/test/resources/html/chrome-tab-fixture.html';
    //var chrome;
    beforeEach(function () {
        f = jasmine.getFixtures();
        f.fixturesPath = 'base';
        f.load(tabFixture);

        //jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;


    });


    


    it('should demand authorHints', function () {
        var originalChrome = chrome;
        // ensure element does not exist beforehand

        chrome = getChromeMock();
        spyOn(chrome.runtime, 'sendMessage');

        // inject content script
        var cs = require("chrome/ChromeContentScript")
        cs()

        // fire dom ready
        var event = document.createEvent("HTMLEvents");
        event.initEvent("DOMContentLoaded", true, true);
        document.dispatchEvent(event)

        expect(chrome.runtime.sendMessage).toHaveBeenCalledWith({message: 'getAuthorHints'}, jasmine.any(Function))
        chrome = originalChrome;
    })


    it('should tooltipster', function () {
        var originalChrome = chrome;
        chrome = getChromeMock();
        // ensure element does not exist beforehand
        var notexistingElement = jQuery("span.CahootsID_c29bca5141c539897b9fb19fc071dd12475e86aa.tooltipstered");
        expect(typeof notexistingElement.get(0)).toBe('undefined')

        // inject content script
        var cs = require("chrome/ChromeContentScript")
        cs()

        // fire dom ready
        var event = document.createEvent("HTMLEvents");
        event.initEvent("DOMContentLoaded", true, true);
        document.dispatchEvent(event)

        // check transformed element
        var expectedElement = jQuery('<span class="CahootsID_c29bca5141c539897b9fb19fc071dd12475e86aa tooltipstered">Stefan Kornelius</span>');
        var transformed = jQuery("span.CahootsID_c29bca5141c539897b9fb19fc071dd12475e86aa.tooltipstered");
        expect(transformed.get(0).outerHTML).toBe(expectedElement.get(0).outerHTML);
        var originalChrome = chrome;
    })

    it('should demand authorDetails', function (done) {
        var originalChrome = chrome;
        // ensure element does not exist beforehand

        chrome = getChromeMock();
        spyOn(chrome.runtime, 'sendMessage').and.callThrough();

        // inject content script
        var cs = require("chrome/ChromeContentScript")
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
            chrome = originalChrome;
            done();
        }, 1000)
    })


    it('should display cahoots popover on mouseover', function (done) {
        var originalChrome = chrome;
        // ensure element does not exist beforehand

        chrome = getChromeMock();
        spyOn(chrome.runtime, 'sendMessage').and.callThrough();

        // inject content script
        var cs = require("chrome/ChromeContentScript")
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


        var popoverObservedHtml = document.getElementsByClassName('tooltipster-base').item(0).outerHTML
        var popoverExpectedHtml = '<div class="tooltipster-base tooltipster-default tooltipster-grow tooltipster-grow-show" style="max-width: 344px; pointer-events: auto; -webkit-animation-duration: 210ms; transition: 210ms; -webkit-transition: 210ms; top: 253px; left: 0px;"><div class="tooltipster-content"><div class="cahoots_popover"><p class="cahoots_top">Für <strong><a href="http://de.wikipedia.org/wiki/Stefan_Kornelius" target="_blank" class="name_info"><span class="CahootsID_c29bca5141c539897b9fb19fc071dd12475e86aa tooltipstered">Stefan Kornelius</span></a></strong> wurden die folgenden Verbindungen gefunden:</p><section class="cahoots_middle"><ul id="cahoots_list"><li class="cahoots_item"><a target="_blank" title="Mehr Infos zu dieser Organisation" href="https://www.atlantik-bruecke.org/">Atlantik-Brücke e.V.</a><a target="_blank" href="https://github.com/wuwi/cahoots/blob/master/misc/stefan_kornelius_mail.txt" class="quelle">Quelle</a></li><li class="cahoots_item"><a target="_blank" title="Mehr Infos zu dieser Organisation" href="https://dgap.org/de">Deutsche Gesellschaft für Auswärtige Politik</a><a target="_blank" href="https://github.com/wuwi/cahoots/blob/master/misc/stefan_kornelius_mail.txt" class="quelle">Quelle</a></li><li class="cahoots_item"><a target="_blank" title="Mehr Infos zu dieser Organisation" href="http://de.wikipedia.org/wiki/Bundesakademie_f%C3%BCr_Sicherheitspolitik">Bundesakademie für Sicherheitspolitik</a><a target="_blank" href="https://github.com/wuwi/cahoots/blob/master/misc/stefan_kornelius_mail.txt" class="quelle">Quelle</a></li><li class="cahoots_item"><a target="_blank" title="Mehr Infos zu dieser Organisation" href="http://de.wikipedia.org/wiki/Deutsch-Russisches_Forum">Deutsch-Russisches Forum</a><a target="_blank" href="https://github.com/wuwi/cahoots/blob/master/misc/stefan_kornelius_mail.txt" class="quelle">Quelle</a></li><li class="cahoots_item"><a target="_blank" title="Mehr Infos zu dieser Organisation" href="http://de.wikipedia.org/wiki/K%C3%B6rber-Stiftung">Körber-Stiftung</a><a target="_blank" href="https://web.archive.org/web/20140302133310/http://www.koerber-stiftung.de/koerberforum/gaeste/gaeste-details/gast/stefan-kornelius.html" class="quelle">Quelle</a></li><li class="cahoots_item"><a target="_blank" title="Mehr Infos zu dieser Organisation" href="http://www.aicgs.org/">American Institute for Contemporary German Studies</a><a target="_blank" href="https://web.archive.org/web/20140914130152/http://www.message-online.com/archiv/message-1-2013/leseproben/die-naehe-zur-macht/" class="quelle">Quelle</a></li><li class="cahoots_item"><a target="_blank" title="Mehr Infos zu dieser Organisation" href="http://www.deutscheatlantischegesellschaft.de/cms/front_content.php?idcat=73&amp;lang=1">Deutsche Atlantische Gesellschaft</a><a target="_blank" href="https://web.archive.org/web/20140914130152/http://www.message-online.com/archiv/message-1-2013/leseproben/die-naehe-zur-macht/" class="quelle">Quelle</a></li><li class="cahoots_item"><a target="_blank" title="Mehr Infos zu dieser Organisation" href="http://de.wikipedia.org/wiki/M%C3%BCnchner_Sicherheitskonferenz">Münchner Sicherheitskonferenz</a><a target="_blank" href="https://web.archive.org/web/20140716065613/https://www.securityconference.de/de/veranstaltungen/munich-security-conference/msc-2014/teilnehmer/" class="quelle">Quelle</a></li></ul></section><section class="cahoots_footer"><a target="_blank" href="http://cahoots-extension.github.io/index.html#contribute"><button class="cahoots_button">Verbindung melden</button></a><a target="_blank" href="mailto:mail@cahoots.pw?subject=Fehler"><button class="cahoots_button">Fehler melden</button></a></section></div></div><div class="tooltipster-arrow-bottom tooltipster-arrow" style="left:-44px;"><span style="border-color:rgba(0, 0, 0, 0);"></span></div></div>';

        expect(popoverObservedHtml).toBe(popoverExpectedHtml);


        setTimeout(function () {
            expect(chrome.runtime.sendMessage)
                .toHaveBeenCalledWith({
                    message: 'getFullDetails',
                    'cahootsID': 'c29bca5141c539897b9fb19fc071dd12475e86aa'
                }, jasmine.any(Function))

            chrome = originalChrome;
            done();
        }, 1000)

    })



    it('should hide cahoots popover on mouseout', function (done) {
        var originalChrome = chrome;
        // ensure element does not exist beforehand
        chrome = getChromeMock();
        spyOn(chrome.runtime, 'sendMessage').and.callThrough();

        // inject content script
        var cs = require("chrome/ChromeContentScript")
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


        //var popoverObservedHtml = document.getElementsByClassName('tooltipster-base').item(0).outerHTML.toString()
        //var popoverExpectedHtml = '<div class="tooltipster-base tooltipster-default tooltipster-grow tooltipster-grow-show" style="max-width: 344px; pointer-events: auto; -webkit-animation-duration: 210ms; transition: 210ms; -webkit-transition: 210ms; top: 253px; left: 0px;"><div class="tooltipster-content"><div class="cahoots_popover"><p class="cahoots_top">Für <strong><a href="http://de.wikipedia.org/wiki/Stefan_Kornelius" target="_blank" class="name_info"><span class="CahootsID_c29bca5141c539897b9fb19fc071dd12475e86aa tooltipstered">Stefan Kornelius</span></a></strong> wurden die folgenden Verbindungen gefunden:</p><section class="cahoots_middle"><ul id="cahoots_list"><li class="cahoots_item"><a target="_blank" title="Mehr Infos zu dieser Organisation" href="https://www.atlantik-bruecke.org/">Atlantik-Brücke e.V.</a><a target="_blank" href="https://github.com/wuwi/cahoots/blob/master/misc/stefan_kornelius_mail.txt" class="quelle">Quelle</a></li><li class="cahoots_item"><a target="_blank" title="Mehr Infos zu dieser Organisation" href="https://dgap.org/de">Deutsche Gesellschaft für Auswärtige Politik</a><a target="_blank" href="https://github.com/wuwi/cahoots/blob/master/misc/stefan_kornelius_mail.txt" class="quelle">Quelle</a></li><li class="cahoots_item"><a target="_blank" title="Mehr Infos zu dieser Organisation" href="http://de.wikipedia.org/wiki/Bundesakademie_f%C3%BCr_Sicherheitspolitik">Bundesakademie für Sicherheitspolitik</a><a target="_blank" href="https://github.com/wuwi/cahoots/blob/master/misc/stefan_kornelius_mail.txt" class="quelle">Quelle</a></li><li class="cahoots_item"><a target="_blank" title="Mehr Infos zu dieser Organisation" href="http://de.wikipedia.org/wiki/Deutsch-Russisches_Forum">Deutsch-Russisches Forum</a><a target="_blank" href="https://github.com/wuwi/cahoots/blob/master/misc/stefan_kornelius_mail.txt" class="quelle">Quelle</a></li><li class="cahoots_item"><a target="_blank" title="Mehr Infos zu dieser Organisation" href="http://de.wikipedia.org/wiki/K%C3%B6rber-Stiftung">Körber-Stiftung</a><a target="_blank" href="https://web.archive.org/web/20140302133310/http://www.koerber-stiftung.de/koerberforum/gaeste/gaeste-details/gast/stefan-kornelius.html" class="quelle">Quelle</a></li><li class="cahoots_item"><a target="_blank" title="Mehr Infos zu dieser Organisation" href="http://www.aicgs.org/">American Institute for Contemporary German Studies</a><a target="_blank" href="https://web.archive.org/web/20140914130152/http://www.message-online.com/archiv/message-1-2013/leseproben/die-naehe-zur-macht/" class="quelle">Quelle</a></li><li class="cahoots_item"><a target="_blank" title="Mehr Infos zu dieser Organisation" href="http://www.deutscheatlantischegesellschaft.de/cms/front_content.php?idcat=73&amp;lang=1">Deutsche Atlantische Gesellschaft</a><a target="_blank" href="https://web.archive.org/web/20140914130152/http://www.message-online.com/archiv/message-1-2013/leseproben/die-naehe-zur-macht/" class="quelle">Quelle</a></li><li class="cahoots_item"><a target="_blank" title="Mehr Infos zu dieser Organisation" href="http://de.wikipedia.org/wiki/M%C3%BCnchner_Sicherheitskonferenz">Münchner Sicherheitskonferenz</a><a target="_blank" href="https://web.archive.org/web/20140716065613/https://www.securityconference.de/de/veranstaltungen/munich-security-conference/msc-2014/teilnehmer/" class="quelle">Quelle</a></li></ul></section><section class="cahoots_footer"><a target="_blank" href="http://cahoots-extension.github.io/index.html#contribute"><button class="cahoots_button">Verbindung melden</button></a><a target="_blank" href="mailto:mail@cahoots.pw?subject=Fehler"><button class="cahoots_button">Fehler melden</button></a></section></div></div><div class="tooltipster-arrow-bottom tooltipster-arrow" style="left:-44px;"><span style="border-color:rgba(0, 0, 0, 0);"></span></div></div>';

        //expect(popoverObservedHtml).toBe(popoverExpectedHtml);


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
                chrome = originalChrome;
                done();
            },1000);
        }, 1000)

    })
})