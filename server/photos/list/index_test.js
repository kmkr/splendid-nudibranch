import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import proxyquire from 'proxyquire';
import sinon from 'sinon';

describe('photos/list', function () {

    function getListPhotos(getPhotosPromise) {
        const constantsStub = sinon.stub().returns({
            base: '/my/base'
        });

        const dbStub = sinon.stub().returns({
            default: {
                getPhotos() {
                    return getPhotosPromise;
                }
            }
        });

        return proxyquire('./index', {
            '../constants': constantsStub(),
            '../../db': dbStub()
        });
    }

    it('should resolve', function () {
        const stubbedPhotos = ['photo1', 'photo2'];
        const photos = getListPhotos(Promise.resolve(stubbedPhotos)).default();
        return Promise.all([
            expect(photos).to.eventually.have.property('base', '/my/base'),
            expect(photos).to.eventually.have.property('photos').that.equals(stubbedPhotos)
        ]);
    });

    it('should reject', function () {
        const photos = getListPhotos(Promise.reject()).default();
        return expect(photos).to.eventually.be.rejected;
    });
});
