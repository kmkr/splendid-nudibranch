import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import proxyquire from 'proxyquire';
import sinon from 'sinon';

describe('photos/list', function () {

    function getListPhotos(dbPromise) {
        const constantsStub = sinon.stub().returns({
            base: '/my/base'
        });

        const dbStub = sinon.stub().returns({
            default: {
                getPhotos() {
                    return dbPromise;
                }
            }
        });

        return proxyquire('./index', {
            '../constants': constantsStub(),
            '../../db': dbStub()
        });
    }

    it('should resolve', function () {
        const stubbedDbPhotos = [{
            base: '/my-base',
            description: 'description',
            key: '1234-5678',
            name: 'A name'
        }];
        const photos = getListPhotos(Promise.resolve(stubbedDbPhotos)).default();
        return Promise.all([
            expect(photos).to.eventually.have.property('base', '/my/base'),
            expect(photos).to.eventually.have.property('photos').that.eql(stubbedDbPhotos)
        ]);
    });

    it('should reject', function () {
        const photos = getListPhotos(Promise.reject()).default();
        return expect(photos).to.eventually.be.rejected;
    });
});
