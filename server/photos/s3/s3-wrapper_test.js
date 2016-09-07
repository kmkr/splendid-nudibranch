import test from 'ava';

import {generateParams} from './s3-wrapper';

test('should assign extras', t => {
    t.is(generateParams({foo: 'bar'}).foo, 'bar');
});
