console.log("entering content script body area")
//console.log(this);
//console.log(self)
$(document).ready(function() {
    console.log("entering content script dom ready area")
    //console.log(this);
    //console.log(self)



    var cahootsRunner = new CahootsRunner(self);
    cahootsRunner.run();
    console.log("leaving content script dom ready area")
/*
    var personService = cahoots.api('person');

    var onFindAll = function(err, persons) {
        console.log(err);
        console.log(persons);

        var cahootsRunner = new CahootsRunner(persons);
        cahootsRunner.run();
    }

    personService.findAll(onFindAll);*/

});
console.log("leaving content script body area")


/*
(function(exports){

    exports.test = function(){
        return 'hello world'
    };

    exports.main = function(options, callbacks) {
        console.log("entering main()")
    }



})(typeof exports === 'undefined'? {}: exports);
*/


/*$(document).ready(function() {
    self.port.on('gotData', function(data){
        var cahootsRunner = new CahootsRunner(data);
        cahootsRunner.run();
    });
    self.port.emit('getData');
});*/


