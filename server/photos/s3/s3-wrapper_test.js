import {expect} from 'chai';

import {generateParams} from './s3-wrapper';

describe('s3-wrapper', function () {
    it('should return defaults', function () {
        expect(generateParams()).to.have.property('Bucket');
    });

    it('should assign extras', function () {
        expect(generateParams({foo: 'bar'})).to.have.property('Bucket');
        expect(generateParams({foo: 'bar'})).to.have.property('foo', 'bar');
    });
});
