import {expect} from 'chai';
import idGenerator from './id-generator';

describe('id-generator', function () {
    it('should generate id', function () {
        expect(idGenerator()).to.match(/[a-z0-9]{4}\-[a-z0-9]{4}/);
    });
});
