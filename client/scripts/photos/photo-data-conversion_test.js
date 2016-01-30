import chai from 'chai';
import photoDataConversion from './photo-data-conversion';
chai.should();

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
        photoDataConversion(photoFromServer, base).small.should.equal(expected);
    });

    it('should contain correct amount of keys', () => {
        photoDataConversion(photoFromServer, base).should.have.all.keys(['small', 'medium', 'large']);
    });
});
