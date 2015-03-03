'use strict';

function CahootsLocalStorageRepository(data) {
    this.data = data;

    this.initAuthors();

}


CahootsLocalStorageRepository.prototype.initAuthors = function() {
    this.authors = {};
    for(var i in this.data) {
        this.authors[(this.data[i].name)] = "CahootsID_" + this.data[i].id;
    }
}



CahootsLocalStorageRepository.prototype.findAuthorNames = function() {
    return this.authors;
}


CahootsLocalStorageRepository.prototype.findAuthorByCahootsId = function(cahootsId) {
    return this.data.filter(function(elem){
        return (elem.id==cahootsId);
    })[0]
    //return this.data[cahootsId];
}


CahootsLocalStorageRepository.prototype.getFullData = function() {
    return this.data;
}