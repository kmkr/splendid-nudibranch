import test from 'ava';

import filterMatcher from './filter-matcher';


test('match year', t => {
    const photo = {
        tags: ['waz', 'woz', '2016']
    };
    t.true(filterMatcher(photo, {years: ['2016']}));
});

test('no match on year', t => {
    const photo = {
        tags: ['waz', 'woz', '2016']
    };
    t.false(filterMatcher(photo, {years: ['2015']}));
});

test('match location', t => {
    const photo = {
        location: 'Foo, Bar'
    };
    t.true(filterMatcher(photo, {locations: ['foo']}));
});

test('match complex location', t => {
    const photo = {
        location: 'Foo, Bar Baz'
    };
    t.true(filterMatcher(photo, {locations: ['bar.baz']}));
});

test('no match on location', t => {
    const photo = {
        location: 'Foo, Bar'
    };
    t.false(filterMatcher(photo, {locations: ['bazzy']}));
});

test('match tag', t => {
    const photo = {
        tags: ['foo', 'bar']
    };
    t.true(filterMatcher(photo, {tags: ['wiz', 'bar']}));
});

test('no match on tag', t => {
    const photo = {
        tags: ['foo', 'bar']
    };
    t.false(filterMatcher(photo, {tags: ['wiz']}));
});

test('no match on empty tags', t => {
    const photo = {
        tags: ['foo', 'bar']
    };
    t.false(filterMatcher(photo, {tags: []}));
});

test('no match for empty filter', t => {
    const photo = {};
    t.false(filterMatcher(photo, {}));
});
