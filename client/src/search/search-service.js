export function getUniqueTags(photos) {
    return photos.map(p => p.tags)
        .reduce((a, b) => a.concat(b), [])
        .sort()
        .filter((el, i, a) => i === a.indexOf(el));
}

export function getMatchingTags({tags, exclude = [], matchWith = ''}) {
    if (!matchWith.length) {
        return [];
    }

    return tags
        .filter(t => exclude.indexOf(t) === -1)
        .filter(t => t.match(matchWith));
}
