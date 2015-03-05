'use strict';

function CahootsStorageRepository(storageReference) {
    this.storage = storageReference;
}

/**
 * sets raw person data
 */
CahootsStorageRepository.prototype.persistPersonData = function() {

}

/**
 *
 */
CahootsStorageRepository.prototype.persistOrganizationData = function() {

}

CahootsStorageRepository.prototype.reindex = function() {

}

CahootsStorageRepository.prototype.initAuthors = function() {
    this.authors = {};
    for(var i in this.data) {
        this.authors[(this.data[i].name)] = "CahootsID_" + this.data[i].id;
    }
}



CahootsStorageRepository.prototype.findAuthorNames = function() {
    return this.authors;
}


CahootsStorageRepository.prototype.findAuthorByCahootsId = function(cahootsId) {
    return this.data.filter(function(elem){
        return (elem.id==cahootsId);
    })[0]
    //return this.data[cahootsId];
}


CahootsStorageRepository.prototype.getFullData = function() {
    return this.data;
}