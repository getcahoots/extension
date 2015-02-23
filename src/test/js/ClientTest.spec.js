
describe("basic client tryout",function() {
//    var services = cahoots.api;
//    var service = cahoots.api('person');
   var personService = cahoots.api('person');

    it("should do something", function() {
        /*var service = services('person');

        function onFindAll (err, persons) {
            if (err) {
                return console.error(err);
            }

            console.log(persons);
        }

        */service.findAll(onFindAll);
    })
})