import test from 'ava';
import {serverToClient} from './photo-data-conversion';

const base = 'http://my/base';
const photoFromServer = {
    key: '1234-5678',
    name: 'ole-brumm.jpg',
    location: 'loc',
    resize: {
        thumb: {
            width: 40,
            height: 20
        },
        xsmall: {
            width: 80,
            height: 40
        },
        small: {
            width: 100,
            height: 50
        },
        medium: {
            width: 200,
            height: 100
        },
        large: {
            width: 300,
            height: 150
        }
    }
};

test('should convert', t => {
    const expected = `${base}/${photoFromServer.key}/s_${photoFromServer.name}`;
    t.is(serverToClient(photoFromServer, base).sizes.small.url, expected);
});

test('should contain size keys', t => {
    const clientVer = serverToClient(photoFromServer, base);

    t.true(typeof clientVer.sizes.small === 'object');
    t.true(typeof clientVer.sizes.medium === 'object');
    t.true(typeof clientVer.sizes.large === 'object');
});

test('should include key', t => {
    t.is(serverToClient(photoFromServer, base).key, '1234-5678');
});
