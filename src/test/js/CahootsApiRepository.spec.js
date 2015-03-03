
describe('CahootsApiRepository', function suite () {

    var cahootsRepository = new CahootsApiRepository();
    cahootsRepository.updateFromRemote();

    var expectedAuthors = {
        'Jonas Bergmeier' : 'CahootsID_a70ac98f6379aca6e45a602ece8d9c28',
        'Alexander Barnickel' : 'CahootsID_602ece8d9c28aca6e45a602ece8d9c28',
        'André König' : 'CahootsID_ecb66435f42c7bb716b20b0d887d83a9'
    }


    beforeEach(function() {
    });


    it('should return a list of all Authors', function () {
        var result = cahootsRepository.findAuthorNames();

        expect(result).toEqual(expectedAuthors)
    });

    it('should return full data object', function () {
        var result = cahootsRepository.getFullData();
        console.log(result)
        expect(result.filter(function(elem){
            return elem.id=="03f633535c5980522c92ccd8a6fbe07849458232";
        })[0].name).toBe("Claus Kleber")
    });

     it('should return author data by cahoots id', function () {
         var result = cahootsRepository.findAuthorByCahootsId("a70ac98f6379aca6e45a602ece8d9c28");
         //console.log(result);
         expect(result.name).toBe("Jonas Bergmeier");
    });
});


