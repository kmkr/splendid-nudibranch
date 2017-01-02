function matchYear(photo, years) {
    return matchTags(photo, years);
}

function matchLocation(photo, locations) {
    const locs = (photo.location || '').split(',');
    const toMatch = locs.map(elem => elem.toLowerCase());
    return locations
        .map(elem => elem.toLowerCase())
        .some(elem => toMatch.indexOf(elem) !== -1);
}

function matchTags(photo, tags) {
    const toMatch = (photo.tags || []).map(elem => elem.toLowerCase());
    return tags
        .map(elem => elem.toLowerCase())
        .some(elem => toMatch.indexOf(elem) !== -1);
}

export default (photo, {years, locations, tags}) => {
    if ((!years || !years.length) && (!locations || !locations.length) && (!tags || !tags.length)) {
        return false;
    }

    let yearMatched = true;
    let locationMatched = true;
    let tagMatched = true;

    if (years && years.length) {
        yearMatched = matchYear(photo, years);
    }

    if (locations && locations.length) {
        locationMatched = matchLocation(photo, locations);
    }

    if (tags && tags.length) {
        tagMatched = matchTags(photo, tags);
    }

    return yearMatched && locationMatched && tagMatched;
};
