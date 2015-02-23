
describe("basic client tryout",function() {
    var personService = window.cahoots.api('person');

    it("should do something", function (done) {
        var service = services('person');

        function onFindAll (err, persons) {
            expect(err).toBe(null);
            expect(persons.length).not.toBe(0);

            done();
        }

        service.findAll(onFindAll);
    })
})
