console.log("entering content script body area")
//console.log(this);
//console.log(self)
$(document).ready(function() {
    console.log("entering content script dom ready area")
    //console.log(this);
    //console.log(self)



    var handleFullDetails = function(lookupId, dataCallback) {
        self.port.once('gotFullDetails', function(data){
            console.log("handleFullDetails() <-[gotFullDetails("+data+")]-");
            console.log(data);
            dataCallback(data);
        });
        console.log("handleFullDetails() -[getFullDetails("+lookupId+")]->");
        self.port.emit('getFullDetails', lookupId);
    }

    var handleAuthorHints = function(dataCallback) {
        self.port.once("gotAuthorHints", function(authorHints) {
            console.log("CahootsRunner <-[gotAuthorHints]-")
            console.log("authorHints:")
            //console.log(authorHints)
            dataCallback(authorHints);
        })
        console.log("CahootsRunner -[getAuthorHints]->")
        self.port.emit("getAuthorHints");
    }


    var CahootsUiFormatter = cahoots.content.CahootsUiFormatter;
    var CahootsRunner = cahoots.content.CahootsRunner;
    
    var uif = new CahootsUiFormatter();
    var cahootsRunner = new CahootsRunner(handleFullDetails,handleAuthorHints,uif);
    cahootsRunner.run();
    console.log("leaving content script dom ready area")


});
console.log("leaving content script body area")

