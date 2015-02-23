'use strict';

function CahootsRepository(data) {
    this.data = data;

    this.initAuthors();

}


CahootsRepository.prototype.initAuthors = function() {
    this.authors = {};
    for(var i in this.data) {
       this.authors[(this.data[i].name)] = i;
    }
}


CahootsRepository.prototype.findAuthorNames = function() {
    return this.authors;
}


CahootsRepository.prototype.findAuthorByCahootsId = function(cahootsId) {
    return this.data[cahootsId];
}


CahootsRepository.prototype.getFullData = function() {
    return this.data;
}