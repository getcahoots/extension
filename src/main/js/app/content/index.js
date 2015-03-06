
var CahootsRunner= require('./CahootsRunner');
var CahootsUiFormatter = require('./CahootsUiFormatter');




module.exports = function instantiate (type) {

    return {
        CahootsRunner: CahootsRunner,
        CahootsUiFormatter:CahootsUiFormatter
    }
    //var endpoint = process.env.ENDPOINT || 'https://api.cahoots.pw/v1';
    //var service = services[type];
    //if (!service) {
    //    throw new VError('failed to return service %s', type);
    //}
    //return service(endpoint);
};