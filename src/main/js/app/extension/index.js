
var CahootsQueryService= require('./CahootsQueryService');
var CahootsStorage = require('./CahootsStorage');
var CahootsStorageGenericUpdater = require('./CahootsStorageGenericUpdater');




module.exports = function instantiate (type) {

    return {
        CahootsQueryService: CahootsQueryService,
        CahootsStorage:CahootsStorage,
        CahootsStorageGenericUpdater: CahootsStorageGenericUpdater
    }
    //var endpoint = process.env.ENDPOINT || 'https://api.cahoots.pw/v1';
    //var service = services[type];
    //if (!service) {
    //    throw new VError('failed to return service %s', type);
    //}
    //return service(endpoint);
};