/*
 * cahoots extension
 *
 * Copyright Cahoots.pw
 * MIT Licensed
 *
 */

/**
 * @author Oliver Sommer <oliver.sommer@posteo.de>
 *
 */
(function () {
    'use strict';

    var nameFilterFunction = function (nameToFilter) {
        return function (elm) {
            return elm.name == nameToFilter;
        };
    };

    var isValidPersonRecord = function (p) {
        // needs to be defined and non empty: id,name,info,provider,cahoots
        return typeof p.id != 'undefined' &&
            typeof p.name != 'undefined' &&
            typeof p.info != 'undefined' &&
            typeof p.provider != 'undefined' &&
            typeof p.cahoots != 'undefined';
    };

    var mergePersonsWithSameName = function (a, b) {
        if(a.provider=="official" || b.provider=="official") {
            var item = a.provider=='official' ? a : b;
            var other = item==a ? b : a;

            if(item==other) {
                throw new Error("unexpected");
            }
            item.cahoots = item.cahoots.concat(other.cahoots);
            return item;
        } else {
            throw new Error("unimplemented: no provider official found");
        }
    };

    var containsEntry = function (data, b) {
        return data.filter(nameFilterFunction(b.name)).length > 0;
    };

    var reducePersonsFunction = function (a, b) {

        if (Array.isArray(a)) {
            if (containsEntry(a,b)) {
                //console.log("> duplicate -> merge: " + b.name)
                var existing = a.filter(nameFilterFunction(b.name))[0];
                var arrayWithout = a.filter(function (e) {
                    return e.name != b.name;
                });

                var mergedEntry = mergePersonsWithSameName(existing, b);
                arrayWithout.push(mergedEntry);
                return arrayWithout;

            }

            //console.log("> push: " + b.name)
            a.push(b)
            return a;

        }
        if (a.name != b.name) {
            //console.log("> add two single entries: " + a.name +" + " + b.name)
            return [a, b];
        }
        //console.log(">>> merge identical persons: " + a.name)
        return [mergePersonsWithSameName(a, b)];

    };

    function ProviderMerger() {

    };

    ProviderMerger.prototype.flattenPersons = function (persons) {
        return persons.reduce(reducePersonsFunction);
    };

    module.exports = ProviderMerger;
}());


