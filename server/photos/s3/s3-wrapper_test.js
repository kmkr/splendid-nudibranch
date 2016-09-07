import test from 'ava';

import {generateParams} from './s3-wrapper';

test('return defaults', t => {
    t.is(generateParams().Bucket, 'splendid-nudibranch-dev');
});

test('should assign extras', t => {
    t.is(generateParams({foo: 'bar'}).foo, 'bar');
});
