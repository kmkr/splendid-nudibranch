import {expect} from 'chai';
import {serverToClient} from './photo-data-conversion';

describe('photo-data-conversion', () => {
    let base, photoFromServer;

    beforeEach(() => {
        base = 'http://my/base';
        photoFromServer = {
            key: '1234-5678',
            name: 'ole-brumm.jpg'
        };
    });

    it('should convert', () => {
        const expected = `${base}/${photoFromServer.key}/s_${photoFromServer.name}`;
        expect(serverToClient(photoFromServer, base).small).to.equal(expected);
    });

    it('should contain size keys', () => {
        expect(serverToClient(photoFromServer, base)).to.have.any.keys(['small', 'medium', 'large']);
    });

    it('should include key', () => {
        expect(serverToClient(photoFromServer, base)).to.have.property('key', '1234-5678');
    });
});
