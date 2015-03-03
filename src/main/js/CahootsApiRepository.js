'use strict';

function CahootsApiRepository(data) {
    this.data = data;

    this.initAuthors();

}


CahootsApiRepository.prototype.initAuthors = function() {
    this.authors = {};
    for(var i in this.data) {
       this.authors[(this.data[i].name)] = "CahootsID_" + this.data[i].id;
    }
}



CahootsApiRepository.prototype.findAuthorNames = function() {
    return this.authors;
}


CahootsApiRepository.prototype.findAuthorByCahootsId = function(cahootsId) {
    return this.data.filter(function(elem){
        return (elem.id==cahootsId);
    })[0]
    //return this.data[cahootsId];
}


CahootsApiRepository.prototype.getFullData = function() {
    return this.data;
}