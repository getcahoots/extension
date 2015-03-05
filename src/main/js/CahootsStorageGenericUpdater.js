var CahootsStorageGenericUpdater = function(url) {
    this.debug = false;
    this.url = url; // 'https://api.cahoots.pw/v1/persons'
}

CahootsStorageGenericUpdater.prototype.update = function(xhr1, xhr2, cahootsStorageInstance, callback) {

    var debug = this.debug;

    var url = this.url; //location relative to current webpage

    xhr1.open('GET', url+'/persons', true); // async

    xhr1.onload = function(xmlEvent){
        //console.log(xmlEvent);

        //console.log(typeof )
        //console.log(request.response);
        var personValues= JSON.parse(xhr1.response);

        xhr2.open('GET', url+'/organizations', true); // async
        xhr2.onload = function(xmlEvent){
            //console.log(xhr2.response)
            var orgaValues = JSON.parse(xhr2.response);

            if(debug) console.log("loaded through.")
            cahootsStorageInstance.setPersons(personValues)
            cahootsStorageInstance.setOrganizations(orgaValues)
            if(debug) console.log("loaded through -> callback")
            callback(personValues,orgaValues)
        }
            //console.log(xmlEvent);
        xhr2.send();
            //console.log(typeof )
            //console.log(request.response);



    };

    xhr1.send();
}

module.exports.CahootsStorageGenericUpdater=CahootsStorageGenericUpdater