describe("basic client tryout",function() {

    it("should do something", function (done) {
        var service = cahoots.api('person');

        function onFindAll (err, persons) {
            expect(err).toBe(null);
            expect(persons.length).not.toBe(0);

            done();
        }

        service.findAll(onFindAll);
    })
})
