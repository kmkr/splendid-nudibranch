import filterMatcher from './filter-matcher';


it('match year', () => {
    const photo = {
        tags: ['waz', 'woz', '2016']
    };
    expect(filterMatcher(photo, {years: ['2016']})).toBe(true);
});

it('no match on year', () => {
    const photo = {
        tags: ['waz', 'woz', '2016']
    };
    expect(filterMatcher(photo, {years: ['2015']})).toBe(false);
});

it('match location', () => {
    const photo = {
        location: 'Foo, Bar'
    };
    expect(filterMatcher(photo, {locations: ['foo']})).toBe(true);
});

it('match complex location', () => {
    const photo = {
        location: 'Foo, Bar Baz'
    };
    expect(filterMatcher(photo, {locations: ['bar.baz']})).toBe(true);
});

it('no match on location', () => {
    const photo = {
        location: 'Foo, Bar'
    };
    expect(filterMatcher(photo, {locations: ['bazzy']})).toBe(false);
});

it('match tag', () => {
    const photo = {
        tags: ['foo', 'bar']
    };
    expect(filterMatcher(photo, {tags: ['wiz', 'bar']})).toBe(true);
});

it('no match on tag', () => {
    const photo = {
        tags: ['foo', 'bar']
    };
    expect(filterMatcher(photo, {tags: ['wiz']})).toBe(false);
});

it('no match on empty tags', () => {
    const photo = {
        tags: ['foo', 'bar']
    };
    expect(filterMatcher(photo, {tags: []})).toBe(false);
});

it('no match for empty filter', () => {
    const photo = {};
    expect(filterMatcher(photo, {})).toBe(false);
});
