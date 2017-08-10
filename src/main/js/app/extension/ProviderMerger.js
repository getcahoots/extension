/**
 * cahoots extension
 *
 * Copyright Cahoots.pw
 * MIT Licensed
 *
 */

var nameFilterFunction = function (nameToFilter) {
    return function (elm) {
        return elm.name === nameToFilter;
    };
};

var isValidPersonRecord = function (p) {
    return  p.id !== undefined &&
        p.name !== undefined &&
        p.info !== undefined &&
        p.provider !== undefined &&
        p.cahoots !== undefined;
};

var isEmptyPersonRecord = function (p) {
    return isValidPersonRecord(p) && Array.isArray(p.cahoots) && p.cahoots.length === 0;
};

var mergePersonsWithSameName = function (a, b) {
    if (a.provider === 'official' || b.provider === 'official') {
        var item = a.provider === 'official' ? a : b;
        var other = item === a ? b : a;

        if (item === other) {
            throw new Error("unexpected");
        }
        item.cahoots = item.cahoots.concat(other.cahoots);
        return item;
    }
    throw new Error("unimplemented: no provider official found");
};

var containsEntry = function (data, b) {
    return data.filter(nameFilterFunction(b.name)).length > 0;
};

var reducePersonsFunction = function (a, b) {
    if (isEmptyPersonRecord(b)) {
        if(Array.isArray(a)) {
            return a;
        }
        return [a];
    }
    if (Array.isArray(a)) {
        if (containsEntry(a, b)) {
            var existing = a.filter(nameFilterFunction(b.name))[0];
            var arrayWithout = a.filter(function (e) {
                return e.name !== b.name;
            });

            var mergedEntry = mergePersonsWithSameName(existing, b);
            arrayWithout.push(mergedEntry);
            return arrayWithout;
        }

        a.push(b);
        return a;
    }
    if (a.name !== b.name) {
        return [a, b];
    }
    return [mergePersonsWithSameName(a, b)];
};


class ProviderMerger {


    // function ProviderMerger() {
    //
    // };

    flattenPersons(persons) {
        return persons.reduce(reducePersonsFunction);
    };

}

export default ProviderMerger;

