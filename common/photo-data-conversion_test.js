import test from 'ava';
import {serverToClient} from './photo-data-conversion';

const base = 'http://my/base';
const photoFromServer = {
    key: '1234-5678',
    name: 'ole-brumm.jpg'
};

test('should convert', t => {
    const expected = `${base}/${photoFromServer.key}/s_${photoFromServer.name}`;
    t.equal(serverToClient(photoFromServer, base).small, expected);
});

test('should contain size keys', t => {
    const clientVer = serverToClient(photoFromServer, base);

    t.true(typeof clientVer.small !== 'undefined');
    t.true(typeof clientVer.medium !== 'undefined');
    t.true(typeof clientVer.large !== 'undefined');
});

test('should include key', t => {
    t(serverToClient(photoFromServer, base)).to.have.property('key', '1234-5678');
});
