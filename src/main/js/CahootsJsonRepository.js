'use strict';

function CahootsJsonRepository(data) {
    this.data = data;

    this.initAuthors();

}


CahootsJsonRepository.prototype.initAuthors = function() {
    this.authors = {};
    for(var i in this.data) {
       this.authors[(this.data[i].name)] = i;
    }
}


CahootsJsonRepository.prototype.findAuthorNames = function() {
    return this.authors;
}


CahootsJsonRepository.prototype.findAuthorByCahootsId = function(cahootsId) {
    return this.data[cahootsId];
}


CahootsJsonRepository.prototype.getFullData = function() {
    return this.data;
}