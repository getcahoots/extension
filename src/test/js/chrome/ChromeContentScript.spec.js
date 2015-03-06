describe('Chrome Content Script',function suite(){
    var f;

    var tabFixture= 'src/test/resources/html/chrome-tab-fixture.html';

    beforeEach(function() {
        //timerCallback = jasmine.createSpy('timerCallback');
        //jasmine.Clock.useMock();



        f = jasmine.getFixtures();
        f.fixturesPath = 'base';
        f.load(tabFixture);
    });


    it('should execute',function(done){
        //console.log(document)
        //jQuery('body').append(
        //    new jQuery('<script/>').attr({type:'application/javascript','src':'/base/target/js/CahootsContentBundle.js'}),
        //    new jQuery('<script/>').attr({type:'application/javascript','src':'/base/src/main/js/chrome/ChromeContentScript.js'})
        //)

        var event = document.createEvent("HTMLEvents");
        event.initEvent("DOMContentLoaded", true, true);
        document.dispatchEvent(event)

        //var page = new WebPage();



        //console.log(phantomjs)

        setTimeout(function(){
            //console.log(document)
            done();
        },500)


    })
})