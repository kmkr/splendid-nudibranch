import test from 'ava';

import * as idGenerator from './id-generator';

test('generation of id', t => {
    t.regex(idGenerator.id(), /[a-z0-9]{4}\-[a-z0-9]{4}/);
});
